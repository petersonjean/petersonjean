<script lang="ts"  setup>
const props = defineProps<{
  length?: 'short' | 'long'
}>()
const bioLength = props.length ?? 'short'

</script>
<template>
    <div  class="md:pl-2  "> 
        <div class="rounded-lg bg-slate-100  border border-gray-200" >
            <div class="flex justify-between  p-3  ">
                <span  class="font-bold text-slate-700">About me</span> <span class="font-normal text-[#848484]">Resume</span> 
            </div>
            <div class="  p-3 text-gray" v-if="bioLength ==='short'">
                <p class="lead" style="margin:0 0 10px; font-size:1.05rem; color:#111827;">
                    Hello, I am <strong>Peterson</strong>! I am a
                    <strong>PhD Candidate at <a href="https://www.tudublin.ie/" target="_blank" rel="noopener" style="color:#0ea5e9; text-decoration:none; border-bottom:2px solid #bae6fd;">Technological University Dublin</a></strong> in the
                    <strong><a href="https://www.d-real.ie/" target="_blank" rel="noopener" style="color:#0ea5e9; text-decoration:none; border-bottom:2px solid #bae6fd;">SFI Centre for Research Training in Digitally-Enhanced Reality (d-real)</a></strong>.
                </p>
                <p style="margin:0;">
                    My research spans <strong>Human–Computer Interaction</strong>, <strong>Digital Health</strong>, and <strong>Health Informatics</strong>, focusing on designing
                    <strong>data-driven, age-friendly healthcare systems</strong> for older adults. By integrating human-centred design, multimodal interaction, and critical systems expertise,
                    I create accessible self-monitoring/assistive solutions that promote independence, health equity, and quality of life. <a href="http://"> read more...</a> 
                    <NuxtLink  to="/about" style="color:#c23636; text-decoration:none; border-bottom:2px solid #c23636;" > read more -> </NuxtLink>
                </p>
            </div>  
            <div v-else class="  p-3 text-gray" >
            

            <!-- Header block -->
        <div style="display:flex; gap:22px; align-items:flex-start; margin-bottom:18px;">
            <!-- Optional headshot slot -->
            <!-- <img src="your-photo.jpg" alt="[Your Name]" style="width:140px; height:140px; object-fit:cover; border-radius:12px; border:1px solid #e5e7eb;"> -->
            <div>
            <p style="margin:0 0 6px; font-size:1.1rem;">
                Hello, I am <strong>Peterson</strong>!
                I am a <strong>PhD Candidate at <a href="https://www.tudublin.ie/" target="_blank" rel="noopener" style="color:#2563eb; text-decoration:none; border-bottom:2px solid #bfdbfe;">Technological University Dublin</a></strong>,
                based at the <strong><a href="https://www.d-real.ie/" target="_blank" rel="noopener" style="color:#2563eb; text-decoration:none; border-bottom:2px solid #bfdbfe;">SFI Centre for Research Training in Digitally-Enhanced Reality (d-real)</a></strong>.
            </p>
            <p style="margin:0;">
                My work sits at the intersection of <strong>Human-Computer Interaction</strong> and <strong>Digital Health</strong>, advancing
                <strong>data-driven, age-friendly healthcare systems</strong> that support the well-being and independence of older adults.
            </p>
            </div>
        </div>

        <!-- Background -->
        <h2 style="font-size:1.05rem; letter-spacing:.02em; text-transform:uppercase; color:#6b7280; margin:18px 0 6px;">Background</h2>
        <p style="margin:0 0 12px;">
            I bring a background in <strong>software engineering</strong> and experience with <em>critical healthcare systems</em>, complemented by an
            <strong>MSc in Advanced Computer Science</strong> and recognition as a <strong><a href="https://www.chevening.org/" target="_blank" rel="noopener" style="color:#2563eb; text-decoration:none; border-bottom:2px solid #bfdbfe;">Chevening Alumnus</a></strong>.
            I have also led open-source initiatives in the non-profit sector, applying platforms such as Drupal, CiviCRM, and Vue.js to deliver technology for social good and community health.
        </p>

        <!-- Research -->
        <h2 style="font-size:1.05rem; letter-spacing:.02em; text-transform:uppercase; color:#6b7280; margin:18px 0 6px;">Research</h2>
        <p style="margin:0 0 10px;">
            I investigate how <strong>human-centred design</strong>, <strong>multimodal interaction</strong>, and <strong>health informatics</strong> can enable
            inclusive <strong>self-monitoring and assistive technologies</strong> for the ageing population. My approach blends qualitative and participatory
            methods with pragmatic systems thinking to ensure solutions are <em>usable, accessible, and ethically grounded</em>.
        </p>
        <ul style="margin:0 0 14px 18px;">
            <li><strong>Focus:</strong> Age-friendly health data, interaction design for older adults, equitable digital health.</li>
            <li><strong>Methods:</strong> Human-centred & participatory design; evaluation across in-person and online settings.</li>
            <li><strong>Goal:</strong> Improve quality of life and health equity through reliable, scalable socio-technical systems.</li>
        </ul>

        <!-- Collaboration -->
        <h2 style="font-size:1.05rem; letter-spacing:.02em; text-transform:uppercase; color:#6b7280; margin:18px 0 6px;">Collaboration</h2>
        <p style="margin:0;">
            I welcome collaborations with <strong>academia</strong>, <strong>health services</strong>, and <strong>industry</strong> on projects that advance
            <strong>inclusive, data-informed, and sustainable digital health</strong>. For partnerships or co-authorships, feel free to get in touch.
        </p>

        </div> 

        </div>
    </div>
</template>
