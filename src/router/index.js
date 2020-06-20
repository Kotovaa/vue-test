import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store'

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.is_authenticated) {
    next()
    return
  }
  next('/')
}
const ifAuthenticated = (to, from, next) => {
  if (store.getters.is_authenticated) {
    next()
    return
  }
  next('/auth')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    beforeEnter: ifAuthenticated,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
