import { defineConfig } from 'vite';

export default defineConfig({
  base: '/HydraLibrary/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html'
      },
      output: {
        manualChunks(id) {
          if (id.includes('firebase')) {
            return 'firebase-core';
          }
        }
      }
    }
  },
  css: {
    postcss: './postcss.config.cjs',
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/style.css";`
      }
    }
  }
}); 