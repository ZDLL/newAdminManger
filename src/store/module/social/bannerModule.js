import apiUrl from './api.js'
import {sendRequest} from '../../../comm/until.js'
import qs from 'qs'


const state = {
 getBannerListData:{},
 addBannerData:{},
 bannerEditData:{},
 bannerDetailData:{},
 bannerDelData:{}
}
// getters
const getters = {//同步

}
// actions
const actions = {//异步
  async getBannerListAct(context,parm){
    context.commit("getBannerListMut", await sendRequest(apiUrl.bannerGetList,qs.stringify(parm),'post'))
  },
  async setAddBannerAct(context,parm){
    context.commit("setAddBannerMut", await sendRequest(apiUrl.bannerAdd,qs.stringify(parm),'post'))
  },
  async setEditorBannerAct(context,parm){
    context.commit("setEditorBannerMut", await sendRequest(apiUrl.bannerEdit,qs.stringify(parm),'post'))
  },
  async getBannerDetaildAct(context,parm){
    context.commit("getBannerDetaildMut", await sendRequest(apiUrl.bannerDetail,qs.stringify(parm),'post'))
  },
  async delBannerAct(context,parm){
    context.commit("delBannerMut", await sendRequest(apiUrl.bannerDel,qs.stringify(parm),'post'))
  }
}
// mutations
const mutations = {//同步
  getBannerListMut(state,data){
    state.getBannerListData = data.data
  },
  setAddBannerMut(state,data){
    state.addBannerData = data.data
  },
  setEditorBannerMut(state,data){
    state.bannerEditData =data.data
  },
  getBannerDetaildMut(state,data){
    state.bannerDetailData = data.data
  },
  delBannerMut(state,data){
    state.bannerDelData = data.data
  }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}