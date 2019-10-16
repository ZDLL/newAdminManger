import apiUrl from '../score/api.js';
import {sendRequest} from '../../../comm/until.js'
import * as types from './type.js';
import qs from 'qs'
   const state = {
      [types.POST_SCORE_LIST]:{},
      [types.POST_ADD_SCORE]:{},
      [types.POST_CHANGE_STATUS]:{}
   }
   // getters
   const getters = {//同步
   
   }
   // actions
   const actions = {//异步
     async [types.POST_SCORE_LIST](cxt,postData){
        cxt.commit(types.POST_SCORE_LIST,await sendRequest(apiUrl.getindexscorelist,qs.stringify(postData),'post'))
    },
    async [types.POST_ADD_SCORE](cxt,postData){
        cxt.commit(types.POST_ADD_SCORE,await sendRequest(apiUrl.setindexscore,qs.stringify(postData),'post'))
    },
    async [types.POST_CHANGE_STATUS](cxt,postData){
        cxt.commit(types.POST_CHANGE_STATUS,await sendRequest(apiUrl.changestatus,qs.stringify(postData),'post'))
    },
   
   }
   // mutations
   const mutations = {//同步
        [types.POST_SCORE_LIST](state,data){
            state[types.POST_SCORE_LIST]= data.data
        },
        [types.POST_ADD_SCORE](state,data){
            state[types.POST_ADD_SCORE]= data.data
        },
        [types.POST_CHANGE_STATUS](state,data){
            state[types.POST_CHANGE_STATUS]= data.data
        },
     
   }
   
   export default {
     namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
     state,
     getters,
     actions,
     mutations
   }