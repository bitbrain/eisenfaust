import { createRouter, createMemoryHistory, RouteRecordRaw } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import MediaView from '../views/MediaView.vue'
import NewsView from '../views/NewsView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'landing',
    component: LandingView
  },
  {
    path: '/media',
    name: 'media',
    component: MediaView
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView
  },
  {
    path: '/news/:slug',
    name: 'post',
    component: NewsView
  }
]

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes
})

export default router