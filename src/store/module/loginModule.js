import apiUrl from '../../config/api.js'
import {sendRequest} from '../../comm/until.js'
import * as types from '../type.js';
import qs from 'qs'
   const state = {
        [types.USER_GET_LOGIN]:{},
        [types.USER_GET_MENU]:{},
        [types.USER_LOGIN_OUT]:{}
   }
   // getters
   const getters = {//同步
   
   }
   // actions
   const actions = {//异步
     async [types.USER_GET_LOGIN](cxt,postData){
        cxt.commit(types.USER_GET_LOGIN,await sendRequest(apiUrl.login,qs.stringify(postData),'post'))
    },
    async [types.USER_GET_MENU](cxt,postData){
        cxt.commit(types.USER_GET_MENU,await sendRequest(apiUrl.queryRoleMenus+'/'+postData.roleId,{},'get'))
    },
    async [types.USER_LOGIN_OUT](cxt,postData){
      cxt.commit(types.USER_LOGIN_OUT,await sendRequest(apiUrl.logout,qs.stringify(postData),'post'))
    }
   }
   // mutations
   const mutations = {//同步
      [types.USER_GET_LOGIN](state,data){
          state[types.USER_GET_LOGIN]= data.data.out
      },
      [types.USER_GET_MENU](state,data){
        console.log(data)
        state[types.USER_GET_MENU]= data.data.out
      },
      [types.USER_LOGIN_OUT](state,data){
        state[types.USER_LOGIN_OUT]= data.data
      }

   }
   
   export default {
     namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
     state,
     getters,
     actions,
     mutations
   }