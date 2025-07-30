// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@unocss/nuxt'],
  compatibilityDate: '2025-07-30',
  unocss: { nuxtLayers: true },
})
