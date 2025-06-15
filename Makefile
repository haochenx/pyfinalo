# pyfinalo Makefile

.DEFAULT_GOAL := help

.PHONY: help
help:
	@echo "Available targets:"
	@echo "  build     - Build the project"
	@echo "  test      - Run tests"
	@echo "  clean     - Clean build artifacts"
	@echo "  audit     - Run comprehensive project audit"
	@echo "  format    - Format code"
	@echo "  install   - Install dependencies"

.PHONY: install
install:
	opam install . --deps-only --with-test --with-doc

.PHONY: build
build:
	dune build

.PHONY: test
test:
	dune runtest

.PHONY: clean
clean:
	dune clean

.PHONY: format
format:
	dune build @fmt --auto-promote

# Main audit target following bindoj pattern
.PHONY: audit
audit: audit-format audit-lint audit-build audit-test audit-doc
	@echo "=== Audit completed successfully ==="

.PHONY: audit-format
audit-format:
	@echo "=== Checking code formatting ==="
	dune build @fmt --display short

.PHONY: audit-lint  
audit-lint:
	@echo "=== Running linting checks ==="
	dune build --profile dev

.PHONY: audit-build
audit-build:
	@echo "=== Verifying clean build ==="
	dune clean
	dune build

.PHONY: audit-test
audit-test:
	@echo "=== Running all tests ==="
	dune runtest

.PHONY: audit-doc
audit-doc:
	@echo "=== Verifying documentation ==="
	dune build @doc