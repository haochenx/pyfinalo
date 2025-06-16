#!/bin/bash

# Upload REPL bundles to Cloudflare R2
# This script uploads the built REPL bundles to the R2 bucket

set -e

BUCKET_NAME="pyfinalo-repl-assets"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBAPP_DIR="$(dirname "$SCRIPT_DIR")"

echo "🚀 Uploading REPL bundles to R2 bucket: $BUCKET_NAME"

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Error: wrangler CLI is not installed"
    echo "Install it with: npm install -g wrangler"
    exit 1
fi

# Check if bundles are built
if [ ! -f "$WEBAPP_DIR/repl-python/dist/python-repl.js" ]; then
    echo "❌ Error: Python REPL bundle not found"
    echo "Run 'bun run build:repl-python' first"
    exit 1
fi

if [ ! -f "$WEBAPP_DIR/repl-js/dist/js-repl.js" ]; then
    echo "❌ Error: JavaScript REPL bundle not found"
    echo "Run 'bun run build:repl-js' first"
    exit 1
fi

# Upload Python REPL bundle
echo "📦 Uploading Python REPL bundle..."
wrangler r2 object put "${BUCKET_NAME}/python-repl.js" \
    --file "$WEBAPP_DIR/repl-python/dist/python-repl.js" \
    --content-type "application/javascript"

# Upload JavaScript REPL bundle
echo "📦 Uploading JavaScript REPL bundle..."
wrangler r2 object put "${BUCKET_NAME}/js-repl.js" \
    --file "$WEBAPP_DIR/repl-js/dist/js-repl.js" \
    --content-type "application/javascript"

# Upload pyfinalo JS library (needed by Python REPL)
if [ -f "$WEBAPP_DIR/../src/lib_pyfinalo_js/dist/index.js" ]; then
    echo "📦 Uploading pyfinalo JS library..."
    wrangler r2 object put "${BUCKET_NAME}/pyfinalo_js.js" \
        --file "$WEBAPP_DIR/../src/lib_pyfinalo_js/dist/index.js" \
        --content-type "application/javascript"
else
    echo "⚠️  Warning: pyfinalo JS library not found"
    echo "Build it with 'cd src/lib_pyfinalo_js && bun run build'"
fi

# List uploaded files
echo -e "\n📋 Uploaded files:"
wrangler r2 object list "$BUCKET_NAME"

echo -e "\n✅ Upload complete!"