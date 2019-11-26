
import apiUrl from './api.js'
import {sendRequest} from '../../../comm/until.js'
import qs from "qs";
const state = {
    momentsData:{},
    momentsDetail:{},
    momentExamine:{},
    momentRecommend:{},
    delmoment:{}
}
// getters
const getters = {//同步

}
// actions
const actions = {//异步
  async getMomentsList(context, parame) {//获取列表
    context.commit("momentsGetlistMut", await sendRequest(apiUrl.momentsGetlist, qs.stringify(parame),'post'))
  },
  async getMomentsDetail(context,parame){//获取详情
    context.commit("momentsGetDetaileMut",await sendRequest(apiUrl.momentsGetdetail,qs.stringify(parame),'post'))
  },
  async getExamine(context,parame){//审核
    context.commit("momentExamineMut",await sendRequest(apiUrl.examine,qs.stringify(parame),'post'))
  },
  async getRecommend(context,parame){//推荐
    context.commit("momentRecommendMut",await sendRequest(apiUrl.recommend,qs.stringify(parame),'post'))
  },
  async delmoment(context,parame){//删除
    context.commit("delmomentMut",await sendRequest(apiUrl.delmoment,qs.stringify(parame),'post'))
  }
}
// mutations
const mutations = {//同步
  momentsGetlistMut(state, data) {
    state.momentsData = data.data;
  },
  momentsGetDetaileMut(state,data){
    state.momentsDetail = data.data
  },
  momentExamineMut(state,data){
    state.momentExamine = data.data
  },
  momentRecommendMut(state,data){
    state.momentRecommend=  data.data
  },
  delmomentMut(state,data){
    state.delmoment = data.data
  }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}
