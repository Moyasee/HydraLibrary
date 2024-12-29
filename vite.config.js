import { defineConfig } from 'vite';

export default defineConfig({
  base: '/HydraLibrary/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          firebase: ['firebase/app', 'firebase/database']
        }
      }
    }
  }
}); 