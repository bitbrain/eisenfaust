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

// Thumbnail and WebP generation plugin
function imageProcessingPlugin() {
  const thumbnailWidth = 300; // Width of thumbnails
  const thumbnailHeight = 300; // Height of thumbnails
  const srcDir = resolve(process.cwd(), 'public/screenshots');
  const thumbDir = resolve(process.cwd(), 'public/thumbnails');

  return {
    name: 'vite-plugin-image-processor',
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
        
        // Process each image (thumbnails in WebP format)
        for (const file of imageFiles) {
          const srcPath = resolve(srcDir, file);
          // Create WebP thumbnail with the same base name
          const webpFilename = file.replace(/\.(jpg|jpeg|png|webp)$/i, '.webp');
          const thumbPath = resolve(thumbDir, webpFilename);
          
          // Skip if thumbnail already exists and is newer than source
          const srcStat = fs.statSync(srcPath);
          if (!fs.existsSync(thumbPath) || fs.statSync(thumbPath).mtime < srcStat.mtime) {
            await sharp(srcPath)
              .resize(thumbnailWidth, thumbnailHeight, {
                fit: 'cover',
                position: 'center'
              })
              .webp({ quality: 80 }) // Convert to WebP with 80% quality
              .toFile(thumbPath);
            
            console.log(`Generated WebP thumbnail for ${file}`);
          }
        }
        
        // Generate a single JSON file with list of thumbnails (all WebP)
        const thumbnailFiles = fs.readdirSync(thumbDir);
        const thumbnailsJsonPath = resolve(process.cwd(), 'public/thumbnails.json');
        fs.writeFileSync(
          thumbnailsJsonPath,
          JSON.stringify(thumbnailFiles)
        );
        console.log(`Generated thumbnails list at ${thumbnailsJsonPath}`);
      } catch (error) {
        console.error('Error processing images:', error);
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
    imageProcessingPlugin()
  ]
});
