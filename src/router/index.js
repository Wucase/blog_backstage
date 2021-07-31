import Vue from 'vue'

import store from '@/store'
import VueRouter from 'vue-router'
import managerRouters from './manager/manager'
import usersRouters from './users/user'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
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


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){
  let token = store.state.user.token;
  if(!token){
    next({
      path:'/login'
  })
}else{
  next()
}
next()
}
next()
})
export default router
