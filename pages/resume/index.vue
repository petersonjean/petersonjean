<script lang="ts" setup>
import { computed } from 'vue'
import cvData from '@/db/cv.json'

type EducationEntry = {
  institution: string;
  location?: string;
  duration?: string;
  degree?: string;
  research_topic?: string;
  research_project?: string;
  specialisms?: string[];
  interests?: string[];
  description?: string;
  profile?: string;
  grade?: string;
}

type WorkExperienceEntry = {
  company: string;
  location?: string;
  position: string;
  duration?: string;
  description?: string;
  topics_covered?: string[];
  responsibilities?: string[];
}

type PublicationEntry = {
  title: string;
  authors?: string;
  conference?: string;
  pages?: string;
}

type CertificationEntry = {
  institution: string;
  location?: string;
  duration?: string;
  certification: string;
  description?: string;
}

type AwardEntry = {
  title: string;
  organization?: string;
  year?: number;
  description?: string;
}

type ActivityEntry = {
  organization: string;
  duration?: string;
  location?: string;
  description?: string;
}

type NewsEntry = {
  date: string;
  dateColor?: string;
  type?: string;
  badgeColor?: string;
  gradient?: string;
  hoverBorder?: string;
  icon?: string;
  description: string;
  link?: string;
}

type Skills = {
  [key: string]: string[];
}

const cv = cvData as {
  name: string;
  contact: {
    address?: string;
    email?: string;
    phone?: string;
    website?: string;
  };
  education: EducationEntry[];
  publications: PublicationEntry[];
  certifications: CertificationEntry[];
  workExperience: WorkExperienceEntry[];
  extracurricular_activities: ActivityEntry[];
  awards: AwardEntry[];
  skills: Skills;
  links: Record<string, string>;
  news: NewsEntry[];
}

// Contact links (email / phone)
const contactLinks = computed(() => {
  const links: { label: string; href: string }[] = []

  if (cv.contact?.email) {
    const realEmail = cv.contact.email.replace('[at]', '@')
    links.push({
      label: cv.contact.email,
      href: `mailto:${realEmail}`
    })
  }

  if (cv.contact?.phone && cv.contact.phone.trim() !== '') {
    const tel = cv.contact.phone.replace(/[^+\d]/g, '')
    if (tel) {
      links.push({
        label: cv.contact.phone.trim(),
        href: `tel:${tel}`
      })
    }
  }

  return links
})

// Main degree line for header (from first education entry)
const mainDegree = computed(() => {
  const first = cv.education?.[0]
  return first?.degree ?? ''
})

// Skill groups from skills object
const skillGroups = computed(() =>
  Object.entries(cv.skills || {}).map(([key, items]) => {
    const label = key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
    return {
      key,
      label,
      items
    }
  })
)

// Accent colour for each skill group
const skillColors = computed<Record<string, string>>(() => {
  const palette = [
    '#0ea5e9', // sky-500
    '#6366f1', // indigo-500
    '#22c55e', // green-500
    '#ec4899', // pink-500
    '#f97316', // orange-500
    '#14b8a6', // teal-500
    '#8b5cf6', // violet-500
    '#facc15', // yellow-400
  ]
  const result: Record<string, string> = {}
  skillGroups.value.forEach((group, index) => {
    result[group.key] = palette[index % palette.length]
  })
  return result
})

// News grouped by type
const newsByType = computed(() => {
  const groups: Record<string, NewsEntry[]> = {}
  for (const item of cv.news || []) {
    const type = item.type || 'Other'
    if (!groups[type]) groups[type] = []
    groups[type].push(item)
  }
  return groups
})

