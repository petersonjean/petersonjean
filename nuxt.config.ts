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
  },
  // Runtime config
  runtimeConfig: {
    // Only public config needed for static generation
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://petersonjean.vercel.app',
      orcidId: process.env.ORCID_ID || ''
    }
    },
// Auto-import composables
  imports: {
    dirs: ['composables/**']
  },
  // Build hooks for data fetching
  hooks: {
    'build:before': async () => {
      // Fetch research data during build
      if (process.env.ORCID_ID) {
        await generateResearchData()
      }
    }
  },
  compatibilityDate: "2025-08-29",
})


// Build-time data fetching function
async function generateResearchData() {
  try {
    const { generateStaticData } = await import('./utils/scripts/fetch-research.js')
    await generateStaticData()
    console.log('✅ Research data generated successfully')
  } catch (error) {
    console.warn('⚠️ Failed to generate research data:', error.message)
    // Don't fail the build, use existing data
  }
}