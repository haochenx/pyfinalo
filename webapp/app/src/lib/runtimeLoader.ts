interface RuntimeModule {
  evaluate: (code: string) => string | Promise<string>;
  ready?: Promise<void>;
}

interface RuntimeLoader {
  loadJavaScript: () => Promise<RuntimeModule>;
  loadPython: () => Promise<RuntimeModule>;
}

// Cache loaded modules
let jsReplModule: RuntimeModule | null = null;
let pythonReplModule: RuntimeModule | null = null;

export const runtimeLoader: RuntimeLoader = {
  async loadJavaScript(): Promise<RuntimeModule> {
    if (jsReplModule) return jsReplModule;

    try {
      // Check if we're in mock mode (development)
      if ((window as any).mockJsRepl) {
        const repl = (window as any).mockJsRepl.createJavaScriptRepl();
        jsReplModule = {
          evaluate: (code: string) => repl.evaluate(code)
        };
        return jsReplModule;
      }

      // Production mode - load real bundles via script tags
      await loadScript('/repl-bundles/pyfinalo_js.js', 'pyfinalo_js');
      await loadScript('/repl-bundles/js-repl.js', 'PyfinaloJsRepl');
      
      // Access the loaded module from global scope
      const createJavaScriptRepl = (window as any).PyfinaloJsRepl?.createJavaScriptRepl;
      if (!createJavaScriptRepl) {
        throw new Error('JavaScript REPL module not found on window.PyfinaloJsRepl');
      }
      
      const repl = createJavaScriptRepl();
      jsReplModule = {
        evaluate: (code: string) => repl.evaluate(code)
      };
      
      return jsReplModule;
    } catch (error) {
      throw new Error(`Failed to load JavaScript runtime: ${error.message}`);
    }
  },

  async loadPython(): Promise<RuntimeModule> {
    if (pythonReplModule) return pythonReplModule;

    try {
      // Check if we're in mock mode (development)
      if ((window as any).mockPythonRepl) {
        const repl = await (window as any).mockPythonRepl.createPythonRepl();
        pythonReplModule = {
          evaluate: repl.evaluate,
          ready: repl.ready
        };
        return pythonReplModule;
      }

      // Production mode - load via script tag
      await loadScript('/repl-bundles/python-repl.js', 'PyfinaloJsRepl');
      
      // Access the loaded module from global scope
      const createPythonRepl = (window as any).PyfinaloJsRepl?.createPythonRepl;
      if (!createPythonRepl) {
        throw new Error('Python REPL module not found on window.PyfinaloJsRepl');
      }
      
      const repl = await createPythonRepl();
      if (repl.ready) {
        await repl.ready;
      }
      
      pythonReplModule = {
        evaluate: repl.evaluate,
        ready: repl.ready
      };
      
      return pythonReplModule;
    } catch (error) {
      throw new Error(`Failed to load Python runtime: ${error.message}`);
    }
  }
};

// Helper function to load scripts dynamically
function loadScript(src: string, globalName?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (globalName && (window as any)[globalName]) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.type = 'module';
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    
    document.head.appendChild(script);
  });
}