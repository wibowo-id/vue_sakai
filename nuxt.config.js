// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: true,
    ssr: false,
    devtools: { enabled: true },
    app: {
        head: {
            title: 'Sakai Vue',
            link: [
                {
                    id: 'theme-css',
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: '/themes/aura-light-green/theme.css'
                }
            ]
        }
    },
    modules: [
        'nuxt-primevue',
        '@element-plus/nuxt',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt'
    ],
    // plugins: [
    //     { src: '~/plugins/confirm/index.ts', ssr: false }
    // ],
    primevue: {
        options: { ripple: true },
        components: {
            exclude: ['Editor']
        }
    },
    pinia: {
        autoImports: ['defineStore', 'definePiniaStore', 'acceptHMRUpdate'],
    },
    components: [
        '~/components'
    ],
    script: [
        {
            strategy: 'lazyOnload',
            src: 'https://www.googletagmanager.com/gtag/js?id=UA-93461466-1'
        },
        {
            id: 'ga-analytics',
            strategy: 'lazyOnload',
            children: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-93461466-1');
            `
        }
    ],
    css: ['primeicons/primeicons.css', 'primeflex/primeflex.scss', 'primevue/resources/primevue.min.css', '@/assets/styles.scss'],
    runtimeConfig: {
        apiSecret: '',
        public: {
          apiBase: 'http://localhost:3000/api'
        }
    },
    alias: {
        pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
    }
});
