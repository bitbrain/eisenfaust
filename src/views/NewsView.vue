<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Post {
  title: string;
  date: string;
  slug: string;
  content: string;
}

const posts = ref<Post[]>([]);
const currentPost = ref<Post | null>(null);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await loadPosts();
  updateCurrentPost();
});

// Watch for route changes to update the current post
watch(() => route.params.slug, async (newSlug) => {
  if (posts.value.length === 0) {
    await loadPosts();
  }
  updateCurrentPost();
});

function updateCurrentPost() {
  if (route.params.slug) {
    currentPost.value = posts.value.find(post => post.slug === route.params.slug) || null;
    if (!currentPost.value) {
      console.error('Post not found for slug:', route.params.slug);
    }
  } else {
    currentPost.value = null;
  }
}

async function loadPosts() {
  try {
    const postModules = import.meta.glob('/posts/*.md');
    const postPromises = Object.entries(postModules).map(async ([path, importPost]) => {
      const content = await importPost() as { default: string, frontmatter: any };
      // Extract just the filename without extension as the slug
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
    // Sort posts by date (newest first)
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
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
</script>

<template>
  <div class="news-container">
    <!-- Single post view -->
    <div v-if="currentPost" class="post-detail">
      <button @click="router.push('/news')" class="back-button">← Back to all posts</button>
      <h1>{{ currentPost.title }}</h1>
      <div class="post-date">{{ formatDate(currentPost.date) }}</div>
      <div class="post-content" v-html="currentPost.content"></div>
    </div>
    
    <!-- Posts listing -->
    <div v-else>
      <h1>Latest News</h1>
      <div class="posts-list">
        <div v-for="post in posts" :key="post.slug" class="post-item" @click="viewPost(post.slug)">
          <h2>{{ post.title }}</h2>
          <div class="post-date">{{ formatDate(post.date) }}</div>
          <div class="post-excerpt" v-html="post.content.split('</p>')[0] + '</p>'"></div>
          <div class="read-more">Read more →</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.posts-list {
  margin-top: 20px;
}

.post-item {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.post-date {
  color: #666;
  margin-bottom: 10px;
  font-size: 0.9em;
}

.read-more {
  margin-top: 10px;
  color: #0066cc;
  font-weight: bold;
}

.post-detail h1 {
  margin-bottom: 10px;
}

.post-content {
  line-height: 1.6;
  margin-top: 20px;
}

.back-button {
  background: none;
  border: none;
  color: #0066cc;
  cursor: pointer;
  padding: 5px 0;
  font-size: 1em;
  margin-bottom: 20px;
}

.back-button:hover {
  text-decoration: underline;
}
</style>