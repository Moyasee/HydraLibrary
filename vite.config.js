import { defineConfig } from 'vite';

export default defineConfig({
  base: '/HydraLibrary/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html'
      },
      output: {
        manualChunks: {
          firebase: ['firebase/app', 'firebase/database']
        }
      }
    }
  }
}); 