import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
  },
  {
    path: '/signup',
    component: () => import('src/components/login/SignupComponent.vue'),
  },
  {
    path: '/login',
    component: () => import('src/components/login/LoginComponent.vue'),
  },
  {
    path: '/:project',
    component: () => import('layouts/ProjectLayout.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
