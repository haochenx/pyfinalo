#!/bin/bash

# Download REPL bundles from Cloudflare R2 for local development
# This script downloads the REPL bundles from R2 to use locally

set -e

BUCKET_NAME="pyfinalo-repl-assets"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBAPP_DIR="$(dirname "$SCRIPT_DIR")"
LOCAL_DIR="$WEBAPP_DIR/app/public/repl-bundles"

echo "📥 Downloading REPL bundles from R2 bucket: $BUCKET_NAME"

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Error: wrangler CLI is not installed"
    echo "Install it with: npm install -g wrangler"
    exit 1
fi

# Create local directory
mkdir -p "$LOCAL_DIR"

# Download Python REPL bundle
echo "📦 Downloading Python REPL bundle..."
wrangler r2 object get "${BUCKET_NAME}/python-repl.js" \
    --file "$LOCAL_DIR/python-repl.js"

# Download JavaScript REPL bundle
echo "📦 Downloading JavaScript REPL bundle..."
wrangler r2 object get "${BUCKET_NAME}/js-repl.js" \
    --file "$LOCAL_DIR/js-repl.js"

# Download pyfinalo JS library
echo "📦 Downloading pyfinalo JS library..."
wrangler r2 object get "${BUCKET_NAME}/pyfinalo_js.js" \
    --file "$LOCAL_DIR/pyfinalo_js.js" || echo "⚠️  pyfinalo JS library not found in R2"

echo -e "\n📋 Downloaded files:"
ls -la "$LOCAL_DIR"

echo -e "\n✅ Download complete!"
echo "Files are available at: $LOCAL_DIR"