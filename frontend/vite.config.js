import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://ecommerceapp-pon9.onrender.com',
        secure: false,
      },
    },
  },
  plugins: [react()],
});
