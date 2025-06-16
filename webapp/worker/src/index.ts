import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export interface Env {
  REPL_ASSETS: R2Bucket;
  ENVIRONMENT: string;
  __STATIC_CONTENT: any;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle REPL bundle requests
    if (url.pathname.startsWith('/repl-bundles/')) {
      return handleReplBundleRequest(request, env);
    }
    
    // Handle API requests (if any)
    if (url.pathname.startsWith('/api/')) {
      return handleApiRequest(request, env);
    }
    
    // Serve static assets
    try {
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: JSON.parse(__STATIC_CONTENT_MANIFEST),
        }
      );
    } catch (e) {
      // If asset not found, return index.html for client-side routing
      const pathname = url.pathname.replace(/\/$/, '');
      if (!pathname.includes('.')) {
        request = new Request(url.origin + '/index.html', request);
        return await getAssetFromKV(
          {
            request,
            waitUntil: ctx.waitUntil.bind(ctx),
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: JSON.parse(__STATIC_CONTENT_MANIFEST),
          }
        );
      }
      
      return new Response('Not Found', { status: 404 });
    }
  },
};

async function handleReplBundleRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const objectKey = url.pathname.substring('/repl-bundles/'.length);
  
  try {
    const object = await env.REPL_ASSETS.get(objectKey);
    
    if (!object) {
      return new Response('Not Found', { status: 404 });
    }
    
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
    
    // Add CORS headers for REPL bundles
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    
    return new Response(object.body, { headers });
  } catch (error) {
    console.error('Error fetching from R2:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

async function handleApiRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  
  // Add API endpoints here if needed
  if (url.pathname === '/api/health') {
    return new Response(JSON.stringify({ status: 'ok', environment: env.ENVIRONMENT }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  return new Response('Not Found', { status: 404 });
}

// Required for module workers
declare const __STATIC_CONTENT_MANIFEST: string;