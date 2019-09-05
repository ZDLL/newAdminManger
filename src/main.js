import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import myFilter from './comm/comfilter'

//富文本

import { Message } from "element-ui";
Vue.use(ElementUI)

// Vue.directive('emoji', {
//   inserted (el) {
//     console.log(el)
//     console.log(twemoji.parse(el.innerHTML))
//     el.innerHTML =''
//     el.innerHTML = twemoji.parse(el.innerHTML)
//   }
// })

// Viewer.setDefaults({
//   Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
// })
// router.beforeEach((to, from, next) => {
//   //获取token
//   const token = window.sessionStorage.getItem("token");
//   //判断有无token
//   if (token) {
//     //直接放行
//     next();
//   } else {
//     //没有密钥
//     //如果是去的登录页面
//     if (to.path === "/login") {
//       //放行
//       next();
//     } else {
//       //如果是去其他页面,跳转到登录页-先登录才能跳转
//       Message.error("请登录以后在进行操作！");

//       return next({ path: "/login" });
//     }
//   }
// });

// router.afterEach((to,from)=>{
//   if(to.path !='/login'){
//     const token = window.localStorage.getItem("token");
//     if(!token){
//       Message.error("请登录以后在进行操作！");
//       router.push({path: "/login"})
//     }
//   }
// })
// Object.keys(myDire).forEach(key=>{
//   console.log(key)
//   Vue.directive(key,myDire[key])
// })

Object.keys(myFilter).forEach(key => {
  Vue.filter(key, myFilter[key])
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
