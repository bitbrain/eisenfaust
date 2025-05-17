<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { onMounted, nextTick, watch } from 'vue'

const router = useRouter()

const initializeObserver = async () => {
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
      threshold: 0.1, // Element must be 10% visible before triggering
      rootMargin: '0px 0px -50px 0px' // Trigger 50px before element enters viewport
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
      <ul>
        <li><RouterLink to="/" active-class="active">Willkommen</RouterLink></li>
        <li><RouterLink to="/story" active-class="active">Geschichte</RouterLink></li>
        <li><RouterLink to="/media" active-class="active">Erinnerungen</RouterLink></li>
      </ul>
    </nav>
    <router-view />
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
  transition: filter 1s ease;
}

.section-content.visible img {
  filter: blur(0) saturate(100%);
}

footer {
  font-size: 1rem;
  text-align: center;
  padding: 1rem;
  margin-top: 6rem;
  margin-bottom: 2rem;
  color: var(--granite-700);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
}

.logo-wrapper {
  position: relative;
  display: inline-block;
}

.logo-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--granite-700); 
  mix-blend-mode: multiply;
  pointer-events: none;
}

.logo {
  display: block;
  width: 5rem;
  height: 5rem;
  filter: grayscale(100%) brightness(1);
}

nav {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
}

nav > ul {
  display: flex;
  gap: 2.5rem;
  padding: 0;
  margin: 0;
  justify-content: center;
}

nav > ul > li {
  list-style: none;
  font-size: 1.8rem;

  a {
    text-decoration: none;
    color: var(--ember-700);
    text-shadow: 0 0 0.75rem rgb(108, 31, 14);
    transition: color 0.3s ease, text-shadow 0.3s ease;
  }

  a:hover, a.active {
    color: var(--ember-900);
    text-shadow: 0 0 10px hsla(from var(--ember-700) h s l / 0.6);
  }
}
</style>
