import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from 'unplugin-vue-components/resolvers';
import matter from 'gray-matter'
import { marked } from 'marked'

export default defineConfig({
  base: '/eisenfaust',
  plugins: [
    vue(),
    tsconfigPaths(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    }),
    {
      name: 'markdown-loader',
      transform(code, id) {
        if (id.endsWith('.md')) {
          const { content, data } = matter(code);
          const html = marked(content);
          return `export const frontmatter = ${JSON.stringify(data)}; export default ${JSON.stringify(html)};`;
        }
      }
    }
  ]
});
