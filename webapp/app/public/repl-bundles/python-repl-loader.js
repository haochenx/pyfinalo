// Loader for Python REPL module
import { createPythonRepl } from './python-repl.js';

// Ensure JS REPL is loaded first (for pyfinalo module)
async function loadJsReplFirst() {
  if (!window.pyfinalo) {
    // Load the JS REPL to get pyfinalo on window
    await import('./js-repl-loader.js');
  }
}

// Wrap createPythonRepl to ensure dependencies are loaded
async function createPythonReplWithDeps() {
  await loadJsReplFirst();
  return createPythonRepl();
}

// Make it available globally
window.createPythonRepl = createPythonReplWithDeps;