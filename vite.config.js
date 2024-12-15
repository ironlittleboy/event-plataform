import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [
    react(),  // Asegura que el plugin de React maneje archivos .jsx y .js
  ],
  server: {
    open: true, // Abre automáticamente el navegador cuando inicies el servidor
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Asegura que puedas usar rutas relativas más simples
    },
  },
});
