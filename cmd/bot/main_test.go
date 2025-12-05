package main

import (
	"testing"
)

func TestNormalizeString(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{"  Hello World  ", "Hello World"},
		{"Hello\u200BWorld", "HelloWorld"}, // Zero width space
		{"I140", "I140"},
		{"  ", ""},
		{"Module Name", "Module Name"},
	}

	for _, tt := range tests {
		result := normalizeString(tt.input)
		if result != tt.expected {
			t.Errorf("normalizeString(%q) = %q, want %q", tt.input, result, tt.expected)
		}
	}
}
