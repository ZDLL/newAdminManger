import Vue from 'vue'
import Vuex from 'vuex'
import LoginModule from './module/loginModule.js'
import MenuModule from './module/menuModule.js'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    LoginModule,
    MenuModule
  }
})
