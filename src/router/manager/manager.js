const  managerRouters = [{
    path: '/manager',
    name: 'Manager',
    component: () => import('@/views/manager/manager/manager.vue'),
    children:[
      {
      path: "/",
      redirect: '/manager/articleMagList'
    },
    
      {
        path: 'articleMagList',
        name: 'articleMagList',
        component: () => import('@/views/manager/articleMagList/articleMagList.vue'),
        meta:{
          requireAuth: true
        },
      },
      {
        path: 'articleDetail/:articleId',
        name: 'articleDetail',
        component: () => import('@/views/manager/articleMagList/articleDetail.vue'),
        meta:{
          requireAuth: true
        },
      },
      {
        path: 'articleCreate',
        name: 'articleCreate',
        component: () => import('@/views/manager/articleMagList/components/articleCreate.vue'),
        meta:{
          requireAuth: true
        },
      }
]
  }
]


  export default managerRouters