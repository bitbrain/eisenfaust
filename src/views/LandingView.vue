<script setup lang="ts">
import Button from 'primevue/button';
import ParticleCanvas from '../components/ParticleCanvas.vue';
</script>

<template>
    <div class="landing-container">
      <div class="block"></div>
      <h1><ParticleCanvas>Eisenfaust</ParticleCanvas></h1>
      <h2>Dünir Zwergengilde</h2>
      <div class="button-container">
        <Button label="Trete uns bei" class="p-button-raised p-button-lg" />
        <Button label="Discord" class="p-button-raised p-button-lg p-button-outlined" />
      </div>
      <hr>
      <div class="section-container">
       <div class="section-content">
        <h2>Wer wir sind</h2>
        <p>Wir sind der Clan <strong>Eisenfaust</strong>, eine eingeschworene Gemeinschaft von Zwergen, die Sanctus hinter sich gelassen haben, um auf Verra eine neue Heimat zu errichten. Unsere wachsende Gemeinschaft von über 50 Dünir-Zwergen erfreut sich eines regen Austauschs, der seit dem Beginn von Alpha 2 stetig zunimmt.</p>
        <img src="/dwarf-exploring.webp" alt="Eisenfaust Logo">
        <p>Auf dem Alpha 2 EU-Server Lotharia sind wir mit über 30 Testern vertreten und erkunden gemeinsam die Welt von <a href="https://www.ashesofcreation.com/" target="_blank">Ashes of Creation</a>.</p>
       </div>
        
       <div class="section-content">
        <h2>Unsere Ziele</h2>
        <ul>
          <li>Aufbau einer Gebirgs-Node im Stil der Dünir-Zwerge</li>
          <li>Aktive Führung innerhalb der Lokalpolitik unserer Node</li>
          <li>Errichtung einer Gildenhalle als Beschützer-Gilde</li>
          <li>Gemeinsame Abenteuer in allen Spielbereichen: Handel, Handwerk, Krieg und Politik</li>
        </ul>
        <img src="/dwarven-friends.webp" alt="Eisenfaust Logo">
       </div>
        
       <div class="section-content">
        <h2>Wir bieten</h2>
        <ul>
          <li>Ein herzliches Zwergen-Umfeld mit über 20 Jahren MMO-Erfahrung in der Leitung</li>
          <li>Ein Zuhause für alle Dünir-Zwerge mit Raum zur Mitgestaltung</li>
          <li>Einen aktiven Discord-Server und eine optionale DSA Pen & Paper Zwergenrunde</li>
          <li>Offenheit für Allianzen mit ähnlichem Fokus</li>
        </ul>
        <p>Wir suchen freundliche und aktive Teamplayer (18+), die einen Dünir-Zwerg spielen möchten und Interesse haben, Teil unserer wachsenden Gemeinschaft zu werden.</p>
        
       </div>
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

h1 {
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

img {
  max-height: 20rem;
  object-fit: cover;
  width: 100%;
}

.button-container {
  display: flex;
  gap: 2rem;
  margin-top: 4rem;
}
</style>