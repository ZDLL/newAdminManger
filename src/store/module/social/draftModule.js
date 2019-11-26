import apiUrl from './api.js'
import {sendRequest} from '../../../comm/until.js'
import qs from 'qs'

const state={
    addRaftData:{},
    getRaftListData:{},
    getRafDetailData:{},
    deleteRafl:{}
}
const getters={}
const actions={
    async addRafAct(context,parm){
        context.commit("addRaftMut",await sendRequest(apiUrl.adddraft,qs.stringify(parm),'post'))
    },
    async getRaftListAct(context,parm){
        context.commit("getRaftListMut",await sendRequest(apiUrl.getdraftlist,qs.stringify(parm),'post'))
    },
    async getRafDetailfAct(context,parm){
        context.commit("getRafDetailMut",await sendRequest(apiUrl.getdraftdetail,qs.stringify(parm),'post'))
    },
    async deleteRaflAct(context,parm){
        context.commit("deleteRaflMut",await sendRequest(apiUrl.deldraft,qs.stringify(parm),'post'))
    },
}
const mutations={
    addRaftMut(state,data){
        state.addRaftData= data.data
    },
    getRaftListMut(state,data){
        state.getRaftListData= data.data
    },
    getRafDetailMut(state,data){
        state.getRafDetailData= data.data
    },
    deleteRaflMut(state,data){
        state.deleteRafl= data.data
    },
}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations,
    strict: true
  }