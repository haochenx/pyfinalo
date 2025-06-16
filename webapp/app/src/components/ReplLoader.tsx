import { Component, Show, useContext } from 'solid-js';
import { ReplContext } from '../lib/ReplContext';
import './ReplLoader.css';

const ReplLoader: Component = () => {
  const { replStatus } = useContext(ReplContext)!;
  
  return (
    <Show when={replStatus() !== 'ready'}>
      <div class="repl-loader">
        <div class="loader-content">
          <Show when={replStatus() === 'loading'}>
            <div class="loader-spinner"></div>
            <p class="loader-text">Loading REPL runtime...</p>
          </Show>
          <Show when={replStatus() === 'error'}>
            <p class="loader-error">Failed to load REPL runtime</p>
          </Show>
        </div>
      </div>
    </Show>
  );
};

export default ReplLoader;