# Makefile for GradeChecker

BINARY_NAME=gradechecker
CMD_PATH=cmd/bot/main.go

.PHONY: all build clean dev

all: build

build:
	@echo "Building $(BINARY_NAME)..."
	go build -o $(BINARY_NAME) $(CMD_PATH)

clean:
	@echo "Cleaning..."
	rm -f $(BINARY_NAME)
	rm -rf dist/

dev: build
	@echo "Starting development server..."
	npm install
	npm run dev
