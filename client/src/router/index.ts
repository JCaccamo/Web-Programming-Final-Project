import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JournalView from '../views/JournalView.vue'
import ActivityView from '../views/ActivityView.vue'
import SocialView from '../views/SocialView.vue'
import StatsView from '../views/StatsView.vue'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/journal',
      name: 'journal',
      component: JournalView,
    },
    {
      path: '/activity',
      name: 'activity',
      component: ActivityView,
    },
    {
      path: '/social',
      name: 'social',
      component: SocialView,
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/admin/workout/:id',
      name: 'admin_workout_edit',
      component: () => import('../views/admin/WorkoutEdit.vue'),
    },
  ]
})

export default router
