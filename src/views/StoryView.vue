<script setup lang="ts">
import { onMounted } from 'vue';
import Divider from '../components/Divider.vue';
onMounted(() => {
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
});
</script>

<template>
    <div class="story-container">
      <div class="block"></div>
      <Divider>Story</Divider>
      <div class="section-container">
       <div class="section-content">
        <h3>Es war einmal ein Zwerg</h3>
        <p>Wir sind der Clan <strong>Eisenfaust</strong>, eine eingeschworene Gemeinschaft von Zwergen, die Sanctus hinter sich gelassen haben, um auf Verra eine neue Heimat zu errichten. Unsere wachsende Gemeinschaft erfreut sich eines regen Austauschs, der seit dem Beginn der <a href="https://de.wikipedia.org/wiki/Alpha_2" target="_blank" rel="noopener noreferrer">Alpha 2</a> stetig zunimmt.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.story-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  
  background-image: url('/eisenfaust-banner.webp');
  background-size: min(100%, 1080px);
  background-position: center top;
  background-repeat: no-repeat;
  margin-top:-7rem;
}

h1{
  font-size: 8rem;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(to bottom, var(--ember-900), var(--ember-700));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0;
}

h1::before {
  content: "Eisenfaust";
  position: absolute;
  z-index: -1;
  text-shadow: 0 0 0.5rem hsl(from var(--ember-500) h s l / 0.5);
}

h2 {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  color: var(--granite-700);
  margin: 0;
}

h3 {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(to bottom, var(--ember-900), var(--ember-700));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0;
  margin-bottom: 1rem;
}

img {
  max-height: 20rem;
  object-fit: cover;
  width: 100%;
}

img.top {
  object-position: top;
}

.button-container {
  display: flex;
  gap: 1rem;
}

.button-container.primary {
  margin-top: 3rem;

  & .p-button-raised {
    font-size: 1.5rem;
    padding: 1rem 2rem;
    font-weight: bold;
  }

  & .p-button-raised:not(.p-button-outlined) {
    background: linear-gradient(to bottom, var(--ember-900), var(--ember-700));
    color: black;
    border: none;
    text-shadow: 0 1px 1px var(--ember-900);
    transition: all 0.3s ease;
  }

  & .p-button-raised.p-button-outlined {
    color: var(--granite-700);
    border-color: var(--granite-700);
    border-width: 2.5px;
  }

  & .p-button-raised:not(.p-button-outlined):hover {
    box-shadow: 0 0 1.75rem 0 hsl(from var(--ember-500) h s l / 0.5);
    color: var(--ember-200);
    text-shadow: 0 1px 1px var(--ember-800);
  }
}
</style>