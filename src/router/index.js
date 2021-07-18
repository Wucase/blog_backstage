import Vue from 'vue'
import VueRouter from 'vue-router'
import managerRouters from './manager/manager'
import usersRouters from './users/user'
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: '/login'
  },
  {
    path: "/login",
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  ...managerRouters,
  ...usersRouters

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
