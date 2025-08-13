import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import { routes } from "./router";
import { definePreset } from '@primeuix/themes';
import PrimeVue from "primevue/config";
import Aura from '@primeuix/themes/aura';

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
  { 
    routes, 
    base: import.meta.env.BASE_URL,
    // Ensure the page scrolls to top-left on each route navigation
    scrollBehavior: () => ({ left: 0, top: 0 }) 
  },
  ({ app, isClient, router }) => {
    // Register PrimeVue with custom theme options
    app.use(PrimeVue, {
      ripple: false,
      theme: {
        preset: EisenfaustPreset
    }
    });

    // Dynamically load Google Analytics (GA4) if measurement ID is provided
    if (isClient) {
      const gaId = (import.meta as any).env.VITE_GA_MEASUREMENT_ID;
      if (gaId) {
        // Inject gtag script
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(gtagScript);

        // Initialize gtag
        const inline = document.createElement('script');
        inline.text = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}', { anonymize_ip: true });`;
        document.head.appendChild(inline);

        // Track page views on route change (for SPA navigation)
        router.afterEach((to) => {
          if ((window as any).gtag) {
            (window as any).gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
              page_path: to.fullPath
            });
          }
        });
      }
    }
  }
);
