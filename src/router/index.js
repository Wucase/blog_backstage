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
  ...managerRouters,
  ...usersRouters
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
