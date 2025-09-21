import { log } from 'console'
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const STATIC_DIR = join(__dirname, '../../public/data')

class ORCIDService {
  constructor() {
    this.baseUrl = 'https://pub.orcid.org/v3.0'
  }

  async fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Research-Site/1.0'
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        return await response.json()
      } catch (error) {
        if (i === retries - 1) throw error
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
      }
    }
  }

  async fetchProfile(orcidId) {
    return await this.fetchWithRetry(`${this.baseUrl}/${orcidId}/record`)
  }

  async fetchWorks(orcidId) {
    const worksResponse = await this.fetchWithRetry(`${this.baseUrl}/${orcidId}/works`)
    const workGroups = worksResponse.group || []
    
    const works = []
    
    // Process in batches to avoid rate limits
    for (let i = 0; i < workGroups.length; i += 5) {
      const batch = workGroups.slice(i, i + 5)
      
      const batchPromises = batch.map(async (group) => {
        try {
          const workSummary = group['work-summary'][0]
          const putCode = workSummary['put-code']
          return await this.fetchWithRetry(`${this.baseUrl}/${orcidId}/work/${putCode}`)
        } catch (error) {
          console.warn(`Failed to fetch work: ${error.message}`)
          return null
        }
      })
      
      const batchResults = await Promise.all(batchPromises)
      works.push(...batchResults.filter(Boolean))
      
      // Rate limiting delay
      if (i + 5 < workGroups.length) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
    
    return works
  }
}

function normalizeORCIDWork(work) {
    // console.log("work:", work['contributors']); //testing object
    
  const title = work['title']?.title?.value || 'Untitled'
  const journal = work['journal-title']?.value
  const year = work['publication-date']?.year?.value ? 
    parseInt(work['publication-date'].year.value) : undefined

  // Extract DOI
  const externalIds = work['external-ids']?.['external-id'] || []
  const doiEntry = externalIds.find(id => id['external-id-type'] === 'doi')
  const doi = doiEntry?.['external-id-value']
  const url = doiEntry?.['external-id-url']?.value || 
    (doi ? `https://doi.org/${doi}` : undefined)

  // Extract authors
  const contributors = work['contributors']?.contributor || []
  const authors = contributors
    .filter(c => c['contributor-attributes']['contributor-role'] === 'author')
    .map(c => c['credit-name']?.value || 'Unknown Author')

  // Map work type
  const typeMapping = {
    'journal-article': 'journal-article',
    'conference-paper': 'conference-paper',
    'conference-poster':'conference-poster',
    'book-chapter': 'book-chapter'
  }

  return {
    id: `orcid-${work['put-code']}`,
    title,
    journal,
    year,
    doi,
    url,
    authors,
    type: typeMapping[work.type] || 'other',
    lastUpdated: new Date().toISOString()
  }
}

function extractName(profile) {
  try {
    const givenNames = profile.person?.name?.['given-names']?.value || ''
    const familyName = profile.person?.name?.['family-name']?.value || ''
    return `${givenNames} ${familyName}`.trim() || 'Unknown Researcher'
  } catch {
    return 'Unknown Researcher'
  }
}

function extractAffiliation(profile) {
  try {
    const employments = profile.activities?.employments?.affiliation || []
    if (employments.length > 0) {
      return employments[0].organization?.name
    }
    
    const educations = profile.activities?.educations?.affiliation || []
    if (educations.length > 0) {
      return educations[0].organization?.name
    }
  } catch {
    return undefined
  }
  return undefined
}

export async function generateStaticData() {
  const orcidId = process.env.ORCID_ID
  
  if (!orcidId) {
    throw new Error('ORCID_ID environment variable is required')
  }

  console.log(`📡 Fetching data for ORCID ID: ${orcidId}`)

  try {
    const orcidService = new ORCIDService()
    
    // Fetch profile and works
    const [profile, works] = await Promise.all([
      orcidService.fetchProfile(orcidId),
      orcidService.fetchWorks(orcidId)
    ])

    // Process the data
    const publications = works.map(normalizeORCIDWork)
    publications.sort((a, b) => (b.year || 0) - (a.year || 0))

    const researchProfile = {
      orcidId,
      name: extractName(profile),
      affiliation: extractAffiliation(profile),
      publications,
      lastUpdated: new Date().toISOString(),
      totalPublications: publications.length
    }

    // Ensure static directory exists
    mkdirSync(STATIC_DIR, { recursive: true })

    // Write data files
    writeFileSync(
      join(STATIC_DIR, 'publications.json'),
      JSON.stringify(publications, null, 2)
    )

    writeFileSync(
      join(STATIC_DIR, 'profile.json'),
      JSON.stringify(researchProfile, null, 2)
    )

    console.log(`✅ Generated ${publications.length} publications`)
    return researchProfile

  } catch (error) {
    console.error('❌ Failed to generate research data:', error)
    throw error
  }
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateStaticData().catch(console.error)
}