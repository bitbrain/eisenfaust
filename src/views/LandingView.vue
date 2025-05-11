<script setup lang="ts">
import Button from 'primevue/button';
import ParticleCanvas from '../components/ParticleCanvas.vue';
import { onMounted } from 'vue';

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

// Function to scroll to the join section
const scrollToJoinSection = () => {
  const joinSection = document.getElementById('join-section');
  if (joinSection) {
    joinSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Function to open Discord link
const openDiscord = () => {
  window.open('https://discord.gg/cSpdD2v5', '_blank', 'noopener,noreferrer');
};
</script>

<template>
    <div class="landing-container">
      <div class="block"></div>
      <h1><ParticleCanvas>Eisenfaust</ParticleCanvas></h1>
      <h2>Dünir Zwergengilde</h2>
      <div class="button-container primary">
        <Button label="Trete uns bei" class="p-button-raised p-button-lg" @click="scrollToJoinSection" />
        <Button label="Discord" class="p-button-raised p-button-lg p-button-outlined" @click="openDiscord" />
      </div>
      <hr>
      <div class="section-container">
       <div class="section-content">
        <h3>Wer wir sind</h3>
        <p>Wir sind der Clan <strong>Eisenfaust</strong>, eine eingeschworene Gemeinschaft von Zwergen, die Sanctus hinter sich gelassen haben, um auf Verra eine neue Heimat zu errichten. Unsere wachsende Gemeinschaft erfreut sich eines regen Austauschs, der seit dem Beginn von Alpha 2 stetig zunimmt.</p>
        <img src="/dwarf-exploring.webp" alt="Dwarves Exploring">
        <blockquote>Nicht der Pfad macht den Zwerg groß, sondern der Mut, ihn ins Ungewisse zu schlagen.</blockquote>
       </div>
        
       <div class="section-content">
        <h3>Unsere Ziele</h3>
        <ul>
          <li>Aufbau einer Gebirgs-Node im Stil der Dünir-Zwerge</li>
          <li>Aktive Führung innerhalb der Lokalpolitik unserer Node</li>
          <li>Errichtung einer Gildenhalle als Beschützer-Gilde</li>
          <li>Gemeinsame Abenteuer in allen Spielbereichen: Handel, Handwerk, Krieg und Politik</li>
        </ul>
        <img src="/rind.webp" alt="The Mighty Rind Tank" class="top">
        <blockquote>Ein Zwerg zeigt Größe nicht in Worten, sondern im Stand gegen Fels, Feuer und Zeit.</blockquote>
       </div>
        
       <div class="section-content">
        <h3>Wir bieten</h3>
        <ul>
          <li>Ein herzliches Zwergen-Umfeld mit über <strong>20 Jahren</strong> MMO-Erfahrung in der Leitung</li>
          <li>Ein Zuhause für alle Dünir-Zwerge mit Raum zur Mitgestaltung</li>
          <li>Einen aktiven <a href="https://discord.gg/cSpdD2v5" target="_blank" rel="noopener noreferrer">Discord-Server</a> und eine optionale DSA Pen & Paper Zwergenrunde</li>
          <li>Offenheit für Allianzen mit ähnlichem Fokus</li>
        </ul>
        <p>Wir suchen freundliche und aktive Teamplayer (18+), die einen Dünir-Zwerg spielen möchten und Interesse haben, Teil unserer wachsenden Gemeinschaft zu werden.</p>
       </div>
       
       <div id="join-section" class="section-content">
        <h3>Trete uns bei</h3>
        <p>Möchtest du Teil der Eisenfaust werden? Wir freuen uns auf deine Bewerbung!</p>
        <img src="/dwarven-friends.webp" alt="Dwarven Friends">
        <blockquote>Gemeinsam schaffen wir, was keiner allein vermag, und lachen dabei wie beim ersten Fass Bier.</blockquote>
        <p>Um uns beizutreten, kannst du:</p>
        <ul>
          <li>Uns auf unserem <a href="https://discord.gg/cSpdD2v5" target="_blank" rel="noopener noreferrer">Discord-Server</a> besuchen und dich vorstellen</li>
          <li>Eine Nachricht an unsere Gildenleitung senden</li>
          <li>An einem unserer wöchentlichen Rekrutierungstreffen teilnehmen</li>
        </ul>
        <p>Wir freuen uns darauf, dich kennenzulernen und gemeinsam die Welt von Verra zu erkunden!</p>
       </div>
      </div>
      <hr>
      <div class="button-container">
        <Button label="Trete uns bei" class="p-button-raised p-button-lg" @click="scrollToJoinSection" />
        <Button label="Discord" class="p-button-raised p-button-lg p-button-outlined" @click="openDiscord" />
      </div>
    </div>
</template>

<style scoped>
.landing-container {
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
    border: none;
    transition: all 0.3s ease;
  }

  & .p-button-raised:not(.p-button-outlined):hover {
    box-shadow: 0 0 0.75rem 0 var(--ember-500);
    color: var(--ember-200);
  }
}
</style>