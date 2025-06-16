import { loadPyodide, PyodideInterface } from 'pyodide';

export interface PythonRepl {
  evaluate: (code: string) => Promise<string>;
  ready: Promise<void>;
}

let pyodideReadyPromise: Promise<PyodideInterface> | null = null;

async function loadPyodideInstance(): Promise<PyodideInterface> {
  if (pyodideReadyPromise) return pyodideReadyPromise;

  pyodideReadyPromise = loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.0/full/',
  });

  const pyodide = await pyodideReadyPromise;

  // Wait for pyfinalo JS module to be available
  await waitForPyfinaloJS();

  // Set up the Python environment with pyfinalo bindings
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

async function waitForPyfinaloJS(): Promise<void> {
  // The pyfinalo module should be loaded by the JS REPL first
  // Wait for it to be available
  let attempts = 0;
  while (!(window as any).pyfinalo && attempts < 50) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }

  if (!(window as any).pyfinalo) {
    throw new Error('pyfinalo module not found on window. Make sure JavaScript REPL is loaded first.');
  }
}

export async function createPythonRepl(): Promise<PythonRepl> {
  const pyodidePromise = loadPyodideInstance();

  return {
    ready: pyodidePromise.then(() => {}),

    async evaluate(code: string): Promise<string> {
      const pyodide = await pyodidePromise;

      try {
        // Capture stdout
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

        // Run the user code
        const result = await pyodide.runPythonAsync(code);

        // Get captured output
        const output = await pyodide.runPythonAsync(`
_output = sys.stdout.getvalue()
sys.stdout = _stdout_backup
_output
`);

        // Combine output and result
        let finalOutput = output || '';
        if (result !== undefined && result !== null) {
          if (finalOutput) finalOutput += '\\n';
          finalOutput += String(result);
        }

        return finalOutput || 'No output';

      } catch (error) {
        return `Error: ${error}`;
      }
    }
  };
}
