import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // listen on all interfaces so ngrok can reach it
    host: true,
    port: 5173, // or whatever you use

    // allow your ngrok hostname(s)
    allowedHosts: [
      "dynastical-bosseyed-nathaly.ngrok-free.dev", // <-- your current URL
      // optional wildcards (regex) if your URL changes often:
    ],

    // make HMR work through the tunnel (replace with your domain)
    hmr: {
      host: "dynastical-bosseyed-nathaly.ngrok-free.dev",
      clientPort: 443,
      protocol: "wss",
    },
  }
})
