package main

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"regexp"
	"strconv"
	"strings"
	"sync/atomic"
	"syscall"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

// ---- configuration ---------------------------------------------------------

type config struct {
	port           int
	allowedOrigins []string
	logLevel       slog.Level
}

func loadConfig() config {
	port, err := strconv.Atoi(envOr("PORT", "8080"))
	if err != nil {
		port = 8080
	}
	raw := envOr("ALLOWED_ORIGIN", "http://localhost:5173,http://localhost:4173,http://localhost:3000")
	origins := make([]string, 0)
	for _, o := range strings.Split(raw, ",") {
		if s := strings.TrimSpace(o); s != "" {
			origins = append(origins, s)
		}
	}

	level := slog.LevelInfo
	switch strings.ToLower(envOr("LOG_LEVEL", "info")) {
	case "debug":
		level = slog.LevelDebug
	case "warn":
		level = slog.LevelWarn
	case "error":
		level = slog.LevelError
	}

	return config{port: port, allowedOrigins: origins, logLevel: level}
}

func envOr(key, fallback string) string {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		return v
	}
	return fallback
}

// ---- consultation endpoint -------------------------------------------------

type consultation struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Day     string `json:"day"`
	Reason  string `json:"reason"`
	Message string `json:"message"`
}

var emailRegex = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)

func (c consultation) validate() error {
	if strings.TrimSpace(c.Name) == "" {
		return errors.New("name is required")
	}
	if !emailRegex.MatchString(c.Email) {
		return errors.New("valid email is required")
	}
	if len(c.Message) > 2000 {
		return errors.New("message exceeds maximum length")
	}
	return nil
}

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(body)
}

func consultationHandler(logger *slog.Logger) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// 64 KB cap, avoids OOM on pathological payloads.
		r.Body = http.MaxBytesReader(w, r.Body, 64<<10)
		defer r.Body.Close()

		var req consultation
		dec := json.NewDecoder(r.Body)
		dec.DisallowUnknownFields()
		if err := dec.Decode(&req); err != nil {
			logger.Warn("consultation: invalid body", "error", err)
			writeJSON(w, http.StatusBadRequest, map[string]string{
				"status":  "error",
				"message": "invalid request body",
			})
			return
		}
		if err := req.validate(); err != nil {
			writeJSON(w, http.StatusUnprocessableEntity, map[string]string{
				"status":  "error",
				"message": err.Error(),
			})
			return
		}

		// v1: log to stdout. Replace with an email queue/DB insert when ready.
		logger.Info("consultation.request",
			"name", req.Name,
			"email", req.Email,
			"day", req.Day,
			"reason", req.Reason,
			"message_length", len(req.Message),
		)

		writeJSON(w, http.StatusOK, map[string]string{
			"status":  "ok",
			"message": "We'll be in touch within one working day.",
		})
	}
}

// ---- middleware ------------------------------------------------------------

type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (s *statusRecorder) WriteHeader(code int) {
	s.status = code
	s.ResponseWriter.WriteHeader(code)
}

func requestLogger(logger *slog.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			rec := &statusRecorder{ResponseWriter: w, status: http.StatusOK}
			next.ServeHTTP(rec, r)
			logger.Info("http.request",
				"method", r.Method,
				"path", r.URL.Path,
				"status", rec.status,
				"duration_ms", time.Since(start).Milliseconds(),
				"remote", r.RemoteAddr,
			)
		})
	}
}

// ---- main ------------------------------------------------------------------

func main() {
	cfg := loadConfig()

	logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: cfg.logLevel}))
	slog.SetDefault(logger)

	var shuttingDown atomic.Bool

	router := mux.NewRouter()
	router.HandleFunc("/api/health", func(w http.ResponseWriter, _ *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{"status": "healthy"})
	}).Methods(http.MethodGet)

	router.HandleFunc("/api/ready", func(w http.ResponseWriter, _ *http.Request) {
		if shuttingDown.Load() {
			writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status": "draining"})
			return
		}
		writeJSON(w, http.StatusOK, map[string]string{"status": "ready"})
	}).Methods(http.MethodGet)

	router.HandleFunc("/api/consultation", consultationHandler(logger)).Methods(http.MethodPost)

	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   cfg.allowedOrigins,
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodOptions},
		AllowedHeaders:   []string{"Content-Type", "Accept"},
		AllowCredentials: false,
		MaxAge:           300,
	})

	handler := corsMiddleware.Handler(requestLogger(logger)(router))

	server := &http.Server{
		Addr:              ":" + strconv.Itoa(cfg.port),
		Handler:           handler,
		ReadHeaderTimeout: 10 * time.Second,
		ReadTimeout:       30 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       120 * time.Second,
	}

	errCh := make(chan error, 1)
	go func() {
		logger.Info("server.start", "port", cfg.port, "origins", cfg.allowedOrigins)
		if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			errCh <- err
		}
	}()

	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)

	select {
	case err := <-errCh:
		logger.Error("server.error", "error", err)
		os.Exit(1)
	case sig := <-sigCh:
		logger.Info("server.shutdown", "signal", sig.String())
		shuttingDown.Store(true)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := server.Shutdown(ctx); err != nil {
		logger.Error("server.shutdown.error", "error", err)
		os.Exit(1)
	}
	logger.Info("server.shutdown.complete")
}
