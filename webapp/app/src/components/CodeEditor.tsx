import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'
import './CodeEditor.css'

if (window != null) {
  (window as any).CodeMirror = CodeMirror;
}

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: 'python' | 'javascript'
  disabled?: boolean
}

function CodeEditor({ value, onChange, language, disabled }: CodeEditorProps) {
  const extensions = language === 'python' ? [python()] : [javascript()]

  return (
    <div className="code-editor">
      <div className="editor-header">
        <span className="editor-title">Code Editor ({language})</span>
      </div>
      <CodeMirror
        value={value}
        onChange={onChange}
        extensions={extensions}
        editable={!disabled}
        theme="dark"
        className="code-mirror-flex"
      />
    </div>
  )
}

export default CodeEditor
