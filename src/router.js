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
      // redirect:"/user",
      // children:[]
    }
  ]
})