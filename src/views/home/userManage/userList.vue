<template>
    <div class="userList-page">
         <myBrea :my-nav='brea'></myBrea>
         <div class="userList-cont">
            <div class="userList-top">
               <div class='userSearch'>
                   <span class='title'> 真实姓名：</span>
                   <el-input class='search-cont' clearable v-model="params.realName" placeholder="请输入内容"></el-input>
               </div>
               <div class='userSearch'>
                   <span class='title'> 用户名：</span>
                   <el-input class='search-cont' clearable v-model="params.username" placeholder="请输入内容"></el-input>
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
                   <span class='title'> 角色状态：</span>
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
                   <el-button type="primary" @click="getUsers" plain>查询用户</el-button>
                    <el-button type="primary" @click="addUsers" >添加用户</el-button>
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
                        <el-table-column label="角色状态">
                            <template slot-scope="scope" >
                                {{scope.row.isDel ==1?"冻结":"正常"}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="userStatusClick(scope.row)">冻结/正常</el-button>
                            <el-button type="text" size="small" @click="userEditorClick(scope.row)">用户编辑</el-button>
                            <el-button type="text" size="small" @click="userResetPwdClick(scope.row)">重置密码</el-button>
                        </template>
                        </el-table-column>
                    </el-table>

                    

                </div>
                <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>
            </div> 
         </div>

         <el-dialog
            :title='userType'
            :visible.sync="dialogVisible"
            width="40%"
           >
            <div class="userList-cont userList-top">
               <div class='mt20'>
                    <el-row>
                        <el-col :span="4"><span class='title'> <span class='my-span-notice'>*</span>用户名：</span></el-col>
                        <el-col :span="10"><el-input :disabled="userType=='编辑用户'" class='search-cont' clearable  v-model="operator.username"  maxlength="30" show-word-limit @clear='inputClear' placeholder="请输入内容"></el-input></el-col>
                    </el-row>
               </div>
               <div class='mt20'>
                    <el-row>
                        <el-col :span="4"> <span class='title'> <span class='my-span-notice'>*</span>电 话：</span></el-col>
                        <el-col :span="10"><el-input class='search-cont' maxlength="11" show-word-limit clearable v-model="operator.phone" placeholder="请输入内容"></el-input></el-col>
                    </el-row>
               </div>
                <div class='mt20'>
                     <el-row>
                        <el-col :span="4"><span class='title'> <span class='my-span-notice'>*</span>真实姓名：</span></el-col>
                        <el-col :span="10"><el-input class='search-cont' maxlength="30" show-word-limit clearable v-model="operator.realName" placeholder="请输入内容"></el-input></el-col>
                    </el-row>
               </div>
               <div class='mt20'>
                    <el-row>
                        <el-col :span="4"><span class='title'><span class='my-span-notice'>*</span> 用户角色：</span></el-col>
                        <el-col :span="10">
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
                        </el-col>
                    </el-row>
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
import {menuSetData,myConfirm} from '../../../comm/until'
import myBrea from "../../../components/breadcrumb.vue"
import myPackage from "../../../components/package.vue"
export default {
    name:"userlist",
    data(){
        return{ 
            userType:"添加用户",
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
            editorData:{},
            operator: {},
            isDels: [
                 {
                    key: '', label: '全部'
                },
                {
                    key: '1', label: '冻结'
                },{
                    key: '2', label: '正常'
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
        async userStatusChange(row){
            let isDel = row.isDel;
            let target = 1;
            let txt = '启用该角色'
            if (isDel == 1) {
                target = 2;
                txt='启用该角色成功'
            } else if (isDel == 2) {
                target = 1;
                txt='禁用该角色成功'
            }
            await this.$store.dispatch("UserModule/USER_CHANGE_STATUS",{userId: row.userId, isDel: target});
            let  data = this.$store.state.UserModule.USER_CHANGE_STATUS;
            if (data.success) {
                this.$message.success(txt)
                this.getUsers();
            }
        },
        userStatusClick(row){
            let _this = this;
             myConfirm(_this,row.isDel ==2?"是否冻结该用户？冻结后用户将不能登录":"是否启用该用户",function(){
                    _this.userStatusChange(row);
            })
            
        },
        userEditorClick(row){
            // this.operator = {};
            // this.operator = row;
            // console.log(row)
            this.roleIds = '';
            this.roleIds = row.roleId;
            let newObj = Object.assign({},row)//数据挟持解绑
            this.operator =  newObj
            this.userType='编辑用户';
            this.dialogVisible = true;
        },
        async addUsers() {
            this.operator = {};
            this.roleIds = '';
            this.userType='添加用户'
            this.dialogVisible = true;
        },
        async addOperator() {
            // this.dialogVisible = false;
            this.operator.roleIds = this.roleIds;
            if(!this.operator.username){
                this.$message.warning('请填写用户账号');
                return
            }
            if(!this.operator.phone || this.operator.phone.length<11 ||!(this.$reg.phoneReg.test(this.operator.phone))){
                this.$message.warning('请填写正确的手机号');
                return
            }
            if(!this.operator.realName){
                this.$message.warning('请填写用真实姓名');
                return
            }
            if(!this.operator.roleIds){
                this.$message.warning('请选择用户角色');
                return
            }
            await this.$store.dispatch("UserModule/USER_SAVE", this.operator);
            let  data = this.$store.state.UserModule.USER_SAVE;
            if (data.success) {
                this.$message.success("添加用户成功")
                this.getUsers();
                this.dialogVisible = false;
            }
        },
        async userResetPwd(row){
            await this.$store.dispatch("UserModule/USER_RESET_PWD",row.userId);
            let  data = this.$store.state.UserModule.USER_RESET_PWD;
            if (data.success) {
                //console.log(data)
                this.$message.success("重置密码成功")
            }
        },
        userResetPwdClick(row){
            let _this = this;
            myConfirm(_this,"重置后的密码为123456，确定重置？",function(){
                _this.userResetPwd(row)
            })
        },
         
        async queryRoles() {
            await this.$store.dispatch("UserModule/ROLES_GET_LIST",{status:"00001001"});
            let  data = this.$store.state.UserModule.ROLES_GET_LIST;
            //console.log(data);
            if (data.success) {
                this.roles = data.out.list;
                this.roles.unshift({
                    insertTime: "",
                    insertUserId:"",
                    roleId: "",
                    roleName: "全部",
                    roleType: "",
                    status: "",
                    updateTime: "",
                })
            }
        },
        handleCurrentFunc(pageNo){
            this.params.pageNo = pageNo;
            this.getUsers();
        },
        handleClose(done) {
            done();
        },
        inputClear(){
            console.log("清楚")
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
       @extend %pagecont;
        .userSearch{
           @extend %topSearch;
        }
        .list_table{
            @extend %tableborder;
        }
        .mt20{
            margin-top: 20px;
        }
        
    }
</style>