<template>
    <div class="role-page">
        <myBrea :my-nav='brea'></myBrea>
        <div class="role-cont">
            <div class='userSearch'>
                <span class='title'> 角色：</span>
                <el-input class='search-cont' clearable v-model="searchData.roleName" placeholder="请输入内容"></el-input>
            </div>
            <div class='userSearch'>
                <span class='title'> 类型：</span>
                <div class='search-cont'>
                     <el-select v-model="searchData.roleType" placeholder="请选择">
                        <el-option
                        v-for="item in roleTypeOpn"
                        :key="item.codeInfoValue"
                        :label="item.codeInfoName"
                        :value="item.codeInfoValue">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class='userSearch'>
                <span class='title'> 状态：</span>
                <div class='search-cont'>
                     <el-select v-model="searchData.status" placeholder="请选择">
                        <el-option
                        v-for="item in roleStatusOpn"
                        :key="item.codeInfoValue"
                        :label="item.codeInfoName"
                        :value="item.codeInfoValue">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class='userSearch'>
                <el-button type="primary" plain @click="queryRoleClick">查询角色</el-button>
                <el-button type="primary" @click="addRoleClick">添加角色</el-button>
            </div>
            <div class="role-table">
                <el-divider content-position="left">角色列表</el-divider>
                <div class="table-cont">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">

                        <el-table-column
                        v-for="(itm,index) in tableHeader"
                            :key="index"
                            :prop="itm.prop"
                            :label="itm.label"
                        >
                        </el-table-column>
                        <el-table-column
                             label="添加时间"
                          >
                             <template v-if='scope.row.insertTime' slot-scope="scope">
                                 <span>{{scope.row.insertTime | dateformat}}</span>
                             </template>
                        </el-table-column>
                        <el-table-column
                             label="类型"
                          >
                             <template v-if='scope.row.roleType' slot-scope="scope">
                                 <span>{{typeChange(scope.row.roleType) }}</span>
                             </template>
                        </el-table-column>

                          <el-table-column
                             label="状态"
                          >
                             <template v-if='scope.row.roleType' slot-scope="scope">
                                 <span>{{statuChange(scope.row.status) }}</span>
                             </template>
                        </el-table-column>
                        
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="RoleStatusClick(scope.row)">禁用/启用</el-button>
                            <el-button type="text" size="small" @click="RoleEditorClick(scope.row)">菜单编辑</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
                <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>
            </div>
        </div>
        <el-dialog
            title="角色编辑"
            :visible.sync="roleEditor"
            width="50%"
           >
            <div>
                <div class='elTree'>
                    <el-tree
                    :data="myMenu"
                    :props="defaultProps"
                    :default-checked-keys='isRole'
                    default-expand-all
                    accordion
                    node-key="menuId"
                    ref='tree'
                    show-checkbox
                    >
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span>{{data.status=='00001001'?" [正常]":" [失效]" }}</span>
                        </span>
                    </el-tree>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="roleEditor = false">取 消</el-button>
                <el-button type="primary" @click="saveUserMenuClick">确 定</el-button>
            </span>
        </el-dialog>
         <!-- 添加角色 -->
        <el-dialog
            title="添加角色"
            :visible.sync="roleVisible"
            width="40%"
           >
            <div class=''>
                <el-row class='mt20'>
                     <el-col class='txt-right' :span="4">
                        <span class='my-span-notice'>*</span> 角色：
                     </el-col>
                      <el-col :span="10">
                         <el-input class='search-cont' v-model="saveRoleData.roleName" maxlength="16" show-word-limit clearable placeholder="请输入内容"></el-input>
                     </el-col>
                </el-row>
                <el-row class='mt20'>
                    <el-col class='txt-right' :span="4">
                    <span class='my-span-notice'>*</span> 类型：
                    </el-col>
                    <el-col :span="10">
                        <el-select v-model="saveRoleData.roleType" placeholder="请选择">
                            <el-option
                            v-for="item in roleTypeOpn"
                            :key="item.codeInfoValue"
                            :label="item.codeInfoName"
                            :value="item.codeInfoValue">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="roleVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRoleSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {menuSetData,myConfirm} from '../../../comm/until'

