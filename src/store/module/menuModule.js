import apiUrl from '../../config/api.js'
import {sendRequest} from '../../comm/until.js'
import * as types from '../type.js';
import qs from 'qs'

const state = {
    [types.MENU_GET_LIST]:{},
    [types.GET_CODE_VALUE]:{}
}
// getters
const getters = {//同步

}
const actions ={
    async [types.MENU_GET_LIST](cxt,postData){
        cxt.commit(types.MENU_GET_LIST,await sendRequest(apiUrl.queryMenus,qs.stringify(postData),"post"))
    },
    async [types.GET_CODE_VALUE](cxt,postData){
        cxt.commit(types.GET_CODE_VALUE,await sendRequest(apiUrl.queryCodeValue,{in:{postData}},"post"))
    }
}
const mutations = {
    [types.MENU_GET_LIST](state,data){
        state[types.MENU_GET_LIST]= data.data
    },
    [types.GET_CODE_VALUE](state,data){
        state[types.GET_CODE_VALUE]= data.data
    },

}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
  }