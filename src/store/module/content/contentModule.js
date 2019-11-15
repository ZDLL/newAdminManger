import apiUrl from './api.js';
import {sendRequest} from '../../../comm/until.js'
import * as types from './type.js';
import qs from 'qs'
   const state = {
      [types.POST_COLUMN_LIST]:{},
      [types.POST_COLUMN_SAVE]:{},
      [types.POST_COLUMN_ABLE_DISABLE]:{},
      [types.POST_COLUMN_CONTXT_LIST]:{},
      [types.POST_COLUMN_CONTXT_SAVE]:{},
      [types.GET_COLUMN_DETAIL]:{},
      [types.POST_COLUMN_ADD_ARC]:{},
      //导航
      [types.POST_NAVIGATE_SAVE]:{},
      [types.POST_NAVIGATE_LIST]:{},
      [types.POST_NAVGATE_ABLEORDISABLE]:{},
      [types.POST_NAVGATE_TPLC]:{},
      //轮播
      [types.POST_BANNER_SAVE]:{},
      [types.POST_BANNER_LIST]:{},   
      [types.GET_BANNER_DETAIL]:{},
      [types.POST_BANNER_CHANGE]:{},
      //频道
      [types.POST_TEMPLATE_LIST]:{},
      [types.POST_CHANNEL_SAVE]:{},
      [types.POST_CHANNERL_LIST]:{},
      [types.GET_CHANNEL_DETAIL]:{},
      [types.POST_CHANNEL_CONT_LIST]:{},
      [types.POST_CHANNEL_ADD_ARC]:{},
      [types.POST_WEIGHT_SAVE]:{},
     
    /**
     *  文章列表
     * 专栏列表
     */
      [types.POST_SUBJECT_LIST]:{},
      [types.GET_CATEGORY_LIST]:{},
   }
   // getters
   const getters = {//同步
   
   }
   // actions
   const actions = {//异步
    /**
     * 
     * @param {*} 栏目管理
     * @param {*} postData 
     */
     async [types.POST_COLUMN_LIST](cxt,postData){
        cxt.commit(types.POST_COLUMN_LIST,await sendRequest(apiUrl.columnList,qs.stringify(postData),'post'))
    },
    async [types.POST_COLUMN_SAVE](cxt,postData){
      cxt.commit(types.POST_COLUMN_SAVE,await sendRequest(apiUrl.columnSave,qs.stringify(postData),'post'))
    },
    async [types.POST_COLUMN_ABLE_DISABLE](cxt,postData){
      cxt.commit(types.POST_COLUMN_ABLE_DISABLE,await sendRequest(apiUrl.columnAbleOrDisable,qs.stringify(postData),'post'))
    },
    async [types.POST_COLUMN_CONTXT_LIST](cxt,postData){
      cxt.commit(types.POST_COLUMN_CONTXT_LIST,await sendRequest(apiUrl.contextList,qs.stringify(postData),'post'))
    },
    async [types.POST_COLUMN_CONTXT_SAVE](cxt,postData){
      cxt.commit(types.POST_COLUMN_CONTXT_SAVE,await sendRequest(apiUrl.contextSave,qs.stringify(postData),'post'))
    },
    async [types.GET_COLUMN_DETAIL](cxt,postData){
      cxt.commit(types.GET_COLUMN_DETAIL,await sendRequest(apiUrl.columnDetail+'/'+postData.columnNo,{},'get'))
    },
    async [types.POST_COLUMN_ADD_ARC](cxt,postData){
      cxt.commit(types.POST_COLUMN_ADD_ARC,await sendRequest(apiUrl.columnAddArc,qs.stringify(postData),'post'))
    },
    async [types.POST_NAVGATE_TPLC](cxt,postData){
      cxt.commit(types.POST_NAVGATE_TPLC,await sendRequest(apiUrl.getContCpltId,qs.stringify(postData),'post'))
    },

    
    //POST_NAVGATE_TPLC

    /**
     * 
     * @param {*} 导航管理
     * @param {*} postData 
     */
    async [types.POST_NAVIGATE_SAVE](cxt,postData){
      cxt.commit(types.POST_NAVIGATE_SAVE,await sendRequest(apiUrl.navigateSave,qs.stringify(postData),'post'))
    },
    async [types.POST_NAVIGATE_LIST](cxt,postData){
      cxt.commit(types.POST_NAVIGATE_LIST,await sendRequest(apiUrl.navigateList,qs.stringify(postData),'post'))
    },
    async [types.POST_NAVGATE_ABLEORDISABLE](cxt,postData){
      cxt.commit(types.POST_NAVGATE_ABLEORDISABLE,await sendRequest(apiUrl.navigateAbleOrDisable,qs.stringify(postData),'post'))
    },
    async [types.GET_CHANNEL_DETAIL](cxt,postData){
      cxt.commit(types.GET_CHANNEL_DETAIL,await sendRequest(apiUrl.channelDetail+'/'+postData.channelNo,{},'get'))
    },
    

    /**
     * 
     * @param {*} 轮播 
     * @param {*} postData 
     */
    async [types.POST_BANNER_SAVE](cxt,postData){
      cxt.commit(types.POST_BANNER_SAVE,await sendRequest(apiUrl.bannerSave,qs.stringify(postData),'post'))
    }, 
    async [types.POST_BANNER_LIST](cxt,postData){
      cxt.commit(types.POST_BANNER_LIST,await sendRequest(apiUrl.bannerList,qs.stringify(postData),'post'))
    },
    async [types.GET_BANNER_DETAIL](cxt,postData){
      cxt.commit(types.GET_BANNER_DETAIL,await sendRequest(apiUrl.bannerDetail+'/'+postData.bannerNo,qs.stringify(postData),'get'))
    },
    async [types.POST_BANNER_CHANGE](cxt,postData){
      cxt.commit(types.POST_BANNER_CHANGE,await sendRequest(apiUrl.bannerChange,qs.stringify(postData),'post'))
    },

   
    /**
     * 频道管理
     * @param {*} cxt 
     * @param {*} postData 
     */
    //
    async [types.POST_TEMPLATE_LIST](cxt,postData){
      cxt.commit(types.POST_TEMPLATE_LIST,await sendRequest(apiUrl.templateList,qs.stringify(postData),'post'))
    },
    async [types.POST_CHANNEL_SAVE](cxt,postData){
      cxt.commit(types.POST_CHANNEL_SAVE,await sendRequest(apiUrl.channelSave,qs.stringify(postData),'post'))
    },
    async [types.POST_CHANNERL_LIST](cxt,postData){
      cxt.commit(types.POST_CHANNERL_LIST,await sendRequest(apiUrl.channelList,qs.stringify(postData),'post'))
    },
    async [types.POST_CHANNEL_CONT_LIST](cxt,postData){
      cxt.commit(types.POST_CHANNEL_CONT_LIST,await sendRequest(apiUrl.channelDetailList,qs.stringify(postData),'post'))
    },
    async [types.POST_CHANNEL_ADD_ARC](cxt,postData){
      cxt.commit(types.POST_CHANNEL_ADD_ARC,await sendRequest(apiUrl.channelAddArc,qs.stringify(postData),'post'))
    },
    async [types.POST_WEIGHT_SAVE](cxt,postData){
      cxt.commit(types.POST_WEIGHT_SAVE,await sendRequest(apiUrl.contextWeightSave,qs.stringify(postData),'post'))
    },
    //


    /**
     * 
     * @param {*} 文章管理公用
     * @param {*} postData 
     */
    async [types.POST_SUBJECT_LIST](cxt,postData){
      cxt.commit(types.POST_SUBJECT_LIST,await sendRequest(apiUrl.subjectList,qs.stringify(postData),'post'))
    },
    async [types.GET_CATEGORY_LIST](cxt,postData){
     
      cxt.commit(types.GET_CATEGORY_LIST,await sendRequest(apiUrl.categoryList,{},'get'))
    },
    
   }
   // mutations
   const mutations = {//同步
      [types.POST_COLUMN_LIST](state,data){
          state[types.POST_COLUMN_LIST]= data.data
      },
      [types.POST_COLUMN_SAVE](state,data){
        state[types.POST_COLUMN_SAVE]= data.data
      },
      [types.POST_COLUMN_ABLE_DISABLE](state,data){
        state[types.POST_COLUMN_ABLE_DISABLE]= data.data
      },
      [types.POST_COLUMN_CONTXT_LIST](state,data){
        state[types.POST_COLUMN_CONTXT_LIST]= data.data
      },
      [types.POST_COLUMN_CONTXT_SAVE](state,data){
        state[types.POST_COLUMN_CONTXT_SAVE]= data.data
      },
      [types.GET_COLUMN_DETAIL](state,data){
        state[types.GET_COLUMN_DETAIL]= data.data
      },
      [types.POST_COLUMN_ADD_ARC](state,data){
        state[types.POST_COLUMN_ADD_ARC]= data.data
      },
      
      /**
       * 
       * @param {*} 导航管理 
       * @param {*} data 
       */
      [types.POST_NAVIGATE_SAVE](state,data){
        state[types.POST_NAVIGATE_SAVE]= data.data
      },
      [types.POST_NAVIGATE_LIST](state,data){
        state[types.POST_NAVIGATE_LIST]= data.data
      }, 
      [types.POST_NAVGATE_ABLEORDISABLE](state,data){
        state[types.POST_NAVGATE_ABLEORDISABLE]= data.data
      }, 


      /**
       * 轮播
       * @param {*} state 
       * @param {*} data 
       */
      [types.POST_BANNER_SAVE](state,data){
        state[types.POST_BANNER_SAVE]= data.data
      }, 
      [types.POST_BANNER_LIST](state,data){
        state[types.POST_BANNER_LIST]= data.data
      }, 
      [types.GET_BANNER_DETAIL](state,data){
        state[types.GET_BANNER_DETAIL]= data.data
      }, 
      [types.POST_BANNER_CHANGE](state,data){
        state[types.POST_BANNER_CHANGE]= data.data
      }, 
      /**
       * 频道管理
       * @param {*} state 
       * @param {*} data 
       */
      [types.POST_TEMPLATE_LIST](state,data){
        state[types.POST_TEMPLATE_LIST]= data.data
      }, 
      [types.POST_CHANNEL_SAVE](state,data){
        state[types.POST_CHANNEL_SAVE]= data.data
      }, 
      [types.POST_CHANNERL_LIST](state,data){
        state[types.POST_CHANNERL_LIST]= data.data
      }, 
      [types.GET_CHANNEL_DETAIL](state,data){
        state[types.GET_CHANNEL_DETAIL]= data.data
      }, 
      [types.POST_CHANNEL_CONT_LIST](state,data){
        state[types.POST_CHANNEL_CONT_LIST]= data.data
      }, 
      [types.POST_CHANNEL_ADD_ARC](state,data){
        state[types.POST_CHANNEL_ADD_ARC]= data.data
      }, 
      [types.POST_WEIGHT_SAVE](state,data){
        state[types.POST_WEIGHT_SAVE]= data.data
      }, 
      [types.POST_NAVGATE_TPLC](state,data){
        state[types.POST_NAVGATE_TPLC]= data.data
      }, 

      //POST_NAVGATE_TPLC
      /**
       * 
       * @param {*} 文章选择公用 
       * @param {*} data 
       */

      [types.POST_SUBJECT_LIST](state,data){
        state[types.POST_SUBJECT_LIST]= data.data
      },
      [types.GET_CATEGORY_LIST](state,data){
        state[types.GET_CATEGORY_LIST]= data.data
      }
   }
   
   export default {
     namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
     state,
     getters,
     actions,
     mutations
   }