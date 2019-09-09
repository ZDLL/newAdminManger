import apiUrl from '../../config/api.js'
import {sendRequest} from '../../comm/until.js'
import * as types from '../type.js';
import qs from 'qs'

const state = {
  [types.USER_GET_LIST]: {},
  [types.USER_RESET_PWD]: {},
  [types.ROLES_GET_LIST]: {},
  [types.USER_SAVE]: {},
  [types.USER_CHANGE_STATUS]: {}
}
// getters
const getters = {//同步

}
const actions ={
  async [types.USER_GET_LIST](cxt,postData){
    cxt.commit(types.USER_GET_LIST,await sendRequest(apiUrl.queryUsers,qs.stringify(postData),"post"))
  },
  async [types.USER_RESET_PWD](cxt,postData){
    cxt.commit(types.USER_RESET_PWD,await sendRequest(apiUrl.restPassword + '/' + postData,{},"get"))
  },
  async [types.ROLES_GET_LIST](cxt,postData){
    cxt.commit(types.ROLES_GET_LIST,await sendRequest(apiUrl.queryRoles,qs.stringify(postData),"post"))
  },
  async [types.USER_SAVE](cxt, postData) {
    cxt.commit(types.USER_SAVE,await sendRequest(apiUrl.saveUser,qs.stringify(postData),"post"))
  },
  async [types.USER_CHANGE_STATUS](cxt, postData) {
    cxt.commit(types.USER_CHANGE_STATUS,await sendRequest(apiUrl.changeUserStatus,qs.stringify(postData),"post"))
  }
}
const mutations = {
  [types.USER_GET_LIST](state,data){
    state[types.USER_GET_LIST]= data.data
  },
  [types.USER_RESET_PWD](state,data){
    state[types.USER_RESET_PWD]= data.data
  },
  [types.ROLES_GET_LIST](state,data){
    state[types.ROLES_GET_LIST]= data.data
  },
  [types.USER_SAVE](state,data){
    state[types.USER_SAVE]= data.data
  },
  [types.USER_CHANGE_STATUS](state,data){
    state[types.USER_CHANGE_STATUS]= data.data
  },
}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
  }