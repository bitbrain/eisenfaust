<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

interface Post {
  title: string;
  date: string;
  slug: string;
  content: string;
}

const posts = ref<Post[]>([]);
const currentPost = ref<Post | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const route = useRoute();

function getSlugFromPath() {
  const path = window.location.pathname;
  const match = path.match(/\/news\/([^\/]+)/);
  return match ? match[1] : null;
}

onMounted(async () => {
  await loadPosts();
  await updateCurrentPost();
  loading.value = false;
});

watch(() => route.params.slug, async (newSlug) => {
  if (posts.value.length === 0) {
    await loadPosts();
  }
  await updateCurrentPost();
}, { immediate: true });

async function updateCurrentPost() {
  const slug = getSlugFromPath();
  
  if (slug) {
    currentPost.value = posts.value.find(post => post.slug === slug) || null;
    
    if (!currentPost.value) {
      error.value = 'Post nicht gefunden';
    } else {
      error.value = null;
    }
  }
}

async function loadPosts() {
  try {
    const postModules = import.meta.glob('/posts/*.md', { eager: true });
    
    const postPromises = Object.entries(postModules).map(async ([path, importPost]) => {
      const content = importPost as { default: string, frontmatter: any };
      const filename = path.split('/').pop() || '';
      const slug = filename.replace(/\.md$/, '');
      
      return {
        title: content.frontmatter.title,
        date: content.frontmatter.date,
        slug,
        content: content.default
      };
    });
    
    posts.value = await Promise.all(postPromises);
    posts.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    error.value = 'Fehler beim Laden der Posts';
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
</script>

<template>
  <div class="news-container">
    <div v-if="loading" class="loading">
      Lade Inhalte...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="currentPost" class="post-detail">
      <RouterLink to="/news" class="back-link">← Zurück zur Übersicht</RouterLink>
      <h1>{{ currentPost.title }}</h1>
      <div class="post-date">{{ formatDate(currentPost.date) }}</div>
      <div class="post-content" v-html="currentPost.content"></div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 0.5rem;
}

.news-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.post-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: var(--ember-800);
}

.post-content {
  line-height: 1.6;
  margin-top: 20px;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
}

.post-date {
  margin-bottom: 10px;
  font-size: 1.2em;
  color: var(--granite-500);
}
</style> 