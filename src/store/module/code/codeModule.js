import apiUrl from './api.js';
import {sendRequest} from '../../../comm/until.js'
import * as types from './type.js';
import qs from 'qs'
const state ={
    /**
     * 简单码表
     */
    [types.POST_ADD_CODE_TYPE]:{},
    [types.POST_ADD_CODE_INFO]:{},
    [types.POST_CODE_TYPE_LIST]:{},
    [types.POST_CODE_INFO_LIST]:{},
    [types.GET_CODE_TYPE_STATUS]:{},
    [types.POST_CODE_ATTR_STATUS]:{},
    /**
     * 复杂码表
     */
    [types.POST_COM_CODE_TYPE_LIST]:{},
    [types.POST_COM_CODE_VALUE_LIST]:{},
    [types.POST_COM_CODE_TYPE_SAVE]:{},
    [types.POST_COM_CODE_VALUE_SAVE]:{},
    /**
     * 系统参数
     */
    [types.POST_PARA_CODE_LISY]:{},
    [types.POST_PARA_CODE_SAVE]:{}
}
const getters ={

}
const actions={
  /**
   * 简单码表
   */
  async [types.POST_ADD_CODE_TYPE](cxt,postData){
      cxt.commit(types.POST_ADD_CODE_TYPE,await sendRequest(apiUrl.addCodeType,qs.stringify(postData),'post'))
  },
  async [types.POST_ADD_CODE_INFO](cxt,postData){
    cxt.commit(types.POST_ADD_CODE_INFO,await sendRequest(apiUrl.addCodeInfo,qs.stringify(postData),'post'))
  },
  async [types.POST_CODE_TYPE_LIST](cxt,postData){
    cxt.commit(types.POST_CODE_TYPE_LIST,await sendRequest(apiUrl.codeTypeList,qs.stringify(postData),'post'))
  },
  async [types.POST_CODE_INFO_LIST](cxt,postData){
    cxt.commit(types.POST_CODE_INFO_LIST,await sendRequest(apiUrl.codeValueList,qs.stringify(postData),'post'))
  },
  async [types.GET_CODE_TYPE_STATUS](cxt,postData){
    cxt.commit(types.GET_CODE_TYPE_STATUS,await sendRequest(apiUrl.statusChange+"/"+postData.codeTypeId,{},'get'))
  },
  async [types.POST_CODE_ATTR_STATUS](cxt,postData){
    cxt.commit(types.POST_CODE_ATTR_STATUS,await sendRequest(apiUrl.attrChange,qs.stringify(postData),'post'))
  },
  /**
   * 复杂码表
   */
  async [types.POST_COM_CODE_TYPE_LIST](cxt,postData){
    cxt.commit(types.POST_COM_CODE_TYPE_LIST,await sendRequest(apiUrl.comCodeTypeList,qs.stringify(postData),'post'))
  },
  async [types.POST_COM_CODE_VALUE_LIST](cxt,postData){
    cxt.commit(types.POST_COM_CODE_VALUE_LIST,await sendRequest(apiUrl.comCodeValeLis,qs.stringify(postData),'post'))
  },
  async [types.POST_COM_CODE_TYPE_SAVE](cxt,postData){
    cxt.commit(types.POST_COM_CODE_TYPE_SAVE,await sendRequest(apiUrl.comSaveType,qs.stringify(postData),'post'))
  },
  async [types.POST_COM_CODE_VALUE_SAVE](cxt,postData){
    cxt.commit(types.POST_COM_CODE_VALUE_SAVE,await sendRequest(apiUrl.comSaveValue,qs.stringify(postData),'post'))
  },
  /**
   * 系统参数
   */
  async [types.POST_PARA_CODE_LISY](cxt,postData){
    cxt.commit(types.POST_PARA_CODE_LISY,await sendRequest(apiUrl.paraInfoLis,qs.stringify(postData),'post'))
  },
  async [types.POST_PARA_CODE_SAVE](cxt,postData){
    cxt.commit(types.POST_PARA_CODE_SAVE,await sendRequest(apiUrl.paraSave,qs.stringify(postData),'post'))
  },
}
const mutations={
  /**
   * 简单码表
   * @param {*} state 
   * @param {*} data 参数
   */
  [types.POST_ADD_CODE_TYPE](state,data){
    state[types.POST_ADD_CODE_TYPE]= data.data
  },
  [types.POST_ADD_CODE_INFO](state,data){
    state[types.POST_ADD_CODE_INFO]= data.data
  },
  [types.POST_CODE_TYPE_LIST](state,data){
    state[types.POST_CODE_TYPE_LIST]= data.data
  },
  [types.POST_CODE_INFO_LIST](state,data){
    state[types.POST_CODE_INFO_LIST]= data.data
  },
  [types.GET_CODE_TYPE_STATUS](state,data){
    state[types.GET_CODE_TYPE_STATUS]= data.data
  },
  [types.POST_CODE_ATTR_STATUS](state,data){
    state[types.POST_CODE_ATTR_STATUS]= data.data
  },
  /**
   * 复杂码表
   */
  [types.POST_COM_CODE_TYPE_LIST](state,data){
    state[types.POST_COM_CODE_TYPE_LIST]= data.data
  },
  [types.POST_COM_CODE_VALUE_LIST](state,data){
    state[types.POST_COM_CODE_VALUE_LIST]= data.data
  },
  [types.POST_COM_CODE_TYPE_SAVE](state,data){
    state[types.POST_COM_CODE_TYPE_SAVE]= data.data
  },
  [types.POST_COM_CODE_VALUE_SAVE](state,data){
    state[types.POST_COM_CODE_VALUE_SAVE]= data.data
  },
  /**
   * 系统参数
   */
  [types.POST_PARA_CODE_LISY](state,data){
    state[types.POST_PARA_CODE_LISY]= data.data
  },
  [types.POST_PARA_CODE_SAVE](state,data){
    state[types.POST_PARA_CODE_SAVE]= data.data
  },
}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
  }