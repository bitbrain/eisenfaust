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
  const webpDir = resolve(process.cwd(), 'dist/screenshots-webp');

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
        
        // Process thumbnails in parallel
        const processingPromises = imageFiles.map(async (file) => {
          const srcPath = resolve(srcDir, file);
          const srcStat = fs.statSync(srcPath);
          
          // Create WebP thumbnail with the same base name
          const webpFilename = file.replace(/\.(jpg|jpeg|png|webp)$/i, '.webp');
          const thumbPath = resolve(thumbDir, webpFilename);
          
          // Generate thumbnail if it doesn't exist or is older than source
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
        });
        
        // Wait for all thumbnails to be processed
        await Promise.all(processingPromises);
        
        // Generate JSON file with list of thumbnails
        const thumbnailFiles = fs.readdirSync(thumbDir);
        const thumbnailsJsonPath = resolve(process.cwd(), 'public/thumbnails.json');
        fs.writeFileSync(
          thumbnailsJsonPath,
          JSON.stringify(thumbnailFiles)
        );
        console.log(`Generated thumbnails list at ${thumbnailsJsonPath}`);
      } catch (error) {
        console.error('Error processing thumbnail images:', error);
      }
    },
    closeBundle: async () => {
      // Create screenshots-webp directory in dist if it doesn't exist
      if (!fs.existsSync(webpDir)) {
        fs.mkdirSync(webpDir, { recursive: true });
      }

      try {
        // Copy WebP files from thumbnails directory to dist/screenshots-webp
        const files = fs.readdirSync(thumbDir);
        const webpFiles = files.filter(file => file.endsWith('.webp'));
        
        for (const file of webpFiles) {
          const srcPath = resolve(thumbDir, file);
          const destPath = resolve(webpDir, file);
          
          fs.copyFileSync(srcPath, destPath);
          console.log(`Copied ${file} to dist/screenshots-webp`);
        }
        
        console.log('All WebP files copied to dist/screenshots-webp');
      } catch (error) {
        console.error('Error copying WebP files to dist:', error);
      }
    }
  };
}

// Add a plugin to copy markdown posts to dist folder
function copyPostsPlugin() {
  return {
    name: 'vite-plugin-copy-posts',
    closeBundle: async () => {
      const postsDir = resolve(process.cwd(), 'posts');
      const distPostsDir = resolve(process.cwd(), 'dist/posts');
      
      if (!fs.existsSync(postsDir)) {
        console.warn('Posts directory not found');
        return;
      }
      
      try {
        // Create posts directory in dist if it doesn't exist
        if (!fs.existsSync(distPostsDir)) {
          fs.mkdirSync(distPostsDir, { recursive: true });
        }
        
        // Copy all markdown files to dist/posts
        const files = fs.readdirSync(postsDir);
        const mdFiles = files.filter(file => file.endsWith('.md'));
        
        for (const file of mdFiles) {
          const srcPath = resolve(postsDir, file);
          const destPath = resolve(distPostsDir, file);
          
          fs.copyFileSync(srcPath, destPath);
          console.log(`Copied ${file} to dist/posts`);
        }
        
        console.log('All posts copied to dist/posts');
      } catch (error) {
        console.error('Error copying posts:', error);
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
    imageProcessingPlugin(),
    copyPostsPlugin()
  ],
  
  // Add server configuration for development
  server: {
    headers: {
      // Add cache headers for image files in development
      '*.jpg': 'Cache-Control: max-age=31536000',
      '*.jpeg': 'Cache-Control: max-age=31536000',
      '*.png': 'Cache-Control: max-age=31536000',
      '*.webp': 'Cache-Control: max-age=31536000',
      '*.svg': 'Cache-Control: max-age=31536000',
      // Add proper MIME types for JavaScript files
      '*.js': 'Content-Type: application/javascript; charset=utf-8',
      '*.mjs': 'Content-Type: application/javascript; charset=utf-8'
    },
    // Ensure proper handling of base path
    base: '/eisenfaust/'
  },
  
  // Add build configuration for production
  build: {
    rollupOptions: {
      output: {
        // Add cache busting for assets by including content hash in filenames
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info.pop();
          
          // Don't add hash to WebP files we generate in the closeBundle hook
          if (assetInfo.name.includes('screenshots-webp')) {
            return `assets/${assetInfo.name}`;
          }
          
          // For images, use content hash in filename for cache busting
          if (/png|jpe?g|svg|gif|webp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          
          // For other assets
          return `assets/[name]-[hash][extname]`;
        }
      }
    }
  }
});
