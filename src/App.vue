<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { onMounted, nextTick, watch } from 'vue'
import ParticleCanvas from './components/ParticleCanvas.vue'

const router = useRouter()

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
    <div class="background-image">
    </div>
    <ParticleCanvas></ParticleCanvas>
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
  font-size: clamp(0.8rem, 2vw, 1rem);
  text-align: center;
  font-weight: 700;
  padding: clamp(0.5rem, 2vw, 1rem);
  padding-bottom: clamp(2rem, 5vw, 4rem);
  color: black;
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

nav > ul {
  display: flex;
  gap: clamp(1rem, 4vw, 2.5rem);
  padding: 0;
  margin: 0;
  justify-content: center;
  flex-wrap: wrap;
}

nav > ul > li {
  list-style: none;
  font-size: clamp(1rem, 3vw, 1.8rem);

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

.background-image {
  width: 100vw;
  height: 100vh;
  background-image: url('/lava-glow.webp');
  background-size: min(100%, 2080px) auto;
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
  nav > ul {
    gap: 1rem;
  }
  
  nav > ul > li {
    font-size: 1.2rem;
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
  
  nav > ul {
    gap: 0.75rem;
    flex-direction: column;
    align-items: center;
  }
  
  nav > ul > li {
    font-size: 1rem;
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
