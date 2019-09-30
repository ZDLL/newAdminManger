import apiUrl from '../../../config/goodsApi.js'
import {sendRequest} from '../../../comm/until.js'
import * as types from './type.js';
import qs from 'qs'

const state = {
   [types.POST_GDS_GROUP_LIST]:{},
   [types.POST_GDS_GROUP_DETAIL]:{},
   [types.POST_GDS_GRUOP_EDITOR]:{},
   [types.POST_GDS_GROUP_EDITOR_SAVE]:{},
   [types.POST_GDS_GROUP_ANBLE]:{}

}
// getters
const getters = {//同步

}
const actions ={
   async [types.POST_GDS_GROUP_LIST](cxt,postData){
    cxt.commit(types.POST_GDS_GROUP_LIST,await sendRequest(apiUrl.gdsGroupList,qs.stringify(postData),"post"))
   },
   async [types.POST_GDS_GROUP_DETAIL](cxt,postData){
    cxt.commit(types.POST_GDS_GROUP_DETAIL,await sendRequest(apiUrl.gdsGroupDetail,qs.stringify(postData),"post"))
   },
   async [types.POST_GDS_GRUOP_EDITOR](cxt,postData){
    cxt.commit(types.POST_GDS_GRUOP_EDITOR,await sendRequest(apiUrl.gdsGroupEditor+'/'+postData.goodsGroupNo,{},"get"))
   },
   //gdsSaveGroupEditor
   async [types.POST_GDS_GROUP_EDITOR_SAVE](cxt,postData){
    cxt.commit(types.POST_GDS_GROUP_EDITOR_SAVE,await sendRequest(apiUrl.gdsSaveGroupEditor,qs.stringify(postData),"post"))
   },
   //gdsGroupAble
   async [types.POST_GDS_GROUP_ANBLE](cxt,postData){
    cxt.commit(types.POST_GDS_GROUP_ANBLE,await sendRequest(apiUrl.gdsGroupAble,qs.stringify(postData),"post"))
   },

}
const mutations = {
    [types.POST_GDS_GROUP_LIST](state,data){
        state[types.POST_GDS_GROUP_LIST]= data.data
    },
    [types.POST_GDS_GROUP_DETAIL](state,data){
        state[types.POST_GDS_GROUP_DETAIL]= data.data
    },
    [types.POST_GDS_GRUOP_EDITOR](state,data){
        state[types.POST_GDS_GRUOP_EDITOR]= data.data
    },
    [types.POST_GDS_GROUP_EDITOR_SAVE](state,data){
        state[types.POST_GDS_GROUP_EDITOR_SAVE]= data.data
    },
    [types.POST_GDS_GROUP_ANBLE](state,data){
        state[types.POST_GDS_GROUP_ANBLE]= data.data
    },
}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
  }