
// let baseUrl ='/api/'
// let baseUrl ='/'
module.exports={
    "login":"/api/login",
    'queryRoleMenus':"/api/role/queryRoleMenus",
    "logout":"/api/login/logout",

    "alterPwd":"/api/login/alterPwd",
    "queryMenus":"/api/menu/queryMenus",
<<<<<<< HEAD
    "queryCodeValue":"/api/code/queryCodes",
    "saveMenu":'/api/menu/saveMenu',
    "updateMenu":'/api/menu/updateMenu',
    "queryRoles":"/api/role/queryRoles",
    'saveRole':"/api/role/saveRole",//新增角色
    "deleteRole":"/api/role/deleteRole",//禁用角色
    "enableRole":"/api/role/enableRole",//启用角色
    'roleMenus':"/api/role/queryRoleHasMenuId",//查询用户角色菜单
    "saveRoleMenuId":"/api/role/saveRoleMenuId",//更新用户菜单
=======
    "queryCodeValue":"/api/code/queryCodeValue",
    "queryUsers": "/api/user/queryUser",
    "restPassword": "/api/user/restPassWord",
    "queryRoles": "api/role/queryRoles",
    "saveUser":"api/user/saveUser",
    "changeUserStatus": "api/user/changeUserStatus"
>>>>>>> 827bb0680f5b9af82f277638c03b7c04b24055d5
}