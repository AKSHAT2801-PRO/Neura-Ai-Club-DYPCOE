import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    allowedHosts: true,
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber'],
          'motion-vendor': ['framer-motion'],
          'router-vendor': ['react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 850,
  },
})
