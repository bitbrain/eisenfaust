import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import { routes } from "./router";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "./assets/theme/custom-theme.css"; // Custom theme overrides
import "./style.css"; // Import your global styles

// Export a function for SSG
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  ({ app, isClient }) => {
    // Register PrimeVue with custom theme options
    app.use(PrimeVue, {
      ripple: false,
    });
  }
);
