import apiUrl from '../../config/api.js'
import {sendRequest} from '../../comm/until.js'
import * as types from '../type.js';
import qs from 'qs'

const state = {
    [types.MENU_GET_LIST]:{},
    [types.GET_CODE_VALUE]:{},
    [types.POST_SAVE_MENU]:{},
    [types.UPDAT_POST_MENU]:{},
    [types.POST_DEL_MENU]:{}
}
// getters
const getters = {//同步

}
const actions ={
    async [types.MENU_GET_LIST](cxt,postData){
        cxt.commit(types.MENU_GET_LIST,await sendRequest(apiUrl.queryMenus,qs.stringify(postData),"post"))
    },
    async [types.GET_CODE_VALUE](cxt,postData){
        cxt.commit(types.GET_CODE_VALUE,await sendRequest(apiUrl.queryCodeValue,qs.stringify(postData),"post"))
    },
    async [types.POST_SAVE_MENU](cxt,postData){
        cxt.commit(types.POST_SAVE_MENU,await sendRequest(apiUrl.saveMenu,qs.stringify(postData),"post"))
    },
    async [types.UPDAT_POST_MENU](cxt,postData){
        cxt.commit(types.UPDAT_POST_MENU,await sendRequest(apiUrl.updateMenu,qs.stringify(postData),"post"))
    },
    async [types.POST_DEL_MENU](cxt,postData){
        cxt.commit(types.POST_DEL_MENU,await sendRequest(apiUrl.deleteMenu,qs.stringify(postData),"post"))
    }
}
const mutations = {
    [types.MENU_GET_LIST](state,data){
        state[types.MENU_GET_LIST]= data.data
    },
    [types.GET_CODE_VALUE](state,data){
        state[types.GET_CODE_VALUE]= data.data
    },
    [types.POST_SAVE_MENU](state,data){
        state[types.POST_SAVE_MENU]= data.data
    },
    [types.UPDAT_POST_MENU](state,data){
        state[types.UPDAT_POST_MENU]= data.data
    },

    [types.POST_DEL_MENU](state,data){
        state[types.POST_DEL_MENU]= data.data
    }

}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
  }