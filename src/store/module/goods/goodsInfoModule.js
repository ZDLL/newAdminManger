import apiUrl from '../../../config/goodsApi.js'
import {sendRequest} from '../../../comm/until.js'
import * as types from './type.js';
import qs from 'qs'

const state = {
   [types.POST_GDS_INFO_LIST]:{},
   [types.GET_GDS_INFO_DETAIL]:{},
   [types.POST_GDS_INFO_ABLE]:{},
}
// getters
const getters = {//同步

}
const actions ={
    async [types.POST_GDS_INFO_LIST](cxt,postData){
        cxt.commit(types.POST_GDS_INFO_LIST,await sendRequest(apiUrl.gdsInfoList,qs.stringify(postData),"post"))
    },
    async [types.GET_GDS_INFO_DETAIL](cxt,postData){
        cxt.commit(types.GET_GDS_INFO_DETAIL,await sendRequest(apiUrl.gdsInfoDetail+"/"+postData.goodsNo,{},"get"))
    },
    async [types.POST_GDS_INFO_ABLE](cxt,postData){
        cxt.commit(types.POST_GDS_INFO_ABLE,await sendRequest(apiUrl.gdsInfoAble,qs.stringify(postData),"post"))
    },
    //gdsInfoAble
}
const mutations = {
    [types.POST_GDS_INFO_LIST](state,data){
        state[types.POST_GDS_INFO_LIST]= data.data
    },
    [types.GET_GDS_INFO_DETAIL](state,data){
        state[types.GET_GDS_INFO_DETAIL]= data.data
    },
    [types.POST_GDS_INFO_ABLE](state,data){
        state[types.POST_GDS_INFO_ABLE]= data.data
    },
}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
  }