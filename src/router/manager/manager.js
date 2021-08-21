const managerRouters = [{
  path: '/manager',
  name: 'Manager',
  component: () => import('@/views/manager/manager/manager.vue'),
  children: [
    {
      path: "/",
      redirect: '/manager/articleList'
    },

    {
      path: 'articleList',
      name: 'articleList',
      component: () => import('@/views/manager/articleMagList/articleMagList.vue'),
      meta: {
        requireAuth: true
      },
    },
    {
      path: 'articleDetail/:articleId',
      name: 'articleDetail',
      component: () => import('@/views/manager/articleMagList/articleDetail.vue'),
      meta: {
        requireAuth: true
      },
    },
    {
      path: 'articleCreate',
      name: 'articleCreate',
      component: () => import('@/views/manager/articleMagList/components/articleCreate.vue'),
      meta: {
        requireAuth: true
      },
    },
    {
      path: 'classfityList',
      name: 'classfityList',
      component: () => import('@/views/manager/classfityList/classfityList.vue'),
      meta: {
        requireAuth: true
      },
    },
    {
      path: 'menuList',
      name: 'menuList',
      component: () => import('@/views/manager/menuList/menuList.vue'),
      meta: {
        requireAuth: true
      },
    },
     {
      path: 'tagsList',
      name: 'tagsList',
      component: () => import('@/views/manager/tagsList/tagsList.vue'),
      meta: {
        requireAuth: true
      },
    },
  ]
}
]


export default managerRouters