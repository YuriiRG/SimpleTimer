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
    manifestFilename: undefined,
    injectRegister: "inline",
    registerType: "autoUpdate",
    manifest: false
  })],
  base: "/SimpleTimer/"
})
