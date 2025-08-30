<script lang="ts" setup>
let excerpt = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit ut aliquam purus sit.';
</script>
<template>
    <div class="container  py-4 xl:grid xl:grid-cols-5 pl-0 "> 
        <!-- <div class="rounded  bg-light sm:col-span- bg-cover bg-no-repeat " style="position:relative;background-image: url('/_nuxt/img/peterson.jpeg');"></div> -->

       <Greetings/>
       <Profile class="px-2 col-span-3" />
    </div>
    <div class="container xl:grid xl:grid-cols-4  ">
        <PublicationSummary class="px-2 col-span-2 object-fill" />
       <Bio class="px-2 col-span-2"  />
    </div>
    <!-- <div class="container mt-5">
        <h3 class="font-bold text-black" >Latest posts</h3>
        <BlogSummary  :excerpt="excerpt" :title="''+i" image="" date="" v-for="i in 5"    />
    </div>  -->
</template>