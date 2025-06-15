import { defineConfig } from 'tsup'

export default defineConfig({
  entry: { '_raw': '../../_build/default/src/lib_pyfinalo_js/lib_pyfinalo_js.bc.js' },
  outDir: 'dist',
  format: ['esm'],
  outExtension: () => ({ js: '.js' }),
  clean: true,
  minify: false,
  bundle: true
})