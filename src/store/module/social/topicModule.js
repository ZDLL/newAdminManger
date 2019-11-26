
import qs from "qs";
import apiUrl from './api.js'
import {sendRequest} from '../../../comm/until.js'
const state = {
 topicListData:{},
 topicDetailData:{},
 topicAddData:{},
 topicEditData:{},
 changeTopicData:{},
 topicDelData:{},
 topipcMomtListData:{},
 topicRecData:{}
}

// getters
const getters = {//同步

}
// actions
const actions = {//异步
  async topicListaAct(context,param){//话题列表
        context.commit("topicListMut", await sendRequest(apiUrl.topicList,qs.stringify(param),'post'))
  },
  async topicDetailAct(context,param){//话题详情
      context.commit("topicDetailMut",await sendRequest(apiUrl.topicDetail,qs.stringify(param),'post'))
  },
  async topicAddAct(context,param){//添加话题
      context.commit("topicAddMut",await sendRequest(apiUrl.topicAdd,qs.stringify(param),'post'))
  },
  async topicEditAct(context,param){//编辑话题
      context.commit('topicEditMut',await sendRequest(apiUrl.topicEdit,qs.stringify(param),'post'))
  },
  async changeTopicAct(context,param){//上架下架操作
      context.commit("changeTopicMut",await sendRequest(apiUrl.changeTopic,qs.stringify(param),'post'))
  },
  async topicDelAct (context,param){//删除话题
      context.commit("topicDelMut",await sendRequest(apiUrl.topicDel,qs.stringify(param),'post'))
  },
  async topicMomtList(context,param){
    context.commit("topipcMomtList",await sendRequest(apiUrl.gettopicmoments,qs.stringify(param),'post'))
  },
  async topicRecAct(context,param){
      context.commit("topicRecMut",await sendRequest(apiUrl.topicRec,qs.stringify(param),'post'))
  }
}
// mutations
const mutations = {//同步
    topicListMut(state,data){
        state.topicListData = data.data
    },
    topicDetailMut(state,data){
        state.topicDetailData = data.data
    },
    topicAddMut(state,data){
        state.topicAddData = data.data
    },
    topicEditMut(state,data){
        state.topicEditData = data.data
    },
    changeTopicMut(state,data){
        state.changeTopicData = data.data
    },
    topicDelMut(state,data){
        state.topicDelData = data.data
    },
    topipcMomtList(state,data){
        state.topipcMomtListData = data.data
    },
    topicRecMut(state,data){
        state.topicRecData = data.data
    }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}
