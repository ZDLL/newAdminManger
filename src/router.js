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
      redirect:"/homePage",
      children:[
        {
          path: '/homePage',
          name: 'homePage',
          component: ()=>import('./views/home/frist.vue')
        },
        //系统中心
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
        component: ()=>import("./views/home/userCenter/setPwd.vue")
      },
      {
        path: '/simpleCode',
        name: 'simpleCode',
        component: ()=>import("./views/home/codeModule/simpleCode.vue")
      },
      {
        path: '/complexCode',
        name: 'complexCode',
        component: ()=>import("./views/home/codeModule/complexCode.vue")
      },
      {
        path: '/parameter',
        name: 'parameter',
        component: ()=>import("./views/home/codeModule/parameter.vue")
      },

      // {
      //   path: '/goods',
      //   name: 'goods',
      //   // component: ()=>import('./views/home/goodsModule/goodsIndex.vue')
      // },
      //商品中心
      {
        path: '/goods',
        name: 'goods',
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
      // 评分中心
      {
        path: '/goScore',
        name: 'goScore',
        component: ()=>import('./views/home/scoreModule/goScore.vue')
      },
      //指标中心
      {
        path: '/allTarget',
        name: 'allTarget',
        component: ()=>import('./views/home/targetCenter/allTarget.vue')
      },
      {
        path: '/targetDetail',
        name: 'targetDetail',
        component: ()=>import('./views/home/targetCenter/targetDetail.vue')
      },
      {
        path: '/addTarget',
        name: 'addTarget',
        component: ()=>import('./views/home/targetCenter/addTarget.vue')
      },
      {
        path: '/targetSet',
        name: 'targetSet',
        component: ()=>import('./views/home/targetCenter/targetSet.vue')
      },
      //内容中心管理
      {
        path: '/column',
        name: 'column',
        component: ()=>import('./views/home/contentCenter/column.vue')
      },
      {
        path: '/columnDetail',
        name: 'columnDetail',
        component: ()=>import('./views/home/contentCenter/columnDetail.vue')
      },
      {
        path: '/navigation',
        name: 'navigation',
        component: ()=>import('./views/home/contentCenter/navigation.vue')
      },
      {
        path: '/carousel',
        name: 'carousel',
        component: ()=>import('./views/home/contentCenter/carousel.vue')
      },
      {
        path: '/carouselAdd',
        name: 'carouselAdd',
        component: ()=>import('./views/home/contentCenter/carouselAdd.vue')
      },
      {
        path: '/channel',
        name: 'channel',
        component: ()=>import('./views/home/contentCenter/channel.vue')
      },
      {
        path: '/channelDetail',
        name: 'channelDetail',
        component: ()=>import('./views/home/contentCenter/channelDetail.vue')
      },
      // 模版管理
      {
        path: '/temp',
        name: 'temp',
        component: ()=>import('./views/home/templateModule/template.vue')
      },
      {
        path: '/tempAdd',
        name: 'tempAdd',
        component: ()=>import('./views/home/templateModule/templateAdd.vue')
      },
      {
        path: '/comp',
        name: 'comp',
        component: ()=>import('./views/home/templateModule/comp.vue')
      },
      //用户中心模块
      {
        path: '/appUser',//普通用户
        name: 'appUser',
        component: ()=>import('./views/home/allUserManage/appUser.vue')
      },
      {
        path: '/contUser',//内容用户
        name: 'contUser',
        component: ()=>import('./views/home/allUserManage/contentUser.vue')
      },
      {
        path: '/firmUser',//企业用户
        name: 'firmUser',
        component: ()=>import('./views/home/allUserManage/firmUser.vue')
      },
      {
        path: '/firmUserDetail',//企业详情
        name: 'firmUserDetail',
        component: ()=>import('./views/home/allUserManage/firmUserDetail.vue')
      },
    ]
    }
  ]
})
