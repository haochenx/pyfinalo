import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow serving files from outside the project root
      allow: [
        join(__dirname, '../..'),  // Allow access to webapp parent
        join(__dirname, '../../../src')  // Allow access to src directory
      ]
    }
  },
  // Serve REPL bundles as static files in development
  publicDir: 'public',
  build: {
    rollupOptions: {
      // Ensure these are treated as external in production
      external: ['/repl-bundles/js-repl.js', '/repl-bundles/python-repl.js', '/repl-bundles/pyfinalo_js.js']
    }
  },
  optimizeDeps: {
    // Exclude the REPL bundles from dependency optimization
    exclude: ['pyfinalo_js']
  }
})
