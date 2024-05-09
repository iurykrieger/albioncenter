// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "shadcn-nuxt"
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  colorMode: {
    classSuffix: ''
  },
  image: {
    providers: {
      items: {
        name: 'items',
        provider: '~/providers/albion.ts',
        options: {
          baseURL: "https://render.albiononline.com/v1/item/"
        }
      },
      spells: {
        name: 'spells',
        provider: '~/providers/albion.ts',
        options: {
          baseURL: "https://render.albiononline.com/v1/spell/"
        }
      }
    }
  },
  i18n: {
    locales: ['pt-br', 'en-us'],
    defaultLocale: 'pt-br'
  }
})