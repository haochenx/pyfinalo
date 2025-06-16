import { Component, useContext, createMemo } from 'solid-js';
import CodeMirror from '@uiw/solid-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@uiw/codemirror-themes';
import { ReplContext } from '../lib/ReplContext';
import './CodeEditor.css';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const CodeEditor: Component<CodeEditorProps> = (props) => {
  const { runtime } = useContext(ReplContext)!;
  
  const extensions = createMemo(() => {
    return runtime() === 'python' ? [python()] : [javascript()];
  });

  return (
    <div class="code-editor">
      <div class="editor-header">
        <span class="editor-title">Code Editor ({runtime()})</span>
      </div>
      <div class="editor-content">
        <CodeMirror
          value={props.value}
          onChange={props.onChange}
          theme={oneDark}
          extensions={extensions()}
          editable={!props.disabled}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            highlightSelectionMatches: true,
            searchKeymap: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;