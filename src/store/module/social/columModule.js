import apiUrl from './api.js'
import {sendRequest} from '../../../comm/until.js'
import qs from "qs";
const state = {
    addCloumData:{},
    categoryList:{},
    categoryDetail:{},
    editCategory:{},
    delCategory:{},
   
}

// getters
const getters = {//同步

}
// actions
const actions = {//异步
    async addCategoryAct(context,parame){//添加
        context.commit("addCategoryMut", await sendRequest(apiUrl.addcategory,qs.stringify(parame),'post'))
    },
    async getCategoryListAct(context,parame){//获取列表
        context.commit("getCategoryListMut",await sendRequest(apiUrl.getcategorylist,qs.stringify(parame),'post'))
    },
    async getCategoryDetailAct(context,parame){//获取详情
        context.commit("getCategoryDetailMuc",await sendRequest(apiUrl.getcategorydetail,qs.stringify(parame),'post'))
    },
    async editCategoryAct(context,parame){//编辑
        context.commit("editCategoryMuc", await sendRequest(apiUrl.editcategory, qs.stringify(parame),'post'))
    },
    async delCategoryAct(context,parame){//删除
        context.commit("delCategoryMuc",await sendRequest(apiUrl.delcategory,qs.stringify(parame),'post'))
    },
    
}
// mutations
const mutations = {//同步
    addCategoryMut(state,data){
        state.addCloumData=data.data
    },
    getCategoryListMut(state,data){
        state.categoryList=  data.data
    },
    getCategoryDetailMuc(state,data){
        state.categoryDetail =data.data
    },
    editCategoryMuc(state,data){
        state.editCategory =data.data
    },
    delCategoryMuc(state,data){
        state.delCategory =data.data
    },
    
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}
