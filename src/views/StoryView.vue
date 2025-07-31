<script setup lang="ts">
import Divider from '../components/Divider.vue';
// Helper functions for navigation and external link
const scrollToJoinSection = () => {
  const joinSection = document.getElementById('join-section');
  if (joinSection) {
    joinSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const openDiscord = () => {
  window.open('https://discord.gg/wqmuQrxH2r', '_blank', 'noopener,noreferrer');
};
</script>

<template>
    <div class="story-container">
      <div class="block"></div>
      <Divider>Akt 1</Divider>
      <div class="section-container">
       <div class="section-content">
        <h3>Schatten über Verra</h3>
       <p>Vor über tausend Jahren war Verra ein Land voller Leben, reich an Rohstoffen, geprägt von Vielfalt. Die Dünir lebten tief in den Bergen, in Hallen aus Stein, erfüllt von Handwerk, Gemeinschaft und jahrhundertealter Tradition.</p>
       <div class="image-container">
         <img src="/story-desolate.webp" alt="Desolation" class="full">
       </div>
       <p>Doch das Land veränderte sich. Eine dunkle Verderbnis kroch langsam über die Welt. Flüsse versiegten, Wälder verdorrten, und selbst der Fels verlor seine Wärme. Die Zwergenclans spürten das Unheil. Mit jedem Schlag des Hammers wurde die Gefahr spürbarer.</p>
       <p>Viele Clans retteten sich durch die uralten Portale nach Sanctus. Auch der Clan Eisenfaust verließ seine Heimat. Nicht aus Schwäche, sondern um das Erbe zu bewahren. Mit sich trugen sie die Lex Dünir – eine Sammlung von Werten, Bräuchen und Gesetzen, tief verwurzelt in der Kultur ihres Volkes. Sie war nicht in der Zeit des Verfalls entstanden, sondern lange zuvor. Ein Band, das sie auch fern der Heimat zusammenhielt.</p>
       <div class="image-container">
         <img src="/story-portal.webp" alt="Portal" class="full">
       </div>
       <p>Sanctus wurde zur Zuflucht. Doch das Herz der Zwerge schlug weiter für Verra.</p>
      </div>
    </div>

    <Divider>Akt 2</Divider>
    <div class="section-container">
      <div class="section-content">
        <h3>Das Schmieden des Bollwerks</h3>
        <p>Die Rückkehr nach Verra ist kein leichter Weg. Es geht nicht nur darum, bekannte Pfade zu betreten, sondern darum, ein verlorenes Reich neu zu formen. Eine Heimat zurückzubringen, die es so nicht mehr gibt.</p>
        <div class="image-container">
          <img src="/story-forge.webp" alt="Forge" class="full">
        </div>
        <p>Die Aufgabe ist gewaltig. Kein Clan kann sie allein stemmen. Deshalb schloss sich Eisenfaust mit anderen starken Dünir-Gilden zusammen. Ein gemeinsames Ziel eint sie: der Aufbau eines festen Ortes, verwurzelt im Stein, getragen von alter Weisheit und neuer Entschlossenheit.</p>
        <p>Die Lex Dünir lebt weiter. Nicht als starres Regelwerk, sondern als Fundament des Miteinanders. Aus ihr schöpfen die Zwerge Kraft, wenn Verra sich rau und unberechenbar zeigt.</p>
        <p>Gemeinsam errichten sie ihre Hallen. Die Schmiede glühen. Stimmen erheben sich in alten Liedern. Und zwischen den Mauern wächst etwas, das tiefer reicht als Erz oder Stein: Vertrauen.</p>
        <div class="image-container">
          <img src="/story-writing-dwarf.webp" alt="Writing Dwarf" class="full">
        </div>
        <p>Doch Verra ist nicht leer. In vergessenen Tunneln regt sich Bedrohung. Alte Feinde kehren zurück. Neue sind erwacht. Wer sich dem Bollwerk in den Weg stellt, findet seinen Namen im Buch der Grolle – ein stilles, aber bleibendes Zeugnis jener, die Zwergengemeinschaft bedrohen.</p>
        <p>Eisenfaust kämpft nicht für Ruhm. Sondern für ein Zuhause. Für den Schutz der Schwachen. Für das Versprechen, dass kein Zwerg mehr allein durch Dunkel schreiten muss.</p>
      </div>
    </div>

    <Divider>Akt 3</Divider>
    <div class="section-container">
      <div class="section-content">
        <h3>Das Vermächtnis der Eisenfaust</h3>
        <p>Inmitten der neu belebten Berge Verras wächst etwas Beständiges. Eisenfaust steht. Nicht als Macht, sondern als Ort. Als Heimstätte für jene, die mehr suchen als Ruhm und Reichtum.</p>
        <div class="image-container">
          <img src="/story-fortress.webp" alt="Fortress" class="full">
        </div>
        <p>Das Vermächtnis entsteht nicht durch große Taten, sondern durch tägliche Hingabe. Jeder, der durch die Hallen tritt, trägt dazu bei. Vom ersten Hammerschlag bis zum letzten Lied bei Kerzenlicht.</p>
        <p>Führung ist hier kein Privileg, sondern Verantwortung. Die Clanfürsten tragen keine Kronen. Sie tragen die Pflicht, zu einen, zu schützen und Haltung zu bewahren.</p>
        <div class="image-container">
          <img src="/story-tavern.webp" alt="Tavern" class="full">
        </div>
        <p>In den Tavernen klingt das Lachen. In den Werkstätten das Eisen. Und in den Herzen die Sehnsucht nach einem Ort, der bleibt. Ein Ort, der nicht nur aus Mauern besteht, sondern aus Geschichten, Erinnerungen und Verbundenheit.</p>
        <p>Denn was bleibt, ist nicht der einzelne Name. Was bleibt, ist das Zuhause, das wir gemeinsam erschaffen.</p>
       
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
  
  background-image: url('/eisenfaust-lex.webp');
  background-size: min(100%, 920px);
  background-position: center top;
  background-repeat: no-repeat;
  margin-top:-10rem;
}

.block {
  margin-bottom: 10rem;
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

@media (max-width: 768px), (hover: none) and (pointer: coarse) {
  .story-container {
    margin-top: -5rem;
  }
  .block {
    margin-bottom: 0rem;
  }
}
</style>