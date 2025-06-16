# pyfinalo Web Application

A web-based REPL for pyfinalo that supports both Python (via Pyodide) and JavaScript execution of the tagless-final DSL.

## Architecture

The webapp consists of two main components:

1. **Main Application** - The UI and basic functionality
2. **REPL Bundles** - Separate bundles for Python and JavaScript runtimes

This separation allows us to:
- Keep the initial page load fast
- Lazy load the heavy runtime bundles only when needed
- Deploy runtime bundles to Cloudflare R2 for efficient CDN delivery

## Directory Structure

```
webapp/
├── app/                    # Main web application
│   ├── src/               # Source code
│   │   ├── components/    # UI components
│   │   ├── lib/          # Core libraries
│   │   └── App.tsx       # Main app entry
│   ├── public/           # Static assets
│   ├── index.html        # HTML entry point
│   ├── package.json      # Dependencies
│   └── vite.config.ts    # Vite configuration
├── repl-python/           # Python REPL bundle
│   ├── src/              # Pyodide integration
│   ├── package.json      # Dependencies
│   └── vite.config.ts    # Build configuration
├── repl-js/              # JavaScript REPL bundle
│   ├── src/              # JS runtime wrapper
│   ├── package.json      # Dependencies
│   └── vite.config.ts    # Build configuration
├── worker/               # Cloudflare Worker
│   ├── src/             # Worker code
│   ├── wrangler.toml    # Worker configuration
│   └── package.json     # Dependencies
├── scripts/             # Build and deployment scripts
├── package.json         # Workspace root
└── README.md           # This file
```

## Development

See the [BUILD.md](../BUILD.md) file for detailed build instructions.

### Quick Start

```bash
# Install dependencies
bun install

# Development mode
bun run dev

# Build all components
bun run build

# Deploy to Cloudflare
bun run deploy
```

## Deployment

The application is designed to be deployed on Cloudflare Workers with R2 storage:

- **Main App**: Served by Cloudflare Worker
- **REPL Bundles**: Stored in R2 bucket (`pyfinalo-repl-assets`)
- **Static Assets**: Cached at edge locations

See [scripts/r2-management.md](scripts/r2-management.md) for R2 bucket management instructions.