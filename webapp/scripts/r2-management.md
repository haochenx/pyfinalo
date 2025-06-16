# R2 Bucket Management Guide

This guide explains how to manage the Cloudflare R2 bucket for storing REPL bundles.

## Overview

The pyfinalo webapp uses Cloudflare R2 to store and serve REPL bundles (Python and JavaScript runtimes). This allows us to:
- Keep the main application bundle small
- Lazy load runtimes only when needed
- Leverage Cloudflare's global CDN for fast delivery
- Update REPL bundles independently of the main app

## Bucket Configuration

**Bucket Name**: `pyfinalo-repl-assets`

### Creating the Bucket

1. Log in to your Cloudflare dashboard
2. Navigate to R2 in the sidebar
3. Click "Create bucket"
4. Name it `pyfinalo-repl-assets`
5. Choose your preferred location (or leave as automatic)

### Setting up CORS

The bucket needs CORS configuration to allow browser access:

```json
{
  "CorsRules": [
    {
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 86400
    }
  ]
}
```

## Scripts

### upload-r2-assets.sh

This script uploads the built REPL bundles to R2:

```bash
#!/bin/bash
# See webapp/scripts/upload-r2-assets.sh
```

Usage:
```bash
bun run upload-assets
```

### download-r2-assets.sh

This script downloads REPL bundles from R2 (useful for local development):

```bash
#!/bin/bash
# See webapp/scripts/download-r2-assets.sh
```

Usage:
```bash
./scripts/download-r2-assets.sh
```

## Manual Management

### Using Wrangler CLI

```bash
# List objects in bucket
wrangler r2 object list pyfinalo-repl-assets

# Upload a file
wrangler r2 object put pyfinalo-repl-assets/python-repl.js --file ./repl-python/dist/python-repl.js

# Download a file
wrangler r2 object get pyfinalo-repl-assets/python-repl.js --file ./local-python-repl.js

# Delete a file
wrangler r2 object delete pyfinalo-repl-assets/old-bundle.js
```

### Using rclone

For more advanced management, you can use rclone:

1. Install rclone: https://rclone.org/install/
2. Configure rclone for R2:
   ```bash
   rclone config
   # Choose "s3" provider
   # Use your R2 credentials
   ```
3. Use rclone commands:
   ```bash
   # Sync local dist to R2
   rclone sync ./repl-bundles-dist r2:pyfinalo-repl-assets
   
   # List files
   rclone ls r2:pyfinalo-repl-assets
   ```

## Best Practices

1. **Versioning**: Consider adding version numbers to bundle filenames (e.g., `python-repl-v1.0.0.js`)
2. **Compression**: Enable gzip/brotli compression for better performance
3. **Caching**: Set appropriate cache headers (already configured in the worker)
4. **Monitoring**: Monitor R2 usage and costs in the Cloudflare dashboard
5. **Backup**: Keep local copies of all uploaded bundles

## Troubleshooting

### CORS Issues
If you see CORS errors in the browser:
1. Verify CORS rules are applied to the bucket
2. Check that the worker is adding CORS headers
3. Clear browser cache

### 404 Errors
If bundles are not found:
1. Verify files exist in R2 using `wrangler r2 object list`
2. Check file paths match exactly (case-sensitive)
3. Ensure worker has R2 binding configured

### Slow Loading
If bundles load slowly:
1. Check your Cloudflare plan includes R2 access
2. Verify files are being cached properly
3. Consider using a custom domain with Cloudflare CDN