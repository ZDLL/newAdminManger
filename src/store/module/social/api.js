
// let baseUrl ='/api/'
let baseUrl ='/'
module.exports={
    'momentsGetlist':baseUrl+"community/moments/getlist",//获取帖子列表
    'momentsGetdetail':baseUrl+'community/moments/getdetail',//获取帖子详情
    'examine':baseUrl+"community/moments/examine",//审核帖子
    'recommend':baseUrl+"community/moments/recommend",//推荐或取消推荐帖子
    'delmoment':baseUrl+"community/moments/delmoment",//删除帖子

    'getcategorylist':baseUrl+'community/subject/getcategorylist',//专栏列表
    'getcategorydetail':baseUrl+"community/subject/getcategorydetail",//专栏详情
    "addcategory":baseUrl+"community/subject/addcategory",//新增专栏
    "editcategory":baseUrl+"community/subject/editcategory",//编辑专栏
    "delcategory":baseUrl+"community/subject/delcategory",//删除专栏

    "subjectGetList":baseUrl+"community/subject/getlist",//文章列表
    "subjectGetDetail":baseUrl+"community/subject/getdetail",//文章详情
    "delsubject":baseUrl+"community/subject/delsubject",//删除文章
    "addsubject":baseUrl+"community/subject/addsubject",//添加文章
    "editsubject":baseUrl+"community/subject/editsubject",//编辑文章
    "getsystemuser":baseUrl+"community/subject/getsystemuser",//获取官方账号

    "addselect":baseUrl+"community/subject/addselect",//添加到每日推荐
    "adddiscover":baseUrl+"community/subject/adddiscover",//添加到发现或撤销

    "topicList":baseUrl+'community/topic/getlist',//话题列表
    "topicDetail":baseUrl+"community/topic/getdetail",//话题详情
    "topicAdd":baseUrl+"community/topic/addtopic",//添加话题
    "topicEdit":baseUrl+"community/topic/edittopic",//编辑话题
    "changeTopic":baseUrl+"community/topic/changetopic",//上下架话题
    "topicDel":baseUrl+"community/topic/deltopic",//删除话题

    // "topicRec":baseUrl+"community/topic/recommend",//话题推荐
    "gettopicmoments":baseUrl+"community/topic/gettopicmoments",//话题详情中的动态列表

    // "userList":baseUrl+"community/users/getlist",//用户列表
    // "forbidden":baseUrl+"community/users/forbidden",//用户禁言和解除

    // "userCertList":baseUrl+"community/users/getcertlist",//标签列表
    // "userAddCert":baseUrl+"community/users/addcert",//添加标签
    // "userDelCert":baseUrl+"community/users/delcert",//删除标签
    // "addcerttouser":baseUrl+"community/users/addcerttouser",//给用户添加标签
    // "recommenduser":baseUrl+"community/users/recommenduser",//用户推荐
    // "addsystemuser":baseUrl+"community/users/addsystemuser",//添加或取消官方账号
    // "getsystemuser":baseUrl+"community/users/getsystemuser",//获取官方账号

    // "getcertlist":baseUrl+"community/users/getcertlist",//获取标签列表
    // "addcert":baseUrl+"community/users/addcert",//添加标签
    // "delcert":baseUrl+"community/users/delcert",//删除标签

    // "getgrouplist":baseUrl+"community/permission/getgrouplist",//权限组列表
    // "groupdetail":baseUrl+"community/permission/groupdetail",//权限组详情
    // "addgroup":baseUrl+"community/permission/addgroup",//添加权限组
    // "editgroup":baseUrl+"community/permission/editgroup",//编辑权限组
    // "delgroup":baseUrl+"community/permission/delgroup",//删除权限
    // "permissionlist":baseUrl+"community/permission/permissionlist",//权限列表

    // "adminList":baseUrl+"community/operator/getlist",//管理员列表
    // "addAdmin":baseUrl+"community/operator/addoperator",//添加管理员
    // "delAdmin":baseUrl+"community/operator/deloperator",//删除管理员
    // "editPassword":baseUrl+"community/operator/editpassword",//修改密码
    // "adminGetdetail":baseUrl+"community/operator/getdetail",//管理员详情
    // "editoperator":baseUrl+"community/operator/editoperator",//修改管理员

    "bannerGetList":baseUrl+"community/banner/getlist",//获取广告位列表
    "bannerAdd":baseUrl+"community/banner/addbanner",//添加广告位
    "bannerEdit":baseUrl+"community/banner/editbanner",//编辑广告位
    "bannerDetail":baseUrl+"community/banner/getdetail",//广告详情
    "bannerDel":baseUrl+"community/banner/delbanner",//删除广告位

    "adddraft":baseUrl+"community/subject/adddraft",//添加草稿
    "getdraftlist":baseUrl+"community/subject/getdraftlist",//获取草稿列表
    "getdraftdetail":baseUrl+"community/subject/getdraftdetail",//获取草稿详情
    "deldraft":baseUrl+"community/subject/deldraft",//删除草稿

    // "sugGetList":baseUrl+"community/suggestion/getlist",//反馈列表
    // "delsuggestion":baseUrl+"community/suggestion/delsuggestion",//删除建议

    "mesgGetList":baseUrl+"community/message/getlist", //消息列表
    "mesgGetDetail":baseUrl+"community/message/getdetail",//消息详情
    "addsysmessage":baseUrl+"community/message/addsysmessage",//添加系统消息
    "editsysmessage":baseUrl+"community/message/editsysmessage",//编辑系统消息
    "delsysmessage":baseUrl+"community/message/delsysmessage",//删除系统消息
    "pushsysmessage":baseUrl+"community/message/pushsysmessage",//发送手机消息
    "artMesgPush":baseUrl+'community/message/push',//文章推送

    "commentGetList":baseUrl+"community/comment/getlist",
    "delcomment":baseUrl+'community/comment/delcomment',

    // "getselectlist":baseUrl+"community/subject/getselectlist",//每日精选
    // "getselectdetail":baseUrl+"community/subject/getselectdetail",
    // "dayaddselect":baseUrl+"community/subject/addselect",
    // "delselectsubject":baseUrl+"community/subject/delselectsubject"
}