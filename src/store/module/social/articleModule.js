import apiUrl from './api.js'
import {sendRequest} from '../../../comm/until.js'
import qs from 'qs'
const state = {
  articleList:{},
  arcticleAdd:{},
  arcticleEditor:{},
  arcticleDetaile:{},
  artickeDel:{},
  addselect:{},
  adddiscover:{},
  getSystemUser:{}
}
// getters
const getters = {//同步

}
// actions
const actions = {//异步
    async arcticleGetListAct(context,parem){//获取列表
        context.commit("arcticleGetListMut",await sendRequest(apiUrl.subjectGetList,qs.stringify(parem),'post'))
    },
    async arcticleAddAct(context,parem){//添加文章
        context.commit("arcticleAddMut",await sendRequest(apiUrl.addsubject,qs.stringify(parem),'post'))
    },
    async editArcticleAct(context,parem){//编辑文章
        context.commit("arcticleEdotorMut",await sendRequest(apiUrl.editsubject,qs.stringify(parem),'post'))
    },
    async detaileArcticleAct(context,parem){//文章详情
        context.commit("arcticleDetailMut",await sendRequest(apiUrl.subjectGetDetail,qs.stringify(parem),'post'))
    },
    async arcticleDelAct(context,parem){//删除文章
        context.commit("arcticleDelMut", await sendRequest(apiUrl.delsubject,qs.stringify(parem),'post'))
    },
    async addselectAct(context,parem){//设置每日精选或撤销
        context.commit("addselectMut",await sendRequest(apiUrl.addselect,qs.stringify(parem),'post'))
    },
    async adddiscoverAct(context,parem){//设置发布或撤销
        context.commit("adddiscoverMut",await sendRequest(apiUrl.adddiscover,qs.stringify(parem),'post'))
    },
    async getSystemUserAct(context,parm){//设置用户的推荐
        context.commit("getSystemUserMut",await sendRequest(apiUrl.getsystemuser,qs.stringify(parm),'post'))
    },
}
// mutations
const mutations = {//同步
    arcticleGetListMut(state,data){
        state.articleList = data.data
    },
    arcticleAddMut(state,data){
        state.arcticleAdd =data.data
    },
    arcticleEdotorMut(state,data){
        state.arcticleEditor = data.data
    },
    arcticleDetailMut(state,data){
        state.arcticleDetaile = data.data
    },
    arcticleDelMut(state,data){
        state.artickeDel= data.data;
    },
    addselectMut(state,data){
        state.addselect =data.data
    },
    adddiscoverMut(state,data){
        state.adddiscover = data.data
    },
    getSystemUserMut(state,data){
        state.getSystemUser= data.data
    }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations,
  strict: true
}