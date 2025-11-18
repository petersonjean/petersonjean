<script lang="ts" setup>
</script>
<template>
 
    <div class="container  py-4 xl:grid xl:grid-cols-3 pl-0  "> 
       <Greetings class="mx-4 md:mx-1 mb-2"/>
       <Profile class="mx-4 md:mx-1 mb-2" />
    </div> 
    <div class="container  pb-4 xl:grid xl:grid-cols-4  ">
        <PublicationSummary class="mx-4 md:mx-1 mb-2 col-span-2 " />
        <Bio class="sm:mx-2 md:mx-1 col-span-2 mb-2"  />
    </div>
    <!-- <div class="container mt-5">
        <h3 class="font-bold text-slate-700" >Latest posts</h3>
        <BlogSummary  :excerpt="excerpt" :title="''+i" image="" date="" v-for="i in 5"    />
    </div>  --> 
    
</template>
<style scoped>
.profile-placeholder{
    background:url('~/assets/img/petersonjeanprofile.jpg')
}
</style>