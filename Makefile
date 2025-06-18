.PHONY: default info build test clean audit promote-audit build-webapp test-webapp

default: info build

info:
	$(info =========================== Building pyfinalo ===========================)
	$(info > Run 'make build' to build the project)
	$(info > Run 'make test' to run all tests)
	$(info > Run 'make audit' to check code quality)
	$(info > Run 'make build-webapp' to build the experimental webapp)
	$(info =========================================================================)

# Combined build
build: src/lib_pyfinalo_js/node_modules
	dune build
	cd src/lib_pyfinalo_js && bun run build

# Webapp build (experimental - requires JS bindings first)
build-webapp: build
	cd webapp && bun install && bun run build

src/lib_pyfinalo_js/node_modules:
	cd src/lib_pyfinalo_js && bun install

# Combined test
test:
	dune runtest
	cd src/lib_pyfinalo_js && bun run test

# Webapp test
test-webapp:
	cd webapp && bun run test

# Combined clean
clean:
	dune clean
	cd src/lib_pyfinalo_js && rm -rf dist node_modules
	cd scripts && rm -rf node_modules
	cd webapp && rm -rf node_modules app/dist app/node_modules repl-*/dist repl-*/node_modules
	./scripts/check-dev-containers-cleaned.sh

# Audit targets
audit: scripts/node_modules
	bun run ./scripts/audit.ts

promote-audit: scripts/node_modules
	bun run ./scripts/audit.ts --fix

scripts/node_modules:
	cd scripts && bun install
