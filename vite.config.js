import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,      // Change port to 80
    host: true,     // Allow access via localhost and network IP
    allowedHosts: ['face-frontend-7hyl.onrender.com']
  }
})
