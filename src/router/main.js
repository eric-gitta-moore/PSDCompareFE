export default [
    {
        path: 'Compare',
        name: 'HomeCompare',
        component: () => import('@/views/HomeSubViews/Main/Compare'),
        meta: {
            title: '图纸对比',
        },
        redirect: {
            name: 'HomeCompareLeft'
        },
        children: [
            {
                path: 'CompareLeft',
                name: 'HomeCompareLeft',
                component: () => import('@/views/HomeSubViews/Main/CompareLeft.vue'),
                meta: {
                    title: '图纸对比',
                    // 便于侧边栏显示当前导航
                    routeName: 'HomeCompare',
                },
            },
            {
                path: 'CompareUp',
                name: 'HomeCompareUp',
                component: () => import('@/views/HomeSubViews/Main/CompareUp.vue'),
                meta: {
                    title: '图纸对比',
                    // 便于侧边栏显示当前导航
                    routeName: 'HomeCompare',
                },
            },
        ]
    },
    {
        path: 'history',
        name: 'HomeHistory',
        component: () => import('@/views/HomeSubViews/Main/History.vue'),
        meta: {
            title: '历史记录',
            routeName: 'HomeHistory',
        }
    },
    {
      path: 'history',
      name: 'UploadDialog',
      component: () => import('../components/Home/Compare/UploadDialog'),
  },
];