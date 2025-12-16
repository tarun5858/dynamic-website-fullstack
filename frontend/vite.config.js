import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [
    react(),
  ],
   css: {
    devSourcemap: false, // Explicitly disable source maps for CSS during dev
  },
  build: {
    sourcemap: false, // Ensure source maps are disabled for the build as well
  },

})

