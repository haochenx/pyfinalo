import { Component, useContext } from 'solid-js';
import { ReplContext } from '../lib/ReplContext';
import './Header.css';

const Header: Component = () => {
  const { runtime, setRuntime, runCode } = useContext(ReplContext)!;

  return (
    <header class="header">
      <div class="header-content">
        <h1 class="header-title">pyfinalo REPL</h1>
        <div class="header-controls">
          <div class="runtime-selector">
            <label for="runtime-select">Runtime:</label>
            <select
              id="runtime-select"
              value={runtime()}
              onChange={(e) => setRuntime(e.currentTarget.value as 'python' | 'javascript')}
            >
              <option value="python">Python (Pyodide)</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>
          <button onClick={runCode} class="run-button">
            Run Code
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;