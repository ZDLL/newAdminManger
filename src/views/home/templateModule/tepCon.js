let addTempCon =function(){
    return [
        {
            attr_name:"搜索框背景颜色",
            key:"SEARCH_BG_COLOUR",
            com:'color'//颜色选择组件
        },
        // {
        //     attr_name:"背景颜色",
        //     key:"SEARCH_BG_COLOUR",
        //     com:'color'//颜色选择组件
        // },
        {
            attr_name:"搜索框文本颜色",
            key:"FONT_COLOUR",
            com:'color'
        },
        // {
        //     attr_name:"外边框颜色",
        //     key:"BORDER_COLOUR",
        //     com:'color'
        // },
        {
            attr_name:"搜索框外边框颜色",
            key:"BORDER_COLOUR",
            com:'color'
        },
        {
            attr_name:"更多文本颜色",
            key:"MORE_COLOUR",
            com:'color'
        },
        {
            attr_name:"标题文字颜色",
            key:"TITLE_COLOUR",
            com:'color'
        },
        
        {
            attr_name:"标题背景颜色",
            key:"COLUMN_BG_COLOUR",
            com:'color'
        },
        {
            attr_name:"按钮名称颜色",
            key:"NAVIGATE_COLOUR",
            com:'color'
        },
        // {
        //     attr_name:"移动点颜色",
        //     key:"DOT_UNSELECT_COLOUR",
        //     com:'color'
        // },
        // {
        //     attr_name:"选中点颜色",
        //     key:"DOT_SELECT_COLOUR'",
        //     com:'color'
        // },
        {
            attr_name:"搜索框icon",
            key:"SEARCH_ICON_PIC",
            com:'upload'//上传组件
        },
        {
            attr_name:"标题左侧图片",
            key:"COLUMN_LEFT_ICON_PIC",
            com:'upload'
        },
        {
            attr_name:"标题右侧图片",
            key:"COLUMN_RIGHT_ICON_PIC",
            com:'upload'
        },
        {
            attr_name:"内容列表数量",
            key:"COLUMN_DISPLAY_NUM",
            com:'inp'
        },
        {
            attr_name:"搜索框提示文字",
            key:"DEFAULT_TXT",
            com:'inp'
        },
        {
            attr_name:"搜索框高度",
            key:"WIDTH",
            com:'inp'
        },
        {
            attr_name:"搜索框宽度",
            key:"LENGTH",
            com:'inp'
        },
        
        {
            attr_name:"轮播间隔时间",
            key:"CHANGE_TIME",
            com:'inp'
        }, 
        {
            attr_name:"组件顶部间距",
            key:"TOP_MARGIN",
            com:'inp' 
        },
        {
            attr_name:"组件顺序",
            key:"ORDER",
            com:'inp' 
        },
        {
            attr_name:"导航每行数量",
            key:"LINE_NUMBER",
            com:'inp'
        },
        {
            attr_name:"导航最大行数",
            key:"MAX_LINE",
            com:'inp'
        },
        {
            attr_name:"移动点样式",
            key:"DOT_STYLE",
            com:'shape'//形状组件
        },
        {
            attr_name:"移动点位置",
            key:"DOT_POSITION",
            com:'position'//位置组件
        },
        
        // {
        //     attr_name:"导航栏样式",
        //     key:"NAVIGATE_STYLE",
        //     com:'choose'
        // },
        // {
        //     attr_name:"搜索框样式",
        //     key:"SEARCH_STYLE",
        //     com:'choose'//选择
        // },
        // {
        //     attr_name:"轮播图样式",
        //     key:"BANNER_STYLE",
        //     com:'choose'
        // },
    ]
}
let defultImg = function(){
    return [
        {   element_type_name:"搜索框",
            element_type: "0101",
            defult_img:"",
            // defult_img:require(''),
        },
        {   
            element_type_name:"轮播图",
            element_type: "0102",
            defult_img:"",
        },
        {   
            element_type_name:"导航栏",
            element_type: "0103",
            defult_img:"",
        },
        {   
            element_type_name:"栏目",
            element_type: "0104",
            defult_img:"",
        },
        {   
            element_type_name:"频道菜单",
            element_type: "0105",
            defult_img:"",
        }
    ]
}
let styelConf=function(){
    return{
        '0101':{
            element_type_name:"搜索框",
            styleArr:[
                {
                    name:"样式1",
                    key:"1",
                    imgUrl:require("@/assets/styleImg/serch1.png")
                },
                {
                    name:"样式2",
                    key:"2",
                    imgUrl:require("@/assets/styleImg/serch2.png")
                },
                {
                    name:"样式3",
                    key:"3",
                    imgUrl:require("@/assets/styleImg/serch3.png")
                }
            ]
        },
        '0102':{
            element_type_name:"轮播图",
            styleArr:[
                {
                    name:"样式1",
                    key:"1",
                    imgUrl:require("@/assets/styleImg/ban1.png")
                },
                {
                    name:"样式2",//设计图样式三
                    key:"2",
                    imgUrl:require("@/assets/styleImg/ban2.png")
                },
                {
                    name:"样式3",
                    key:"3",
                    imgUrl:require("@/assets/styleImg/ban3.png")
                }
            ]
        },
        '0103':{
            element_type_name:"导航栏",
            styleArr:[
                {
                    name:"样式1",
                    key:"1",
                    imgUrl:require("@/assets/styleImg/nav1.png")
                },
                {
                    name:"样式2",
                    key:"2",
                    imgUrl:require("@/assets/styleImg/nav2.png")
                },
            ]
        },
        '0104':{
            element_type_name:"栏目",
            titleArr:[
                {
                    name:"样式1",
                    key:"1",
                    imgUrl:require("@/assets/styleImg/clu1.png")
                },
                {
                    name:"样式2",
                    key:"2",
                    imgUrl:require("@/assets/styleImg/clu2.png")
                },
            ],
            styleArr:[
                {
                    name:"样式1",
                    key:"1",
                    imgUrl:require("@/assets/styleImg/cont1.png")
                },
                {
                    name:"样式2",
                    key:"2",
                    imgUrl:require("@/assets/styleImg/cont2.png")
                },
                {
                    name:"样式3",
                    key:"3",
                    imgUrl:require("@/assets/styleImg/cont3.png")
                },
                {
                    name:"样式4",
                    key:"4",
                    imgUrl:require("@/assets/styleImg/cont4.png")
                },
            ]
        },
        '0105':{
            element_type_name:"频道",
            styleArr:[
                {
                    name:"样式1",
                    key:"1",
                    imgUrl:require("@/assets/styleImg/meu1.png")
                }
            ]
        }
    }
}
export {
    addTempCon,
    styelConf
}   