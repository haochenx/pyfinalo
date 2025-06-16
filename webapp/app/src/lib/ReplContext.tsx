import { createContext, createSignal, ParentComponent, Accessor, Setter } from 'solid-js';
import { loadPythonRepl, loadJavaScriptRepl } from './replLoaders';

export type Runtime = 'python' | 'javascript';
export type ReplStatus = 'idle' | 'loading' | 'ready' | 'error';

interface ReplContextValue {
  runtime: Accessor<Runtime>;
  setRuntime: Setter<Runtime>;
  replStatus: Accessor<ReplStatus>;
  runCode: () => Promise<void>;
}

export const ReplContext = createContext<ReplContextValue>();

export const ReplContextProvider: ParentComponent = (props) => {
  const [runtime, setRuntime] = createSignal<Runtime>('python');
  const [replStatus, setReplStatus] = createSignal<ReplStatus>('idle');
  
  let pythonRepl: any = null;
  let jsRepl: any = null;
  
  const loadRepl = async (newRuntime: Runtime) => {
    setReplStatus('loading');
    try {
      if (newRuntime === 'python' && !pythonRepl) {
        pythonRepl = await loadPythonRepl();
      } else if (newRuntime === 'javascript' && !jsRepl) {
        jsRepl = await loadJavaScriptRepl();
      }
      setReplStatus('ready');
    } catch (error) {
      console.error('Failed to load REPL:', error);
      setReplStatus('error');
    }
  };
  
  const runCode = async () => {
    const currentRuntime = runtime();
    
    // Ensure REPL is loaded
    if ((currentRuntime === 'python' && !pythonRepl) || 
        (currentRuntime === 'javascript' && !jsRepl)) {
      await loadRepl(currentRuntime);
    }
    
    // TODO: Actually run the code using the loaded REPL
    console.log('Running code in', currentRuntime, 'runtime');
  };
  
  const value: ReplContextValue = {
    runtime,
    setRuntime: (newRuntime) => {
      setRuntime(newRuntime);
      loadRepl(newRuntime);
    },
    replStatus,
    runCode
  };
  
  return (
    <ReplContext.Provider value={value}>
      {props.children}
    </ReplContext.Provider>
  );
};