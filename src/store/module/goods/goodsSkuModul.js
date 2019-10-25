import apiUrl from './skuApi.js'
import {sendRequest} from '../../../comm/until.js'
import * as types from './skuType.js';
import qs from 'qs'

const state = {
    [types.POST_SKUINFO_SUB_LIST]:{},
    [types.POST_SKUINFO_SAVE]:{},
    [types.POST_SKUTYPES_SUB_LIST]:{},
    [types.POST_SKUINFO_DISABLE]:{},
    [types.POST_SKUINFO_ENABLE]:{},
    [types.POST_SKUINFO_DEL]:{},

}
// getters
const getters = {//同步
 
}
const actions ={
    async [types.POST_SKUINFO_SUB_LIST](cxt,postData){
        cxt.commit(types.POST_SKUINFO_SUB_LIST,await sendRequest(apiUrl.getSkuInfoSubList,qs.stringify(postData),"post"))
    },
    async [types.POST_SKUINFO_SAVE](cxt,postData){
        cxt.commit(types.POST_SKUINFO_SAVE,await sendRequest(apiUrl.saveSkuInfo,qs.stringify(postData),"post"))
    },
    async [types.POST_SKUTYPES_SUB_LIST](cxt,postData){
        cxt.commit(types.POST_SKUTYPES_SUB_LIST,await sendRequest(apiUrl.getSkuTypeSubList,qs.stringify(postData),"post"))
    },
    async [types.POST_SKUINFO_DISABLE](cxt,postData){
        cxt.commit(types.POST_SKUINFO_DISABLE,await sendRequest(apiUrl.infoDis,qs.stringify(postData),"post"))
    },
    async [types.POST_SKUINFO_ENABLE](cxt,postData){
        cxt.commit(types.POST_SKUINFO_ENABLE,await sendRequest(apiUrl.infEnable,qs.stringify(postData),"post"))
    },
    async [types.POST_SKUINFO_DEL](cxt,postData){
        cxt.commit(types.POST_SKUINFO_DEL,await sendRequest(apiUrl.infoDel,qs.stringify(postData),"post"))
    },
    async [types.POST_GDS_SAVE_SPU](cxt,postData){
        cxt.commit(types.POST_GDS_SAVE_SPU,await sendRequest(apiUrl.gdssavespu,qs.stringify(postData),"post"))
    },
    async [types.POST_GDS_SAVE_GOODS](cxt,postData){
        cxt.commit(types.POST_GDS_SAVE_GOODS,await sendRequest(apiUrl.gdssavegoods,qs.stringify(postData),"post"))
    },
    async [types.POST_GDS_SAVE_GOODS_GROUP](cxt,postData){
        cxt.commit(types.POST_GDS_SAVE_GOODS_GROUP,await sendRequest(apiUrl.gdssavegoodsgroup,qs.stringify(postData),"post"))
    },
}
const mutations = {
    [types.POST_SKUINFO_SUB_LIST](state,data){
        state[types.POST_SKUINFO_SUB_LIST]= data.data
    },
    [types.POST_SKUINFO_SAVE](state,data){
        state[types.POST_SKUINFO_SAVE]= data.data
    },
    [types.POST_SKUTYPES_SUB_LIST](state,data){
        state[types.POST_SKUTYPES_SUB_LIST]= data.data
    },
    [types.POST_SKUINFO_DISABLE](state,data){
        state[types.POST_SKUINFO_DISABLE]= data.data
    },
    [types.POST_SKUINFO_ENABLE](state,data){
        state[types.POST_SKUINFO_ENABLE]= data.data
    },
    [types.POST_SKUINFO_DEL](state,data){
        state[types.POST_SKUINFO_DEL]= data.data
    },
    [types.POST_GDS_SAVE_SPU](state,data){
        state[types.POST_GDS_SAVE_SPU]= data.data
    },
    [types.POST_GDS_SAVE_GOODS](state,data){
        state[types.POST_GDS_SAVE_GOODS]= data.data
    },
    [types.POST_GDS_SAVE_GOODS_GROUP](state,data){
        state[types.POST_GDS_SAVE_GOODS_GROUP]= data.data
    },
}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
  }