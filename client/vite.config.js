import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/puntocar/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Punto Car',
        short_name: 'PuntoCar',
        description: 'Compra y venta de autos usados premium',
        theme_color: '#0B0E14',
        background_color: '#0B0E14',
        icons: [
          {
            src: 'pwa-logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-logo.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
