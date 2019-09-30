import apiUrl from '../../../config/goodsApi.js'
import {sendRequest} from '../../../comm/until.js'
import * as types from './type.js';
import qs from 'qs'

const state = {
    [types.POST_SPU_LIST]:{},
    [types.POST_SPU_DETAIL]:{},
    [types.POST_SPU_UPDATA]:{},
    [types.POST_SPU_ABLE]:{},

}
// getters
const getters = {//同步

}
const actions ={
    async [types.POST_SPU_LIST](cxt,postData){
        cxt.commit(types.POST_SPU_LIST,await sendRequest(apiUrl.spuList,qs.stringify(postData),"post"))
    },
    async [types.POST_SPU_DETAIL](cxt,postData){
        cxt.commit(types.POST_SPU_DETAIL,await sendRequest(apiUrl.spudetail,qs.stringify(postData),"post"))
    },
    async [types.POST_SPU_UPDATA](cxt,postData){
        cxt.commit(types.POST_SPU_UPDATA,await sendRequest(apiUrl.spuUpdate,qs.stringify(postData),"post"))
    },
    async [types.POST_SPU_ABLE](cxt,postData){
        cxt.commit(types.POST_SPU_ABLE,await sendRequest(apiUrl.spuAble,qs.stringify(postData),"post"))
    },
    //spuAble
}
const mutations = {
    [types.POST_SPU_LIST](state,data){
        state[types.POST_SPU_LIST]= data.data
    },
    [types.POST_SPU_DETAIL](state,data){
        state[types.POST_SPU_DETAIL]= data.data
    },
    [types.POST_SPU_UPDATA](state,data){
        state[types.POST_SPU_UPDATA]= data.data
    },
    [types.POST_SPU_ABLE](state,data){
        state[types.POST_SPU_ABLE]= data.data
    },

}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
  }