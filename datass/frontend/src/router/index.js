import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BoardsView from '../views/BoardsView.vue';
import ListsView from '../views/ListsView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
      meta: { requiresAuth: false },
    },
    {
      path: '/boards',
      name: 'BoardsView',
      component: BoardsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/boards/:id',
      name: 'ListsView',
      component: ListsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/signup',
      name: 'SignupView',
      component: SignupView,
      meta: { requiresAuth: false },
    },
  ],
});
