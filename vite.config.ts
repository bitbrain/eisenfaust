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
  const thumbnailWidth = 1280;
  const thumbnailHeight = 720;
  const srcDir = resolve(process.cwd(), 'public/screenshots');
  const thumbDir = resolve(process.cwd(), 'public/thumbnails');
  const webpDir = resolve(process.cwd(), 'dist/screenshots-webp');
  const publicWebpDir = resolve(process.cwd(), 'public/screenshots-webp');

  // Function to get WebP filename
  const getWebpFilename = (originalFilename: string) => {
    return originalFilename.replace(/\.(jpg|jpeg|png|webp)$/i, '.webp');
  };

  // Function to clean directory
  const cleanDirectory = (dir: string) => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        fs.unlinkSync(resolve(dir, file));
      }
    } else {
      fs.mkdirSync(dir, { recursive: true });
    }
  };

  // Function to read and parse markdown file
  const getMarkdownContent = (imagePath: string) => {
    const mdPath = imagePath.replace(/\.(jpg|jpeg|png|webp)$/i, '.md');
    if (fs.existsSync(mdPath)) {
      const content = fs.readFileSync(mdPath, 'utf-8');
      const { content: mdContent } = matter(content);
      return marked(mdContent);
    }
    return null;
  };

  return {
    name: 'vite-plugin-image-processor',
    buildStart: async () => {
      // Check if source directory exists
      if (!fs.existsSync(srcDir)) {
        console.warn(`Screenshots directory not found: ${srcDir}`);
        fs.mkdirSync(srcDir, { recursive: true });
        return;
      }

      // Clean directories before processing
      cleanDirectory(thumbDir);
      cleanDirectory(publicWebpDir);

      try {
        // Get all image files
        const files = fs.readdirSync(srcDir);
        const imageFiles = files.filter(file => 
          /\.(jpg|jpeg|png|webp)$/i.test(file)
        );

        console.log(`Found ${imageFiles.length} images in ${srcDir}`);
        
        // Process thumbnails and WebP files in parallel
        const processingPromises = imageFiles.map(async (file) => {
          const srcPath = resolve(srcDir, file);
          const srcStat = fs.statSync(srcPath);
          
          // Generate WebP filenames
          const webpFilename = getWebpFilename(file);
          const thumbPath = resolve(thumbDir, webpFilename);
          const publicWebpPath = resolve(publicWebpDir, webpFilename);
          
          // Generate thumbnail
          await sharp(srcPath)
            .resize(thumbnailWidth, thumbnailHeight, {
              fit: 'cover',
              position: 'center'
            })
            .webp({ quality: 80 })
            .toFile(thumbPath);
          
          console.log(`Generated WebP thumbnail for ${file}`);

          // Generate full-sized WebP
          await sharp(srcPath)
            .webp({ quality: 85 })
            .toFile(publicWebpPath);
          
          console.log(`Generated public WebP for ${file}`);

          // Get markdown content if exists
          const markdownContent = getMarkdownContent(srcPath);
          
          return {
            filename: webpFilename,
            description: markdownContent
          };
        });
        
        // Wait for all thumbnails to be processed
        const processedFiles = await Promise.all(processingPromises);
        
        // Generate JSON file with list of thumbnails and descriptions
        const thumbnailsJsonPath = resolve(process.cwd(), 'public/thumbnails.json');
        fs.writeFileSync(
          thumbnailsJsonPath,
          JSON.stringify(processedFiles)
        );
        console.log(`Generated thumbnails list at ${thumbnailsJsonPath}`);
      } catch (error) {
        console.error('Error processing thumbnail images:', error);
      }
    },
    closeBundle: async () => {
      // Clean dist directories before processing
      cleanDirectory(webpDir);
      const thumbDestDir = resolve(process.cwd(), 'dist/thumbnails');
      cleanDirectory(thumbDestDir);

      try {
        // Get all image files from the source directory
        const files = fs.readdirSync(srcDir);
        const imageFiles = files.filter(file => 
          /\.(jpg|jpeg|png|webp)$/i.test(file)
        );
        
        // Process full-sized WebP screenshots in parallel
        const processingPromises = imageFiles.map(async (file) => {
          const srcPath = resolve(srcDir, file);
          const webpFilename = getWebpFilename(file);
          const destPath = resolve(webpDir, webpFilename);
          
          // Generate full-sized WebP version
          await sharp(srcPath)
            .webp({ quality: 85 })
            .toFile(destPath);
            
          console.log(`Generated full-sized WebP for ${file}`);
        });
        
        // Wait for all WebP conversions to complete
        await Promise.all(processingPromises);
        
        // Copy thumbnails to the dist folder
        const thumbFiles = fs.readdirSync(thumbDir);
        
        // Copy thumbnails in parallel
        const copyPromises = thumbFiles.map(async (file) => {
          const srcPath = resolve(thumbDir, file);
          const destPath = resolve(thumbDestDir, file);
          
          fs.copyFileSync(srcPath, destPath);
        });
        
        // Wait for all copy operations to complete
        await Promise.all(copyPromises);
        
        console.log('All WebP files processed and copied to dist folders');
      } catch (error) {
        console.error('Error processing WebP files for dist:', error);
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

// Add a plugin to generate routes for posts
function generatePostRoutesPlugin() {
  return {
    name: 'vite-plugin-generate-post-routes',
    buildStart: async () => {
      const postsDir = resolve(process.cwd(), 'posts');
      const routesDir = resolve(process.cwd(), 'src/routes');
      
      if (!fs.existsSync(postsDir)) {
        console.warn('Posts directory not found');
        return;
      }
      
      try {
        // Create routes directory if it doesn't exist
        if (!fs.existsSync(routesDir)) {
          fs.mkdirSync(routesDir, { recursive: true });
        }
        
        // Get all markdown files
        const files = fs.readdirSync(postsDir);
        const mdFiles = files.filter(file => file.endsWith('.md'));
        
        // Generate routes array
        const routes = mdFiles.map(file => {
          const slug = file.replace(/\.md$/, '');
          return {
            path: `/news/${slug}`,
            component: 'NewsPostView'
          };
        });
        
        // Write routes to file
        const routesContent = `// This file is auto-generated. Do not edit manually.
import NewsPostView from '../views/NewsPostView.vue'
export const postRoutes = ${JSON.stringify(routes, null, 2)}.map(route => ({
  ...route,
  component: NewsPostView
}));
`;
        
        fs.writeFileSync(resolve(routesDir, 'post-routes.ts'), routesContent);
        console.log('Generated post routes configuration');
      } catch (error) {
        console.error('Error generating post routes:', error);
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
          // Transform image URLs to include base URL if it exists
          const transformedContent = content.replace(/!\[([^\]]*)\]\(\/([^)]+)\)/g, (match, alt, path) => {
            const base = process.env.VITE_BASE_URL || '/eisenfaust';
            return `![${alt}](${base}/${path})`;
          });
          // Configure marked to handle line breaks
          marked.setOptions({
            breaks: true
          });
          const html = marked(transformedContent);
          return `export const frontmatter = ${JSON.stringify(data)}; export default ${JSON.stringify(html)};`;
        }
      }
    },
    imageProcessingPlugin(),
    copyPostsPlugin(),
    generatePostRoutesPlugin()
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
    }
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
