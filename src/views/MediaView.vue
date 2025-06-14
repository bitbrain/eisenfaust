<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue';
import ProgressSpinner from 'primevue/progressspinner';

interface GalleryImage {
  id: number;
  thumbnail: string;
  fullImage: string;
  alt: string;
  description?: string;
}

// State
const images = ref<GalleryImage[]>([]);
const displayedImages = ref<GalleryImage[]>([]);
const isLoading = ref(true);
const isLoadingMore = ref(false);
const selectedImage = ref<GalleryImage | null>(null);
const showLightbox = ref(false);
const error = ref<string | null>(null);
const batchSize = 12; // Number of images to load at once

// Load images from thumbnails.json
const loadImages = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    
    // Load the thumbnails list - adjust the path based on your base URL
    const response = await fetch('/eisenfaust/thumbnails.json');
    const thumbnailData = await response.json();
    
    // Process the thumbnails and reverse the order
    const processedImages = thumbnailData
      .map((item: { filename: string, description: string | null }, index: number) => {
        return {
          id: index + 1,
          thumbnail: `/eisenfaust/thumbnails/${item.filename}`,
          fullImage: `/eisenfaust/screenshots-webp/${item.filename}`,
          alt: `Gallery image ${index + 1}`,
          description: item.description
        };
      })
      .reverse(); // Reverse the array to show newest images first
    
    images.value = processedImages;
    
    // Initialize with first batch of images
    loadMoreImages();
  } catch (error) {
    console.error('Error loading images:', error);
    error.value = `Failed to load images: ${error instanceof Error ? error.message : String(error)}`;
  } finally {
    isLoading.value = false;
  }
};

// Load more images as user scrolls
const loadMoreImages = () => {
  if (isLoadingMore.value) return;
  
  const currentLength = displayedImages.value.length;
  if (currentLength >= images.value.length) return;
  
  isLoadingMore.value = true;
  
  const nextBatch = images.value.slice(
    currentLength,
    currentLength + batchSize
  );
  
  displayedImages.value = [...displayedImages.value, ...nextBatch];
  
  setTimeout(() => {
    isLoadingMore.value = false;
  }, 300);
};

// Scroll event handler for infinite scroll
const handleScroll = () => {
  // Check if we're near the bottom of the page
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.body.offsetHeight;
  const scrollThreshold = 200; // px from bottom to trigger load
  
  if (pageHeight - scrollPosition < scrollThreshold) {
    loadMoreImages();
  }
};

// Lightbox
const openLightbox = (image: GalleryImage) => {
  selectedImage.value = image;
  isFullImageLoading.value = true;
  showLightbox.value = true;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  showLightbox.value = false;
  document.body.style.overflow = '';
};

// Track loading state of the full-size image
const isFullImageLoading = ref(true);

// Keyboard navigation for lightbox
const handleKeyDown = (e: KeyboardEvent) => {
  if (!showLightbox.value) return;
  
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowRight') {
    nextImage();
  } else if (e.key === 'ArrowLeft') {
    prevImage();
  }
};

const nextImage = () => {
  if (!selectedImage.value) return;
  const currentIndex = images.value.findIndex(img => img.id === selectedImage.value?.id);
  const nextIndex = (currentIndex + 1) % images.value.length;
  isFullImageLoading.value = true;
  selectedImage.value = images.value[nextIndex];
};

const prevImage = () => {
  if (!selectedImage.value) return;
  const currentIndex = images.value.findIndex(img => img.id === selectedImage.value?.id);
  const prevIndex = (currentIndex - 1 + images.value.length) % images.value.length;
  isFullImageLoading.value = true;
  selectedImage.value = images.value[prevIndex];
};

const onFullImageLoad = () => {
  isFullImageLoading.value = false;
};

const onImageLoad = (event: Event) => {
  // Only run on client side
  if (typeof window === 'undefined') return;

  const img = event.target as HTMLImageElement;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Find and fade in the description
        const wrapper = entry.target.closest('.gallery-item-wrapper');
        if (wrapper) {
          const description = wrapper.querySelector('.image-description');
          if (description) {
            description.classList.add('visible');
          }
        }
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(img);
};

