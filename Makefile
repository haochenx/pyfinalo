# Makefile for pyfinalo project
# Coordinates multiple build systems (Dune, Bun/npm, etc.)

.PHONY: all clean test ocaml js webapp deploy help

# Default target
all: ocaml js webapp

help:
	@echo "pyfinalo build targets:"
	@echo "  all      - Build everything (OCaml + JS + webapp)"
	@echo "  ocaml    - Build OCaml components"
	@echo "  js       - Build JavaScript bindings"
	@echo "  webapp   - Build web application"
	@echo "  test     - Run all tests"
	@echo "  deploy   - Deploy webapp to Cloudflare"
	@echo "  clean    - Clean all build artifacts"
	@echo "  help     - Show this help message"

# OCaml components
ocaml:
	@echo "🐫 Building OCaml components..."
	dune build

# JavaScript bindings (requires OCaml build first)
js: ocaml
	@echo "📦 Building JavaScript bindings..."
	cd src/lib_pyfinalo_js && bun install && bun run build

# Web application (requires JS bindings)
webapp: js
	@echo "🌐 Building web application..."
	cd webapp && bun install && bun run build

# Run all tests
test: test-ocaml test-js test-webapp

test-ocaml:
	@echo "🧪 Running OCaml tests..."
	dune test

test-js: js
	@echo "🧪 Running JavaScript tests..."
	cd src/lib_pyfinalo_js && bun test

test-webapp: webapp
	@echo "🧪 Running webapp tests..."
	cd webapp && bun run test

# Deploy to Cloudflare
deploy: webapp
	@echo "🚀 Deploying to Cloudflare..."
	cd webapp && bun run deploy

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	dune clean
	rm -rf src/lib_pyfinalo_js/dist
	rm -rf src/lib_pyfinalo_js/node_modules
	rm -rf webapp/node_modules
	rm -rf webapp/app/dist
	rm -rf webapp/repl-python/dist
	rm -rf webapp/repl-js/dist
	rm -rf webapp/worker/dist
	find . -name "*.pyc" -delete
	find . -name "__pycache__" -type d -exec rm -rf {} +

# Development targets
dev-ocaml:
	dune build --watch

dev-webapp:
	cd webapp && bun run dev

# Installation targets
install-deps:
	@echo "📦 Installing dependencies..."
	opam install . --deps-only
	cd src/lib_pyfinalo_js && bun install
	cd webapp && bun install

# Docker targets
docker-build:
	docker build -t pyfinalo .

docker-run:
	docker run -it --rm pyfinalo

# Release targets
release: clean all test
	@echo "📦 Creating release build..."
	@echo "Don't forget to:"
	@echo "  1. Update version numbers"
	@echo "  2. Tag the release"
	@echo "  3. Upload to package registries"