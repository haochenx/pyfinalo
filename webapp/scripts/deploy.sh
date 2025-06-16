#!/bin/bash

# Deploy the pyfinalo webapp to Cloudflare Workers
# This script builds all components and deploys them

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBAPP_DIR="$(dirname "$SCRIPT_DIR")"
ROOT_DIR="$(dirname "$WEBAPP_DIR")"

echo "🚀 Deploying pyfinalo webapp"

# Check dependencies
echo "📋 Checking dependencies..."
for cmd in bun wrangler; do
    if ! command -v $cmd &> /dev/null; then
        echo "❌ Error: $cmd is not installed"
        exit 1
    fi
done

cd "$WEBAPP_DIR"

# Install dependencies
echo "📦 Installing dependencies..."
bun install

# Build pyfinalo JS library if needed
if [ ! -f "$ROOT_DIR/src/lib_pyfinalo_js/dist/index.js" ]; then
    echo "🔨 Building pyfinalo JS library..."
    cd "$ROOT_DIR/src/lib_pyfinalo_js"
    bun install
    bun run build
    cd "$WEBAPP_DIR"
fi

# Build all components
echo "🔨 Building all components..."
bun run build

# Upload REPL bundles to R2
echo "☁️  Uploading REPL bundles to R2..."
bash "$SCRIPT_DIR/upload-r2-assets.sh"

# Deploy worker
echo "🌐 Deploying Cloudflare Worker..."
cd "$WEBAPP_DIR/worker"
bun run deploy

echo -e "\n✅ Deployment complete!"
echo "Your app should be available at your Cloudflare Workers domain"