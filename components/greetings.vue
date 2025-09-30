<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import greetings from "@/db/greetings.json";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import raw from '@/db/popdataset.json'; // your JSON array 
import { getByCode, toSeries, projectLinear, type UNRow } from '@/utils/agingData';

const data = raw as unknown as UNRow[];

countries.registerLocale(en);

type Greeting = { iso3: string; region: string; welcomeText:string; };

const all = greetings as Greeting[];
const currentGreeting = ref<string>("Howdy!");
const currentWelcome = ref<string>("Welcome");
const resolvedRegion = ref<string>("");

let timer: number | null = null;
let prefersReducedMotion = false; // default

onMounted(() => {
  // Only access window in browser
  if (typeof window !== "undefined" && window.matchMedia) {
    prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  init();
});

onBeforeUnmount(() => { if (timer) window.clearInterval(timer); });

function getBrowserCountryISO2(): string | null {
  // best-effort: parse navigator.languages for region (e.g., en-IE)
  const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const l of langs) {
    const tag = l || "";
    const parts = tag.split("-"); // en-IE, fr-FR, etc.
    if (parts.length > 1 && /^[A-Z]{2}$/i.test(parts[1])) {
      return parts[1].toUpperCase();
    }
  }
  return null;
}

async function fetchCountryByIP(): Promise<string | null> {
  return fetch("https://free.freeipapi.com/api/json")
    .then(async r => {
      if (!r.ok) return null;
      const data = await r.json();
      // The API returns countryCode as ISO2 (e.g., "IE")
      return typeof data.countryCode === "string" ? data.countryCode.toUpperCase() : null;
    })
    .catch(() => null);
}

function iso3To2(iso3: string): string | null {
  try {
    return countries.alpha3ToAlpha2(iso3) || null;
  } catch { return null; }
}

function iso2To3(iso2: string): string | null {
  try {
    return countries.alpha2ToAlpha3(iso2) || null;
  } catch { return null; }
}

function pickRegionForISO2(iso2: string | null): string | null {
  if (!iso2) return null;
  const iso3 = iso2To3(iso2);
  if (!iso3) return null;
  const item = all.find(g => g.iso3 === iso3 && g.region);
  return item?.region || null;
}

function chooseTopFiveForRegion(region: string): Greeting[] {
  const pool = all.filter(g => g.region === region && g.text && g.text.trim().length > 0);
  // Shuffle to avoid always starting with same list (stable but simple)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 5);
}

async function init() {
  // 1) Detect country by IP first
  let iso2: string | null = await fetchCountryByIP();

  // 2) Fallback: browser language
  if (!iso2) iso2 = getBrowserCountryISO2();

  // 3) Try to find a greeting for the country
  let greetingForCountry: Greeting | undefined;
  let region: string;
  let iso3: string | null = null;
  if (iso2) {
    iso3 = iso2To3(iso2);
    greetingForCountry = all.find(g => g.iso3 === iso3);
    region = pickRegionForISO2(iso2) || "Europe";
  } else {
    region = "Europe";
  }
  resolvedRegion.value = region;

  // 4) Prepare candidates
  let candidates: Greeting[];
  if (greetingForCountry) {
    // Put country greeting first, then fill with region greetings (excluding country)
    const regionGreetings = chooseTopFiveForRegion(region).filter(g => g.iso3 !== greetingForCountry!.iso3);
    candidates = [greetingForCountry, ...regionGreetings].slice(0, 5);
  } else {
    candidates = chooseTopFiveForRegion(region);
  }

  if (candidates.length === 0) {
    currentGreeting.value = "Howdy!";
    currentWelcome.value = "Welcome";
    return;
  }

  let idx = 0;
  currentGreeting.value = candidates[idx].text;
   currentWelcome.value = candidates[idx].welcomeText;

  // rotation every 2s
  if (!prefersReducedMotion) {
    timer = window.setInterval(() => {
      idx = (idx + 1) % candidates.length;
      currentGreeting.value = candidates[idx].text;
      currentWelcome.value = candidates[idx].welcomeText;
    }, 2000);
  
}
}
 
const iso3 = 'IRL'; // replace with detected/default country
const worldIso3 = 'WLD'; // World aggregate is usually "WLD"

const rowCountry = getByCode(data, iso3)!;
const rowWorld   = getByCode(data, worldIso3)!;

const seriesCountry = toSeries(rowCountry, { from: 1960 });
const seriesWorld   = toSeries(rowWorld,   { from: 1960 });

// optional short projection to make the ending feel urgent (e.g., +8 years)
const projection = projectLinear(seriesCountry, 8, 5);
</script>
 <template>
     <div
    class="px-2 pt-10 col-span-2 bg-gradient-radial from-slate-700 via-slate-300 to-slate-100 rounded-lg flex flex-col xl:flex-col sm:flex-col md:flex-row flex-row  justify-center gap-8"
    style="min-height:340px;"
  >
  <div class="space-y-4">
        <!-- Greeting headline -->
                    <div class="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-blue to-dusty-rose bg-clip-text text-transparent">
                              {{ currentGreeting }} 
                    </div>
                    <div class="text-3xl sm:text-4xl lg:text-5xl font-medium bg-gradient-to-r from-slate-blue to-dusty-rose bg-clip-text text-transparent text-gray-700 leading-tight">
                         {{ currentWelcome }}
                    </div>
                    <div class="w-16 h-1 bg-gradient-to-r from-[#c23636] to-[#fafaff] rounded-full"></div>
                    
                </div>
     
    <!-- AgingClock component -->
    <div class="flex-1 flex items-center justify-center w-full h-full max-h-[340px]">
      <!-- <AgingClock
        countryName="Ireland"
        :series="seriesCountry"
        :globalSeries="seriesWorld"
        :projection="projection"
        :durationMs="4200"
        class="w-full h-full max-h-[340px]"
      /> -->
    </div>
  </div> 
</template>

<style scoped>
.hero {
  display: grid;
  place-items: center;
  min-height: 220px;
  background: linear-gradient(135deg, #f8fafc, #eef2ff);
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  padding: 24px;
}
.hero__headline {
  font-size: clamp(2.2rem, 4.5vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0;
  line-height: 1.05;
}
.hero__sub {
  margin-top: .5rem;
  color: #64748b;
  font-size: .95rem;
}
.fade-enter-active, .fade-leave-active { transition: opacity .35s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>