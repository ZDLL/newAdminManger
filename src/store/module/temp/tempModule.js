import apiUrl from './api.js';
import {sendRequest} from '../../../comm/until.js'
import * as types from './type.js';
import qs from 'qs'

const state={
    [types.POST_EL_LIST]:{},//常用组件列表
    [types.POST_EL_DETAIL]:{},//组件详情
    [types.POST_ALL_EL_LISTA]:{},//所有组件列表
    [types.POST_ADD_ELE]:{},//添加组件
    [types.POST_EL_CHANGE_STATUS]:{},//组件的禁用启用
    [types.POST_EL_TYPE]:{},//组件类型
    [types.POST_EL_EDITE]:{},//修改组件

    [types.POST_TE_LIST]:{},//模版列表
    [types.POST_TE_DETAIL]:{},//模版详情
    [types.POST_TE_ADD]:{},//添加模版
    [types.POST_TE_EDI]:{},//编辑模版
    [types.POST_TE_CHANGE_STA]:{},//模版的禁用启用
}
const getters={}

const actions = {
    async [types.POST_EL_LIST](cxt,postData){
        cxt.commit(types.POST_EL_LIST,await sendRequest(apiUrl.elList,qs.stringify(postData),'post'))
    },
    async [types.POST_EL_DETAIL](cxt,postData){
        cxt.commit(types.POST_EL_DETAIL,await sendRequest(apiUrl.elDetail,qs.stringify(postData),'post'))
    },
    async [types.POST_TE_LIST](cxt,postData){
        cxt.commit(types.POST_TE_LIST,await sendRequest(apiUrl.temList,qs.stringify(postData),'post'))
    },
    async [types.POST_TE_DETAIL](cxt,postData){
        cxt.commit(types.POST_TE_DETAIL,await sendRequest(apiUrl.temDetail,qs.stringify(postData),'post'))
    },
    async [types.POST_ADD_ELE](cxt,postData){
        cxt.commit(types.POST_ADD_ELE,await sendRequest(apiUrl.addEle,qs.stringify(postData),'post'))
    },
    async [types.POST_ALL_EL_LISTA](cxt,postData){
        cxt.commit(types.POST_ALL_EL_LISTA,await sendRequest(apiUrl.eleAllList,qs.stringify(postData),'post'))
    },
    async [types.POST_EL_CHANGE_STATUS](cxt,postData){
        cxt.commit(types.POST_EL_CHANGE_STATUS,await sendRequest(apiUrl.eleChangeSta,qs.stringify(postData),'post'))
    },
    async [types.POST_EL_TYPE](cxt,postData){
        cxt.commit(types.POST_EL_TYPE,await sendRequest(apiUrl.eleType,qs.stringify(postData),'post'))
    },
    async [types.POST_EL_EDITE](cxt,postData){
        cxt.commit(types.POST_EL_EDITE,await sendRequest(apiUrl.eleEdite,qs.stringify(postData),'post'))
    },
    //
    async [types.POST_TE_ADD](cxt,postData){
        cxt.commit(types.POST_TE_ADD,await sendRequest(apiUrl.temAdd,qs.stringify(postData),'post'))
    },
    async [types.POST_TE_EDI](cxt,postData){
        cxt.commit(types.POST_TE_EDI,await sendRequest(apiUrl.temEdi,qs.stringify(postData),'post'))
    },
    async [types.POST_TE_CHANGE_STA](cxt,postData){
        cxt.commit(types.POST_TE_CHANGE_STA,await sendRequest(apiUrl.temChangeSta,qs.stringify(postData),'post'))
    },
    //POST_TE_CHANGE_STA
    
}
const mutations = {
    [types.POST_EL_LIST](state,data){
        state[types.POST_EL_LIST]= data.data
    },
    [types.POST_EL_DETAIL](state,data){
        state[types.POST_EL_DETAIL]= data.data
    },
    [types.POST_TE_LIST](state,data){
        state[types.POST_TE_LIST]= data.data
    },
    [types.POST_TE_DETAIL](state,data){
        state[types.POST_TE_DETAIL]= data.data
    },
    [types.POST_ADD_ELE](state,data){
        state[types.POST_ADD_ELE]= data.data
    },
    [types.POST_ALL_EL_LISTA](state,data){
        state[types.POST_ALL_EL_LISTA]= data.data
    },
    [types.POST_EL_CHANGE_STATUS](state,data){
        state[types.POST_EL_CHANGE_STATUS]= data.data
    },
    [types.POST_EL_TYPE](state,data){
        state[types.POST_EL_TYPE]= data.data
    },
    [types.POST_EL_EDITE](state,data){
        state[types.POST_EL_EDITE]= data.data
    },
    [types.POST_TE_ADD](state,data){
        state[types.POST_TE_ADD]= data.data
    },
    [types.POST_TE_EDI](state,data){
        state[types.POST_TE_EDI]= data.data
    },
    [types.POST_TE_CHANGE_STA](state,data){
        state[types.POST_TE_CHANGE_STA]= data.data
    },
    
}
export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
  }