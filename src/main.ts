import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import { routes } from "./router";
import { definePreset } from '@primeuix/themes';
import PrimeVue from "primevue/config";
import Aura from '@primeuix/themes/aura';
import "primeicons/primeicons.css"; 
import "./assets/theme/custom-theme.css"; 
import "./style.css"; 

const EisenfaustPreset = definePreset(Aura, {
  semantic: {
    primary: {
        50: 'var(--ember-900)',
        100:'var(--granite-900)',
        200: 'var(--granite-900)',
        300:'var(--granite-900)',
        400: 'var(--granite-900)',
        500: 'var(--granite-900)',
        600:'var(--granite-900)',
        700:'var(--granite-900)',
        800:'var(--granite-900)',
        900:'var(--granite-900)',
        950:'var(--granite-900)',
    }
}
});

// Export a function for SSG
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  ({ app, isClient }) => {
    // Register PrimeVue with custom theme options
    app.use(PrimeVue, {
      ripple: false,
      theme: {
        preset: EisenfaustPreset
    }
    });
  }
);
