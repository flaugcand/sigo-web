import authService from 'src/service/authService'

function authRequired (to, from, next) {
  if (authService.check()) {
    next()
  } else {
    next('/login')
  }
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true },
    beforeEnter: authRequired,
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '', component: () => import('components/menu/empresa.vue') }
    ]
  }, {
    path: '/login',
    name: 'login',
    component: () => import('components/login.vue'),
    meta: { auth: false },
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
