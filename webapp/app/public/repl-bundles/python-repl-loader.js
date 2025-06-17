// Loader for Python REPL module
console.log('[python-repl-loader] Loading Python REPL...');

// Ensure JS REPL is loaded first (for pyfinalo module)
async function loadJsReplFirst() {
  if (!window.pyfinalo) {
    console.log('[python-repl-loader] Loading JS REPL first...');
    // Load the JS REPL to get pyfinalo on window
    await import('./js-repl-loader.js');

    // Wait for createJavaScriptRepl to be available
    let attempts = 0;
    while (!window.createJavaScriptRepl && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
  }
}

// Load Python REPL
async function loadPythonRepl() {
  await loadJsReplFirst();

  console.log('[python-repl-loader] Loading python-repl.js...');
  const { createPythonRepl } = await import('./python-repl.js');

  // Wrap createPythonRepl to ensure dependencies are loaded
  async function createPythonReplWithDeps() {
    console.log('[python-repl-loader] Creating Python REPL...');
    return createPythonRepl();
  }

  // Make it available globally
  window.createPythonRepl = createPythonReplWithDeps;
  console.log('[python-repl-loader] createPythonRepl set on window');
}

// Execute the loader
loadPythonRepl().catch(e => console.error('[python-repl-loader] Failed to load:', e));
