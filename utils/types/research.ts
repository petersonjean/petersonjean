export interface Publication {
  id: string
  title: string
  journal?: string
  year?: number
  doi?: string
  url?: string
  authors: string[]
  type: 'journal-article' | 'conference-paper' | 'book-chapter' | 'other'
  abstract?: string
  keywords?: string[]
  lastUpdated: string
}

export interface ResearchProfile {
  orcidId: string
  name: string
  affiliation?: string
  publications: Publication[]
  lastUpdated: string
  totalPublications: number
}