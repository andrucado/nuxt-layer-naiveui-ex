// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@bg-dev/nuxt-naiveui', '@vueuse/nuxt', '@unocss/nuxt'],
  compatibilityDate: '2025-07-01',
  unocss: { nuxtLayers: true },
})
