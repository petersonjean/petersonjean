<script lang="ts" setup>
import cvData from '@/db/cv.json';

const cv = ref([]);

onMounted(() => {
    // let sortedExperience  = (cvData.education).sort((a,b)=>{
    //     if (a.year === b.year) {
    //       return b.month - a.month;
    //     }
    //     return b.year - a.year;
    // });
    console.log("xcvare:", cvData );
    
    cv.value = cvData;
    
});


const skillColors = {
        languages: "#FFD700", // Gold
        software: "#87CEEB", // Sky Blue
        programming_languages: "#FF6347", // Tomato
        web_technologies: "#32CD32", // Lime Green
        development_tools: "#9370DB", // Medium Purple
        additional_skills: "#FFA07A", // Light Salmon
      };
</script>
<template>
    
    <div class="container  px-4">
        <h1 class="section-title">CV</h1>
        

              <!-- Education Section -->
              <section class="mx-4 md:mx-1">
          <h2 class="section-subtitle font-bold mb-6 ">Education</h2>
          <div v-for="(edu, index) in cv.education" :key="index" class="flex items-start mt-8">
            <!-- Bullet -->
            <div class="relative">
              <div class="w-4 h-4 bg-gray-400 rounded-full"></div>
              <!-- Gradient Bar (only show if not the last item) -->
              <div
                v-if="index !== cv.education.length - 1"
                class="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-gray-400 to-transparent"
              ></div>
            </div>
            <!-- Content -->
            <div class="ml-4 min-h-[100px]">
              <h3 class="text-xl font-bold">{{ edu.degree }}</h3>
              <p class="text-gray-600">{{ edu.institution }} - <span class="text-sm">{{ edu.duration }}</span></p>
              <p class="text-gray-500">{{ edu.description }}</p>
            </div>
          </div>
        </section>


      <!-- Work Experience Section -->
        <section class="mx-4 md:mx-1">
          <h2 class="text-2xl font-bold mb-6">Work Experience</h2>
          <div v-for="(job, index) in cv.workExperience" :key="index" class="flex items-start mt-8">
            <!-- Bullet -->
            <div class="relative">
              <div
                class="w-4 h-4 rounded-full"
                :class="{
                  'bg-green-500 shadow-lg': job.isCurrent,
                  'bg-gray-400': !job.isCurrent
                }"
              ></div>
              <!-- Gradient Bar (only show if not the last item) -->
              <div
                v-if="index !== cv.workExperience.length - 1"
                class="absolute top-6 left-1/2 transform -translate-x-1/2 w-1"
                :style="{
                  height: `100px`,
                  background: job.isCurrent
                    ? 'linear-gradient(to bottom, #48bb78, transparent)'
                    : 'linear-gradient(to bottom, #a0aec0, transparent)'
                }"
              ></div>
            </div>
            <!-- Content -->
            <div
              :ref="`workExperience-${index}`"
              class="ml-4 min-h-[100px]"
            >
              <h3 class="text-xl font-bold">{{ job.title }}</h3>
              <p class="text-gray-600">{{ job.company }} -  <span class="text-sm">{{ job.duration }}</span></p>
              <p class="text-gray-500">{{ job.description }}</p>
            </div>
          </div>
        </section>


        <!-- Section : all Skills by categories -->
  <section class="mx-4 md:mx-1 mb-12">
    <h2 class="text-2xl font-bold mb-6">Skills</h2>

    <!-- Legend -->
    <div class="mb-6">
      <!-- <h3 class="text-lg font-semibold mb-2">Legend</h3> -->
      <div class="flex flex-wrap gap-2">
        <div
          v-for="(color, category) in skillColors"
          :key="category"
          class="flex items-center gap-2"
        >
          <div
            class="w-4 h-4 rounded-full"
            :style="{ backgroundColor: color }"
          ></div>
          <span class="text-sm">{{ category }}</span>
        </div>
      </div>
    </div>

    <!-- categories -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(skills, category) in cv.skills"
        :key="category"
        class="p-4 rounded-lg shadow-sm"
        :style="{ backgroundColor: skillColors[category] }"
      >
        <h3 class="text-lg font-semibold mb-2">{{ category.replace('_', ' ') }}</h3>
        <ul class="list-disc list-inside">
          <li v-for="(skill, index) in skills" :key="index" class="text-gray-700">
            {{ skill }}
          </li>
        </ul>
      </div>
    </div>
  </section>
  <Footer  class="max-w-6xl mx-auto  "/>

        <!-- Skills Section -->
        <!-- <section class="mb-12">
          <h2 class="text-2xl font-bold mb-6">Skills</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(skill, index) in cv.skills"
              :key="index"
              class="px-4 py-2 bg-gray-200 rounded-full text-sm"
            >
              {{ skill }}
            </span>
          </div>
        </section> -->

  </div>
</template>