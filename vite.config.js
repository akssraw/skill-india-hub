import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Vite 8 / Rolldown: manualChunks must be a function
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'react';
          if (id.includes('node_modules/react-router')) return 'router';
          if (id.includes('node_modules/gsap'))         return 'gsap';
          if (id.includes('node_modules/lenis'))        return 'lenis';
          if (id.includes('node_modules/lucide-react')) return 'lucide';
        },
      },
    },
    // Target modern browsers for smaller bundle
    target: 'es2020',
  },
  server: {
    port: 5173,
    open: true,
  },
})
