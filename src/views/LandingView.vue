<script setup lang="ts">
import Button from 'primevue/button';
import ParticleCanvas from '../components/ParticleCanvas.vue';
import Divider from '../components/Divider.vue';

// Function to scroll to the join section
const scrollToJoinSection = () => {
  const joinSection = document.getElementById('join-section');
  if (joinSection) {
    joinSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Function to open Discord link
const openDiscord = () => {
  window.open('https://discord.gg/wqmuQrxH2r', '_blank', 'noopener,noreferrer');
};
</script>

<template>
    <div class="landing-container">
      <div class="block"></div>
      <ParticleCanvas><h1>Eisenfaust</h1></ParticleCanvas>
      <h2>Dünir Zwergengilde</h2>
      <div class="button-container primary">
        <Button label="Trete uns bei" class="p-button-raised p-button-lg" @click="scrollToJoinSection" />
        <Button label="Discord" class="p-button-raised p-button-lg p-button-outlined" @click="openDiscord" />
      </div>
      <Divider>Ehre</Divider>
      <div class="section-container">
       <div class="section-content">
        <h3>Wer wir sind</h3>
        <p>Wir sind ein deutschsprachiger Clan von <a href="https://ashesofcreation.wiki/D%C3%BCnir" target="_blank" rel="noopener noreferrer">Dünir-Zwergen</a> in Ashes of Creation, die mehr suchen als nur Loot. Bei <strong>Eisenfaust</strong> zählen Gemeinschaft, Verlässlichkeit und Mitgestaltung. Unsere Türen stehen allen offen, die Wert auf ein respektvolles Miteinander und echte Verbindung legen – ob bei Abenteuern, am Amboss oder an einem ruhigen Abend am Feuer.</p>
        <div class="image-container">
          <img src="/dwarf-exploring.webp" alt="Dwarves Exploring">
        </div>
        <p>Als Gründungsmitglied der Zwergen-Allianz <a href="https://discord.gg/xuGtNTjWBm" target="_blank" rel="noopener noreferrer">The Bulwark</a> setzen wir uns aktiv für den Zusammenhalt der europäischen Dünir-Gemeinschaft ein. Dieses Bündnis bringt große und engagierte Zwergengilden zusammen. Durch gemeinsame Aktionen, Austausch und regelmäßige Events wächst daraus ein stabiles Netzwerk, das weit über einzelne Gilden hinausreicht.</p>
       </div>
        
       <div class="section-content">
        <h3>Wofür wir stehen</h3>
        <p>Unsere Heimat liegt in den Bergen. Doch unser Blick geht weit darüber hinaus. Eisenfaust ist eine PvX-Gilde mit dem Ziel, eine Gebirgs-Node im Stil der Dünir zu errichten. Felsenfest, mit klarem Geist und tatkräftigen Händen. Ob Handel, Handwerk, Krieg oder Politik – wir gestalten alle Seiten des Spiels aktiv mit.</p>
        <div class="image-container">
          <img src="/mountain-fortress.webp" alt="Mountain Fortress" class="full">
        </div>
        <p>Neben dem Spiel pflegen wir unsere eigene Zwergenkultur. Pen-&-Paper-Runden, gemeinschaftliche Unternehmungen und gelegentliches Rollenspiel gehören für viele dazu. Nicht verpflichtend, aber mit Begeisterung.</p>
       </div>
        
       <div class="section-content">
        <h3>Teil werden</h3>
        <p>Du willst nicht nur spielen, sondern etwas mit aufbauen? Dann tritt ein. Alles beginnt mit einem Besuch auf unserem <a href="https://discord.gg/wqmuQrxH2r" target="_blank" rel="noopener noreferrer">Discord</a> und einem kurzen Gespräch.</p>
        <div class="image-container">
          <img src="/dwarven-band.webp" alt="Dwarven Band">
        </div>
        <p>Für uns zählt, wer du bist – nicht was du trägst. Wenn du Teamgeist mitbringst, Respekt lebst und Freude an einer verlässlichen Gemeinschaft hast, findest du bei uns ein Zuhause.</p>
       </div>
       
       <div id="join-section" class="section-content">
        <h3>Für die Zukunft geschmiedet</h3>
        <p>Eisenfaust ist kein kurzfristiges Projekt, sondern eine Gemeinschaft mit Weitblick. Unser Fundament ist stark, unsere Ziele sind klar. Wir suchen keine Masse, sondern Menschen mit Haltung.</p>
        <div class="image-container">
          <img src="/rind.webp" alt="The Mighty Rind Tank" class="top">
        </div>
        <p>Gegründet wurde Eisenfaust 2022 als Zwergenprojekt für Ashes of Creation. Seitdem wächst unsere Truppe aus Zwerginnen und Zwergen beständig – entschlossen, bodenständig und bereit für das, was kommt.</p>
        <blockquote>Wenn du Teil von etwas Echtem werden willst, bist du hier genau richtig.</blockquote>
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

h1{
  font-size: clamp(3rem, 12vw, 8rem);
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
  font-size: clamp(1.5rem, 6vw, 3rem);
  font-weight: bold;
  text-align: center;
  color: var(--granite-700);
  margin: 0;
}

h3 {
  font-size: clamp(1.8rem, 6vw, 3rem);
  font-weight: bold;
  text-align: center;
  background: linear-gradient(to bottom, var(--ember-900), var(--ember-700));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0;
  margin-bottom: 1rem;
}

.button-container {
  display: flex;
  gap: clamp(0.5rem, 2vw, 1rem);
  flex-wrap: wrap;
  justify-content: center;
}

.button-container.primary {
  margin-top: clamp(1.5rem, 5vw, 3rem);

  & .p-button-raised {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem);
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

  & .p-button-raised.p-button-outlined:hover {
    background-color: var(--granite-300);
  }

  & .p-button-raised:not(.p-button-outlined):hover {
    box-shadow: 0 0 1.75rem 0 hsl(from var(--ember-500) h s l / 0.5);
    color: var(--ember-200);
    text-shadow: 0 1px 1px var(--ember-800);
  }
}

@media (max-width: 768px), (hover: none) and (pointer: coarse) {
  .landing-container {
    margin-top: -3rem;
  }
  
  h1 {
    font-size: 4rem;
  }
  
  h2 {
    font-size: 2.1rem;
  }
  
  h3 {
    font-size: 2.3rem;
  }
  
  .button-container {
    gap: 1rem;
    flex-direction: column;
    width: 100%;
    max-width: 280px;
  }
  
  .button-container.primary {
    & .p-button-raised {
      font-size: 1.5rem;
    }
  }
}
</style>