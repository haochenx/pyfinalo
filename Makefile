.PHONY: default info prepare build test clean audit promote-audit

default: info build

info:
	$(info =========================== Building pyfinalo ===========================)
	$(info > Run 'make prepare' to install dependencies)
	$(info > Run 'make test' to run all tests)
	$(info > Run 'make audit' to check code quality)
	$(info =========================================================================)

prepare:
	cd src/lib_pyfinalo_js && bun install

# Combined build
build: prepare
	dune build
	cd src/lib_pyfinalo_js && bun run build

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