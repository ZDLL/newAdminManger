import apiUrl from '../target/api.js';
import {sendRequest} from '../../../comm/until.js'
import * as types from './type.js';
import qs from 'qs'
   const state = {
      [types.POST_TAERGET_LIST]:{},
      [types.POST_ADD_TARGET]:{},
      [types.POST_EDITOR_TARGET]:{},
      [types.POST_TARGET_DETAIL]:{},
      [types.POST_GDS_TYPE_LIST]:{},
      [types.POST_GET_SKU_NO]:{},
      [types.POST_GET_GROUP_LIST]:{},
      [types.POST_GET_GDS_DETAIL]:{},
      [types.POST_GET_INDEX_LIST]:{},
      [types.POST_ADD_TYPE]:{},
      [types.POST_SET_WEIGHT]:{},
      [types.POST_DEL_GDS_TYPE]:{},
      [types.POST_EDITOR_GDS_TYPE]:{}
   }
   // getters
   const getters = {//同步
   
   }
   // actions
   const actions = {//异步
     async [types.POST_TAERGET_LIST](cxt,postData){
        cxt.commit(types.POST_TAERGET_LIST,await sendRequest(apiUrl.getlist,qs.stringify(postData),'post'))
    },
    async [types.POST_ADD_TARGET](cxt,postData){
        cxt.commit(types.POST_ADD_TARGET,await sendRequest(apiUrl.addindex,qs.stringify(postData),'post'))
    },
    async [types.POST_EDITOR_TARGET](cxt,postData){
        cxt.commit(types.POST_EDITOR_TARGET,await sendRequest(apiUrl.editindex,qs.stringify(postData),'post'))
    },
    async [types.POST_TARGET_DETAIL](cxt,postData){
        cxt.commit(types.POST_TARGET_DETAIL,await sendRequest(apiUrl.getdetail,qs.stringify(postData),'post'))
    },
    async [types.POST_GDS_TYPE_LIST](cxt,postData){
        cxt.commit(types.POST_GDS_TYPE_LIST,await sendRequest(apiUrl.getgoodstypelist,qs.stringify(postData),'post'))
    },
    async [types.POST_GET_SKU_NO](cxt,postData){
        cxt.commit(types.POST_GET_SKU_NO,await sendRequest(apiUrl.getskulist,qs.stringify(postData),'post'))
    },
    async [types.POST_GET_GROUP_LIST](cxt,postData){
        cxt.commit(types.POST_GET_GROUP_LIST,await sendRequest(apiUrl.getgoodsgroup,qs.stringify(postData),'post'))
    },
    async [types.POST_GET_GDS_DETAIL](cxt,postData){
        cxt.commit(types.POST_GET_GDS_DETAIL,await sendRequest(apiUrl.getgoodstypedetail,qs.stringify(postData),'post'))
    },
    async [types.POST_GET_INDEX_LIST](cxt,postData){
        cxt.commit(types.POST_GET_INDEX_LIST,await sendRequest(apiUrl.getindexlist,qs.stringify(postData),'post'))
    },
    async [types.POST_ADD_TYPE](cxt,postData){
        cxt.commit(types.POST_ADD_TYPE,await sendRequest(apiUrl.addtype,qs.stringify(postData),'post'))
    },
    async [types.POST_SET_WEIGHT](cxt,postData){
        cxt.commit(types.POST_SET_WEIGHT,await sendRequest(apiUrl.setindexweight,qs.stringify(postData),'post'))
    },
    async [types.POST_DEL_GDS_TYPE](cxt,postData){
        cxt.commit(types.POST_DEL_GDS_TYPE,await sendRequest(apiUrl.delgoodstype,qs.stringify(postData),'post'))
    },
   
    async [types.POST_EDITOR_GDS_TYPE](cxt,postData){
        cxt.commit(types.POST_EDITOR_GDS_TYPE,await sendRequest(apiUrl.edittype,qs.stringify(postData),'post'))
    },
   }
   // mutations
   const mutations = {//同步
        [types.POST_TAERGET_LIST](state,data){
            state[types.POST_TAERGET_LIST]= data.data
        },
        [types.POST_ADD_TARGET](state,data){
            state[types.POST_ADD_TARGET]= data.data
        },
        [types.POST_EDITOR_TARGET](state,data){
            state[types.POST_EDITOR_TARGET]= data.data
        },
        [types.POST_TARGET_DETAIL](state,data){
            state[types.POST_TARGET_DETAIL]= data.data
        },
        [types.POST_GDS_TYPE_LIST](state,data){
            state[types.POST_GDS_TYPE_LIST]= data.data
        },
        [types.POST_GET_SKU_NO](state,data){
            state[types.POST_GET_SKU_NO]= data.data
        },
        [types.POST_GET_GROUP_LIST](state,data){
            state[types.POST_GET_GROUP_LIST]= data.data
        },
        [types.POST_GET_GDS_DETAIL](state,data){
            state[types.POST_GET_GDS_DETAIL]= data.data
        },
        [types.POST_GET_INDEX_LIST](state,data){
            state[types.POST_GET_INDEX_LIST]= data.data
        },
        [types.POST_ADD_TYPE](state,data){
            state[types.POST_ADD_TYPE]= data.data
        },
        [types.POST_SET_WEIGHT](state,data){
            state[types.POST_SET_WEIGHT]= data.data
        },
        [types.POST_DEL_GDS_TYPE](state,data){
            state[types.POST_DEL_GDS_TYPE]= data.data
        },
        [types.POST_EDITOR_GDS_TYPE](state,data){
            state[types.POST_EDITOR_GDS_TYPE]= data.data
        },
         //POST_EDITOR_GDS_TYPE
   }
   
   export default {
     namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
     state,
     getters,
     actions,
     mutations
   }