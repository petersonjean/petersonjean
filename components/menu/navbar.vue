<script lang="ts"  setup></script>
<template>
    <nav class="container  text-black flex sm:justify-end justify-center">
        <ul class="inline-flex gap-2">
            <li><NuxtLink to="/" class="rounded font-medium text-gray-900  py-1 px-2 sm:py-2 sm:px-3 hover:text-white hover:bg-gradient-to-r hover:from-[#4D669D] hover:to-[#DBDDDD] ">Home</NuxtLink></li>
            <li><NuxtLink to="/projects"  class="rounded font-medium text-gray-900  py-1 px-2 sm:py-2 sm:px-3 hover:text-white  hover:bg-gradient-to-r  hover:from-[#4D669D] hover:to-[#DBDDDD]">Projects</NuxtLink></li>
            <li><NuxtLink to="/blog"  class="rounded font-medium text-gray-900  py-1 px-2 sm:py-2 sm:px-3  hover:text-white hover:bg-gradient-to-r  hover:from-[#4D669D] hover:to-[#DBDDDD]">Blog</NuxtLink></li>
            <li><NuxtLink to="/resume"  class="rounded font-medium text-gray-900  py-1 px-2 sm:py-2 sm:px-3  hover:text-white hover:bg-gradient-to-r  hover:from-[#4D669D] hover:to-[#DBDDDD]">Resume</NuxtLink></li> 
            <li><NuxtLink to="/contact"  class="rounded font-medium text-gray-900  py-1 px-2 sm:py-2 sm:px-3  hover:text-white  hover:bg-gradient-to-r hover:from-[#4D669D] hover:to-[#DBDDDD]">contact</NuxtLink></li> 
        </ul> 
    </nav>
</template>
