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
      }

    ]
    }
  ]
})
