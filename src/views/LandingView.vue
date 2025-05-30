<script setup lang="ts">
import Button from 'primevue/button';
import ParticleCanvas from '../components/ParticleCanvas.vue';
import { onMounted } from 'vue';
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
  window.open('https://discord.gg/cSpdD2v5', '_blank', 'noopener,noreferrer');
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
        <p>Wir sind ein eingeschworener Clan von <a href="https://ashesofcreation.wiki/D%C3%BCnir" target="_blank" rel="noopener noreferrer">Dünir-Zwergen</a>, die mehr suchen als Loot: Bei <strong>Eisenfaust</strong> stehen Gemeinschaft, Verlässlichkeit und Mitgestaltung im Vordergrund. Unsere Tore stehen jenen offen, die Wert auf respektvolles Miteinander und langlebige Bande legen – egal ob bei Abenteuern, im Handwerk oder bei einem geselligen Abend am Feuer.</p>
        <img src="/dwarf-exploring.webp" alt="Dwarves Exploring">
        <p>Als Gründungsmitglied der Zwergen-Allianz <strong>The Bulwark</strong> setzen wir uns aktiv für den Zusammenhalt und die Stärke der europäischen Dünir-Gemeinschaft ein – über Gildengrenzen hinaus. Das Bollwerk erfreut sich großer und aktiver Zwergengilden mit regelmäßigen Events zur Stärkung der Allianz.</p>
       </div>
        
       <div class="section-content">
        <h3>Wofür wir stehen</h3>
        <p>Unsere Heimat liegt in den Bergen – unser Blick aber ist weit. Eisenfaust ist eine PvX-Gilde, die sich dem Aufbau einer Gebirgs-Node verschrieben hat, ganz im Stil der Dünir: Mit starken Mauern, klugen Köpfen und entschlossenen Händen. Wir engagieren uns in allen Facetten des Spiels – von Handel über Handwerk bis hin zu Krieg und Politik.</p>
        <img src="/mountain-fortress.webp" alt="Mountain Fortress" class="full">
        <p>Darüber hinaus pflegen wir unsere eigene Zwergenkultur: Pen & Paper-Runden, optionales Rollenspiel und gemeinschaftliche Events gehören für viele von uns dazu – ohne Zwang, aber mit Leidenschaft.</p>
       </div>
        
       <div class="section-content">
        <h3>Teil werden</h3>
        <p>Du willst nicht nur spielen, sondern etwas mit aufbauen? Dann betrete unsere Hallen. Der erste Schritt zu Eisenfaust ist ganz einfach: Unserem Discord-Server beitreten und ein persönliches Gespräch.</p>
        <img src="/dwarven-friends.webp" alt="Dwarven Friends">
        <p>Was zählt, ist dein Charakter – nicht dein Gear. Wenn du Teamgeist, Respekt und Freude an einer verlässlichen Gemeinschaft mitbringst, bist du bei uns genau richtig.</p>
       </div>
       
       <div id="join-section" class="section-content">
        <h3>Für die Zukunft geschmiedet</h3>
        <p>Eisenfaust ist kein kurzfristiges Projekt, sondern eine Gemeinschaft mit Weitblick. Unser Fundament ist stark – und wir suchen keine Masse, sondern Mitstreiter mit Haltung.</p>
        <img src="/rind.webp" alt="The Mighty Rind Tank" class="top">
        <blockquote>Wenn du Teil von etwas Echtem werden willst, bist du bei uns richtig.</blockquote>
       </div>
      </div>
      <Divider>Gemeinschaft</Divider>
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

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .landing-container {
    margin-top: -4rem;
  }
  
  h1 {
    font-size: 4rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  h3 {
    font-size: 2rem;
  }
  
  .button-container {
    gap: 0.75rem;
  }
  
  .button-container.primary {
    margin-top: 2rem;
    
    & .p-button-raised {
      font-size: 1.1rem;
      padding: 0.75rem 1.25rem;
    }
  }
}

@media (max-width: 480px) {
  .landing-container {
    margin-top: -2rem;
  }
  
  h1 {
    font-size: 3rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
  
  .button-container {
    gap: 0.5rem;
    flex-direction: column;
    width: 100%;
    max-width: 280px;
  }
  
  .button-container.primary {
    margin-top: 1.5rem;
    
    & .p-button-raised {
      font-size: 1rem;
      padding: 0.75rem 1rem;
      width: 100%;
    }
  }
}
</style>