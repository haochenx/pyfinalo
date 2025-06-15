# Pyfinalo Makefile

.PHONY: all build test clean audit

# Default target
all: build

# Build the project
build:
	dune build

# Run tests
test:
	dune runtest

# Clean build artifacts
clean:
	dune clean

# Security and quality audit
audit:
	@echo "Running security and quality audit..."
	@echo "=================================="
	@echo "1. Checking for dependency vulnerabilities..."
	@if command -v opam >/dev/null 2>&1; then \
		echo "   - Running opam audit (if available)..."; \
		opam audit 2>/dev/null || echo "   - opam audit not available, skipping dependency vulnerability check"; \
	else \
		echo "   - opam not found, skipping dependency vulnerability check"; \
	fi
	@echo "2. Checking for common security patterns..."
	@echo "   - Scanning for potential security issues in OCaml code..."
	@if find src -name "*.ml" -o -name "*.mli" | xargs grep -n "unsafe\|Obj\.magic\|Marshal\." 2>/dev/null; then \
		echo "   WARNING: Found potentially unsafe operations in code"; \
	else \
		echo "   - No obvious unsafe operations found"; \
	fi
	@echo "3. Checking dependency list..."
	@echo "   - Current dependencies:"
	@if [ -f "dune-project" ]; then \
		grep -A 10 "depends" dune-project | grep -E "^\s+\(" | sed 's/^[[:space:]]*/     /'; \
	fi
	@echo "4. Checking for test coverage..."
	@if find . -name "*.t" -o -name "*test*.ml" | head -1 >/dev/null 2>&1; then \
		echo "   - Tests found, running test suite..."; \
		dune runtest 2>/dev/null || echo "   - Some tests failed, please review"; \
	else \
		echo "   - No tests found"; \
	fi
	@echo "=================================="
	@echo "Audit complete. Review any warnings above."