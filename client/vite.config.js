import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/verifyToken': {
        target: 'https://organic-space-parakeet-46p9wpp4wj6hj756-8000.app.github.dev',
        changeOrigin: true, // Ensures the CORS headers are handled correctly
        rewrite: (path) => path.replace(/^\/verifyToken/, ''),
      }
    }
  }
});
