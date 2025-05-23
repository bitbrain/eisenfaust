<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Post {
  title: string;
  date: string;
  slug: string;
  content: string;
}

const posts = ref<Post[]>([]);
const loading = ref(true);
const router = useRouter();

onMounted(async () => {
  await loadPosts();
  loading.value = false;
});

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
    console.error('Error loading posts:', error);
  }
}

function viewPost(slug: string) {
  router.push(`/news/${slug}`);
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
    
    <div v-else>
      <div class="posts-list">
        <div v-for="post in posts" :key="post.slug" class="post-item" @click="viewPost(post.slug)">
          <h2>{{ post.title }}</h2>
          <div class="post-date">{{ formatDate(post.date) }}</div>
          <div class="post-excerpt" v-html="post.content.split('</p>')[0] + '</p>'"></div>
          <div class="read-more">Weiterlesen →</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
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

.posts-list {
  margin-top: 20px;
}

.post-excerpt {
  line-height: 1.6;
}

.post-item {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 5px;
  background-color: rgba(14, 19, 24, 0.3);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  background-color: rgba(14, 19, 24, 0.5);
}

.post-date {
  margin-bottom: 10px;
  font-size: 1.2em;
  color: var(--granite-500);
}

.read-more {
  margin-top: 10px;
  color: var(--ember-800);
}

.post-item h2 {
  transition: color 0.3s ease;
}
</style>