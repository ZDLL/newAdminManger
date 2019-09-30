import apiUrl from '../../config/api.js'
import {sendRequest} from '../../comm/until.js'
import * as types from '../type.js';
import qs from 'qs'

const state = {
 [types.COM_UPLOAD_IMG]:{}
}
// getters
const getters = {//同步

}
const actions ={
    async [types.COM_UPLOAD_IMG](cxt,pram){
        cxt.commit(types.COM_UPLOAD_IMG,await sendRequest(apiUrl.comUploadImg,pram,"post"))
    },
}
const mutations = {
    [types.COM_UPLOAD_IMG](state,data){
        state[types.COM_UPLOAD_IMG] = data.data
    },
}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
  }