import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'python-repl': 'src/index.ts'
  },
  format: ['esm'],
  dts: false,
  clean: true,
  outDir: 'dist',
  platform: 'browser',
  target: 'es2020',
  splitting: false,
  treeshake: true,
});
