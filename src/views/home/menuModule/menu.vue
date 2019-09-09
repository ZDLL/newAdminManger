<template>
    <div class='menu-page'>
        <myBrea :my-nav='brea'></myBrea>
        <div class='menu-cont'>
             <div class="left">
                  <el-divider content-position="left">系统菜单</el-divider>
                  <div class="left-cont">
                      <!-- <el-button type="primary" plain @click="mainMenuClick">添加根菜单</el-button> -->
                      <el-button type="primary" plain @click="childMenuClick">添加子菜单</el-button>
                        <div class='elTree'>
                            <el-tree
                            :data="myMenu"
                            :props="defaultProps"
                            accordion
                            @node-click="handleNodeClick"
                            >
                             <span class="custom-tree-node" slot-scope="{ node, data }">
                                 <span>{{ node.label }}</span>
                                 <span>{{data.status=='00001001'?" [正常]":" [失效]" }}</span>
                             </span>
                            </el-tree>
                        </div>
                        
                  </div>
            </div>
            <div class="reight">
                 <el-divider content-position="center">菜单详情</el-divider>
                 <div class='reight-cont'>
                    <!-- <el-row class='row-style'>
                        <el-col :span="6">菜单编号:</el-col>
                        <el-col :span="16"><el-input v-model="menuData.menuId" placeholder="请输入内容"></el-input></el-col>
                    </el-row> -->
                    <el-row class='row-style'>
                        <el-col :span="6">菜单类型:</el-col>
                        <el-col :span="16">
                              <el-select v-model="menuData.menuType" placeholder="请选择">
                                <el-option
                                v-for="item in menuTypeOpn"
                                :key="item.codeInfoValue"
                                :label="item.codeInfoName"
                                :value="item.codeInfoValue">
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
                                :key="item.codeInfoValue"
                                :label="item.codeInfoName"
                                :value="item.codeInfoValue">
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
                                :key="item.codeInfoValue"
                                :label="item.codeInfoName"
                                :value="item.codeInfoValue">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                      <el-row class='row-style'>
                        <el-col :span="6">菜单链接:</el-col>
                        <el-col :span="16"><el-input v-model="menuData.menuUrl" placeholder="请输入内容"></el-input></el-col>
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
                        <el-button type="primary" @click="addMenuClick">保存菜单</el-button>
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
            actionOpn:[],
            menuTypeOpn:[],
            parentId:"",
            menuId:"",
            nodeLv:"",
            isRoot:false,
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
            brea:[{"txt":"系统管理","url":"/menu"},{"txt":"菜单管理","url":"/"}]
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
                this.myMenu = menuSetData(data.out.allMenu,'menu');
            }
        },
        async getCodeValue (type){
            await this.$store.dispatch("MenuModule/GET_CODE_VALUE",{codeTypes:type});
            let  data = this.$store.state.MenuModule.GET_CODE_VALUE
            if(data.status!=200){
                this.$message.error(data.message)
                return;
            }
            this.menuStatuOpn =data.out.status
            this.actionOpn = data.out.actionType
            this.menuTypeOpn = data.out.menuType
          
        },
        async saveMenu(postData){
            await this.$store.dispatch("MenuModule/POST_SAVE_MENU",postData);
            let  data = this.$store.state.MenuModule.POST_SAVE_MENU
            if(data.status!=200){
                this.$message.error(data.message)
                return;
            }
            this.$message.success("添加成功");
            this.getMenu();
        },
        async updataMenu(postData){
             await this.$store.dispatch("MenuModule/UPDAT_POST_MENU",postData);
            let  data = this.$store.state.MenuModule.UPDAT_POST_MENU
            if(data.status!=200){
                this.$message.error(data.message)
                return;
            }
            this.$message.success("更新成功");
            this.getMenu();
        },
        handleNodeClick(data){
            this.menuData = data
            this.parentId = data.parentMenuId;
            this.menuId = data.menuId
            this.nodeLv = data.nodeLv
        },
        mainMenuClick(){
            this.isRoot = true
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
        },
        addMenuClick(){
           let postData={
                menuName:this.menuData.menuName,
                menuUrl:this.menuData.menuUrl,
                menuType:this.menuData.menuType,
                actionType:this.menuData.actionType,
                menuIcon:this.menuData.menuIcon,
                parentMenuId:this.parentId,
                status:this.menuData.status,
                menuOrder:this.menuData.menuOrder,
                // nodeLv:this.nodeLv,
                type:this.isRoot?'root':""
            }
            if(this.menuData.menuId){
                postData.menuId = this.menuData.menuId
                postData.parentMenuId = this.parentId;
                this.updataMenu(postData);
            }else{
               postData.parentMenuId = this.menuId;
                this.saveMenu(postData);
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