import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from 'unplugin-vue-components/resolvers';
import matter from 'gray-matter'
import { marked } from 'marked'
import { resolve } from 'path';
import fs from 'fs';
import sharp from 'sharp';

// Thumbnail generation plugin
function thumbnailPlugin() {
  const thumbnailWidth = 300; // Width of thumbnails
  const thumbnailHeight = 300; // Height of thumbnails
  const srcDir = resolve(process.cwd(), 'public/screenshots');
  const thumbDir = resolve(process.cwd(), 'public/thumbnails');

  return {
    name: 'vite-plugin-thumbnail-generator',
    buildStart: async () => {
      // Check if source directory exists
      if (!fs.existsSync(srcDir)) {
        console.warn(`Screenshots directory not found: ${srcDir}`);
        fs.mkdirSync(srcDir, { recursive: true });
        return;
      }

      // Create thumbnails directory if it doesn't exist
      if (!fs.existsSync(thumbDir)) {
        fs.mkdirSync(thumbDir, { recursive: true });
      }

      try {
        // Get all image files
        const files = fs.readdirSync(srcDir);
        const imageFiles = files.filter(file => 
          /\.(jpg|jpeg|png|webp)$/i.test(file)
        );

        console.log(`Found ${imageFiles.length} images in ${srcDir}`);

        // Generate thumbnails for each image
        for (const file of imageFiles) {
          const srcPath = resolve(srcDir, file);
          const thumbPath = resolve(thumbDir, file);

          // Skip if thumbnail already exists and is newer than source
          if (fs.existsSync(thumbPath)) {
            const srcStat = fs.statSync(srcPath);
            const thumbStat = fs.statSync(thumbPath);
            if (thumbStat.mtime > srcStat.mtime) {
              continue;
            }
          }

          // Generate thumbnail
          await sharp(srcPath)
            .resize(thumbnailWidth, thumbnailHeight, {
              fit: 'cover',
              position: 'center'
            })
            .toFile(thumbPath);
          
          console.log(`Generated thumbnail for ${file}`);
        }
        
        // Generate JSON file with list of screenshots
        const screenshotsListPath = resolve(process.cwd(), 'public/screenshots-list.json');
        fs.writeFileSync(
          screenshotsListPath,
          JSON.stringify(imageFiles)
        );
        console.log(`Generated screenshots list at ${screenshotsListPath}`);
        
        // Generate JSON file with list of thumbnails
        const thumbnailsListPath = resolve(process.cwd(), 'public/thumbnails-list.json');
        fs.writeFileSync(
          thumbnailsListPath,
          JSON.stringify(imageFiles) // Use the same list since thumbnails have the same filenames
        );
        console.log(`Generated thumbnails list at ${thumbnailsListPath}`);
      } catch (error) {
        console.error('Error generating thumbnails:', error);
      }
    }
  };
}

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
    },
    thumbnailPlugin()
  ]
});
