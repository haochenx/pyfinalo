import { useState, useEffect, useRef } from 'react'
import CodeEditor from './components/CodeEditor'
import { runtimeLoader } from './lib/runtimeLoader'
import './App.css'

type Runtime = 'python' | 'javascript'

function App() {
  const [runtime, setRuntime] = useState<Runtime>('python')
  const [code, setCode] = useState(`# Welcome to pyfinalo REPL
# Try: str("hello") + str(" world")`)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [isLoadingRuntime, setIsLoadingRuntime] = useState(false)
  const loadedRuntimes = useRef<Set<Runtime>>(new Set())

  const handleRun = async () => {
    setIsRunning(true)
    setOutput('Running...')

    try {
      // Load runtime if not already loaded
      if (!loadedRuntimes.current.has(runtime)) {
        setIsLoadingRuntime(true)
        setOutput('Loading runtime...')
      }

      const runtimeModule = runtime === 'javascript'
        ? await runtimeLoader.loadJavaScript()
        : await runtimeLoader.loadPython()

      loadedRuntimes.current.add(runtime)
      setIsLoadingRuntime(false)

      // Execute the code
      const result = await runtimeModule.evaluate(code)
      setOutput(result)
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsRunning(false)
      setIsLoadingRuntime(false)
    }
  }

  // Update default code when runtime changes
  useEffect(() => {
    if (runtime === 'python') {
      setCode(`# Welcome to pyfinalo_py REPL
# Try: print(show(add(len(str("hello")), int(3))))\n`)
    } else {
      setCode(`// Welcome to pyfinalo_js REPL
// Try: add(len(str("hello")), int(3))\n`)
    }
  }, [runtime])

  return (
    <div className="app">
      <header className="app-header">
        <h1>pyfinalo REPL</h1>
        <div className="header-controls">
          <div className="runtime-selector">
            <label>Runtime:</label>
            <select value={runtime} onChange={(e) => setRuntime(e.target.value as Runtime)}>
              <option value="python">Python (Pyodide)</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>
          <button
            className="run-button"
            onClick={handleRun}
            disabled={isRunning || isLoadingRuntime}
          >
            {isLoadingRuntime ? 'Loading Runtime...' : isRunning ? 'Running...' : 'Run Code'}
          </button>
          <a 
            href="https://github.com/haochenx/pyfinalo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
          >
            GitHub
          </a>
        </div>
      </header>

      <main className="app-main">
        <div className="editor-section">
          <CodeEditor
            value={code}
            onChange={setCode}
            language={runtime}
            disabled={isRunning}
          />
        </div>

        <div className="output-section">
          <h3>Output</h3>
          <pre className="output">{output}</pre>
        </div>
      </main>
    </div>
  )
}

export default App
