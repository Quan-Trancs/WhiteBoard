import { resolve } from "path";
export default defineNuxtConfig({
  alias: {
    "@": resolve(__dirname, "/")
  },
  css: ["~/assets/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    // ...
    '@pinia/nuxt',
    'nuxt-icon',
  ],
  devtools: { enabled: true }
})