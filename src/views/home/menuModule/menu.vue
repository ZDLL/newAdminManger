<template>
    <div class='menu-page'>
        <myBrea :my-nav='brea'></myBrea>
        <div class='menu-cont'>
             <div class="left">
                  <el-divider content-position="left">系统菜单</el-divider>
                  <div class="left-cont">
                      <el-button type="primary" plain @click="mainMenuClick">添加根菜单</el-button>
                      <el-button type="primary" plain @click="childMenuClick">添加子菜单</el-button>
                      <!-- <el-tree
                        :data="myMenu"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        ref="tree"
                        highlight-current
                        :props="defaultProps">

                        </el-tree> -->
                        <div class='elTree'>
                            <el-tree
                            :data="myMenu"
                            :props="defaultProps"
                            accordion
                            @node-click="handleNodeClick"
                            >
                            </el-tree>
                        </div>
                        
                  </div>
            </div>
            <div class="reight">
                 <el-divider content-position="center">菜单详情</el-divider>
                 <div class='reight-cont'>
                    <el-row class='row-style'>
                        <el-col :span="6">菜单编号:</el-col>
                        <el-col :span="16"><el-input v-model="menuData.menuId" placeholder="请输入内容"></el-input></el-col>
                    </el-row>
                    <el-row class='row-style'>
                        <el-col :span="6">菜单类型:</el-col>
                        <el-col :span="16">
                              <el-select v-model="menuData.menuType" placeholder="请选择">
                                <el-option
                                v-for="item in menuTypeOpn"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class='row-style'>
                        <el-col :span="6">菜单图标:</el-col>
                        <el-col :span="16"><el-input v-model="menuData.menuIcon" placeholder="请输入内容"></el-input></el-col>
                    </el-row>
                    <el-row class='row-style'>
                        <el-col :span="6">菜单名称:</el-col>
                        <el-col :span="16"><el-input v-model="menuData.menuName" placeholder="请输入内容"></el-input></el-col>
                    </el-row>
                    <el-row class='row-style'>
                        <el-col :span="6">菜单状态:</el-col>
                        <el-col :span="16">
                            <el-select v-model="menuData.status" placeholder="请选择">
                                <el-option
                                v-for="item in menuStatuOpn"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>

                        </el-col>
                    </el-row>
                     <el-row class='row-style'>
                        <el-col :span="6">行为类型:</el-col>
                        <el-col :span="16">

                             <el-select v-model="menuData.actionType" placeholder="请选择">
                                <el-option
                                v-for="item in actionOpn"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                     <el-row class='row-style'>
                        <el-col :span="6">授权代码:</el-col>
                        <el-col :span="16"><el-input v-model="menuData.authCode" placeholder="请输入内容"></el-input></el-col>
                    </el-row>
                     <el-row class='row-style'>
                        <el-col :span="6">菜单序号:</el-col>
                        <el-col :span="16"><el-input v-model="menuData.menuOrder " placeholder="请输入内容"></el-input></el-col>
                    </el-row>
                    <div style="text-align: center;margin-top:40px">
                        <el-button type="primary">保存菜单</el-button>
                    </div>
                    
                 </div>
            </div>
        </div>
       
    </div>
</template>
<script>
import {menuSetData} from '../../../comm/until'
import myBrea from "../../../components/breadcrumb.vue"
export default {
    name:"mymenu",
    data(){
        return{
            myMenu:[],
            defaultProps: {
                children: 'children',
                label: 'menuName'
            },
            menuStatuOpn:[
                {
                    label:"正常",
                    value:1
                },
                {
                    label:"失效",
                    value:2
                }
            ],
            actionOpn:[
                
            ],
            menuTypeOpn:[
                
            ],
            parentId:"",
            menuData:{
                actionType: "",
                authCode: "",
                insertUserId: '',
                menuIcon: "",
                menuId: "",
                menuName: "",
                menuOrder: "",
                menuType: "",
                menuUrl: "",
                nodeLv: "",
                parentMenuId: "",
                status: "",
            },
            input:'',
            brea:[{"txt":"系统管理","url":"/menu"},{"txt":"菜单管理","url":"/menu"}]
        }
    },
    components:{
       myBrea
    },
    methods:{
         async getMenu (){
            await this.$store.dispatch("MenuModule/MENU_GET_LIST",{});
            let  data = this.$store.state.MenuModule.MENU_GET_LIST
            if(data.out.allMenu.length>0){
                this.myMenu = menuSetData(data.out.allMenu);
            }
        },
        async getCodeValue (type){
            await this.$store.dispatch("MenuModule/GET_CODE_VALUE",{codeTypeId:type});
            let  data = this.$store.state.MenuModule.GET_CODE_VALUE
            console.log(data)
            // if(data.out.allMenu.length>0){
            //     this.myMenu = menuSetData(data.out.allMenu);
            // }
        },
        handleNodeClick(data){
            this.menuData = data
            this.parentId = data.parentMenuId;
        },
        mainMenuClick(){
            this.menuData={
                actionType: "",
                authCode: "",
                // insertUserId: '',
                menuIcon: "",
                menuId: "",
                menuName: "",
                menuOrder: "",
                menuType: "",
                // menuUrl: "",
                // nodeLv: "",
                parentMenuId: "",
                status: "",
            }
        },
        childMenuClick(){
             this.menuData={
                actionType: "",
                authCode: "",
                // insertUserId: '',
                menuIcon: "",
                menuId: "",
                menuName: "",
                menuOrder: "",
                menuType: "",
                // menuUrl: "",
                // nodeLv: "",
                parentMenuId: "",
                status: "",
            }
        }
    },
    created(){
        this.getMenu();
        this.getCodeValue("actionType,menuType,status")
    },
    mounted(){}
}
</script>
<style lang="scss">
    .menu-page{
       
        .menu-cont{
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            margin-top: 20px;
            padding-bottom: 50px;
            padding: 20px;
            .left,.reight{
                display: inline-block;
                width: 50%;
                vertical-align: top;
                box-sizing: border-box;
            }
            .elTree{
                width: 300px;
                overflow: hidden;
                margin-top: 20px;
            }
            .reight-cont{
                margin-top: 50px;
            }
            .row-style{
                margin-top: 20px;
                line-height: 40px;
            }
        }
        
    }
</style>