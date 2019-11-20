import apiUrl from './api.js';
import {sendRequest} from '../../../comm/until.js'
import * as types from './type.js';
import qs from 'qs'
const state={
    /**
     * 企业用户
     */
    [types.POST_BUS_LIST]:{},
    [types.POST_BUS_ADD]:{},
    [types.POST_BUS_EDIT]:{},
    [types.POST_BUS_DET]:{},
    [types.POST_BUS_CHNAGE_STATUS]:{},
    [types.POST_COM_GET_AREA]:{},
    /**
     * 员工模块
     */
    [types.POST_STA_LIST]:{},
    [types.POST_STA_ADD]:{},
    [types.POST_STA_EIDT]:{},
    [types.POST_STA_DET]:{},
    [types.POST_STA_CHANGE_STATUS]:{},
    [types.POST_STORE_SELC_LIST]:{},
    //门店
    [types.POST_STORE_ADD]:{},
    [types.POST_STORE_LIST]:{},
    [types.POST_STORE_EIDT]:{},
    [types.POST_STORE_DET]:{},
    [types.POST_STORE_CHANGE_STATUS]:{},
    //普通用户
    [types.POST_GENUSER_LIST]:{},
    [types.POST_GENUSER_DET]:{},
    [types.POST_GENUSER_CHNAGE_STATUS]:{},
    //内容用户
    [types.POST_CONTUSER_LIST]:{},
    [types.POST_CONTUSER_ADD]:{},
    [types.POST_CONTUSER_CHANGE_STATUS]:{},
}
const getters={}
const actions={
    async [types.POST_BUS_LIST](cxt,postData){
        cxt.commit(types.POST_BUS_LIST,await sendRequest(apiUrl.busList,qs.stringify(postData),'post'))
    },
    async [types.POST_BUS_ADD](cxt,postData){
        cxt.commit(types.POST_BUS_ADD,await sendRequest(apiUrl.busAdd,qs.stringify(postData),'post'))
    },
    async [types.POST_BUS_EDIT](cxt,postData){
        cxt.commit(types.POST_BUS_EDIT,await sendRequest(apiUrl.busEdit,qs.stringify(postData),'post'))
    },
    async [types.POST_BUS_DET](cxt,postData){
        cxt.commit(types.POST_BUS_DET,await sendRequest(apiUrl.busDet,qs.stringify(postData),'post'))
    },
    async [types.POST_BUS_CHNAGE_STATUS](cxt,postData){
        cxt.commit(types.POST_BUS_CHNAGE_STATUS,await sendRequest(apiUrl.busChangeStatus,qs.stringify(postData),'post'))
    },
    async [types.POST_COM_GET_AREA](cxt,postData){
        cxt.commit(types.POST_COM_GET_AREA,await sendRequest(apiUrl.comGetArea,qs.stringify(postData),'post'))
    },
    //员工
    async [types.POST_STA_LIST](cxt,postData){
        cxt.commit(types.POST_STA_LIST,await sendRequest(apiUrl.staList,qs.stringify(postData),'post'))
    },
    async [types.POST_STA_ADD](cxt,postData){
        cxt.commit(types.POST_STA_ADD,await sendRequest(apiUrl.staAdd,qs.stringify(postData),'post'))
    },
    async [types.POST_STA_EIDT](cxt,postData){
        cxt.commit(types.POST_STA_EIDT,await sendRequest(apiUrl.staEdit,qs.stringify(postData),'post'))
    },
    async [types.POST_STA_DET](cxt,postData){
        cxt.commit(types.POST_STA_DET,await sendRequest(apiUrl.staDet,qs.stringify(postData),'post'))
    },
    async [types.POST_STA_CHANGE_STATUS](cxt,postData){
        cxt.commit(types.POST_STA_CHANGE_STATUS,await sendRequest(apiUrl.staChangeStatus,qs.stringify(postData),'post'))
    },
    async [types.POST_STORE_SELC_LIST](cxt,postData){
        cxt.commit(types.POST_STORE_SELC_LIST,await sendRequest(apiUrl.storeSelecList,qs.stringify(postData),'post'))
    },
    //门店
    async [types.POST_STORE_ADD](cxt,postData){
        cxt.commit(types.POST_STORE_ADD,await sendRequest(apiUrl.storeAdd,qs.stringify(postData),'post'))
    },

    async [types.POST_STORE_LIST](cxt,postData){
        cxt.commit(types.POST_STORE_LIST,await sendRequest(apiUrl.storeList,qs.stringify(postData),'post'))
    },
    async [types.POST_STORE_EIDT](cxt,postData){
        cxt.commit(types.POST_STORE_EIDT,await sendRequest(apiUrl.storeEdit,qs.stringify(postData),'post'))
    },
    async [types.POST_STORE_DET](cxt,postData){
        cxt.commit(types.POST_STORE_DET,await sendRequest(apiUrl.storeDet,qs.stringify(postData),'post'))
    },
    async [types.POST_STORE_CHANGE_STATUS](cxt,postData){
        cxt.commit(types.POST_STORE_CHANGE_STATUS,await sendRequest(apiUrl.storeChangeStatus,qs.stringify(postData),'post'))
    },
    //普通用户
    async [types.POST_GENUSER_LIST](cxt,postData){
        cxt.commit(types.POST_GENUSER_LIST,await sendRequest(apiUrl.genUser,qs.stringify(postData),'post'))
    },
    async [types.POST_GENUSER_DET](cxt,postData){
        cxt.commit(types.POST_GENUSER_DET,await sendRequest(apiUrl.genUserDet,qs.stringify(postData),'post'))
    },
    async [types.POST_GENUSER_CHNAGE_STATUS](cxt,postData){
        cxt.commit(types.POST_GENUSER_CHNAGE_STATUS,await sendRequest(apiUrl.genUserForbidden,qs.stringify(postData),'post'))
    },
    //内容用户
    async [types.POST_CONTUSER_LIST](cxt,postData){
        cxt.commit(types.POST_CONTUSER_LIST,await sendRequest(apiUrl.contUserList,qs.stringify(postData),'post'))
    },
    async [types.POST_CONTUSER_ADD](cxt,postData){
        cxt.commit(types.POST_CONTUSER_ADD,await sendRequest(apiUrl.addContUser,qs.stringify(postData),'post'))
    },
    async [types.POST_CONTUSER_CHANGE_STATUS](cxt,postData){
        cxt.commit(types.POST_CONTUSER_CHANGE_STATUS,await sendRequest(apiUrl.contUserChangeStatus,qs.stringify(postData),'post'))
    },

}
const mutations ={
    [types.POST_BUS_LIST](state,data){
        state[types.POST_BUS_LIST] = data.data
    },
    [types.POST_BUS_ADD](state,data){
        state[types.POST_BUS_ADD] = data.data
    },
    [types.POST_BUS_EDIT](state,data){
        state[types.POST_BUS_EDIT] = data.data
    },
    [types.POST_BUS_DET](state,data){
        state[types.POST_BUS_DET] = data.data
    },
    [types.POST_BUS_CHNAGE_STATUS](state,data){
        state[types.POST_BUS_CHNAGE_STATUS] = data.data
    },
    [types.POST_COM_GET_AREA](state,data){
        state[types.POST_COM_GET_AREA] = data.data
    },
    //员工
    [types.POST_STA_LIST](state,data){
        state[types.POST_STA_LIST] = data.data
    },
    [types.POST_STA_ADD](state,data){
        state[types.POST_STA_ADD] = data.data
    },
    [types.POST_STA_EIDT](state,data){
        state[types.POST_STA_EIDT] = data.data
    },
    [types.POST_STA_DET](state,data){
        state[types.POST_STA_DET] = data.data
    },
    [types.POST_STA_CHANGE_STATUS](state,data){
        state[types.POST_STA_CHANGE_STATUS] = data.data
    },
    [types.POST_STORE_SELC_LIST](state,data){
        state[types.POST_STORE_SELC_LIST] = data.data
    },
    //门店
    [types.POST_STORE_ADD](state,data){
        state[types.POST_STORE_ADD] = data.data
    },

    [types.POST_STORE_LIST](state,data){
        state[types.POST_STORE_LIST] = data.data
    },
    [types.POST_STORE_EIDT](state,data){
        state[types.POST_STORE_EIDT] = data.data
    },
    [types.POST_STORE_DET](state,data){
        state[types.POST_STORE_DET] = data.data
    },
    [types.POST_STORE_CHANGE_STATUS](state,data){
        state[types.POST_STORE_CHANGE_STATUS] = data.data
    },
    //普通用户
    [types.POST_GENUSER_LIST](state,data){
        state[types.POST_GENUSER_LIST] = data.data
    },
    [types.POST_GENUSER_DET](state,data){
        state[types.POST_GENUSER_DET] = data.data
    },
    [types.POST_GENUSER_CHNAGE_STATUS](state,data){
        state[types.POST_GENUSER_CHNAGE_STATUS] = data.data
    },
    //内容用户
    [types.POST_CONTUSER_LIST](state,data){
        state[types.POST_CONTUSER_LIST] = data.data
    },
    [types.POST_CONTUSER_ADD](state,data){
        state[types.POST_CONTUSER_ADD] = data.data
    },
    [types.POST_CONTUSER_CHANGE_STATUS](state,data){
        state[types.POST_CONTUSER_CHANGE_STATUS] = data.data
    },

}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
  }