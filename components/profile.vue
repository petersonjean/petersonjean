<script lang="ts"  setup></script>
<template>
    <div class="sm:grid  ">
        <!-- <div class="rounded-lg  bg-slate-100 md:col-span-2 bg-cover bg-no-repeat profile min-h-[140px] sm:bg-center" style="position:relative;">
            
        </div> -->
        <div class="md:pl-2  md:col-span-2 ">
            <div class="grid grid-cols-1 gap-5 p-3 rounded-lg bg-slate-100 border border-gray-200 font-normal mb-1">
                <!-- Mobile: Round photo at top -->
                <div class=" lg:hidden flex justify-center mb-6">
                    <img src="~/assets/img/petersonjeanprofile.jpg" alt="Profile photo of Peterson Jean" 
                         class="profile-photo-mobile">
                </div>

                <!-- Desktop: Full rectangular photo -->
                <div class=" hidden lg:block mb-6">
                    <img src="~/assets/img/petersonjeanprofile.jpg" alt="Profile photo of Peterson Jean" 
                         class="profile-photo-large">
                </div>

                <!-- Form-style Profile Information -->
                <!-- <div class="">
                    <div class="profile-field">
                        <span class="profile-label">Name:</span>
                        <span class="profile-value">Peterson Jean</span>
                    </div>
                    <div class="profile-field">
                        <span class="profile-label">Location:</span>
                        <span class="profile-value">Dublin, Ireland</span>
                    </div>
                    <div class="profile-field">
                        <span class="profile-label">Status:</span>
                        <span class="profile-value">PhD Candidate</span>
                    </div>
                    <div class="profile-field">
                        <span class="profile-label">Institution:</span>
                        <span class="profile-value">TU Dublin</span>
                    </div>
                </div> -->
                <div class="flex justify-between   font-normal">
                     <span class="">Name:</span> <span class="font-bold text-slate-700">Peterson Jean</span>
                </div> 
                 <div class="flex justify-between  font-normal">
                    <span >Location:</span> <span>Dublin, Ireland</span>
                </div> 
               
            </div>
           <ContactDetail />
        </div>
    </div>
</template>
<style>
.profile{
     background-image: url('~/assets/img/petersonjeanprofile.jpg');
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

      /* Profile photo styles */
        .profile-photo-large {
            width: 100%;
            height: auto;
            aspect-ratio: 3/4;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            max-height: 315px;
            object-position: top;
        }

        .profile-photo-mobile {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* Mobile adjustments */
        @media (max-width: 1023px) {
         

            /* .card {
                padding: 20px;
            } */

            .profile-photo-large {
                display: none;
            }
        }

        @media (min-width: 1024px) {
            .profile-photo-mobile {
                display: none;
            }
        }


         /* Form-style profile info */
        .profile-field {
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid #d0d0d5;
        }

        .profile-field:last-child {
            border-bottom: none;
        }

        .profile-label {
            font-weight: 600;
            color: var(--text-medium);
            min-width: 100px;
            font-size: 14px;
        }

        .profile-value {
            color: var(--text-dark);
            font-weight: 500;
            flex: 1;
        }
</style>