onMounted(() => {
  loadImages();
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="media-gallery">
    <div class="block"></div>
    <Divider>Unser Erbe</Divider>
    <!-- Gallery grid -->
    <div v-if="images.length > 0" class="gallery-container">
      <div class="gallery-grid">
        <div 
          v-for="image in displayedImages" 
          :key="image.id" 
          class="gallery-item-wrapper"
        >
          <div 
            class="gallery-item"
            @click="openLightbox(image)"
          >
            <img 
              :src="image.thumbnail" 
              :alt="image.alt" 
              loading="lazy"
              class="thumbnail"
              @load="onImageLoad"
            />
          </div>
          <div 
            v-if="image.description" 
            class="image-description"
            v-html="image.description"
          ></div>
        </div>
      </div>
      
      <!-- Loading more indicator -->
      <div v-if="isLoadingMore && displayedImages.length < images.length" class="loading-more">
        <ProgressSpinner />
      </div>
    </div>
    
    <!-- Empty state -->
    <div v-else class="empty-gallery">
    </div>
    
    <!-- Lightbox -->
    <div v-if="showLightbox" class="lightbox" @click.self="closeLightbox">
      <button class="close-btn" @click="closeLightbox">×</button>
      
      <div class="lightbox-content">
        <button class="nav-btn prev-btn" @click.stop="prevImage">‹</button>
        
        <div class="lightbox-image-container">
          <!-- Show thumbnail immediately while full image loads -->
          <img 
            v-if="selectedImage" 
            :src="selectedImage.thumbnail" 
            :alt="selectedImage.alt"
            class="lightbox-thumbnail"
          />
          
          <!-- Full image loads in background -->
          <img 
            v-if="selectedImage" 
            :src="selectedImage.fullImage" 
            :alt="selectedImage.alt"
            class="lightbox-image"
            @load="onFullImageLoad"
            :class="{ 'loaded': !isFullImageLoading }"
          />
          
          <!-- Loading indicator -->
          <div v-if="isFullImageLoading" class="lightbox-loading">
            <ProgressSpinner />
          </div>
        </div>
        
        <button class="nav-btn next-btn" @click.stop="nextImage">›</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.media-gallery {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  margin-top: 5rem;
  
  background-image: url('/granite-wall.webp');
  background-size: min(100%, 100%);
  background-position: center top;
  background-repeat: no-repeat;
  margin-top:-6rem;
}

.block {
  height: 20rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
}

.loading-more {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: var(--granite-900);
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.gallery-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.gallery-grid {
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

.gallery-item-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.gallery-item {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  padding: 0;
  margin: 0;
  position: relative;
}

.gallery-item:hover .thumbnail {
  transform: scale(1.1);
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 2s ease;
  display: block;
  border: none;
  padding: 0;
  margin: 0;
  transform-origin: center;
  filter: blur(8px) saturate(0.2);
  opacity: 0;
}

.thumbnail.visible {
  filter: blur(0) saturate(1);
  opacity: 1;
}

.empty-gallery, .error-gallery {
  text-align: center;
  padding: 3rem;
  background-color: var(--granite-300);
  border-radius: 8px;
}

.help-text {
  font-size: 0.9rem;
  color: var(--granite-900);
  margin-top: 1rem;
}

/* Lightbox */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
}

.lightbox-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image-container {
  max-width: 90%;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.full-image-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  aspect-ratio: 16/9;
}

.lightbox-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  filter: blur(2px);
  opacity: 0.7;
  z-index: 1;
}

.lightbox-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
  position: relative;
}

.lightbox-image.loaded {
  opacity: 1;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  z-index: 1001;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .media-gallery {
    padding: 1rem;
    margin-top: -3rem;
  }
  
  .block {
    height: 10rem;
  }
  
  .gallery-container {
    padding: 0 0.5rem;
  }
  
  .gallery-grid {
    gap: 3rem;
  }
  
  .nav-btn {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
  
  .close-btn {
    font-size: 1.5rem;
    top: 10px;
    right: 10px;
  }
  
  .lightbox-image-container {
    max-width: 95%;
    max-height: 85vh;
  }
}

@media (max-width: 480px) {
  .media-gallery {
    padding: 0.5rem;
    margin-top: -2rem;
  }
  
  .block {
    height: 6rem;
  }
  
  .gallery-container {
    padding: 0;
  }
  
  .gallery-grid {
    gap: 2rem;
  }
  
  .nav-btn {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }
  
  .prev-btn {
    left: 10px;
  }
  
  .next-btn {
    right: 10px;
  }
  
  .close-btn {
    font-size: 1.2rem;
    top: 5px;
    right: 5px;
  }
  
  .lightbox-image-container {
    max-width: 98%;
    max-height: 80vh;
  }
  
  .image-description {
    font-size: 1.2rem;
    padding: 0;
  }
  
  .image-description :deep(strong) {
    font-size: 1.4rem;
  }
}

.lightbox-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-description {
  font-size: 1.8rem;
  color: var(--granite-700);
  line-height: 1.5;
  padding: 0 0.5rem;
  text-align: center;
  transition: all 2s ease;
  opacity: 0;
}

.image-description.visible {
  opacity: 1;
}

.gallery-item-wrapper .gallery-item {
  transition: all 2s ease;
}

.gallery-item-wrapper:hover .gallery-item {
  box-shadow: 0 0 3rem color-mix(in srgb, var(--ember-200) 50%, transparent);
}

.gallery-item-wrapper:hover .image-description {
  color: var(--ember-800);
  text-shadow: 0 0 0.5rem var(--ember-200);
}

.image-description :deep(strong) {
  color: var(--ember-700);
  font-size: 2rem;
  transition: color 2s ease;
  text-shadow: 0 0 0.25rem var(--ember-200);
}

.image-description :deep(p) {
  margin: 0;
}

.image-description :deep(a) {
  color: var(--granite-900);
  text-decoration: underline;
}

.image-description :deep(ul), 
.image-description :deep(ol) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}
</style>