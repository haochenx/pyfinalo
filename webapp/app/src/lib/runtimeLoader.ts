interface RuntimeModule {
  evaluate: (code: string) => string | Promise<string>;
  ready?: Promise<void>;
}

interface RuntimeLoader {
  loadJavaScript: () => Promise<RuntimeModule>;
  loadPython: () => Promise<RuntimeModule>;
}

// Extend window interface for REPL modules
declare global {
  interface Window {
    createJavaScriptRepl?: () => { evaluate: (code: string) => string };
    createPythonRepl?: () => Promise<{ evaluate: (code: string) => Promise<string>; ready?: Promise<void> }>;
  }
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

      // Load via script tag
      await loadScript('/repl-bundles/js-repl-loader.js');

      // Wait for the module to be available on window
      let attempts = 0;
      while (!window.createJavaScriptRepl && attempts < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }

      if (!window.createJavaScriptRepl) {
        throw new Error('JavaScript REPL module not found on window.createJavaScriptRepl');
      }

      const repl = window.createJavaScriptRepl();
      jsReplModule = {
        evaluate: (code: string) => repl.evaluate(code)
      };

      return jsReplModule;
    } catch (error) {
      throw new Error(`Failed to load JavaScript runtime: ${error instanceof Error ? error.message : String(error)}`);
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

      // Load via script tag
      await loadScript('/repl-bundles/python-repl-loader.js');

      // Wait for the module to be available on window
      let attempts = 0;
      while (!window.createPythonRepl && attempts < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }

      if (!window.createPythonRepl) {
        throw new Error('Python REPL module not found on window.createPythonRepl');
      }

      const repl = await window.createPythonRepl();
      if (repl.ready) {
        await repl.ready;
      }

      pythonReplModule = {
        evaluate: repl.evaluate,
        ready: repl.ready
      };

      return pythonReplModule;
    } catch (error) {
      throw new Error(`Failed to load Python runtime: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
};

// Helper function to load scripts dynamically
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
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
