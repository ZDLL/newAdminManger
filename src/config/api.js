
// let baseUrl ='/api/'
// let baseUrl ='/'
module.exports={
    "login":"/api/login",//登录
    'queryRoleMenus':"/api/role/queryRoleMenus",//登录查询菜单
    "logout":"/api/login/logout",//登出
    "alterPwd":"/api/login/alterPwd",//修改密码
    "getCode":"/api/login/getCode",//获取验证码
    "queryMenus":"/api/menu/queryMenus",//用户查询菜单
    "queryCodeValue":"/api/code/queryCodes",//查询菜单状态 类型 行为类型
    "saveMenu":'/api/menu/saveMenu',//添加菜单
    "deleteMenu":"/api/menu/deleteMenu",//删除菜单
    "updateMenu":'/api/menu/updateMenu',//更新菜单
    "queryRoles":"/api/role/queryRoles",//查询角色列表
    'saveRole':"/api/role/saveRole",//新增角色
    "deleteRole":"/api/role/deleteRole",//禁用角色
    "enableRole":"/api/role/enableRole",//启用角色
    'roleMenus':"/api/role/queryRoleHasMenuId",//查询用户角色菜单
    "saveRoleMenuId":"/api/role/saveRoleMenuId",//更新用户菜单
    
    // "queryCodeValue":"/api/code/queryCodeValue",
    "queryUsers": "/api/user/queryUser",
    "restPassword": "/api/user/restPassWord",
    // "queryRoles": "api/role/queryRoles",
    "saveUser":"api/user/saveUser",
    "changeUserStatus": "api/user/changeUserStatus",
    /**
     * 
     * 上传的接口
     */
    'comUploadImg':"/gds/upload",//图片上传
}