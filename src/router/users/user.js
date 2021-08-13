const  usersRouters = [{
    path: '/users',
    name: 'Users',
    component: () => import('@/views/users/user/user.vue'),
    children:[
      {
      path: "/",
      redirect: '/users/userArticleList'
    },
      {
        path: 'userArticleList',
        name: 'userArticleList',
        component: () => import('@/views/users/userArticleList/userArticleList.vue')
      },
      {
        path: 'userArticleDetail/:articleId',
        name: 'userArticleDetail',
        component: () => import('@/views/users/userArticleList/userArticleDetail.vue')
      },
      {
        path: 'userDiary',
        name: 'userDiary',
        component: () => import('@/views/users/userDiary/userDiary.vue')
      },
      {
        path: 'userTools',
        name: 'userTools',
        component: () => import('@/views/users/userTools/userTools.vue')
      },
      {
        path: 'userFriendLink',
        name: 'userFriendLink',
        component: () => import('@/views/users/userFriendLink/userFriendLink.vue')
      }
    
]
  }
]
  export default usersRouters