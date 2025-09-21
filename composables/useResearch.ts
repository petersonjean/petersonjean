import type { ResearchProfile, Publication } from '~/utils/types/research'

export const useResearch = () => {
  const profile = ref<ResearchProfile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const loadStaticData = async () => {
    loading.value = true
    error.value = null
    
   
    
    try {
      // Load from static files generated at build time
      const [profileData, publicationsData] = await Promise.all([
        $fetch<ResearchProfile>('/data/profile.json').catch(() => null),
        $fetch<Publication[]>('/data/publications.json').catch(() => [])
      ])
       console.log("testing data", profileData, publicationsData);
      if (profileData) {
        profile.value = profileData
      } else if (publicationsData.length > 0) {
        // Fallback: create profile from publications data
        profile.value = {
          orcidId: useRuntimeConfig().public.orcidId as string,
          name: 'Research Profile',
          publications: publicationsData,
          lastUpdated: new Date().toISOString(),
          totalPublications: publicationsData.length
        }
      } else {
        // No data available
        profile.value = {
          orcidId: useRuntimeConfig().public.orcidId as string,
          name: 'Research Profile',
          publications: [],
          lastUpdated: new Date().toISOString(),
          totalPublications: 0
        }
      }
    } catch (err) {
      error.value = 'Failed to load research data'
      console.error('Failed to load static research data:', err)
    } finally {
      loading.value = false
    }
  }
  
  const publications = computed(() => profile.value?.publications || [])
  
  const publicationsByYear = computed(() => {
    const grouped = publications.value.reduce((acc, pub) => {
      const year = pub.year || 'Unknown'
      if (!acc[year]) acc[year] = []
      acc[year].push(pub)
      return acc
    }, {} as Record<string | number, Publication[]>)
    
    return Object.entries(grouped).sort(([a], [b]) => {
      if (a === 'Unknown') return 1
      if (b === 'Unknown') return -1
      return parseInt(b as string) - parseInt(a as string)
    })
  })
  
  const publicationsByType = computed(() => {
    return publications.value.reduce((acc, pub) => {
      if (!acc[pub.type]) acc[pub.type] = 0
      acc[pub.type]++
      return acc
    }, {} as Record<Publication['type'], number>)
  })
  
  const lastUpdated = computed(() => {
    return profile.value?.lastUpdated ? new Date(profile.value.lastUpdated) : null
  })
  
  return {
    profile: readonly(profile),
    publications: readonly(publications),
    publicationsByYear: readonly(publicationsByYear),
    publicationsByType: readonly(publicationsByType),
    lastUpdated: readonly(lastUpdated),
    loading: readonly(loading),
    error: readonly(error),
    loadStaticData
  }
}