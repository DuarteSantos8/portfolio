import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    port: 3000,
    open: true,
    // Forward API calls to the Node proxy during `npm run dev` (vite + server).
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true, secure: false },
    },
  },
});

