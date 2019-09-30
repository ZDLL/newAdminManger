import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('./views/login.vue')
    },
    
    {
      path:'/home',
      name:"home",
      component:()=>import('./views/home/index.vue'),
      redirect:"/index",
      children:[
        {
          path: '/index',
          name: 'index',
          component: ()=>import('./views/home/frist.vue')
        },
        {
        path: '/menu',
        name: 'menu',
        component: ()=>import('./views/home/menuModule/menu.vue')
      },
      {
        path: '/user',
        name: 'userManage',
        component: ()=>import('./views/home/userManage/userList.vue')
      },
      {
        path: '/role',
        name: 'roleManage',
        component: ()=>import('./views/home/roleManage/roleList.vue')
      },
      {
        path: '/userCenter',
        name: 'userCenter',
        component: ()=>import('./views/home/userCenter/setPwd.vue')
      },
      // {
      //   path: '/goods',
      //   name: 'goods',
      //   // component: ()=>import('./views/home/goodsModule/goodsIndex.vue')
      // },
      //商品中心
      {
        path: '/gds',
        name: 'gds',
        component: ()=>import('./views/home/goodsModule/goodsAllmodu.vue')
      },
      {
        path: '/gdsDetail',
        name: 'gdsDetail',
        component: ()=>import('./views/home/goodsModule/goodsAllDetail.vue')
      },
      {
        path: '/gdsGruop',
        name: 'gdsGruop',
        component: ()=>import('./views/home/goodsModule/goodsModu.vue')
      },
      {
        path: '/gdsGruopDetail',
        name: 'gdsGruopDetail',
        component: ()=>import('./views/home/goodsModule/goodsDetail.vue')
      },
      {
        path: '/gdsGruopEditor',
        name: 'gdsGruopEditor',
        component: ()=>import('./views/home/goodsModule/editorGds.vue')
      },
      {
        path: '/spu',
        name: 'spu',
        component: ()=>import('./views/home/goodsModule/spuModu.vue')
      },
      {
        path: '/spuDetail',
        name: 'spuDetail',
        component: ()=>import('./views/home/goodsModule/spuDetail.vue')
      },
      {
        path: '/sku',
        name: 'sku',
        component: ()=>import('./views/home/goodsModule/skuModu.vue')
      },
      {
        path: '/skuType',
        name: 'skuType',
        component: ()=>import('./views/home/goodsModule/skuStatuModu.vue')
      },
      // 测试页面
      {
        path: '/tet',
        name: 'test',
        component: ()=>import('./views/home/tet.vue')
      },
    ]
    }
  ]
})
