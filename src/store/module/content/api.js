module.exports={
    /**
     * 栏目管理接口
     */
    'columnList':"/cnt/column/list",//栏目列表
    'columnSave':'/cnt/column/save',//添加栏目
    'columnAbleOrDisable':'/cnt/column/ableOrDisable',
    "contextList":'/cnt/column/r/context/list',//栏目内容的文章列表
    "contextSave":'cnt/column/r/context/batchSave',//"/cnt/column/r/context/save",//添加文章
    'columnDetail':'/cnt/column/detail',//栏目详情
    'columnAddArc':"/cnt/column/r/context/save",
    
    /**
     * 导航管理接口
     */
    "navigateSave":"/cnt/navigate/save",//添加导航
    "navigateList":"/cnt/navigate/list",//导航列表
    "navigateAbleOrDisable":"/cnt/navigate/ableOrDisable",

    /**
     * 轮播管理
     */
    "bannerSave":"/cnt/banner/save",//添加轮播
    "bannerList":"/cnt/banner/list",//轮播列表
    'bannerDetail':"/cnt/banner/detail",//轮播详情
    'bannerChange':'/cnt/banner/ableOrDisable',//轮播状态改变

    /**
     * 频道管理
     */
    'templateList':"/cnt/template/list",//模版列表
    'channelSave':'/cnt/channel/save',//保存模版
    'channelList':'/cnt/channel/list',//获取频道列表
    'channelDetail':'/cnt/channel/detail',//频道详情
    'channelDetailList':'/cnt/channel/r/context/list',//频道详情内容列表
    'channelAddArc':'/cnt/channel/r/context/batchSave',//频道添加文章
    'contextWeightSave':"/cnt/channel/r/context/save",//文章权限单独修改

     /**
     * 公用文章选择接口
     */
    'subjectList':'/cnt/subject/list',//数据选择的列表
    'categoryList':"/cnt/category/list",//专栏列表

}