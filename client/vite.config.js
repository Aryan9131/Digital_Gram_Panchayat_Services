import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/verifyToken': {
        target: 'https://digital-gram-panchayat-services-backend.onrender.com',
        changeOrigin: true, // Ensures the CORS headers are handled correctly
        rewrite: (path) => path.replace(/^\/verifyToken/, ''), // Removes '/verifyToken' prefix from the path
      },
      '/create-checkout-session': {
        target: 'https://digital-gram-panchayat-services-backend.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/create-checkout-session/, ''), // Removes '/create-checkout-session' prefix
      },
    },
  },
});
