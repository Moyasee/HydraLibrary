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
    },
    define: {
      'process.env.FIREBASE_API_KEY': JSON.stringify(''),
      'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(''),
      'process.env.FIREBASE_DATABASE_URL': JSON.stringify(''),
      'process.env.FIREBASE_PROJECT_ID': JSON.stringify(''),
      'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(''),
      'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(''),
      'process.env.FIREBASE_APP_ID': JSON.stringify('')
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