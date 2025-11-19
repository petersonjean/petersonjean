<script lang="ts"  setup>
import newsData from '@/db/cv.json';
const props = defineProps<{
  length?: 'short' | 'long'
}>()
const newsLength = props.length ?? 'short'


const news = ref<any[]>([]);
   // Badge color mapping
const badgeColors = {
            // yellow: 'bg-yellow-100 text-yellow-800',
            // green: 'bg-green-100 text-green-800',
            // blue: 'bg-blue-100 text-blue-800',
            // purple: 'bg-purple-100 text-purple-800',
            // red: 'bg-red-100 text-red-800',
            // pink: 'bg-pink-100 text-pink-800'
            yellow: 'text-yellow-800',
            green: 'text-green-800',
            blue: 'text-blue-800',
            purple: ' text-purple-800',
            red: 'text-red-800',
            pink: 'text-pink-800'
        };

        // Date color mapping
        const dateColors = {
            'slate-blue': 'text-slate-blue',
            'dusty-rose': 'text-black'
        };


onMounted(() => {
    const parseDate = (item: any) => {
        const d = new Date(item.date);
        const year = d && !isNaN(d.getFullYear()) ? d.getFullYear() : 0;
        const month = d && !isNaN(d.getMonth()) ? d.getMonth() + 1 : 0; // month 1-12
        return { year, month };
    };

    const formatMonthDay = (dateStr: string) => {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleString('en-US', { month: 'short', day: 'numeric' }); // e.g., "Sep 10"
    };

    let sortedNews = (newsData.news || []).slice().sort((a: any, b: any) => {
        const da = parseDate(a);
        const db = parseDate(b);
        if (da.year === db.year) {
            return db.month - da.month;
        }
        return db.year - da.year;
    });

    console.log("newsdata:", sortedNews );

    // add formattedDate for display while keeping original date field for keys/sorting
    news.value = sortedNews.map((el: any) => ({ ...el, formattedDate: formatMonthDay(el.date) }));

    
});
 
</script>
<template>
    <!-- we parsed for newslength and fix behaviour depends on 2cols or single col -->
    <div  :class="[newsLength ==='short'? 'md:pl-2': ''] ">  
        <div :class="['relative rounded-lg bg-slate-100  border border-gray-200',
         newsLength ==='short'? 'lg:max-h-[342px] lg:overflow-hidden' : 'max-h-none',
         ' before:hidden lg:before:block before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[30px] before:bg-gradient-to-t before:from-[#f1f5f9] before:to-transparent ']" >
            <div class="flex justify-between  p-3  " v-if="newsLength ==='short'">
                <span  class="font-bold text-slate-700">Latest news</span> <span class="font-normal text-[#848484]" >  <NuxtLink  to="/news" style="color:#c23636; text-decoration:none; border-bottom:2px solid #c23636;" > view more -> </NuxtLink></span> 
            </div>
            <div class="  p-3 text-gray" v-if="newsLength ==='short'">
                 <div class="flex items-start space-x-4" v-for="el in news.slice(0,5)" :key="el.date">
                        <!-- <div class="flex-shrink-0">
                            <div class="w-16 h-16 bg-gradient-to-br ${el.gradient} rounded-lg flex items-center justify-center shadow-md">
                                <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    ${icons[news.icon]}
                                </svg>
                            </div>
                        </div> -->
                        <div class="flex-1 mb-2">
                            <div class="flex items-baseline space-x-3 ">
                                <span class="text-sm font-bold text-slate-blue">{{ el.formattedDate }}:</span>
                                <span :class="`px-3 y-1 ${badgeColors[el.badgeColor]} text-xs font-semibold rounded-full bg-gradient-to-r from-[] to-[#FFFFFF]`" style="border:1px solid #c23636;">{{el.type}}</span>
                            </div>
                            <p class=" text-gray leading-relaxed"> <span v-html="el.description"></span> <NuxtLink v-if="el.link"  :to=" el.link" style="color:#c23636; text-decoration:none; border-bottom:2px solid #c23636;" > -> </NuxtLink></p>
                        </div>
                    </div> 
            </div> 
             <!--Long version of news to show archive  -->
            <div v-else class="  p-3 text-gray" >
            
                <header class="section-header">
                    <div class="header-content">
                        <h2 class="section-title">Latest and Upcoming News</h2> 
                    </div>
                </header>
                 <div class="flex items-start space-x-4" v-for="el in news" :key="el.date">
                        <!-- <div class="flex-shrink-0">
                            <div class="w-16 h-16 bg-gradient-to-br ${el.gradient} rounded-lg flex items-center justify-center shadow-md">
                                <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    ${icons[news.icon]}
                                </svg>
                            </div>
                        </div> -->
                        <div class="flex-1 mb-2">
                            <div class="flex items-baseline space-x-3">
                                <span :class="` font-bold text-slate-blue`">{{ el.formattedDate }}:</span>
                                <span :class="`px-3 y-1 ${badgeColors[el.badgeColor]} text-xs font-semibold rounded-full bg-gradient-to-r from-[] to-[#FFFFFF]`" style="border:1px solid #c23636;">{{el.type}}</span>
                            </div>
                            <p class="text-gray leading-relaxed"> <span v-html="el.description"></span> <NuxtLink v-if="el.link"  :to=" el.link" style="color:#c23636; text-decoration:none; border-bottom:2px solid #c23636;" > -> </NuxtLink></p>
                        </div>
                    </div> 
                 
        </div> 

        </div>
    </div>
</template>
