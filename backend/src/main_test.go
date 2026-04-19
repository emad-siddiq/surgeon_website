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
