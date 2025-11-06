import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  // Base should match the GitHub Pages repository path so assets are resolved correctly when
  // the app is served from https://<user>.github.io/ProCV-Builder/
  base: '/ProCV-Builder/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
})