<template>
    <div class="userCenter-page">
         <myBrea :my-nav='brea'></myBrea>
         <div class='userCenter-cont'>
            <el-row class='top20'>
                <el-col :span="5" class='useTxt'><span class='my-span-notice'>*</span>旧密码:</el-col>
                <el-col :span="10"><el-input placeholder="请输入旧密码" v-model="postData.oldPwd" show-password></el-input></el-col>
            </el-row>
            <el-row class='top20'>
                <el-col :span="5" class='useTxt'><span class='my-span-notice'>*</span>新密码:</el-col>
                <el-col :span="10"><el-input placeholder="请输入新密码" v-model="postData.nPwd" show-password></el-input></el-col>
            </el-row>
            <el-row class='top20'>
                <el-col :span="5" class='useTxt'><span class='my-span-notice'>*</span>重复新密码:</el-col>
                <el-col :span="10"><el-input placeholder="请输入新密码" v-model="postData.retPwd" show-password></el-input></el-col>
            </el-row>
             <el-row class='top20' style=" text-align: right;">
                  <el-col :span="10"><el-button type="primary" @click="setPwdClick">确认提交</el-button></el-col>
            </el-row>
         </div>
    </div>
</template>
<script>
import {menuSetData,myConfirm,getStore} from '../../../comm/until'

import myBrea from "../../../components/breadcrumb.vue"
import myPackage from '../../../components/package.vue'
import { setTimeout } from 'timers';
export default {
    name:"setpwd",
    data(){
        return{
            brea:[{"txt":"修改密码","url":"/"}],
            postData:{
                nPwd:"",
                userId:"",
                oldPwd:"",
                retPwd:"",
                userId:''
            }
           
        }
    },
    components:{
        myBrea,
        myPackage
    },
    methods:{
        async setPwd(){
            await this.$store.dispatch("LoginModule/USER_POST_ALERTPWD",this.postData);
            let data  = this.$store.state.LoginModule.USER_POST_ALERTPWD;
            this.$message.success("设置密码成功,请重新登陆");
            let _this = this;
            setTimeout(()=>{
                _this.$router.push({
                    path:"/login"
                })
            },1000)
        },
        setPwdClick(){
            if(!this.postData.oldPwd){
                this.$message.warning("请填入旧密码");
                return;
            }
            if(!this.postData.nPwd){
                 this.$message.warning("请填写新密码");
                return;
            }
            if(!this.postData.retPwd || this.postData.retPwd!= this.postData.nPwd){
                this.$message.warning("请填写重复密码，且重复密码与新密码保持一致")
                return
            }
            this.setPwd()
        }
    },
    created(){
        this.postData.userId = JSON.parse(getStore("userInfo")).userId;
    }
}
</script>
<style lang="scss">
.userCenter-cont{
    background-color: #fff;
    padding: 20px;
    margin-top: 20px;
    .top20{
        margin-top: 30px;
    }
    .useTxt{
        text-align: right;
        padding-right: 20px;
    }
}
</style>