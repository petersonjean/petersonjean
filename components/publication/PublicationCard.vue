<template>
  <article class="publication-card">
    <header class="publication-header">
      <h3 class="publication-title">
        <a v-if="publication.url" :href="publication.url" target="_blank" rel="noopener">
          {{ publication.title }}
          <svg class="external-link w-4 h-4 ml-1 inline" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
        <span v-else>{{ publication.title }}</span>
      </h3>
      
      <div class="publication-meta">
        <span v-if="publication.journal" class="journal">{{ publication.journal }}</span>
        <span v-if="publication.year" class="year">{{ publication.year }}</span>
        <span class="type">{{ formatType(publication.type) }}</span>
      </div>
    </header>
    
    <div v-if="publication.authors.length" class="authors">
      <strong>Authors:</strong> {{ publication.authors.join(', ') }}
    </div>
    
    <footer v-if="publication.doi" class="publication-footer">
      <a :href="`https://doi.org/${publication.doi}`" target="_blank" rel="noopener" class="doi-link">
        DOI: {{ publication.doi }}
      </a>
    </footer>
  </article>
</template>

<script setup lang="ts">
import type { Publication } from '~/utils/types/research'

interface Props {
  publication: Publication
}

defineProps<Props>()

function formatType(type: Publication['type']): string {
  const typeMap = {
    'journal-article': 'Journal Article',
    'conference-paper': 'Conference Paper',
    'book-chapter': 'Book Chapter',
    'other': 'Other'
  }
  return typeMap[type] || 'Unknown'
}
</script>

<style scoped>
.publication-card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow;
}

.publication-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-2;
}

.publication-title a {
  @apply text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 no-underline;
  color: #0ea5e9;
}

.publication-meta {
  @apply flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3;
}

.journal {
  @apply font-medium italic;
}

.year {
  @apply font-medium;
}

.type {
  @apply px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs uppercase font-semibold;
}

.authors {
  @apply text-sm text-gray-700 dark:text-gray-300 mb-3;
}

.doi-link {
  @apply text-xs text-gray-500 hover:text-blue-600 font-mono;
}
</style>