import apiUrl from '../../../config/goodsApi.js'
import {sendRequest} from '../../../comm/until.js'
import * as types from './type.js';
import qs from 'qs'

const state = {
    [types.POST_GDS_SAVE]:{},
    [types.POST_GDS_PARTS]:{},
    [types.POST_GDS_LIST]:{},
    [types.POST_GDS_TYPE_DEL]:{},//删除sky类型
    [types.POST_GDS_TYPR_DISABLE]:{},//禁用类型
    [types.POST_GDS_TYPR_ENDABLE]:{},//启用类型
   
    [types.POST_GDS_SKU_LIST]:{},//获取sku类型列表
    [types.POST_GDS_SKU_SAVE]:{},//保存或修改sku
    [types.POST_GDS_SAVE_SPU]:{},//生成spu
    [types.POST_GDS_SAVE_GOODS]:{},//生成商品
    [types.POST_GDS_SAVE_GOODS_GROUP]:{},//生成商品组
    [types.POST_GDS_CODES_LIST]:{},//获取码值列表
    [types.POST_GDS_INFO_LIST]:{},

    [types.POST_GDS_CHILD_LIST]:{},
}
// getters
const getters = {//同步

}
const actions ={
    async [types.POST_GDS_SAVE](cxt,postData){
        cxt.commit(types.POST_GDS_SAVE,await sendRequest(apiUrl.gdssave,qs.stringify(postData),"post"))
    },
    async [types.POST_GDS_PARTS](cxt,postData){
        cxt.commit(types.POST_GDS_PARTS,await sendRequest(apiUrl.gdsparts,qs.stringify(postData),"post"))
    },
    async [types.POST_GDS_LIST](cxt,postData){
        cxt.commit(types.POST_GDS_LIST,await sendRequest(apiUrl.gdslist,qs.stringify(postData),"post"))
    },
    async [types.POST_GDS_TYPE_DEL](cxt,postData){
        cxt.commit(types.POST_GDS_TYPE_DEL,await sendRequest(apiUrl.gdsdel,qs.stringify(postData),"post"))
    },
    async [types.POST_GDS_TYPR_DISABLE](cxt,postData){
        cxt.commit(types.POST_GDS_TYPR_DISABLE,await sendRequest(apiUrl.gdsdistype,qs.stringify(postData),"post"))
    },
    async [types.POST_GDS_TYPR_ENDABLE](cxt,postData){
        cxt.commit(types.POST_GDS_TYPR_ENDABLE,await sendRequest(apiUrl.gdsenadletype,qs.stringify(postData),"post"))
    },
    
    async [types.POST_GDS_CODES_LIST](cxt,postData){
        cxt.commit(types.POST_GDS_CODES_LIST,await sendRequest(apiUrl.gdsCodesList,qs.stringify(postData),"post"))
    },


    async [types.POST_GDS_SKU_LIST](cxt,postData){
        cxt.commit(types.POST_GDS_SKU_LIST,await sendRequest(apiUrl.gdsskulist,qs.stringify(postData),"post"))
    },
    async [types.POST_GDS_SKU_SAVE](cxt,postData){
        cxt.commit(types.POST_GDS_SKU_SAVE,await sendRequest(apiUrl.gdsskusave,qs.stringify(postData),"post"))
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

    async [types.POST_GDS_INFO_LIST](cxt,postData){
        cxt.commit(types.POST_GDS_INFO_LIST,await sendRequest(apiUrl.gdsInfolist,qs.stringify(postData),"post"))
    },
    async [types.POST_GDS_CHILD_LIST](cxt,postData){
        cxt.commit(types.POST_GDS_CHILD_LIST,await sendRequest(apiUrl.getSubSkuInfo,qs.stringify(postData),"post"))
    },
}
const mutations = {
    [types.POST_GDS_SAVE](state,data){
        state[types.POST_GDS_SAVE]= data.data
    },
    [types.POST_GDS_PARTS](state,data){
        state[types.POST_GDS_PARTS]= data.data
    },
    [types.POST_GDS_LIST](state,data){
        state[types.POST_GDS_LIST]= data.data
    },
    [types.POST_GDS_TYPE_DEL](state,data){
        state[types.POST_GDS_TYPE_DEL]= data.data
    },
    [types.POST_GDS_TYPR_DISABLE](state,data){
        state[types.POST_GDS_TYPR_DISABLE]= data.data
    },
    [types.POST_GDS_TYPR_ENDABLE](state,data){
        state[types.POST_GDS_TYPR_ENDABLE]= data.data
    },
    //POST_GDS_SKU_LIST//获取sku类型列表
    //POST_GDS_SKU_SAVE//保存或修改sku
    //POST_GDS_SAVE_SPU//生成spu
    //POST_GDS_SAVE_GOODS//生成商品
    //POST_GDS_SAVE_GOODS_GROUP//生成商品组

    [types.POST_GDS_CODES_LIST](state,data){
        state[types.POST_GDS_CODES_LIST]= data.data
    },

    [types.POST_GDS_SKU_LIST](state,data){
        state[types.POST_GDS_SKU_LIST]= data.data
    },
    [types.POST_GDS_SKU_SAVE](state,data){
        state[types.POST_GDS_SKU_SAVE]= data.data
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

    [types.POST_GDS_INFO_LIST](state,data){
        state[types.POST_GDS_INFO_LIST]= data.data
    },
    [types.POST_GDS_CHILD_LIST](state,data){
        state[types.POST_GDS_CHILD_LIST]= data.data
    },
}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
  }