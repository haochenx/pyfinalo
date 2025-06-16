import { Component, createSignal, Show } from 'solid-js';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';
import ReplLoader from './components/ReplLoader';
import { ReplContext, ReplContextProvider } from './lib/ReplContext';
import './App.css';

const App: Component = () => {
  const [code, setCode] = createSignal('# Welcome to pyfinalo REPL\n# Try: str("hello") + str(" world")');
  const [output, setOutput] = createSignal('');
  const [isRunning, setIsRunning] = createSignal(false);

  return (
    <ReplContextProvider>
      <div class="app">
        <Header />
        <ReplLoader />
        <div class="main-content">
          <div class="editor-panel">
            <CodeEditor
              value={code()}
              onChange={setCode}
              disabled={isRunning()}
            />
          </div>
          <div class="output-panel">
            <OutputPanel
              output={output()}
              isRunning={isRunning()}
            />
          </div>
        </div>
      </div>
    </ReplContextProvider>
  );
};

export default App;