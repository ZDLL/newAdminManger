import Vue from 'vue'
import Vuex from 'vuex'
import LoginModule from './module/loginModule.js'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    LoginModule
  }
})
