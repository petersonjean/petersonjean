<script lang="ts"  setup></script>
<template>
    <div  class="md:pl-2 rounded-lg bg-light border ">  
            <div class="flex justify-between  p-3  border-gray-200 ">
                <span   class="font-bold text-black">Latest works</span> <span class="font-normal text-[#848484]">view all</span>
            </div>
            <div class="my-2 flex overflow-x-auto ">
                <div  class=" rounded-lg w-40 mr-4" v-for="i in 5">
                    <img v-if="i.image" :src="i.image" alt="" srcset="">
                    <div v-else class="h-40 w-40 bg-gradient-to-r from-gray-200 to-[#fafaff] rounded-lg flex items-end">
                        <div  class="m-2">
                        <span class="block text-black">Project {{ i }}</span>
                        <span class="block">view more...</span>
                    </div>
                   
                    </div>

                </div>
              
            </div>  
    </div>
</template>