import myBrea from "../../../components/breadcrumb.vue"
import myPackage from '../../../components/package.vue'
export default {
    name:"role",
    data(){
        return{
            roleVisible:false,
            input:"",
            searchData:{
                // role:'',
                status:'',
                pageNo:"1",
                pageSize:10,
                roleName:"",
                roleType:""
            },
             myMenu:[],
             isRole:[],
             defaultProps: {
                children: 'children',
                label: 'menuName'
            },
             tableData:[
                {
                    "id":1,
                    "publish_type":"文章"
                }
            ],
            // roleType:"",
            roleStatusOpn:[],
            roleTypeOpn:[],
            tableHeader:[
                { prop: "roleName", label: "角色" },
                // { prop: "insertTime", label: "添加时间" },
                // { prop: "roleType", label: "类型" },
                // { prop: "status", label: "状态" },
            ],
            roleEditor:false,
            brea:[{"txt":"系统管理","url":"/menu"},{"txt":"角色管理","url":"/"}],
            roleId:"",
            packTotal:1,
            saveRoleData:{
                roleName:"",
                roleType:""
            }
        }
    },
    
    components:{
        myBrea,
        myPackage
    },
    methods:{
        async getRoleList(){
            await this.$store.dispatch("RoleModule/GET_ROLE_LIST",this.searchData);
            let data = this.$store.state.RoleModule.GET_ROLE_LIST;
            this.tableData = data.out.list
            this.packTotal = parseInt(data.out.totalSize)
        },
        async getCodeValue (type){
            await this.$store.dispatch("MenuModule/GET_CODE_VALUE",{codeTypes:type});
            let  data = this.$store.state.MenuModule.GET_CODE_VALUE
            if(data.status!=200){
                this.$message.error(data.message)
                return;
            }
            this.roleTypeOpn = data.out.roleType;
            this.roleStatusOpn= data.out.status;
            let allData={
                codeInfoName: "全部",
                codeInfoValue: "",
                codeTypeId: "",
                insertTime: "",
                insertUserId: "",
                status: "",
                updateTime: null,
            };
             this.roleTypeOpn.unshift(allData);
             this.roleStatusOpn.unshift(allData);
        },
        async saveRole(){
            await this.$store.dispatch("RoleModule/POST_SAVE_ROLE",this.saveRoleData);
            let data = this.$store.state.RoleModule.POST_SAVE_ROLE
            if(data.status != 200){
                this.$message.error(data.msg);
                return;
            }
            this.$message.success("添加角色成功");
            this.searchData={
                // role:'',
                status:'',
                pageNo:"",
                pageSize:10,
                roleName:"",
            };
            this.getRoleList();
            this.roleVisible = false;
        },
        async delRole(roleid){
            await this.$store.dispatch("RoleModule/DEL_DELETE_ROLE",{roleId:roleid});
            let data = this.$store.state.RoleModule.DEL_DELETE_ROLE
            if(data.status != 200){
                this.$message.error("操作失败,请稍后重试");
                return
            }
            this.$message.success("禁用角色成功");
            this.getRoleList();
        },
        async putRole(roleid){
            await this.$store.dispatch("RoleModule/PUT_ENABLE_ROLE",{roleId:roleid});
             let data = this.$store.state.RoleModule.PUT_ENABLE_ROLE
             if(data.status != 200){
                this.$message.error("操作失败,请稍后重试");
                return
            }
            this.$message.success("启用角色成功");
            this.getRoleList();
        },
        async getUserRole(roleid,type){
            this.isRole=[];
            await this.$store.dispatch("RoleModule/GET_USER_ROLE_LIST",{roleId:roleid,roleType:type});
             let data = this.$store.state.RoleModule.GET_USER_ROLE_LIST
             if(data.status != 200){
                this.$message.error("操作失败,请稍后重试");
                return
            }
            this.myMenu = menuSetData(data.out.allMenus);
           
            if(data.out.roleMenus){
                for(let i=0;i<data.out.roleMenus.length;i++){
                    if(data.out.roleMenus[i].nodelv!=1){
                         this.isRole.push(data.out.roleMenus[i].menuid)
                    }
                }
                // this.isRole = data.out.roleMenus
            };
            
            
        },
        async saveUserRole(ids){
            await this.$store.dispatch("RoleModule/POST_SAVE_USER_MENU",{menuIds:ids,roleId:this.roleId});
             let data = this.$store.state.RoleModule.POST_SAVE_USER_MENU
             if(data.status != 200){
                this.$message.error("操作失败,请稍后重试");
                return
            }
            this.$message.success("编辑角色菜单成功");
            this.getRoleList();
            this.roleEditor = false;
            // this.myMenu = menuSetData(data.out.allMenus);
            
        },
        RoleEditorClick(row){
            this.getUserRole(row.roleId,row.roleType)
            this.roleId = row.roleId
            this.roleEditor = true;
        },
        RoleStatusClick(row){
            let _this = this;
            if(row.status =="00001001"){//正常
                myConfirm(_this,"禁用后该角色下所有用户将无法登录，确认禁用？",function(){
                     _this.delRole(row.roleId);
                })
            }else{
                 myConfirm(_this,"是否启用该角色？",function(){
                      _this.putRole(row.roleId);
                })
            }
        },
        addRoleClick(){
            this.saveRoleData={
                roleName:"",
                roleType:""
            };
            this.roleVisible = true
        },
        addRoleSure(){
            if(!this.saveRoleData.roleName){
                this.$message.warning("请填写角色名称");
                return
            }
             if(!this.saveRoleData.roleType){
                this.$message.warning("请选择角色类型");
                return
            }

            this.saveRole()
        },
        queryRoleClick(){
            this.getRoleList();
        },
       saveUserMenuClick(){
           let checkId = this.$refs.tree.getCheckedKeys()
           this.saveUserRole(checkId.join(","))
       },
       handleCurrentFunc(val){
           this.searchData.pageNo = val;
           this.getRoleList();
       }
    },
    computed:{
       typeChange(){
           let _this = this;
            return function (data) {
                let nam=''
                _this.roleTypeOpn.map((val,index)=>{
                    if(val.codeInfoValue == data){
                        nam = val.codeInfoName
                    }
                })
                return nam
            }
        },
        statuChange(){
            let _this = this;
             return function (data) {
                let nam=''
                _this.roleStatusOpn.map((val,index)=>{
                    if(val.codeInfoValue == data){
                        nam = val.codeInfoName
                    }
                })
                return nam
            }

        }
      // 控制显示的内容
     
    },
    created(){
        this.getRoleList();
        this.getCodeValue("roleType,status")
    },
    filters:{
        roleTypeFter(val){
            return 'mmm'
            // console.log( this.roleTypeOpn)
            //  if(val){
            //         this.roleTypeOpn.map((val,inx)=>{
            //         if(val == val.codeInfoValue){
            //           return val.codeInfoName
            //         }
            //     })
            // }
        }
    }
}
</script>
<style lang="scss">
    .role-page{
        .role-cont{
          @extend %pagecont;
            .userSearch{
                @extend %topSearch;
            }
            .table-cont{
                @extend %tableborder;
            }
           
        }
        .txt-right{
            text-align: right;
            line-height: 40px;
            padding-right: 20px;
        }
    }
</style>