import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      authRequired: true,
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/login',
    meta: {
      authRequired: false,
    },
    name: 'login',
    component: () => import('pages/LoginView.vue'),
  },
  {
    path: '/users',
    meta: {
      title: 'Gestion usuarios',
      authRequired: true,
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/UsersView.vue') }],
  },
  {
    path: '/instructor',
    meta: {
      title: 'Gestion instructores',
      authRequired: true,
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/InstructorView.vue') },
    ],
  },
  {
    path: '/cliente',
    meta: {
      title: 'Gestion clientes',
      authRequired: true,
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ClienteView.vue') }],
  },
  {
    path: '/disciplina',
    meta: {
      title: 'Gestion disciplinas',
      authRequired: true,
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DisciplinaView.vue') },
    ],
  },
  {
    path: '/producto',
    meta: {
      title: 'Gestion productos',
      authRequired: true,
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ProductosView.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
