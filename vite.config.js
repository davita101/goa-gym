import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // Default is 500, you can increase this to suppress the warning
  },
})
