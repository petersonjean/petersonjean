<script lang="ts"  setup>
import newsData from '@/db/cv.json';
const props = defineProps<{
  length?: 'short' | 'long'
}>()
const newsLength = props.length ?? 'short'


 const newsRef = ref<any[]>([]);
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


    const parseDate = (item: any) => {
        const d = new Date(item.date);
        const year = d && !isNaN(d.getFullYear()) ? d.getFullYear() : 0;
        const month = d && !isNaN(d.getMonth()) ? d.getMonth() + 1 : 0; // month 1-12
        return { year, month };
    };

     

    let sortedNews = (newsData.news || []).slice().sort((a: any, b: any) => {
        const da = parseDate(a);
        const db = parseDate(b);
        if (da.year === db.year) {
            return db.month - da.month;
        }
        return db.year - da.year;
    });
const news = ref(sortedNews ?? []);

const presentationNews = computed(() =>
  news.value.filter((item) => item.type === 'Presentation')
);
const conferenceNews = computed(() =>
  news.value.filter((item) => item.type === 'Conference')
);
const publicationNews = computed(() =>
  news.value.filter((item) => item.type === 'Publication')
);


onMounted(() => {
    // const parseDate = (item: any) => {
    //     const d = new Date(item.date);
    //     const year = d && !isNaN(d.getFullYear()) ? d.getFullYear() : 0;
    //     const month = d && !isNaN(d.getMonth()) ? d.getMonth() + 1 : 0; // month 1-12
    //     return { year, month };
    // };

    const formatMonthDay = (dateStr: string) => {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleString('en-US', { month: 'short', day: 'numeric' }); // e.g., "Sep 10"
    };

    // let sortedNews = (newsData.news || []).slice().sort((a: any, b: any) => {
    //     const da = parseDate(a);
    //     const db = parseDate(b);
    //     if (da.year === db.year) {
    //         return db.month - da.month;
    //     }
    //     return db.year - da.year;
    // });

    console.log("newsdata:", sortedNews );

    // add formattedDate for display while keeping original date field for keys/sorting
    newsRef.value = sortedNews.map((el: any) => ({ ...el, formattedDate: formatMonthDay(el.date) }));

    
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
                 <div class="flex items-start space-x-4" v-for="el in newsRef.slice(0,5)" :key="el.date">
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
                            <p class=" text-gray leading-relaxed"><span class="news-dot" style="display: inline-block; display: none;"></span> <span v-html="el.description"></span> <NuxtLink v-if="el.link"  :to=" el.link" style="color:#c23636; text-decoration:none; border-bottom:2px solid #c23636;" > -> </NuxtLink></p>
                        </div>
                    </div> 
            </div> 
             <!--Long version of news to show archive  -->  
                <section v-else class="  p-3 news-section">
                    <header class="section-header">
                    <div class="header-content">
                        <h2 class="section-title">News &amp; Talks</h2>
                        <p class="section-subtitle">
                        Highlights from my recent conferences, talks and publications.
                        </p>
                    </div>
                    </header>

                    <div class="news-groups">
                    <div v-if="presentationNews.length" class="news-group">
                        <h3 class="news-group-title underline decoration-4 decoration-yellow-800 underline-offset-4">Talks &amp; Presentations</h3>
                        <ul class="news-list">
                        <li
                            v-for="item in presentationNews"
                            :key="item.date + item.description"
                            class="news-item"
                        >
                            <span :class="`news-date  ${badgeColors[item.badgeColor]}`">{{ item.date }}</span>
                            <span class="news-dot"></span>
                            <span class="news-description" v-html="item.description"></span>
                        </li>
                        </ul>
                    </div>

                    <div v-if="conferenceNews.length" class="news-group">
                        <h3 class="news-group-title underline decoration-4 decoration-blue-800 underline-offset-4">Conferences</h3>
                        <ul class="news-list">
                        <li
                            v-for="item in conferenceNews"
                            :key="item.date + item.description"
                            class="news-item"
                        >
                            <span :class="`news-date  ${badgeColors[item.badgeColor]}`">{{ item.date }}</span>
                            <span class="news-dot"></span>
                            <span class="news-description" v-html="item.description"></span>
                        </li>
                        </ul>
                    </div>

                    <div v-if="publicationNews.length" class="news-group">
                        <h3 class="news-group-title underline decoration-4 decoration-green-800 underline-offset-4">Publications &amp; Media</h3>
                        <ul class="news-list">
                        <li
                            v-for="item in publicationNews"
                            :key="item.date + item.description"
                            class="news-item"
                        >
                            <span :class="`news-date  ${badgeColors[item.badgeColor]}`">{{ item.date }}</span>
                            <span class="news-dot"></span>
                            <span class="news-description" v-html="item.description"></span>
                        </li>
                        </ul>
                    </div>

                    <div
                        v-if="!presentationNews.length && !conferenceNews.length && !publicationNews.length"
                        class="empty-state"
                    >
                        <div class="empty-content">
                        <h3 class="empty-title">No news items found</h3>
                        <p class="empty-message">
                            News and talks will appear here once they are added to your <code>cv.json</code> file.
                        </p>
                        </div>
                    </div>
                    </div>
                </section> 

        </div>
    </div>
</template>
<style lang="css" scoped>
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

.timeline-content {
  flex: 1;
}

.publication-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.publication-meta {
  margin-bottom: 10px;
}

.publication-details {
  font-size: 14px;
  color: #555;
}
.publication-right {
  margin-left: 20px;
}
.timeline{
  @apply w-[3px] bg-slate-900 bg-gradient-to-b   rounded-md;
  
}
.timeline > span{
  @apply m-auto w-[3px]  rounded-md  flex-col ;
}
.dot-timeline{
  @apply  z-50 flex mt-4;
 
}
.space{
  @apply mt-10 block text-sm;
}
.timeline > span > .line {
  @apply h-[20px] mx-auto mt-2 block w-[2px] bg-slate-400;
} 
.bg-gradient{
  background: radial-gradient(circle, rgba(149,194,247,1) 0%, rgba(184,226,242,1) 72%) !important; 
}
.bg-gradient2{
  background: conic-gradient(from 201.87deg at 84.98% -13.18%, rgba(175, 200, 255, 0.70) 2.5710031698644166deg, rgba(175, 200, 255, 0.00) 196.41514992713928deg, #D1ECFF 261.87411880493164deg, rgba(175, 200, 255, 0.00) 342.5111141204834deg, rgba(175, 200, 255, 0.70) 362.5710031698644deg);
}
.bg-gradient2{
  background: conic-gradient(from 201.87deg at 84.98% -13.18%, rgba(175, 200, 255, 0.70) 2.5710031698644166deg, rgba(175, 200, 255, 0.00) 196.41514992713928deg, #D1ECFF 261.87411880493164deg, rgba(175, 200, 255, 0.00) 342.5111141204834deg, rgba(175, 200, 255, 0.70) 362.5710031698644deg);
}
.bg-gradient-sky{
  background: linear-gradient(95deg, rgba(250, 250, 250, 1) 0%, rgba(248, 251, 255, 1) 100%);
}
.bg-gradient-sky2{
  background: linear-gradient(95deg, rgba(255, 255, 255, 1) 0%, rgba(248, 251, 255, 1) 100%);
}
.bg-gradient-sky3{
  background: #001E50;
}
.bg-gradient-sky4{
  background: transparent;
}
.bg-gradient-card{
  background: linear-gradient(215deg, rgba(245, 250, 255, 1) 26%, rgba(243, 248, 255, 1) 60%, rgba(255, 255, 255, 1) 74%, rgba(248, 251, 255, 1) 89%);
}
.bg-gradient-border{
  background: linear-gradient(#f9fafb,#f9fafb),linear-gradient(to right, var(--color-accent),#1d4ed8,#0ea5e9);
  background-origin: border-box;
  background-clip: padding-box,border-box;
}
.bg-gradient-sky-slate{
  background: rgb(248,250,252);
  background: linear-gradient(115deg, rgba(248,250,252,1) 0%, rgba(222,235,255,1) 34%, rgba(245,251,255,1) 68%, rgba(248,250,252,1) 100%);
}
.bg-gradient-slate-sky{
  background: rgb(248,250,252);
  background: linear-gradient(10deg, rgba(248,250,252,1) 0%, rgba(229,239,254,1) 34%, rgba(245,251,255,1) 68%, rgba(248,250,252,1) 100%);
}
.glass{
  background-color: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.glass-secondary{
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.dot::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  right: 137px
}

.dot-bg .dot::after {
  background: #fff;
}

.dot-blue .dot::before{
  
  border-color: #60A5FA;
  background-color: #60A5FA;
  
}
.dot:after{
  right:-4px;
}
.dot-blue .dot::before{
  
  border-color: #60A5FA;
  background-color: #60A5FA;
  
}




.dot::before {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
}

.timeline::before {
  content: "";
  position: absolute;
  width: 3px;
  background-color: #000;
  top: 0;
  bottom: 0;
  left: 50%; 
  transform: translateX(-50%); 
}

.timeline::after {
  content: "";
  clear: both;
  display: table;
}
.wrapper-card{
  background-image: radial-gradient(circle, rgba(149,194,247,1) 0%, rgba(184,226,242,0) 36%,  rgba(184,226,242,0) 71%);
  
}
 
.wrapper-card::after{
  content: "";
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  padding:93px;
  background: radial-gradient(circle, rgba(149,194,247,1) 0%, rgba(226,232,240,0) 45%);
  
}
.line{
  @apply w-20 h-[1px] bg-gradient-to-r from-blue-600 to-sky-400 rounded-full;
}
.line.apple{
  @apply w-24  bg-gradient-to-r from-slate-900 to-slate-400 ;
}
.card-apple .section-title{
  
}
.card-apple .section-subtitle{
  @apply  text-gray-600;
}

.header-content {
  @apply mb-6;
}

.section-title {
  @apply text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white;
}

.section-subtitle {
  @apply text-gray-600 dark:text-gray-300 mt-2;
}


.year-group {
  @apply mb-8;
}

.year-header {
  @apply text-2xl font-bold text-slate-700 dark:text-white mb-4 pb-2 border-b-2 border-blue-500;
}

.year-publications {
  @apply space-y-4;
}

.news-section {
  @apply max-w-4xl mx-auto px-4 pb-16;
}

.news-groups {
  @apply mt-6 space-y-10;
}

.news-group-title {
  @apply text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4;
}

.news-list {
  @apply space-y-3;
}

.news-item {
  @apply flex items-start  text-slate-800 dark:text-slate-100;
}

.news-date {
  @apply   dark:text-slate-400 w-24 flex-shrink-0;
}

.news-dot {
  @apply w-1.5 h-1.5 rounded-full mx-2 mt-1;
  background-color: #0ea5e9;
}

.news-description {
  @apply flex-1;
}

.empty-state {
  @apply text-center py-12;
}

.empty-content {
  @apply max-w-md mx-auto;
}

.empty-title {
  @apply text-lg font-medium text-gray-900 mb-2;
}

.empty-message {
  @apply text-gray-600;
}
</style> 
