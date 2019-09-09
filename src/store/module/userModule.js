import apiUrl from '../../config/api.js'
import {sendRequest} from '../../comm/until.js'
import * as types from '../type.js';
import qs from 'qs'

const state = {
}
// getters
const getters = {//同步

}
const actions ={//异步
   
}
const mutations = { //同步
   

}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
  }