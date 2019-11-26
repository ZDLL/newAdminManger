
import qs from 'qs'
import apiUrl from './api.js'
import {sendRequest} from '../../../comm/until.js'
const state = {
    getCommentList:{},
    delCommentList:{}
}
// getters
const getters = {//同步

}
// actions
const actions = {//异步
    async getCommentListAct(context,parame){
        context.commit("getCommentListMut",await sendRequest(apiUrl.commentGetList,qs.stringify(parame),'post'))
    },
    async delCommentListAct(context,parame){
        context.commit("delCommentListMut",await sendRequest(apiUrl.delcomment,qs.stringify(parame),'post'))
    },

}
// mutations
const mutations = {//同步
    getCommentListMut(state,data){
        state.getCommentList = data.data
    },
    delCommentListMut(state,data){
        state.delCommentList = data.data
    }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}