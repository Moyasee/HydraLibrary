import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/HydraLibrary/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html')
      },
      output: {
        manualChunks: {
          firebase: ['firebase/app', 'firebase/database']
        }
      }
    }
  }
}); 