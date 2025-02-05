<script lang="ts" setup>
import { ref, onMounted } from 'vue'; 
import publicationsData from '@/db/publications.json';

const publications = ref([]);

onMounted(() => {
    let sortedPub = (publicationsData.publications).sort((a,b)=>{
        if (a.year === b.year) {
          return b.month - a.month;
        }
        return b.year - a.year;
    });
    // console.log("pub are:", sortedPub,publicationsData.publications);
    
    publications.value = sortedPub;
    
});
</script>

<template>
    <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold underline">Publications</h1>
        <div class="container mx-auto px-4 py-8">
  <!-- Timeline Item - Current Position -->
  <div class="flex items-start min-h-48" v-for="(pub, index) in publications" :key="index"  >
    <!-- Bullet -->
    <div class="relative">
      <div class="w-5 h-5   rounded-full  "
      :class="{
          'bg-wheat-500 shadow-lg': index == 0,
          'bg-gray-400': index > 0
        }"></div>
      <!-- Gradient Bar -->
      <div v-if="index !== publications.length - 1"
        class="absolute top-6 left-1/2 transform -translate-x-1/2 w-1"
       
        :style="{
          height: `150px`,
          background: index== 0
            ? 'linear-gradient(to bottom,wheat, #FFDDDD , transparent)'
            : 'linear-gradient(to bottom, #a0aec0, transparent)'}"></div>
    </div>
    <!-- Content -->
    <div class="ml-4 pb-4 ">
        <PublicationItem :publication="pub"/> 
    </div>
  </div>

 
  
</div>

<!-- 
        <div class="publications-timeline">
            <div v-for="(pub, index) in publications" :key="index" class="publication-item min-h-40">
                <div class="dot-timeline relative  h-40" >
                     <span class="absolute left-2 m-auto w-px min-h-36 bg-yellow  bg-teal-900"></span>
                    <div class="absolute dot left-1"></div>
                    
                </div>
                <div class="content min-h-40 ml-3">
                    <PublicationItem :publication="pub"/> 
                </div>
            </div>
        </div> -->
 
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

</style>