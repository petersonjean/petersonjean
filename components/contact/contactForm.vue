<template>
  <div class="bg-slate-100 p-8 rounded-lg">
    <h2 class="text-5xl font-bold mb-2 text-slate-700">Get in touch!</h2>
    <div class="w-16 h-1 bg-accent-500 mb-8"></div>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Name Field -->
      <div>
        <label for="name" class="block text-sm font-medium text-slate-600 mb-2">
          Name *
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          placeholder="Your name"
          class="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:border-orange-400 focus:outline-none transition text-slate-700 placeholder:text-slate-400"
          :disabled="isSubmitting"
        />
      </div>

      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm font-medium text-slate-600 mb-2">
          Email *
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="your.email@example.com"
          class="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:border-orange-400 focus:outline-none transition text-slate-700 placeholder:text-slate-400"
          :disabled="isSubmitting"
        />
      </div>

      <!-- Subject Field (Optional) -->
      <div>
        <label for="subject" class="block text-sm font-medium text-slate-600 mb-2">
          Subject
        </label>
        <input
          id="subject"
          v-model="form.subject"
          type="text"
          placeholder="What is this about?"
          class="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:border-orange-400 focus:outline-none transition text-slate-700 placeholder:text-slate-400"
          :disabled="isSubmitting"
        />
      </div>

      <!-- Message Field -->
      <div>
        <label for="message" class="block text-sm font-medium text-slate-600 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          v-model="form.message"
          required
          rows="5"
          placeholder="Your message..."
          class="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg focus:border-orange-400 focus:outline-none transition resize-none text-slate-700 placeholder:text-slate-400"
          :disabled="isSubmitting"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-[var(--accent-500)] hover:[var(--accent-700)] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </button>

      <!-- Status Messages -->
      <div v-if="statusMessage" class="mt-4">
        <div
          :class="[
            'p-4 rounded-lg font-medium',
            statusType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          ]"
        >
          {{ statusMessage }}
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Form data
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Status tracking
const isSubmitting = ref(false)
const statusMessage = ref('')
const statusType = ref('') // 'success' or 'error'

// Replace with your Web3Forms access key
// Get one free at: https://web3forms.com
const ACCESS_KEY = 'd8ccb417-2818-4036-898d-e163796bf259'

const handleSubmit = async () => {
  isSubmitting.value = true
  statusMessage.value = ''

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject || 'New Contact Form Submission',
        message: form.value.message
      })
    })

    const result = await response.json()

    if (result.success) {
      statusType.value = 'success'
      statusMessage.value = 'Thank you! Your message has been sent successfully.'
      
      // Reset form
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    } else {
      throw new Error('Submission failed')
    }
  } catch (error) {
    statusType.value = 'error'
    statusMessage.value = 'Oops! Something went wrong. Please try again later.'
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>