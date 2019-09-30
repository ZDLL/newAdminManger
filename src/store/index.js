import Vue from 'vue'
import Vuex from 'vuex'
import ComUploadModule from './module/uploadModul.js'
import LoginModule from './module/loginModule.js';
import MenuModule from './module/menuModule.js';
import UserModule from './module/userModule.js';
import RoleModule from './module/roleModule.js';
import GdsSkuTypeModule from './module/goods/goodsSkuTypeModule.js';
import GdsSpuModule from './module/goods/goodSpuModule.js';
import GdsGroupModule from './module/goods/goodsGroupModule.js';
import GdsInfoModule from './module/goods/goodsInfoModule.js'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    ComUploadModule,
    LoginModule,
    MenuModule,
    UserModule,
    RoleModule,
    GdsSkuTypeModule,
    GdsSpuModule,
    GdsGroupModule,
    GdsInfoModule
  }
})
