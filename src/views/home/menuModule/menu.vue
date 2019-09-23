<template>
    <div class='menu-page'>
        <myBrea :my-nav='brea'></myBrea>
        <div class='menu-cont'>
             <div class="left">
                  <el-divider content-position="left">系统菜单</el-divider>
                  <div class="left-cont">
                      <!-- <el-button type="primary" plain @click="mainMenuClick">添加根菜单</el-button> -->
                        <div class='elTree'>
                            <el-button type="primary" style='margin-bottom:20px' plain @click="childMenuClick">添加子菜单</el-button>
                            <el-tree
                            :data="myMenu"
                            :props="defaultProps"
                            accordion
                            node-key="id"
                            default-expand-all
                            @node-click="handleNodeClick"
                            :expand-on-click-node="false"
                            >
                             <span class="custom-tree-node" slot-scope="{ node, data }">
                                 <span>{{ node.label }}</span>
                                 <span>{{data.status=='00001001'?" [正常]":" [失效]" }}</span>
                                <span>
                                    <!-- <el-button
                                        type="text"
                                        size="mini"
                                        @click.stop="() => append(data)">
                                        Append
                                    </el-button> -->
                                    <el-button
                                        style="margin-left:20px"
                                        type="text"
                                        size="mini"
                                        @click.stop="() => delmenu(node, data)">
                                        删除
                                    </el-button>
                                    </span>
                             </span>
                             
                            </el-tree>
                        </div>
                        
                  </div>
            </div>
            <div class="reight">
                 <el-divider content-position='left'>菜单详情</el-divider>
                 <div class='reight-cont'>
                    <!-- <el-row class='row-style'>
                        <el-col :span="6">菜单编号:</el-col>
                        <el-col :span="16"><el-input v-model="menuData.menuId" placeholder="请输入内容"></el-input></el-col>
                    </el-row> -->
                    <el-row class='row-style'>
                        <el-col :span="6"><span class='my-span-notice'>*</span>菜单类型:</el-col>
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
                        <el-col :span="6"><span class='my-span-notice'>*</span>菜单状态:</el-col>
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
                        <el-col :span="6"><span class='my-span-notice'>*</span>行为类型:</el-col>
                        <el-col :span="16">
                             <el-select :disabled='selectDis' v-model="menuData.actionType" placeholder="请选择">
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
                        <el-col :span="6">菜单图标:</el-col>
                        <el-col :span="16">
                            <el-input clearable v-model="menuData.menuIcon" placeholder="el-icon-coin"></el-input>
                             <my-notice :tip-txt='"请参考https://element.eleme.cn/#/zh-CN/component/icon"'></my-notice>
                        </el-col>
                    </el-row>
                    <el-row class='row-style'>
                        <el-col :span="6"><span class='my-span-notice'>*</span>菜单名称:</el-col>
                        <el-col :span="16"><el-input clearable v-model="menuData.menuName" maxlength="16" show-word-limit placeholder="请输入内容"></el-input></el-col>
                    </el-row>
                   
                    <el-row class='row-style'>
                        <el-col :span="6"><span class='my-span-notice'>*</span>菜单链接:</el-col>
                        <el-col :span="16">
                            <el-input clearable maxlength="64" show-word-limit v-model="menuData.menuUrl" placeholder="请输入内容"></el-input>
                            <my-notice :tip-txt='"请尽量使用英文"'></my-notice>
                        </el-col>
                    </el-row>
                    <el-row class='row-style'>
                        <el-col :span="6"><span class='my-span-notice'>*</span>授权代码:</el-col>
                        <el-col :span="16">
                            <el-input clearable maxlength="64" show-word-limit v-model="menuData.authCode" placeholder="请输入内容"></el-input>
                             <my-notice :tip-txt='"请尽量使用英文"'></my-notice>
                        </el-col>
                    </el-row>
                    <el-row class='row-style'>
                        <el-col :span="6"><span class='my-span-notice'>*</span>菜单序号:</el-col>
                        <el-col :span="16">
                            <el-input type="number" clearable v-model="menuData.menuOrder " placeholder="请输入内容"></el-input>
                            <my-notice :tip-txt='"输入1-99的数字排序，数字越小排序越靠前"'></my-notice>
                        </el-col>
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
import {menuSetData,myConfirm} from '../../../comm/until'
import myBrea from "../../../components/breadcrumb.vue"
let id = 1000;
export default {
    name:"mymenu",
    data(){
        return{
            myMenu:[],
            defaultProps: {
                children: 'children',
                label: 'menuName',
                id:"menuId"
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
            brea:[{"txt":"系统管理","url":"/menu"},{"txt":"菜单管理","url":"/"}],
            selectDis:false
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
            this.menuData={
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
            };
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
            this.menuData={
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
            };
            this.getMenu();
        },
        async delMenu(postData){
            await this.$store.dispatch("MenuModule/POST_DEL_MENU",postData);
            let  data = this.$store.state.MenuModule.POST_DEL_MENU
            if(data.status!=200){
                this.$message.error(data.message)
                return;
            }
            this.$message.success("删除成功");
            this.getMenu();
        },
        handleNodeClick(data){
            this.menuData = data
            this.parentId = data.parentMenuId;
            this.menuId = data.menuId
            this.nodeLv = data.nodeLv
            this.selectDis = true;
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
            this.selectDis = false;
        },
        addMenuClick(){
            if(!this.menuData.menuType){
                this.$message.warning("请选择菜单类型");
                return;
            }
            if(!this.menuData.status){
                this.$message.warning("请选择菜单状态");
                return;
            }
            if(!this.menuData.actionType){
                this.$message.warning("请选择菜单行为类型");
                return;
            }
            if(!this.menuData.menuName){
                this.$message.warning("请输入菜单名称");
                return;
            }
            if(!this.menuData.menuUrl){
                this.$message.warning("请输入菜单链接");
                return;
            }
            if(!this.menuData.authCode){
                this.$message.warning("请输入授权代码");
                return;
            }
            if(!this.menuData.menuOrder || this.menuData.menuOrder<0 || this.menuData.menuOrder>99){
                this.$message.warning("菜单顺序请输入1~99的数字");
                return;
            }
           let postData={
                menuName:this.menuData.menuName,
                menuUrl:this.menuData.menuUrl,
                menuType:this.menuData.menuType,
                actionType:this.menuData.actionType,
                menuIcon:this.menuData.menuIcon,
                parentMenuId:this.parentId,
                status:this.menuData.status,
                menuOrder:this.menuData.menuOrder,
                authCode:this.menuData.authCode,
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
            
        },
        delmenu(node,data){
            let _this = this;
            if(data.status =='00001001'){
                this.$message.warning("该菜单正常状态，不能被删除");
                return;
            }
            myConfirm(_this,"是否删除该菜单？删除后不会显示在菜单栏",function(){
                _this.delMenu({menuId:data.menuId});
            })
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
         @extend %pagecont;
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
            .left-cont{
                padding-left: 40px;
            }
            .reight-cont{
                margin-top: 50px;
                .el-col-6{
                    text-align: right;
                    padding-right: 20px;
                }
            }
            .row-style{
                margin-top: 20px;
                line-height: 40px;
            }
        }
        
    }
</style>