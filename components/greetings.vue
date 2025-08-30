<template>
     <div class="px-2 pt-10 col-span-2 flex align-center justify-center bg-gradient-radial from-[#e1dfff] via-[#e1dfff] to-[#fafaff] rounded-lg">
    <h1 class="md:text-7xl bg-clip-text text-4xl font-extrabold leading-[60px] tracking-tight text-transparent bg-gradient-to-r from-[#4D669D] to-[#DBDDDD] rounded-lg">
      {{ currentGreeting }}
    </h1>
      <!-- <p class="hero__sub" v-if="resolvedRegion">
    Showing greetings from your region: <strong>{{ resolvedRegion }}</strong>
  </p> -->
  </div>

</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import greetings from "@/db/greetings.json";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
countries.registerLocale(en);

type Greeting = { iso3: string; region: string; text: string };

const all = greetings as Greeting[];
const currentGreeting = ref<string>("Howdy! Welcome.");
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

  if (iso2) {
    const iso3 = iso2To3(iso2);
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
    currentGreeting.value = "Howdy! Welcome.";
    return;
  }

  let idx = 0;
  currentGreeting.value = candidates[idx].text;

  // rotation every 2s
  if (!prefersReducedMotion) {
    timer = window.setInterval(() => {
      idx = (idx + 1) % candidates.length;
      currentGreeting.value = candidates[idx].text;
    }, 2000);
  }
}
</script>

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