var baseRoute = (env) => (env === 'GH_PAGES' ? '/nuxt-circle-ci/' : '/')

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'nuxt-circle-ci',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: baseRoute(process.env.DEPLOY_ENV) + 'favicon.ico',
      },
    ],
  },
  router: {
    base: baseRoute(process.env.DEPLOY_ENV),
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
    babel: {
      // envName: server, client, modern
      presets() {
        return [
          [
            '@nuxt/babel-preset-app',
            {
              corejs: { version: 3 },
            },
          ],
        ]
      },
    },
  },
}
