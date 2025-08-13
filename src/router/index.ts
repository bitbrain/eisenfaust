import { RouteRecordRaw } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import MediaView from '../views/MediaView.vue'
import StoryView from '../views/StoryView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'landing',
    component: LandingView
  },
  {
    path: '/story',
    name: 'story',
    component: StoryView
  },
  {
    path: '/media',
    name: 'media',
    component: MediaView
  }
]