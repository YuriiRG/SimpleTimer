import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueI18n({
    include: "./src/locales/**"
  }),
  VitePWA({
    base: "/SimpleTimer/",
    manifestFilename: "manifest.json",
    manifest: {
      name: "Simple timer",
      short_name: "Timer",
      theme_color: "#6130E3",
      background_color: "#6130E3",
      display: "standalone",
      scope: "/SimpleTimer/",
      start_url: "/SimpleTimer/",
      icons: [
        {
          src: "/SimpleTimer/logo180x180.png",
          sizes: "180x180",
          type: "image/png"
        },
        {
          src: "/SimpleTimer/logo.svg",
          sizes: "any"
        }
      ]
    }
  })],
  base: "/SimpleTimer/"
})
