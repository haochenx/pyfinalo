# Webapp Deployment

The pyfinalo webapp is automatically deployed to Cloudflare Pages.

## Automatic Deployments

- **Production**: Pushes to `main` branch deploy to https://pyfinalo-webapp.pages.dev
- **Preview**: Pull requests create preview deployments at unique URLs

## Setup Requirements

The following GitHub secrets must be configured:

1. `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
2. `CLOUDFLARE_API_TOKEN`: API token with Cloudflare Pages edit permissions

### Creating the API Token

Consult https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/

## Deployment Process

1. Code is built using `make build-webapp`
2. For production deployments, tests run with `make test-webapp`
3. Built assets from `webapp/app/dist` are deployed to Cloudflare Pages

## Manual Deployment

From the webapp directory:

```bash
# Deploy to preview
bun run --cwd app deploy

# Deploy to production
bun run --cwd app deploy-live
```

## Project Configuration

- Project name: `pyfinalo-webapp`
- Build output: `webapp/app/dist`
- Framework: React + Vite
