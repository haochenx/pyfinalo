# Build Guide

This document explains how to build all components of the pyfinalo project, which uses multiple build systems for different parts.

## Overview

The project consists of several components, each with its own build system:

1. **OCaml Core & Bindings** (Dune)
   - Core DSL implementation
   - Python bindings
   - JavaScript bindings

2. **Web Application** (Vite/Bun)
   - Main webapp UI
   - Python REPL bundle (Pyodide)
   - JavaScript REPL bundle
   - Cloudflare Worker

3. **Python Package** (Poetry/pip)
   - Pure Python fallback implementation

## Prerequisites

### For OCaml Components
- OCaml 5.1.x (avoid 5.3+ due to pyml compatibility)
- OPAM package manager
- Dune build system

### For Web Components
- Bun (recommended) or Node.js 18+
- Wrangler CLI (for Cloudflare deployment)

### For Python Components
- Python 3.9+
- Poetry (optional, for dependency management)

## Build Instructions

### 1. OCaml Components

```bash
# Setup OCaml environment
opam switch create pyfinalo 5.1.1
eval $(opam env)
opam install . --deps-only

# Build all OCaml components
dune build

# Build specific components
dune build src/lib_pyfinalo      # Core library
dune build src/bin_pyfinalo_py   # Python bindings
dune build src/lib_pyfinalo_js   # JavaScript bindings

# Run tests
dune test
```

### 2. JavaScript Library Post-Processing

The JavaScript bindings require additional bundling after OCaml compilation:

```bash
cd src/lib_pyfinalo_js
bun install
bun run build  # This runs dune + tsup bundling
bun test       # Run JavaScript tests
```

### 3. Web Application

The webapp uses Bun workspaces for managing multiple packages:

```bash
cd webapp
bun install  # Install all workspace dependencies

# Development
bun run dev  # Start development server

# Build all components
bun run build  # Builds app + REPL bundles + worker

# Build individual components
bun run build:app          # Main webapp
bun run build:repl-python  # Python REPL bundle
bun run build:repl-js      # JavaScript REPL bundle
bun run build:worker       # Cloudflare Worker

# Deploy to Cloudflare
bun run deploy  # Full deployment including R2 upload
```

### 4. Python Package

For development with pyodide:

```bash
cd webapp/pyodide-setup
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Build Order

When building from scratch, follow this order:

1. **OCaml Core**: `dune build src/lib_pyfinalo`
2. **JavaScript Bindings**: 
   ```bash
   dune build src/lib_pyfinalo_js
   cd src/lib_pyfinalo_js && bun run build
   ```
3. **Python Bindings**: `dune build src/bin_pyfinalo_py`
4. **Web Application**: `cd webapp && bun run build`

## Makefile

For convenience, you can use the provided Makefile:

```bash
make all        # Build everything
make ocaml      # Build OCaml components only
make js         # Build JavaScript bindings
make webapp     # Build web application
make test       # Run all tests
make clean      # Clean all build artifacts
make deploy     # Deploy webapp to Cloudflare
```

## Continuous Integration

The project uses GitHub Actions for CI. The workflow:
1. Sets up OCaml environment
2. Builds all OCaml components
3. Sets up Bun
4. Builds and tests JavaScript components
5. Builds webapp (without deployment)

## Troubleshooting

### OCaml Build Issues
- Ensure you're using OCaml 5.1.x (not 5.3+)
- Run `opam update && opam upgrade` if packages are outdated
- Check `dune-project` for minimum Dune version

### JavaScript Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && bun install`
- Ensure `lib_pyfinalo_js` is built before webapp
- Check that tsup configs are present

### Pyodide Issues
- Pyodide requires specific Python versions (usually 3.11)
- Some packages may not be available in Pyodide
- Check browser console for WebAssembly errors

### Cloudflare Deployment Issues
- Ensure wrangler is authenticated: `wrangler login`
- Verify R2 bucket exists and has correct permissions
- Check worker size limits (10MB compressed)

## Development Tips

1. **Hot Reloading**: The webapp supports hot reloading in development mode
2. **Type Checking**: Run `dune build @check` for OCaml type checking without full build
3. **Incremental Builds**: Dune and Vite both support incremental builds
4. **Parallel Builds**: Use `make -j8 all` for parallel building

## Build Artifacts

- OCaml: `_build/default/`
- JavaScript bindings: `src/lib_pyfinalo_js/dist/`
- Webapp: `webapp/app/dist/`
- REPL bundles: `webapp/repl-*/dist/`
- Worker: `webapp/worker/dist/`