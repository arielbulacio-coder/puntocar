import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/puntocar/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Punto Car',
        short_name: 'PuntoCar',
        description: 'Compra y venta de autos usados premium',
        theme_color: '#000000',
        icons: [
          {
            src: 'logo.jpg',
            sizes: '192x192',
            type: 'image/jpg'
          },
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/jpg'
          }
        ]
      }
    })
  ],
})
