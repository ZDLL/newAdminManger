import Vue from 'vue'
import Vuex from 'vuex'
import ComUploadModule from './module/uploadModul.js'
import LoginModule from './module/loginModule.js';
import MenuModule from './module/menuModule.js';
import UserModule from './module/userModule.js';
import RoleModule from './module/roleModule.js';
import GdsSkuTypeModule from './module/goods/goodsSkuTypeModule.js';
import GdsSkuModule from './module/goods/goodsSkuModul.js'
import GdsSpuModule from './module/goods/goodSpuModule.js';
import GdsGroupModule from './module/goods/goodsGroupModule.js';
import GdsInfoModule from './module/goods/goodsInfoModule.js';
import ScoreModule from './module/score/scoreModule.js'
import TargetModule from './module/target/targetModule.js'
import ContentModule from './module/content/contentModule.js'
import TemplateModule from './module/temp/tempModule.js'
import CodeModule from './module/code/codeModule.js'
import AllUserModule from './module/allUser/userModule.js'
//社交中心
import articleModule from './module/social/articleModule.js'
import colunModule from './module/social/columModule.js'
import comentModule from './module/social/commentModule.js'
import topicModule from './module/social/topicModule.js'
import draftModule from './module/social/draftModule.js'
import bannerModule from './module/social/bannerModule.js'
import dynamicModule from './module/social/dynamicModule.js'
// import colunModule from './modulesocial//columModule'


Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    ComUploadModule,
    LoginModule,
    MenuModule,
    UserModule,
    RoleModule,
    GdsSkuTypeModule,
    GdsSkuModule,
    GdsSpuModule,
    GdsGroupModule,
    GdsInfoModule,
    ScoreModule,
    TargetModule,
    ContentModule,
    TemplateModule,
    CodeModule,
    AllUserModule,
    articleModule,
    draftModule,
    colunModule,
    comentModule,
    topicModule,
    bannerModule,
    dynamicModule
  }
})
