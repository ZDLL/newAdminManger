import apiUrl from '../../config/api.js'
import {sendRequest} from '../../comm/until.js'
import * as types from '../type.js';
import qs from 'qs'

const state = {
    [types.GET_ROLE_LIST]:{},
    [types.POST_SAVE_ROLE]:{},
    [types.DEL_DELETE_ROLE]:{},
    [types.PUT_ENABLE_ROLE]:{},
    [types.GET_USER_ROLE_LIST]:{},
    [types.POST_SAVE_USER_MENU]:{}
}
// getters
const getters = {//同步

}
const actions ={//异步
    async [types.GET_ROLE_LIST](cxt,pram){
        cxt.commit(types.GET_ROLE_LIST,await sendRequest(apiUrl.queryRoles,qs.stringify(pram),"post"))
    },
    async [types.POST_SAVE_ROLE](cxt,pram){
        cxt.commit(types.POST_SAVE_ROLE,await sendRequest(apiUrl.saveRole,qs.stringify(pram),"post"))
    },
    async [types.DEL_DELETE_ROLE](cxt,pram){
        cxt.commit(types.DEL_DELETE_ROLE,await sendRequest(apiUrl.deleteRole+'/'+pram.roleId,{},"delete"))
    },
    async [types.PUT_ENABLE_ROLE](cxt,pram){
        cxt.commit(types.PUT_ENABLE_ROLE,await sendRequest(apiUrl.enableRole+'/'+pram.roleId,{},"put"))
    },
    async [types.GET_USER_ROLE_LIST](cxt,pram){
        cxt.commit(types.GET_USER_ROLE_LIST,await sendRequest(apiUrl.roleMenus,qs.stringify(pram),"post"))
    },
    async [types.POST_SAVE_USER_MENU](cxt,pram){
        cxt.commit(types.POST_SAVE_USER_MENU,await sendRequest(apiUrl.saveRoleMenuId,qs.stringify(pram),"post"))
    },
  
}
const mutations = { //同步
    [types.GET_ROLE_LIST](state,data){
        state[types.GET_ROLE_LIST] = data.data
    },
    [types.POST_SAVE_ROLE](state,data){
        state[types.POST_SAVE_ROLE] = data.data
    },
    [types.DEL_DELETE_ROLE](state,data){
        state[types.DEL_DELETE_ROLE] = data.data
    },
    [types.PUT_ENABLE_ROLE](state,data){
        state[types.PUT_ENABLE_ROLE] = data.data
    },
    [types.GET_USER_ROLE_LIST](state,data){
        state[types.GET_USER_ROLE_LIST] = data.data
    },
    [types.POST_SAVE_USER_MENU](state,data){
        state[types.POST_SAVE_USER_MENU] = data.data
    },
}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
  }