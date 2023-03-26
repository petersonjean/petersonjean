<script lang="ts" setup>
let excerpt = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit ut aliquam purus sit.';
</script>
<template>
    <div class="container  py-4 xl:grid xl:grid-cols-5 pl-0 "> 
        <!-- <div class="rounded  bg-light sm:col-span- bg-cover bg-no-repeat " style="position:relative;background-image: url('/_nuxt/img/peterson.jpeg');"></div> -->

        <div class="px-2 pt-10 col-span-2 flex align-center justify-center bg-gradient-radial from-[#e1dfff] via-[#e1dfff] to-[#fafaff]  rounded-lg ">
            <h1 class="  md:text-7xl   bg-clip-text text-4xl font-extrabold leading-[60px] tracking-tight text-transparent bg-gradient-to-r from-[#4D669D] to-[#DBDDDD] rounded-lg ">Welcome to my tavern</h1>
        </div>
       <Profile class="px-2 col-span-3" />
    </div>
    <div class="container xl:grid xl:grid-cols-4  ">
        <ProjectSummary class="px-2 col-span-2 object-fill" />
       <Bio class="px-2 col-span-2" />
    </div>
    <div class="container mt-5">
        <h3 class="font-bold text-black" >Latest posts</h3>
        <BlogSummary  :excerpt="excerpt" :title="''+i" image="" date="" v-for="i in 5"    />
    </div> 
</template>