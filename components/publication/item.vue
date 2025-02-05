<script lang="ts" setup>
defineProps<{
    publication: {
            type: Object,
            required: true
        }
}>(); 
// console.log("punlication: ", publication);
</script>
<template>
    
                    <h3 class="title">{{ publication.title }}</h3>
                    <p class="authors">{{ publication.authors.join(', ') }}</p>
                    <p class="journal">{{ publication.journal }}</p>
                    <p >  <span class="year">{{ publication.year }} , </span>
                    <span v-if="publication.pages" class="pages">Pages: {{ publication.pages }}</span> </p>
                    <p><a :href="publication.doi" class="pub-link"><span>Download Paper</span></a> | <a href="" class="pub-link"><span>Download Slides</span></a></p>
            
    <!-- <div class="publication-item p-4 border rounded-lg shadow-md mb-4">
        <h2 class="text-xl font-bold mb-2">{{ publication.title }}</h2> 
        <p class="text-gray-700 mb-2">{{ publication.authors.join(', ') }}</p>
        <p class="text-gray-600 mb-2">{{ publication.journal }}</p>
        <p class="text-gray-600 mb-2">{{ publication.year }}</p>
        <p class="text-gray-600 mb-2">Volume: {{ publication.volume }}, Issue: {{ publication.issue }}</p>
        <p class="text-gray-600 mb-2">Pages: {{ publication.pages }}</p>
        <p class="text-blue-600 mb-2"><nuxt-link :to="publication.url" target="_blank" rel="noopener noreferrer">{{ publication.url }}</nuxt-link></p>
        <p class="text-gray-600 mb-2">DOI: {{ publication.doi }}</p>
        <p class="text-gray-700 mt-4">{{ publication.abstract }}</p>
    </div> -->
</template>



<style scoped>
/* Add any additional styles here */


.title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}

.authors, .journal, .year, .pages,.pub-link {
  font-size: 14px;
  opacity: 0.8;
}
</style>