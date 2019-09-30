import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import myFilter from './comm/comfilter'
import MyReg from './comm/regulars.js'
import MyNotice from './components/myNotice.vue'
import MyNoCont from './components/myNoCont.vue'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
//富文本

import { Message } from "element-ui";
Vue.use(ElementUI)
Vue.use(Viewer)
Vue.use(MyNotice)
Vue.use(MyNoCont)
Vue.component("my-notice",MyNotice)
Vue.component("my-nocont",MyNoCont)
Viewer.setDefaults({zIndexInline:"99999"})
router.afterEach((to,from)=>{
  if(to.path !='/login'){
    const userInfo = window.localStorage.getItem("userInfo");
    if(!userInfo){
      Message.error("请登录以后在进行操作！");
      router.push({path: "/login"})
    }
  }
})
// Object.keys(myDire).forEach(key=>{
//   console.log(key)
//   Vue.directive(key,myDire[key])
// })

Object.keys(myFilter).forEach(key => {
  Vue.filter(key, myFilter[key])
})
Vue.prototype.$reg= MyReg;
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
