import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConfigureCyptoView from '../views/ConfigureCyptoView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/configure-crypto',
    name: 'configure-crypto',
    component: ConfigureCyptoView
  }
]

const router = new VueRouter({
  routes
});

export default router
