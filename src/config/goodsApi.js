module.exports={
    /**
     spu类型接口
     */
    "gdssave":"/gds/sku/type/save",
    'gdsparts':"/api/code/querySkuType",//查询菜单状态 类型 行为类型"/api/code/queryCodes"
    'gdslist':"/gds/sku/type/list",
    "gdsdel":"/gds/sku/type/delete",//删除skytype
    "gdsdistype":"/gds/sku/type/disable",//禁用
    "gdsenadletype":"/gds/sku/type/enable",//启用
    /**
     sku管理接口
     */
    "gdsCodesList":"/api/code/queryCodes",//根据id获取对应的码值
    // "gdsskulist":"/gds/sku/type/list",//"/gds/sku/info/list",//获取sky
    // 'gdsInfolist':"/gds/sku/info/list",//获取添加以后的信息
    "gdsskusave":"/gds/sku/info/batchSave",//sku保存或修改
    "gdssavespu":"/gds/sku/info/spu",//生成spu
    "gdssavegoods":"/gds/sku/info/goods",//生成商品
    "gdssavegoodsgroup":"/gds/sku/info/goodsgroup",//生成商品组
    "getSkuInfo":'/gds/sku/info/list',//获取数据
    'querySkuTypeByParNo':'/gds/sku/type/querySkuTypeByParNo',
    "infoSubInfo":"/gds/sku/info/getSubSkuInfo",//获取下级数据
    "subInfo":'/gds/sku/info/getSubClassifySku',
    "gdsdisinfo":"/gds/sku/info/disable",//sku禁用
    "gdsenadleinfo":"/gds/sku/info/enable",//sku启用
    "getSubSkuTypes":"/gds/sku/info/getSubSkuTypes",//查询子集类型
    'infoSave':'/gds/sku/info/save',

    /**
     spu管理模块接口
     */

     "spuList":"/gds/spu/list",//获取spu列表
     "spudetail":"/gds/spu/detail",//spu详情
     "spuUpdate":"/gds/spu/update",//spu编辑
     "spuAble":"/gds/spu/able",//禁用或启用

     /**
      * 
      * 商品组管理模块
      */
     "gdsGroupList":"/gds/sku/group/list",//商品组列表
     'gdsGroupDetail':"/gds/sku/group/detail",//商品组详情
     'gdsGroupEditor':'/gds/sku/group/addGroup',//商品组编辑获取数据
     'gdsSaveGroupEditor':"/gds/sku/group/addGroup",//商品组编辑保存
     'gdsGroupAble':"/gds/sku/group/able",//商品组的禁用启用

     /**
      * 商品管理
      */
     'gdsInfoList':"/gds/goods/info/list",//商品列表
     'gdsInfoDetail':"/gds/goods/info/detail",//商品详情
     "gdsInfoAble":'/gds/goods/info/able',//商品的禁用启用
}