<template>
    <div class='login-warp'>
        <div class='login-page'>
            <div class='login-title'>
                <h3>潮上CRM后台登录</h3>
            </div>
            <div class=''>
                <el-input class="mt20" v-model="name"  placeholder="请输入用户名"></el-input>
                <el-input class='mt20' v-model="pwd" show-password  @keyup.enter.native='loginBtn' placeholder="请输入密码"></el-input>
                <el-button class='login-btn' type="primary"  @click="loginBtn">登录</el-button>
            </div>
            
        </div>
  </div>
</template>
<script>
import {setStore} from '../comm/until.js'
export default {
    name:"login",
    data(){
        return{
            name:"",
            pwd:''
        }
    },
    methods:{
        async loginBtn(){
            let _this =this;
            if(!_this.name || !_this.pwd){
                 this.$message.error('请输入账号和密码');
                 return
            }
            await this.$store.dispatch("LoginModule/USER_GET_LOGIN",{username:_this.name,password:_this.pwd,authCode:''});
            let data  = this.$store.state.LoginModule.USER_GET_LOGIN;
            if(!data.currentUserProfile){
                this.$message.error('请重新登录');
                return;
            }
            let userData={
                sysRoles:data.currentUserProfile.sysRoles,
                token:data.currentUserProfile.token,
                userId:data.currentUserProfile.userId,
                username: data.currentUserProfile.username
            }
            // console.log(`登录时获取的token=====：`+token)
                setStore('userInfo',userData)
            _this.$router.push("/home");
        }
    },
    created(){
        
    },
    mounted(){
      localStorage.clear();
    },
    filters:{}
}
</script>
<style lang="scss">
.login-warp{
    width: 100%;
    height: 100%;
    // background-image: url('../assets/loginBack.jpg');
    background-size: 100% 100%;
    overflow: hidden;
}
.login-page{
    position: absolute;
    top:150px;
    left:0;
    right:0px;
    margin:auto;
    width: 400px;
    padding: 20px;
    padding-bottom: 30px;
    height: 260px;
    background: rgba(255,255,255,0.85);
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    input::-webkit-input-placeholder {
         color: #1D1E2C;
     }
    input::-ms-input-placeholder {
         color: #1D1E2C;
    }
    input::-moz-input-placeholder {
         color: #1D1E2C;
    }
    input::-o-input-placeholder {
         color: #1D1E2C;
    }
    .el-input__inner{
        background-color: transparent;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        color: #1D1E2C;
    }
    .login-title{
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
        h3{
            font-size: 18px;
            color: #1D1E2C;
            font-weight: 500;
        }
    }
    .login-btn{
        width: 100%;
        margin-top: 40px;
    }
    .mt20{
        margin-top: 20px;
    }
}
</style>


