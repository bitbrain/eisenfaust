<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { onMounted, nextTick, watch, ref } from 'vue'
import ParticleCanvas from './components/ParticleCanvas.vue'

const router = useRouter()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu when route changes
watch(() => router.currentRoute.value, () => {
  closeMobileMenu()
})

const initializeObserver = async () => {
  // Only run on client side
  if (typeof window === 'undefined') return;

  // Wait for the next tick to ensure router view is mounted
  await nextTick()
  
  // Small delay to ensure all components are fully rendered
  setTimeout(() => {
    // Configure intersection observer with options for better scroll effect
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add a smaller delay for a more subtle effect
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 80);
        }
      });
    }, {
      threshold: 0.05, // Element must be 5% visible before triggering
      rootMargin: '0px 0px -150px 0px' // Trigger 150px before element enters viewport
    });
    
    // Get all sections and observe them
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    // Make first section visible immediately if at top of page
    if (window.scrollY < 100) {
      const firstSection = document.querySelector('.section-content');
      if (firstSection) {
        firstSection.classList.add('visible');
      }
    }
  }, 100);
};

// Initialize on mount
onMounted(() => {
  initializeObserver();
});

// Watch for route changes
watch(() => router.currentRoute.value, () => {
  initializeObserver();
}, { immediate: true });
</script>

<template>
  <main>
    <nav>
      <div class="nav-container">
        <div class="nav-brand">
          <img class="nav-logo" src="/logo.png" alt="Eisenfaust Logo" />
          <span class="nav-title">Eisenfaust</span>
        </div>
        
        <div class="nav-menu">
          <ul class="nav-list">
            <li><RouterLink to="/" active-class="active">Willkommen</RouterLink></li>
            <li><RouterLink to="/story" active-class="active">Geschichte</RouterLink></li>
            <li><RouterLink to="/media" active-class="active">Erinnerungen</RouterLink></li>
          </ul>
        </div>
        
        <button class="burger-menu" @click="toggleMobileMenu" :class="{ 'active': isMobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
    
    <!-- Mobile Sidebar -->
    <div class="mobile-sidebar" :class="{ 'open': isMobileMenuOpen }" @click="closeMobileMenu">
      <div class="sidebar-content" @click.stop>
        <div class="sidebar-header">
          <img class="sidebar-logo" src="/logo.png" alt="Eisenfaust Logo" />
          <span class="sidebar-title">Eisenfaust</span>
        </div>
        <ul class="sidebar-menu">
          <li><RouterLink to="/" active-class="active" @click="closeMobileMenu">Willkommen</RouterLink></li>
          <li><RouterLink to="/story" active-class="active" @click="closeMobileMenu">Geschichte</RouterLink></li>
          <li><RouterLink to="/media" active-class="active" @click="closeMobileMenu">Erinnerungen</RouterLink></li>
        </ul>
      </div>
    </div>
    
    <router-view />
    <div class="background-image">
    </div>
    <ParticleCanvas :spawn-offset-y="400" :particles="350" class="particle-canvas"></ParticleCanvas>
    <footer>
      <div class="logo-wrapper"><img class="logo" src="/logo.png" alt="Eisenfaust Logo" /></div>
      © 2025 Eisenfaust. Alle Rechte vorbehalten.
    </footer>
  </main>
</template>

<style>
.section-content {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.section-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-content img {
  filter: blur(8px) saturate(0%);
  transition: filter 2s ease;
}

.section-content.visible img {
  filter: blur(0) saturate(100%);
}

footer {
  font-size: clamp(0.8rem, 2vw, 1rem);
  text-align: center;
  font-weight: 700;
  padding: clamp(0.5rem, 2vw, 1rem);
  padding-bottom: clamp(2rem, 5vw, 4rem);
  color: black;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 2rem);
}

.logo {
  display: block;
  width: clamp(3rem, 8vw, 5rem);
  height: clamp(3rem, 8vw, 5rem);
  opacity: 0.5;
  filter: brightness(1.0) contrast(2.5) saturate(0.4);
  margin-top: clamp(2rem, 5vw, 4rem);
}

