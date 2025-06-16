import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'PyfianaloPythonRepl',
      fileName: 'python-repl',
      formats: ['es']
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: [],
      output: {
        // Ensure pyodide files are properly handled
        assetFileNames: '[name][extname]'
      }
    }
  }
});
