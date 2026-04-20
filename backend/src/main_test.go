package main

import (
	"bytes"
	"encoding/json"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestConsultationValidate(t *testing.T) {
	cases := []struct {
		name    string
		input   consultation
		wantErr bool
	}{
		{"valid", consultation{Name: "A", Email: "a@b.co"}, false},
		{"missing name", consultation{Email: "a@b.co"}, true},
		{"bad email", consultation{Name: "A", Email: "not-an-email"}, true},
		{"message too long", consultation{Name: "A", Email: "a@b.co", Message: strings.Repeat("x", 2001)}, true},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			err := c.input.validate()
			if (err != nil) != c.wantErr {
				t.Fatalf("validate() err = %v, wantErr %v", err, c.wantErr)
			}
		})
	}
}

func TestConsultationHandler(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(&bytes.Buffer{}, nil))
	handler := consultationHandler(logger)

	t.Run("accepts valid payload", func(t *testing.T) {
		body, _ := json.Marshal(consultation{Name: "Ayesha", Email: "a@example.com"})
		req := httptest.NewRequest(http.MethodPost, "/api/consultation", bytes.NewReader(body))
		rec := httptest.NewRecorder()
		handler(rec, req)
		if rec.Code != http.StatusOK {
			t.Fatalf("status = %d, want 200. body=%s", rec.Code, rec.Body.String())
		}
	})

	t.Run("rejects invalid email", func(t *testing.T) {
		body, _ := json.Marshal(consultation{Name: "Ayesha", Email: "bad"})
		req := httptest.NewRequest(http.MethodPost, "/api/consultation", bytes.NewReader(body))
		rec := httptest.NewRecorder()
		handler(rec, req)
		if rec.Code != http.StatusUnprocessableEntity {
			t.Fatalf("status = %d, want 422", rec.Code)
		}
	})

	t.Run("rejects unknown fields", func(t *testing.T) {
		req := httptest.NewRequest(
			http.MethodPost,
			"/api/consultation",
			strings.NewReader(`{"name":"A","email":"a@b.co","extra":"nope"}`),
		)
		rec := httptest.NewRecorder()
		handler(rec, req)
		if rec.Code != http.StatusBadRequest {
			t.Fatalf("status = %d, want 400", rec.Code)
		}
	})
}

func TestFeedbackValidate(t *testing.T) {
	cases := []struct {
		name    string
		input   feedback
		wantErr bool
	}{
		{"valid booked whatsapp", feedback{Channel: "whatsapp", Outcome: "booked", ElapsedMs: 120_000}, false},
		{"valid not_booked phone", feedback{Channel: "phone", Outcome: "not_booked"}, false},
		{"valid trying", feedback{Channel: "phone", Outcome: "trying"}, false},
		{"invalid channel", feedback{Channel: "email", Outcome: "booked"}, true},
		{"invalid outcome", feedback{Channel: "phone", Outcome: "meh"}, true},
		{"note too long", feedback{Channel: "phone", Outcome: "not_booked", Note: strings.Repeat("x", 1001)}, true},
		{"negative elapsed", feedback{Channel: "phone", Outcome: "booked", ElapsedMs: -1}, true},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			err := c.input.validate()
			if (err != nil) != c.wantErr {
				t.Fatalf("validate() err = %v, wantErr %v", err, c.wantErr)
			}
		})
	}
}

func TestFeedbackHandler(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(&bytes.Buffer{}, nil))
	handler := feedbackHandler(logger)

	t.Run("accepts valid payload", func(t *testing.T) {
		body, _ := json.Marshal(feedback{Channel: "whatsapp", Outcome: "booked", ElapsedMs: 90_000})
		req := httptest.NewRequest(http.MethodPost, "/api/feedback", bytes.NewReader(body))
		rec := httptest.NewRecorder()
		handler(rec, req)
		if rec.Code != http.StatusOK {
			t.Fatalf("status = %d, want 200. body=%s", rec.Code, rec.Body.String())
		}
	})

	t.Run("rejects unknown fields", func(t *testing.T) {
		req := httptest.NewRequest(
			http.MethodPost,
			"/api/feedback",
			strings.NewReader(`{"channel":"phone","outcome":"booked","extra":1}`),
		)
		rec := httptest.NewRecorder()
		handler(rec, req)
		if rec.Code != http.StatusBadRequest {
			t.Fatalf("status = %d, want 400", rec.Code)
		}
	})

	t.Run("rejects invalid outcome", func(t *testing.T) {
		body, _ := json.Marshal(feedback{Channel: "phone", Outcome: "wat"})
		req := httptest.NewRequest(http.MethodPost, "/api/feedback", bytes.NewReader(body))
		rec := httptest.NewRecorder()
		handler(rec, req)
		if rec.Code != http.StatusUnprocessableEntity {
			t.Fatalf("status = %d, want 422", rec.Code)
		}
	})
}
