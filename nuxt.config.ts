// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss','@nuxt/content'],
    app:{
        head:{
            meta:[
                {name:"author", content:"Peterson Jean"}
            ],
            link:[
               { rel:"preconnect", href:"https://rsms.me/"},  
                { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }
            ]
        }
    }
})
