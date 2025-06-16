.PHONY: default info build test clean audit promote-audit

default: info build

info:
	$(info =========================== Building pyfinalo ===========================)
	$(info > Run 'make build' to build the project)
	$(info > Run 'make test' to run all tests)
	$(info > Run 'make audit' to check code quality)
	$(info =========================================================================)

# Combined build
build: src/lib_pyfinalo_js/node_modules
	dune build
	cd src/lib_pyfinalo_js && bun run build

src/lib_pyfinalo_js/node_modules:
	cd src/lib_pyfinalo_js && bun install

# Combined test
test:
	dune runtest
	cd src/lib_pyfinalo_js && bun run test

# Combined clean
clean:
	dune clean
	cd src/lib_pyfinalo_js && rm -rf dist node_modules

# Audit targets
audit: scripts/node_modules
	bun run ./scripts/audit.ts

promote-audit: scripts/node_modules
	bun run ./scripts/audit.ts --fix

scripts/node_modules:
	cd scripts && bun install