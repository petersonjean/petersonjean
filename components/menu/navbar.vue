<script lang="ts"  setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Mobile menu state
const isMobileMenuOpen = ref(false)

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  const nav = event.target.closest('nav')
  if (!nav && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

// Close mobile menu on window resize
const handleResize = () => {
  if (window.innerWidth >= 768) {
    closeMobileMenu()
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
})
</script>
<template>
    <nav class=" top-0 left-0 right-0 z-50 navbar-blur border-b border-white/20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <h1 class="text-xl font-bold text-slate-700  ">
            Peterson Jean
          </h1>
        </div>

 <!-- Desktop Menu -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <NuxtLink 
              to="/" 
              :class="[
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                $route.path === '/' 
                  ? 'active text-white scale-105' 
                  : 'text-gray-700 hover:text-slate-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-white/50'
              ]"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/publications" 
              :class="[
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                $route.path === '/publications' 
                  ? 'active text-white scale-105' 
                  : 'text-gray-700 hover:text-slate-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-white/50'
              ]"
            >
              Publications
            </NuxtLink>
            <NuxtLink 
              to="/blog" 
              :class="[
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                $route.path === '/blog' || $route.path.startsWith('/blog/') 
                  ? 'active text-white scale-105' 
                  : 'text-gray-700 hover:text-slate-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-white/50'
              ]"
            >
              Blog
            </NuxtLink>
            <NuxtLink 
              to="/resume" 
              :class="[
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                $route.path === '/resume' 
                 ? 'active text-white scale-105' 
                  : 'text-gray-700 hover:text-slate-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-white/50'
              ]"
            >
              Resume
            </NuxtLink>
            <NuxtLink 
              to="/contact" 
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                $route.path === '/contact' 
                  ? 'active text-white scale-105' 
                  : 'text-gray-700 hover:text-slate-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-white/50'
              ]"
            >
              Contact
            </NuxtLink>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button 
            @click="toggleMobileMenu"
            class="text-gray-700 hover:text-slate-700 p-2 rounded-lg hover:bg-white/50 transition-colors duration-200"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-md"
      >
        <div class="px-4 pt-8 pb-6 space-y-4">
          <NuxtLink 
            to="/" 
            @click="closeMobileMenu"
            :class="[
              'block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200',
              $route.path === '/' 
                ? 'text-slate-700 bg-lavender/50 font-semibold' 
                : 'text-gray-700 hover:text-slate-700 hover:bg-lavender/30'
            ]"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/publications" 
            @click="closeMobileMenu"
            :class="[
              'block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200',
              $route.path === '/publications' 
                ? 'text-slate-700 bg-lavender/50 font-semibold' 
                : 'text-gray-700 hover:text-slate-700 hover:bg-lavender/30'
            ]"
          >
            Publications
          </NuxtLink>
          <NuxtLink 
            to="/blog" 
            @click="closeMobileMenu"
            :class="[
              'block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200',
              $route.path === '/blog' || $route.path.startsWith('/blog/') 
                ? 'text-slate-700 bg-lavender/50 font-semibold' 
                : 'text-gray-700 hover:text-slate-700 hover:bg-lavender/30'
            ]"
          >
            Blog
          </NuxtLink>
          <NuxtLink 
            to="/resume" 
            @click="closeMobileMenu"
            :class="[
              'block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200',
              $route.path === '/resume' 
                ? 'text-slate-700 bg-lavender/50 font-semibold' 
                : 'text-gray-700 hover:text-slate-700 hover:bg-lavender/30'
            ]"
          >
            Resume
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            @click="closeMobileMenu"
            :class="[
              'block px-4 py-3 rounded-lg text-base font-medium text-center transition-all duration-200 mt-6',
              $route.path === '/contact' 
                ? 'bg-gradient-to-r from-slate-blue to-dusty-rose text-white shadow-lg' 
                : 'bg-gradient-to-r from-slate-blue to-dusty-rose text-white hover:shadow-lg'
            ]"
          >
            Contact
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
  
</template>
<style scoped>
      .active::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        right: 0;
        height: 3px;
        background-color: var(--accent-600);
        border-radius: 2px;
      }
      .active {
        color: var(--primary-700);
        font-weight: 600;
      }
        .gradient-bg {
            background: linear-gradient(135deg, #7B8CB8 0%, #C4A5A5 100%);
        }
        .navbar-blur {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.95);
        }
        .card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .mobile-menu {
            transition: all 0.3s ease;
            transform: translateX(100%);
            opacity: 0;
        }
        .mobile-menu.open {
            transform: translateX(0);
            opacity: 1;
        }
</style>
