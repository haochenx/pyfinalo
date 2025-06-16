import { useState } from 'react'
import CodeEditor from './components/CodeEditor'
import './App.css'

type Runtime = 'python' | 'javascript'

function App() {
  const [runtime, setRuntime] = useState<Runtime>('python')
  const [code, setCode] = useState(`# Welcome to pyfinalo REPL
# Try: str("hello") + str(" world")`)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    setIsRunning(true)
    setOutput('Running...')
    
    // TODO: Implement actual code execution
    setTimeout(() => {
      setOutput('Output will appear here when you run your code')
      setIsRunning(false)
    }, 1000)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>pyfinalo REPL</h1>
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
          disabled={isRunning}
        >
          Run Code
        </button>
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