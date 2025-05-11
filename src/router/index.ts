import { RouteRecordRaw } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import MediaView from '../views/MediaView.vue'
import NewsView from '../views/NewsView.vue'
import NewsPostView from '../views/NewsPostView.vue'
import { postRoutes } from '../routes/post-routes'

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
    component: NewsPostView
  },
  ...postRoutes
]