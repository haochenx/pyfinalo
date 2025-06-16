// Configuration for REPL bundles
const REPL_CDN_BASE = import.meta.env.PROD 
  ? 'https://pyfinalo-repl-assets.r2.cloudflarestorage.com'
  : '/repl-bundles';

export interface PythonRepl {
  evaluate: (code: string) => Promise<string>;
  ready: Promise<void>;
}

export interface JavaScriptRepl {
  evaluate: (code: string) => string;
}

let pythonReplPromise: Promise<PythonRepl> | null = null;
let jsReplPromise: Promise<JavaScriptRepl> | null = null;

export async function loadPythonRepl(): Promise<PythonRepl> {
  if (pythonReplPromise) return pythonReplPromise;
  
  pythonReplPromise = (async () => {
    // Dynamically import the Python REPL bundle
    const module = await import(
      /* @vite-ignore */
      `${REPL_CDN_BASE}/python-repl.js`
    );
    
    const repl = await module.createPythonRepl();
    await repl.ready;
    
    return repl;
  })();
  
  return pythonReplPromise;
}

export async function loadJavaScriptRepl(): Promise<JavaScriptRepl> {
  if (jsReplPromise) return jsReplPromise;
  
  jsReplPromise = (async () => {
    // Dynamically import the JavaScript REPL bundle
    const module = await import(
      /* @vite-ignore */
      `${REPL_CDN_BASE}/js-repl.js`
    );
    
    return module.createJavaScriptRepl();
  })();
  
  return jsReplPromise;
}