import { Component, Show } from 'solid-js';
import './OutputPanel.css';

interface OutputPanelProps {
  output: string;
  isRunning: boolean;
}

const OutputPanel: Component<OutputPanelProps> = (props) => {
  return (
    <div class="output-panel-container">
      <div class="output-header">
        <span class="output-title">Output</span>
        <Show when={props.isRunning}>
          <span class="output-status">Running...</span>
        </Show>
      </div>
      <div class="output-content">
        <Show when={!props.output && !props.isRunning}>
          <div class="output-placeholder">
            Output will appear here when you run your code
          </div>
        </Show>
        <Show when={props.output}>
          <pre class="output-text">{props.output}</pre>
        </Show>
      </div>
    </div>
  );
};

export default OutputPanel;