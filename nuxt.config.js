
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: { //this property can also be used in any of the page components
    //title: process.env.npm_package_name || '',
    title: 'WD blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Open+Sans&display=swap"}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fa923f', height: '4px', duration: 5000 }, //loading bar //duration is in milli-secend
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [ /* these plugins runs before vue root instance is mounted , meanly, before everything mounts*/
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [ //this is for adding third-party 'libraries' or 'plugins'
      // Doc: https://axios.nuxtjs.org/usage
      "@nuxtjs/axios", //example usage in pages/admin/_postId/index.js
    ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  env: {//setting up env variables //we can access to this from process.env.baseUrl for example
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-368f7.firebaseio.com',
    firebaseAPIKey: 'AIzaSyB90iycNNCMcLaH3ygId_uaHOEkyJciAHU'
  },
  // router: {
  //   middleware: 'log' //for middleware to run in every route
  // }
}
