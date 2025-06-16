import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'editor': ['@uiw/solid-codemirror', '@codemirror/lang-python', '@codemirror/lang-javascript'],
          'themes': ['@uiw/codemirror-themes']
        }
      }
    }
  },
  server: {
    port: 3000
  }
});