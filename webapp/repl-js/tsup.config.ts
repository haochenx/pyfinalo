import { defineConfig } from 'tsup';
import { resolve } from 'path';

export default defineConfig({
  entry: {
    'js-repl': 'src/index.ts'
  },
  format: ['esm'],
  dts: false,
  clean: true,
  outDir: 'dist',
  platform: 'browser',
  target: 'es2020',
  splitting: false,
  treeshake: true,
  noExternal: ['pyfinalo_js'],
  esbuildOptions(options) {
    options.alias = {
      'pyfinalo_js': resolve(__dirname, '../../src/lib_pyfinalo_js')
    };
  }
});
