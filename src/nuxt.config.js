const pkg = require('./package')

module.exports = {
  mode: 'universal',
  env: {
    baseUrl: process.env.BASE_URL,
    COLOMBO_BACKEND_URL: process.env.COLOMBO_URL,
    CMS_URL: process.env.CMS_URL,
    OPTIMIZA_URL: process.env.OPTIMIZA_URL
  },

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: `https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700`
      }
    ],
    script: [
      {
        src: 'https://unpkg.com/ionicons/dist/ionicons.js',
        body: true
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: '~/components/common/Loading.vue',

  /*
   ** Global CSS
   */
  css: ['~assets/css/main.scss'],

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/localStorage.js', ssr: false }],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/sentry',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-140933020-1'
      }
    ],
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            iso: 'en-US',
            file: 'en.js'
          },
          {
            code: 'es',
            iso: 'es-ES',
            file: 'es.js'
          }
        ],
        strategy: 'prefix_except_default',
        defaultLocale: 'es',
        lazy: true,
        langDir: 'lang/',
        noPrefixDefaultLocale: false,
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected'
        },
        vueI18n: {
          fallbackLocale: 'es'
        }
      }
    ]
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.output.publicPath = `${process.env.URL}_nuxt/`
    }
  },

  vue: {
    config: {
      ignoredElements: ['ion-icon']
    }
  }
}
