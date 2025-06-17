// Loader for JavaScript REPL module
console.log('[js-repl-loader] Loading JavaScript REPL...');

// First, ensure pyfinalo_js is loaded
async function loadDependencies() {
  if (!window.pyfinalo) {
    console.log('[js-repl-loader] Loading pyfinalo_js.js...');
    try {
      const pyfinaloModule = await import('./pyfinalo_js.js');
      window.pyfinalo = pyfinaloModule.default || pyfinaloModule.pyfinalo || pyfinaloModule;
      console.log('[js-repl-loader] pyfinalo loaded:', typeof window.pyfinalo);
    } catch (e) {
      console.error('[js-repl-loader] Failed to load pyfinalo:', e);
    }
  }
}

// Load the JavaScript REPL module
async function loadJsRepl() {
  await loadDependencies();

  console.log('[js-repl-loader] Loading js-repl.js...');
  const { createJavaScriptRepl: originalCreateJavaScriptRepl } = await import('./js-repl.js');

  // Create a wrapper that properly handles return values
  function createJavaScriptRepl() {
    const originalRepl = originalCreateJavaScriptRepl();

    return {
      evaluate(code) {
        // Remove single-line comments for analysis
        const codeWithoutComments = code
          .split('\n')
          .map(line => {
            const commentIndex = line.indexOf('//');
            return commentIndex >= 0 ? line.substring(0, commentIndex) : line;
          })
          .join('\n')
          .trim();

        // Check if it's a simple expression (no explicit return, no semicolons, no braces)
        const isSimpleExpression = codeWithoutComments.length > 0 &&
          !codeWithoutComments.includes('return') &&
          !codeWithoutComments.includes(';') &&
          !codeWithoutComments.includes('{') &&
          !codeWithoutComments.includes('}');

        if (isSimpleExpression) {
          // Wrap in return statement to capture the value
          if (code.includes("show(")) {
            return originalRepl.evaluate(`return (\n${code}\n)`);
          } else {
            return originalRepl.evaluate(`return show(\n${code}\n)`);
          }
        } else {
          // For complex code, let it handle its own returns
          return originalRepl.evaluate(code);
        }
      }
    };
  }

  // Make it available globally
  window.createJavaScriptRepl = createJavaScriptRepl;
  console.log('[js-repl-loader] createJavaScriptRepl set on window');
}

// Execute the loader
loadJsRepl().catch(e => console.error('[js-repl-loader] Failed to load:', e));