const newsTypeOrder = ['Presentation', 'Conference', 'Publication', 'Other']
const newsTypeLabels: Record<string, string> = {
  Presentation: 'Talks & Presentations',
  Conference: 'Conferences',
  Publication: 'Publications & Media',
  Other: 'Other'
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-12 space-y-12 text-slate-900 dark:text-slate-50">
    <!-- Header -->
    <header class="border-b border-slate-200 dark:border-slate-700 pb-6 mb-4">
      <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
        {{ cv.name }}
      </h1>
      <p v-if="mainDegree" class="text-slate-700 dark:text-slate-200 mb-2 text-md">
        {{ mainDegree }}
      </p>
      <!-- <p v-if="cv.contact.address" class="text-slate-700 dark:text-slate-200 mb-1">
        {{ cv.contact.address }}
      </p> -->

      <div class="flex flex-wrap gap-3 mt-2 text-sm text-slate-800 dark:text-slate-100">
        <a
          v-for="link in contactLinks"
          :key="link.href"
          :href="link.href"
          class="inline-flex items-center gap-1 text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-200 hover:underline"
        >
          {{ link.label }}
        </a>
        <a
          href="/publications" 
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-200  hover:underline"
        >
          My Publications
        </a>
        <a
          v-if="cv.links?.research_profile"
          :href="cv.links.research_profile"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-emerald-200 hover:underline"
        >
          Google Scholar
        </a>
      </div>
    </header>

    <!-- Education (timeline style) -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
        Education
      </h2>

      <div class="space-y-6">
        <article
          v-for="(edu, index) in cv.education"
          :key="index"
          class="flex gap-4"
        >
          <!-- Timeline column -->
          <div class="flex flex-col items-center pt-1">
            <span class="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-500"></span>
            <span class="w-px flex-1 bg-slate-200 dark:bg-slate-700 mt-2"></span>
          </div>

          <!-- Content -->
          <div class="flex-1">
            <h3 class="font-semibold text-slate-900 dark:text-slate-50 text-xl">
              <span v-if="edu.degree">{{ edu.degree }}</span>
              <span v-if="edu.degree && edu.institution"> – </span>
              <span v-if="edu.institution">{{ edu.institution }}</span>
            </h3>

            <p
              v-if="edu.location || edu.duration"
              class="text-lg text-slate-700 dark:text-slate-200 mt-1"
            >
              <span v-if="edu.location">{{ edu.location }}</span>
              <span v-if="edu.location && edu.duration"> – </span>
              <span v-if="edu.duration" class="font-medium">
                {{ edu.duration }}
              </span>
            </p>

            <p v-if="edu.research_topic" class="text-md text-slate-700 dark:text-slate-200 mt-2">
              Currently: {{ edu.research_topic }}.
            </p>

            <p v-if="edu.research_project" class="text-md text-slate-700 dark:text-slate-200 mt-2">
              {{ edu.research_project }}
            </p>

            <p v-if="edu.description" class="text-md text-slate-700 dark:text-slate-200 mt-2">
              {{ edu.description }}
            </p>

            <p v-if="edu.grade" class="text-sm text-slate-700 dark:text-slate-200 mt-2">
              <span class="font-medium">Grade:</span> {{ edu.grade }}
            </p>

            <!-- Interests -->
            <div v-if="edu.interests?.length" class="mt-3">
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                Interests
              </p>
              <div class="mt-1 flex flex-wrap gap-2">
                <span
                  v-for="interest in edu.interests"
                  :key="interest"
                  class="inline-flex items-center rounded-md border border-sky-200 dark:border-sky-500/60 bg-sky-50/90 dark:bg-sky-900/30 px-2 py-0.5 text-xs text-slate-900 dark:text-slate-50"
                >
                  <span class="mr-1 h-1.5 w-1.5 rounded-sm bg-sky-500 dark:bg-sky-300"></span>
                  {{ interest }}
                </span>
              </div>
            </div>

            <!-- Specialisms -->
            <div v-if="edu.specialisms?.length" class="mt-3">
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                Specialisms
              </p>
              <div class="mt-1 flex flex-wrap gap-2">
                <span
                  v-for="spec in edu.specialisms"
                  :key="spec"
                  class="inline-flex items-center rounded-md border border-indigo-200 dark:border-indigo-500/60 bg-indigo-50/90 dark:bg-indigo-900/30 px-2 py-0.5 text-xs text-slate-900 dark:text-slate-50"
                >
                  <span class="mr-1 h-1.5 w-1.5 rounded-sm bg-indigo-500 dark:bg-indigo-300"></span>
                  {{ spec }}
                </span>
              </div>
            </div> 
          </div>
        </article>
      </div>
    </section>

    <!-- Work Experience (timeline style) -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
        Work Experience
      </h2>

      <div class="space-y-6">
        <article
          v-for="(job, index) in cv.workExperience"
          :key="index"
          class="flex gap-4"
        >
          <!-- Timeline column -->
          <div class="flex flex-col items-center pt-1">
            <span class="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-500"></span>
            <span class="w-px flex-1 bg-slate-200 dark:bg-slate-700 mt-2"></span>
          </div>

          <!-- Content -->
          <div class="flex-1">
            <h3 class="font-semibold text-slate-900 dark:text-slate-50 text-xl">
              {{ job.position }}
            </h3>

            <p class="text-lg text-slate-700 dark:text-slate-200 mt-1">
              <span class="font-semibold">{{ job.company }}</span>
              <span class="font-italic" v-if="job.location"> – {{ job.location }}</span>
              <span v-if="job.duration">
                – <span class="font-medium">{{ job.duration }}</span>
              </span>
            </p>

            <p v-if="job.description" class="text-md text-slate-700 dark:text-slate-200 mt-2">
              {{ job.description }}
            </p>

            <ul
              v-if="job.topics_covered?.length"
              class="mt-2 list-disc list-inside text-md text-slate-700 dark:text-slate-200"
            >
              <li v-for="topic in job.topics_covered" :key="topic">
                {{ topic }}
              </li>
            </ul>

            <ul
              v-if="job.responsibilities?.length"
              class="mt-2 list-disc list-inside text-md text-slate-700 dark:text-slate-200"
            >
              <li v-for="resp in job.responsibilities" :key="resp">
                {{ resp }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <!-- Publications -->
    <!-- <section v-if="cv.publications?.length" class="space-y-4">
      <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
        Selected Publications
      </h2>
      <div class="space-y-3 text-sm">
        <article
          v-for="(pub, index) in cv.publications"
          :key="index"
          class="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 px-4 py-3 shadow-sm"
        >
          <p class="font-medium text-slate-900 dark:text-slate-50">
            {{ pub.title }}
          </p>
          <p v-if="pub.authors" class="text-xs text-slate-700 dark:text-slate-200 mt-1">
            {{ pub.authors }}
          </p>
          <p v-if="pub.conference" class="text-xs text-slate-700 dark:text-slate-200 mt-0.5">
            {{ pub.conference }}
            <span v-if="pub.pages">, pp. {{ pub.pages }}</span>
          </p>
        </article>
      </div>
    </section> -->

    <!-- Certifications -->
    <section v-if="cv.certifications?.length" class="space-y-4">
      <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
        Certifications
      </h2>
      <div class="space-y-3 text-sm">
        <article
          v-for="(cert, index) in cv.certifications"
          :key="index"
          class="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 px-4 py-3 shadow-sm"
        >
          <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h3 class="font-medium text-slate-900 dark:text-slate-50 text-lg">
              {{ cert.certification }}
            </h3>
            <p v-if="cert.duration" class="text-sm text-slate-700 dark:text-slate-200">
              {{ cert.duration }}
            </p>
          </div>
          <p class="text-sm text-slate-700 dark:text-slate-200 mt-1">
            {{ cert.institution }}
            <span v-if="cert.location"> • {{ cert.location }}</span>
          </p>
          <p v-if="cert.description" class="text-sm text-slate-700 dark:text-slate-200 mt-2">
            {{ cert.description }}
          </p>
        </article>
      </div>
    </section>

    <!-- Awards -->
    <section v-if="cv.awards?.length" class="space-y-4">
      <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
        Awards &amp; Scholarships
      </h2>
      <div class="space-y-3 text-sm">
        <article
          v-for="(award, index) in cv.awards"
          :key="index"
          class="rounded-xl border border-amber-300 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/30 px-4 py-3 shadow-sm"
        >
          <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h3 class="font-medium text-slate-900 dark:text-slate-50">
              {{ award.title }}
            </h3>
            <p v-if="award.year" class="text-xs text-slate-700 dark:text-slate-200">
              {{ award.year }}
            </p>
          </div>
          <p v-if="award.organization" class="text-xs text-slate-700 dark:text-slate-200 mt-1">
            {{ award.organization }}
          </p>
          <p v-if="award.description" class="text-sm text-slate-700 dark:text-slate-200 mt-2">
            {{ award.description }}
          </p>
        </article>
      </div>
    </section>

    <!-- Service & Engagement (timeline-like, no cards) -->
    <section v-if="cv.extracurricular_activities?.length" class="space-y-4">
      <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
        Service &amp; Engagement
      </h2>

      <div class="relative pl-4">
        <!-- vertical line -->
        <span class="absolute left-1 top-1 bottom-1 w-px bg-slate-200 dark:bg-slate-700"></span>

        <div
          v-for="(activity, index) in cv.extracurricular_activities"
          :key="index"
          class="relative pl-4 pb-4 last:pb-0"
        >
          <!-- dot -->
          <span
            class="absolute left-0 top-1 w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-500"
            aria-hidden="true"
          ></span>

          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-50">
            {{ activity.organization }}
          </h3>

          <p class="text-md text-slate-700 dark:text-slate-200 mt-0.5">
            <span v-if="activity.location">{{ activity.location }}</span>
            <span v-if="activity.location && activity.duration"> • </span>
            <span v-if="activity.duration" class="font-medium">
              {{ activity.duration }}
            </span>
          </p>

          <p
            v-if="activity.description"
            class="text-sm text-slate-700 dark:text-slate-200 mt-1"
          >
            {{ activity.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Skills (no pills, two-column bullet list) -->
    <section v-if="skillGroups.length" class="space-y-4">
      <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
        Skills
      </h2>

      <div class="grid md:grid-cols-2 gap-4">
        <div
          v-for="group in skillGroups"
          :key="group.key"
          class="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-900/40"
        >
          <h3 class="text-md font-semibold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
            <span
              class="inline-block w-3 h-3 rounded-sm"
              :style="{ backgroundColor: skillColors[group.key] }"
            ></span>
            {{ group.label }}
          </h3>

          <ul class="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-800 dark:text-slate-100">
            <li
              v-for="item in group.items"
              :key="item"
              class="flex items-start gap-2"
            >
              <span
                class="mt-1 h-1.5 w-1.5 rounded-sm flex-shrink-0"
                :style="{ backgroundColor: skillColors[group.key] }"
              ></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- News & Talks -->
    <!-- <section v-if="Object.keys(newsByType).length" class="space-y-4">
      <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
        News &amp; Talks
      </h2>
      <p class="text-sm text-slate-700 dark:text-slate-200">
        Highlights from talks, conferences, and media contributions.
      </p>

      <div class="space-y-6 mt-3">
        <div
          v-for="type in newsTypeOrder"
          :key="type"
          v-if="newsByType[type]?.length"
          class="space-y-2"
        >
          <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-50 uppercase tracking-wide">
            {{ newsTypeLabels[type] || type }}
          </h3>
          <ul class="space-y-2">
            <li
              v-for="item in newsByType[type]"
              :key="item.date + item.description"
              class="flex gap-3 text-sm text-slate-900 dark:text-slate-50"
            >
              <div class="w-24 flex-shrink-0 text-xs font-mono text-slate-700 dark:text-slate-300 pt-0.5">
                {{ item.date }}
              </div>
              <div class="flex-1">
                <p class="leading-snug" v-html="item.description"></p>
                <a
                  v-if="item.link"
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-xs text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-200 mt-1 inline-block underline"
                >
                  View more
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section> -->
    <Footer  class="max-w-6xl mx-auto  "/>
  </div>
</template>
