// src/index.ts
var pyodideReadyPromise = null;
async function loadPyodideInstance() {
  if (pyodideReadyPromise) return pyodideReadyPromise;
  if (!window.loadPyodide) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.0/full/pyodide.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Pyodide"));
      document.head.appendChild(script);
    });
  }
  if (!window.loadPyodide) {
    throw new Error("Pyodide failed to load");
  }
  pyodideReadyPromise = window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.0/full/"
  });
  const pyodide = await pyodideReadyPromise;
  await waitForPyfinaloJS();
  await pyodide.runPythonAsync(`
import js
import sys

class PyfinaloModule:
    """Python wrapper for pyfinalo JavaScript bindings"""

    def __init__(self):
        # Get the pyfinalo JS module from global scope
        self._pyfinalo = js.window.pyfinalo

    def str(self, value):
        """Create a string expression"""
        return self._pyfinalo.str(value)

    def int(self, value):
        """Create an integer expression"""
        return self._pyfinalo.int(value)

    def add(self, left, right):
        """Add two expressions"""
        return self._pyfinalo.add(left, right)

    def mul(self, left, right):
        """Multiply two expressions"""
        return self._pyfinalo.mul(left, right)

    def len(self, expr):
        """Get length of expression"""
        return self._pyfinalo.len(expr)

    def show(self, expr):
        """Show expression result"""
        return self._pyfinalo.show(expr)

# Create module instance and add convenience functions to global namespace
pyfinalo = PyfinaloModule()

print("pyfinalo module loaded successfully")
`);
  return pyodide;
}
async function waitForPyfinaloJS() {
  let attempts = 0;
  while (!window.pyfinalo && attempts < 50) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    attempts++;
  }
  if (!window.pyfinalo) {
    throw new Error("pyfinalo module not found on window. Make sure JavaScript REPL is loaded first.");
  }
}
async function createPythonRepl() {
  const pyodidePromise = loadPyodideInstance();
  return {
    ready: pyodidePromise.then(() => {
    }),
    async evaluate(code) {
      const pyodide = await pyodidePromise;
      try {
        await pyodide.runPythonAsync(`
import io
import sys
_stdout_backup = sys.stdout
sys.stdout = io.StringIO()

str = pyfinalo.str
int = pyfinalo.int
add = pyfinalo.add
mul = pyfinalo.mul
len = pyfinalo.len
show = pyfinalo.show

`);
        const result = await pyodide.runPythonAsync(code);
        const output = await pyodide.runPythonAsync(`
_output = sys.stdout.getvalue()
sys.stdout = _stdout_backup
_output
`);
        let finalOutput = output || "";
        if (result !== void 0 && result !== null) {
          if (finalOutput) finalOutput += "\\n";
          finalOutput += String(result);
        }
        return finalOutput || "No output";
      } catch (error) {
        return `Error: ${error}`;
      }
    }
  };
}

export { createPythonRepl };
