import Vue from 'vue'
import Vuex from 'vuex'
import LoginModule from './module/loginModule.js'
import MenuModule from './module/menuModule.js'
import UserModule from './module/userModule.js'
import RoleModule from './module/roleModule.js'
import GdsSkuTypeModule from './module/goods/goodsSkuTypeModule.js'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    LoginModule,
    MenuModule,
    UserModule,
    RoleModule,
    GdsSkuTypeModule
  }
})
