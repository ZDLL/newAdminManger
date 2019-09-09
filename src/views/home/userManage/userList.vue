<template>
    <div class="userList-page">
         <myBrea :my-nav='brea'></myBrea>
         <div class="userList-cont">
            <div class="userList-top">
               <div class='userSearch'>
                   <span class='title'> 用户名：</span>
                   <el-input class='search-cont' v-model="params.realName" placeholder="请输入内容"></el-input>
               </div>
               <div class='userSearch'>
                   <span class='title'> 账号：</span>
                   <el-input class='search-cont' v-model="params.username" placeholder="请输入内容"></el-input>
               </div>
               <div class='userSearch'>
                   <span class='title'> 用户角色：</span>
                   <div class='search-cont'>
                       <el-select v-model="params.roleId" placeholder="请选择">
                            <el-option
                            v-for="item in roles"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId">
                            </el-option>
                        </el-select>
                   </div>
                   <!-- <el-input class='search-cont' v-model="input" placeholder="请输入内容"></el-input> -->
               </div>
               <div class='userSearch'>
                   <span class='title'> 是否冻结：</span>
                   <div class='search-cont'>
                       <el-select v-model="params.isDel" placeholder="请选择">
                            <el-option
                            v-for="item in isDels"
                            :key="item.key"
                            :label="item.label"
                            :value="item.key">
                            </el-option>
                        </el-select>
                   </div>
                   <!--<el-input class='search-cont' v-model="params.isDel" placeholder="请输入内容"></el-input>-->
               </div>
               <div class='userSearch'>
                   <el-button type="primary" @click="getUsers">查询用户</el-button>
                    <el-button type="primary" @click="addUsers" plain>添加用户</el-button>
               </div>
            </div>
            <div class='userList-table'>
                <el-divider content-position="left">用户列表</el-divider>
                <div class='list_table'>
                    <el-table
                        :data="operators"
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
                            fixed="right"
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="userStatusClick(scope.row)">冻结/正常</el-button>
                            <el-button type="text" size="small" @click="userEditorClick(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="userResetPwdClick(scope.row)">重置密码</el-button>
                        </template>
                        </el-table-column>
                    </el-table>

                    

                </div>
                <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>
            </div> 
         </div>

         <el-dialog
            title="添加用户"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <div class="userList-cont userList-top">
               <div class='userSearch'>
                   <span class='title'> 账号：</span>
                   <el-input class='search-cont' v-model="operator.username" placeholder="请输入内容"></el-input>
               </div>
               <div class='userSearch'>
                   <span class='title'> 真实姓名：</span>
                   <el-input class='search-cont' v-model="operator.realName" placeholder="请输入内容"></el-input>
               </div>
               <div class='userSearch'>
                   <span class='title'> 电话：</span>
                   <el-input class='search-cont' v-model="operator.phone" placeholder="请输入内容"></el-input>
               </div>
               <div class='userSearch'>
                   <span class='title'> 用户角色：</span>
                   <div class='search-cont'>
                       <el-select v-model="roleIds" placeholder="请选择">
                            <el-option
                            v-for="item in roles"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId">
                            </el-option>
                        </el-select>
                   </div>
                   
               </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOperator">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>
<script>
import {menuSetData} from '../../../comm/until'
import myBrea from "../../../components/breadcrumb.vue"
import myPackage from "../../../components/package.vue"
export default {
    name:"userlist",
    data(){
        return{ 
            dialogVisible: false,
            packTotal: 1,
            operators:[],
            roles: [],
            params:{
                pageNo: 1,
                pageSize: 10,
                realName: '',
                username: '',
                roleId: '',
                isDel: '',
            },
            operator: {
            },
            isDels: [
                {
                    key: '1', label: '是'
                },{
                    key: '2', label: '否'
                }],
            roleIds: '',
            tableHeader:[
                //{ prop: "userId", label: "用户ID" },
                { prop: "username", label: "用户名" },
                { prop: "roleName", label: "角色" },
                { prop: "realName", label: "真实姓名" },
                { prop: "phone", label: "电话" },
                //{ prop: "isDel", label: "是否冻结" },
            ],
            roleOptions:[{}],
            roleValue:"",
            input:"",
            brea:[{"txt":"系统管理","url":"/menu"},{"txt":"用户管理","url":"/userManage"}]
        }
    },
    components:{
        myBrea,
        myPackage
    },
    methods:{
        async getUsers (){
            await this.$store.dispatch("UserModule/USER_GET_LIST",this.params);
            let  data = this.$store.state.UserModule.USER_GET_LIST;
            if (data.success) {
                this.operators = data.out.list;
                this.packTotal = data.out.totalSize;
            }
        },
        async userStatusClick(row){
            let isDel = row.isDel;
            let target = 1;
            if (isDel == 1) {
                target = 2;
            } else if (isDel == 2) {
                target = 1;
            }
            await this.$store.dispatch("UserModule/USER_CHANGE_STATUS",{userId: row.userId, isDel: target});
            let  data = this.$store.state.UserModule.USER_CHANGE_STATUS;
            if (data.success) {
                console.log("操作成功");
                this.getUsers();
            }
        },
        userEditorClick(row){
            this.operator = {};
            this.operator = row;
            this.roleIds = '';
            this.roleIds = row.roleId;
            this.dialogVisible = true;
        },
        async addUsers() {
            this.operator = {};
            this.roleIds = '';
            this.dialogVisible = true;
        },
        async addOperator() {
            this.dialogVisible = false;
            this.operator.roleIds = this.roleIds;
            await this.$store.dispatch("UserModule/USER_SAVE", this.operator);
            let  data = this.$store.state.UserModule.USER_SAVE;
            if (data.success) {
                console.log('添加用户成功');
                this.getUsers();
            }
        },
        async userResetPwdClick(row){
            console.log(row);
            await this.$store.dispatch("UserModule/USER_RESET_PWD",row.userId);
            let  data = this.$store.state.UserModule.USER_RESET_PWD;
            if (data.success) {
                //console.log(data)
            }
        },
        async queryRoles() {
            await this.$store.dispatch("UserModule/ROLES_GET_LIST",{});
            let  data = this.$store.state.UserModule.ROLES_GET_LIST;
            //console.log(data);
            if (data.success) {
                this.roles = data.out.list;
            }
        },
        handleCurrentFunc(pageNo){
            console.log(pageNo);
            this.params.pageNo = pageNo;
            this.getUsers();
        },
        handleClose(done) {
            done();
        }
    },
    created(){
        this.getUsers();
        this.queryRoles();
    },
    filters:{}
}
</script>
<style lang="scss">
    .userList-cont{
        background-color: #fff;
        padding: 20px;
        margin-top: 20px;
        .userSearch{
            display: inline-block;
            vertical-align: top;
            box-sizing: border-box;
            height: 50px;
            line-height: 50px;
            margin: 0 15px;
            .title{
                width: 70px;
                display: inline-block;
                vertical-align: top;
            }
            .search-cont{
                display: inline-block;
                vertical-align: top;
                width: calc(100% - 80px);
            }
        }
        .list_table{
            @extend %tableborder;
        }
        
    }
</style>