import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    tsconfigPaths(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })
  ]
});
