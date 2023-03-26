<script lang="ts"  setup></script>
<template>
    <div class="sm:grid  md:grid-cols-4 ">
        <div class="rounded-lg  bg-light md:col-span-2 bg-cover bg-no-repeat profile min-h-[140px] sm:bg-center" style="position:relative;">
            <!-- <img
        class=" rounded-lg" 
        src="../img/peterson.jpeg"
        alt="Peterson Jean photo"
      /> -->
        </div>
        <div class="md:pl-2    md:col-span-2 ">
            <div class="flex justify-between  p-3 rounded-lg bg-light border border-gray-200 font-normal ">
                <span class="">Name:</span> <span class="font-bold text-black">Peterson Jean</span>
            </div>
            <div class="my-2 bg-light rounded-lg border border-gray-200">
                <div class="flex justify-between  p-3 rounded-lg font-normal">
                    <span >Location:</span> <span>...</span>
                </div> 
                <!-- <div class="h-36   bg-center bg-contain bg-no-repeat" style="background-image:url('/_nuxt/img/map-square-svgrepo-com.svg')">

                </div> -->
                <div class="p-3   max-h-66 hover:grayscale " style="overflow: hidden;" >
                    <img
                    class="scaley-110  "  
                    src="~/assets/img/map-square-svgrepo-com.svg"
                    alt="location"
                />  
                </div>
            </div>
            <div class="bg-light flex  p-2 rounded-lg border border-gray-200 bg-gradient-to-r from-[wheat] to-[#FFDDDD]  ">
                    <span class="p-2 rounded-full bg-white "><img  src="~/assets/img/icon/FaBrandsLinkedinIn.svg" alt="" srcset=""></span> 
                    <span class="mx-2 p-2 rounded-full bg-white "><img  src="~/assets/img/icon/FaBrandsTwitter.svg" alt="" srcset=""></span> 
                    <span class="p-2 rounded-full bg-white  "><img  src="~/assets/img/icon/FaBrandsOrcid.svg" alt="" srcset=""></span> 
                </div> 
        </div>
    </div>
</template>
<style>
.profile{
    background-image: url('~/assets/img/peterson.jpeg');
}
.profile::before{
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      /* background-image: linear-gradient(to bottom right, #002f4b, #dc4225); */
      background-image: linear-gradient(to left,rgba(255, 255, 255, 0) .01%, #fafaff 120%);
      /* opacity: .6; */
}
</style>