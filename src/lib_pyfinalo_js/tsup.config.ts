import { defineConfig } from 'tsup'

export default defineConfig({
  entry: { index: './wrapper.js' },
  outDir: 'dist',
  format: ['esm'],
  outExtension: () => ({ js: '.js' }),
  clean: false, // Don't clean, we need _raw.js from stage 1
  minify: false,
  bundle: true
})