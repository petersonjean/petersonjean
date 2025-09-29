<script lang="ts" setup>
import { ref, onMounted } from 'vue'; 
import publicationsData from '@/db/publications.json';

const publicationsold = ref([]);


import PublicationCard from '~/components/publication/PublicationCard.vue'

const { 
  profile, 
  publications, 
  publicationsByYear, 
  lastUpdated,
  loading, 
  error, 
  loadStaticData 
} = useResearch() 

onMounted(() => {
  loadStaticData()
    let sortedPub = (publicationsData.publications).sort((a,b)=>{
        if (a.year === b.year) {
          return b.month - a.month;
        }
        return b.year - a.year;
    });
    // console.log("pub are:", sortedPub,publicationsData.publications);
    
    publicationsold.value = sortedPub;
    
});


const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
</script>

<template>
    <div class="container mx-auto px-4">
  <!-- Timeline Item - Current Position -->
    <section class="research-section">
    <header class="section-header">
      <div class="header-content">
        <h2 class="section-title">Research & Publications</h2>
        <p v-if="profile" class="section-subtitle">
          {{ profile.name }}
          <span v-if="profile.affiliation"> • {{ profile.affiliation }}</span>
        </p>
      </div>
      
      <div class="header-stats">
        <div class="stat">
          <span class="stat-number">{{ publications.length }}</span>
          <span class="stat-label">Publications</span>
        </div>
      </div>
    </header>
    
    <div v-if="error" class="error-banner">
      <p class="error-message">{{ error }}</p>
    </div>
    
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Loading publications...</p>
      </div>
    </div>
    
    <div v-else-if="publications.length" class="publications-content">
      <div v-if="lastUpdated" class="last-updated">
        <span class="last-updated-label">Last updated:</span>
        <time :datetime="lastUpdated.toISOString()" class="last-updated-time">
          {{ formatDate(lastUpdated) }}
        </time>
      </div>
      
      <div class="publications-by-year">
        <div v-for="[year, yearPublications] in publicationsByYear" :key="year" class="year-group">
          <h3 class="year-header">{{ year }}</h3>
          <div class="year-publications">
            <PublicationCard
              v-for="publication in yearPublications"
              :key="publication.id"
              :publication="publication"
            />
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="empty-state">
      <div class="empty-content">
        <svg class="empty-icon w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="empty-title">No publications found</h3>
        <p class="empty-message">
          Publications will appear here once data is available from ORCID.
        </p>
      </div>
    </div>
  </section>
  <Footer  class="max-w-6xl mx-auto  "/>

 
  
</div>
  
    
</template>
<style scoped>
.publications-timeline {
  display: flex;
  flex-direction: column;
  position: relative;
}

.publication-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  position: relative;
}
.bg-wheat-500{
    background: linear-gradient(to bottom,wheat, #FFDDDD);
}




.dot {
  width: 10px;
  height: 10px;
  
  border-radius: 50%;
  border: 1.5px solid;
  box-shadow: var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000);
}
.dot.active{
    background-color: #00bcd4;
}
.dot-timeline{
    width: 15px; 
    background-image: linear-gradient(to bottom,var(--tw-gradient-stops));
    /* border: 1px solid red; */
}
.black-gradient{
    --tw-gradient-from: #000 var(--tw-gradient-from-position);
}
.from-accent {
  --tw-gradient-from: var(--color-accent) var(--tw-gradient-from-position);
  --tw-gradient-to: hsla(0,0%,100%,0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from),var(--tw-gradient-to);
}

.content {
  background: #1e1e1e;
  padding: 15px;
  border-radius: 8px;
  color: white;
  width: 90%;
}



.research-section {
  @apply max-w-4xl mx-auto px-4 py-8;
}

.section-header {
  @apply flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8;
}

.section-title {
  @apply text-3xl font-bold text-gray-900 dark:text-white mb-2;
}

.section-subtitle {
  @apply text-lg text-gray-600 dark:text-gray-400;
}

.header-stats {
  @apply mt-4 sm:mt-0;
}

.stat {
  @apply text-center;
}

.stat-number {
  @apply text-2xl font-bold text-blue-600 dark:text-blue-400 block;
  color:#0ea5e9;
}

.stat-label {
  @apply text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide;
}

.error-banner {
  @apply bg-red-50 border border-red-200 rounded-lg p-4 mb-6;
}

.error-message {
  @apply text-red-800;
}

.loading-state {
  @apply flex justify-center py-12;
}

.loading-spinner {
  @apply text-center;
}

.spinner {
  @apply w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4;
}

.last-updated {
  @apply text-sm text-gray-500 mb-6 pb-4 border-b border-gray-200;
}

.last-updated-label {
  @apply font-medium;
}

.year-group {
  @apply mb-8;
}

.year-header {
  @apply text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b-2 border-blue-500;
}

.year-publications {
  @apply space-y-4;
}

.empty-state {
  @apply text-center py-12;
}

.empty-content {
  @apply max-w-md mx-auto;
}

.empty-title {
  @apply text-lg font-medium text-gray-900 mb-2;
}

.empty-message {
  @apply text-gray-600;
}
</style>