nav {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  padding: clamp(0.5rem, 2vw, 1rem);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-logo {
  width: 2.5rem;
  height: 2.5rem;
  opacity: 0.8;
  filter: brightness(1.0) contrast(2.5) saturate(0.4);
  display: none;
}

.nav-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--ember-700);
  text-shadow: 0 0 0.75rem rgb(108, 31, 14);
  display: none;
}

.nav-menu {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  gap: clamp(1rem, 4vw, 2.5rem);
  padding: 0;
  margin: 0;
  list-style: none;
  flex-wrap: wrap;
}

.nav-list > li {
  font-size: clamp(1rem, 3vw, 1.8rem);
  list-style: none;

  a {
    text-decoration: none;
    color: var(--ember-700);
    text-shadow: 0 0 0.75rem rgb(108, 31, 14);
    transition: color 0.3s ease, text-shadow 0.3s ease;
    white-space: nowrap;
  }

  a:hover, a.active {
    color: var(--ember-900);
    text-shadow: 0 0 10px hsla(from var(--ember-700) h s l / 0.6);
  }
}

.burger-menu {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 1.75rem;
  height: 1.75rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;
}

.burger-menu span {
  width: 100%;
  height: 3px;
  background: var(--ember-700);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.burger-menu.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.burger-menu.active span:nth-child(2) {
  opacity: 0;
}

.burger-menu.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-sidebar.open {
  opacity: 1;
  visibility: visible;
}

.sidebar-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 280px;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(16px);
  padding: 2rem 1.5rem;
  padding-top: 4rem;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-sidebar.open .sidebar-content {
  transform: translateX(0);
  padding-top: 4rem;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--granite-300);
}

.sidebar-logo {
  width: 3rem;
  height: 3rem;
  opacity: 0.8;
  filter: brightness(1.0) contrast(2.5) saturate(0.4);
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--ember-700);
  text-shadow: 0 0 0.75rem rgb(108, 31, 14);
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-menu > li {
  font-size: 1.5rem;
  list-style: none;

  a {
    text-decoration: none;
    color: var(--ember-700);
    text-shadow: 0 0 0.75rem rgb(108, 31, 14);
    transition: color 0.3s ease, text-shadow 0.3s ease;
    display: block;
    padding: 0.25rem 0;
  }

  a:hover, a.active {
    color: var(--ember-900);
    text-shadow: 0 0 10px hsla(from var(--ember-700) h s l / 0.6);
  }
}

.background-image {
  width: 100vw;
  height: 100vh;
  background-image: url('/lava-glow.webp');
  background-size: min(150%, 2080px) auto;
  background-repeat: no-repeat;
  background-position: bottom;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;
}

main {
  position: relative;
  min-height: 100vh;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .nav-logo,
  .nav-title {
    display: block;
  }
  
  .nav-menu {
    display: none;
  }
  
  .burger-menu {
    display: flex;
  }
  
  .logo {
    width: 3rem;
    height: 3rem;
    margin-top: 2rem;
  }
  
  footer {
    font-size: 0.9rem;
    padding: 0.75rem;
    padding-bottom: 2rem;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  nav {
    padding: 0.5rem;
  }
  
  .nav-logo {
    width: 2rem;
    height: 2rem;
  }
  
  .nav-title {
    font-size: 1.2rem;
  }
  
  .burger-menu {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .sidebar-content {
    width: 250px;
    padding: 1.5rem 1rem;
  }
  
  .sidebar-logo {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .sidebar-title {
    font-size: 1.3rem;
  }
  
  .sidebar-menu > li {
    font-size: 1.3rem;
  }
  
  .logo {
    width: 2.5rem;
    height: 2.5rem;
    margin-top: 1.5rem;
  }
  
  footer {
    font-size: 0.8rem;
    padding: 0.5rem;
    padding-bottom: 1.5rem;
    gap: 0.75rem;
  }
}
</style>
