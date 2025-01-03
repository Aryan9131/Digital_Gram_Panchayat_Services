import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/verifyToken': {
        target: 'http://localhost:8000',
        changeOrigin: true, // Ensures the CORS headers are handled correctly
        rewrite: (path) => path.replace(/^\/verifyToken/, ''),
      }
    }
  }
});
