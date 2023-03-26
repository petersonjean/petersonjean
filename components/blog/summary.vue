<script lang="ts"  setup>
defineProps<{
    title:string,
    image: string,
    excerpt: string,
    date:string
}
>();
</script>
<template>
    <div  class="grid md:grid-cols-4 py-4 divide-dotted > * + * "> 
        <div  class=" col-span-1 rounded-lg">
            <img v-if="image" :src="image" alt="" srcset="">
            <div v-else class="h-32 bg-gray-200 rounded-lg"></div>
        </div>
        <div class="md:col-span-3 sm:p-3">
            <h3 class="font-bold text-gray-900">{{ title }}</h3>
            <span class="font-normal"></span>
            <p>{{ excerpt }}</p>
        </div>
         
    </div>
</template>