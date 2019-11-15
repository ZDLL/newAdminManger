module.exports={
    /**
     * 简单码表
     */
    'codeTypeList':"/api/code/queryCodeType",//码类列表
    'codeValueList':"/api/code/queryCodeValue",//码值列表
    'addCodeType':"/api/code/saveCoeType",//码类添加
    'addCodeInfo':"/api/code/saveCodeInfo",//码值添加
    'statusChange':"/api/code/updateCodeTypeStatus",//禁用启用码值类型
    'attrChange':"/api/code/updateCodeInfoStatus",//禁用启用属性

    /**
     * 复杂码表
     */
    'comCodeTypeList':"/api/cplt/getCodeTypeList",//复杂码表类型列表
    'comCodeValeLis':"/api/cplt/getCodeValueList",//复杂码表码值列表
    'comSaveType':"/api/cplt/save/type",//复杂码表类型 修改 添加 
    'comSaveValue':"/api/cplt/save/value",//复杂码表码值 修改 添加
    /**
     * 系统参数
     */
    'paraInfoLis':'/api/para/getParaInfoList',//参数列表
    'paraSave':"/api/para/save",//参数 修改 增加 改变状态
}
