
// let baseUrl ='/api/'
// let baseUrl ='/'
module.exports={
    "login":"/api/login",
    'queryRoleMenus':"/api/role/queryRoleMenus",
    "logout":"/api/login/logout",

    "alterPwd":"/api/login/alterPwd",
    "queryMenus":"/api/menu/queryMenus",
    "queryCodeValue":"/api/code/queryCodes",
    "saveMenu":'/api/menu/saveMenu',
    "updateMenu":'/api/menu/updateMenu',
    "queryRoles":"/api/role/queryRoles",
    'saveRole':"/api/role/saveRole",//新增角色
    "deleteRole":"/api/role/deleteRole",//禁用角色
    "enableRole":"/api/role/enableRole",//启用角色
    'roleMenus':"/api/role/queryRoleHasMenuId",//查询用户角色菜单
    "saveRoleMenuId":"/api/role/saveRoleMenuId",//更新用户菜单
}