<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
</script>

<template>
  <main>
    <nav>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/news">Neuigkeiten</RouterLink></li>
        <li><RouterLink to="/media">Media</RouterLink></li>
      </ul>
    </nav>
    <router-view />
  </main>
</template>

<style>

nav {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
}

nav > ul {
  display: flex;
  gap: 2.5rem;
  padding: 0;
  margin: 0;
  justify-content: center;
}

nav > ul > li {
  list-style: none;
  font-size: 1.8rem;

  a {
    text-decoration: none;
    color: var(--ember-700);
    transition: color 0.3s ease, text-shadow 0.3s ease;
  }

  a:hover {
    color: var(--ember-900);
    text-shadow: 0 0 10px hsla(from var(--ember-700) h s l / 0.6);
  }
}
</style>
