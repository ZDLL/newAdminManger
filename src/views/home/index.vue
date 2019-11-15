<template>
  <div class="home">
    <el-container>
        <el-aside width="260px">
            <div class='logo'>
                <img src='../../assets/logo.png' />
            </div>
            <div class="nav">
               <my-nav/>
            </div>
        </el-aside>
        <el-container>
            <el-header>
                <div class='header-cont'>
                    <span class='heade_home' @click="goHome">
                        <img src="@/assets/home.png" alt="">
                    </span>
                    <div class='exit' style="margin-right: 20px;width: auto;">
                        <el-dropdown @command='goUser'  trigger="click">
                        <span class="el-dropdown-link">
                            {{userName}}<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu style="top:30px" slot="dropdown">
                            <el-dropdown-item command='/userCenter'>修改密码</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <span style="margin-right:30px" class='exit' @click="exitBtn">
                        <img style="width:20px" src="@/assets/exit.png" alt="">
                    </span>
                </div>
            </el-header>
            <el-main>
                <router-view/>
                <!-- <my-page :page-total='total' @handleCurrent='handleCurrentFun'/> -->
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>
<script>
import MyNav from '../../components/nav.vue'
import MyPage from '../../components/package.vue'
import  {getStore} from '../../comm/until.js'
export default {
    name:"home",
    components:{
        "my-nav":MyNav,
        "my-page":MyPage
    },
    data(){
        return{
            total:100,
            userName:"张三"
        }
    },
    methods:{
        async userLoginOut(){
            await this.$store.dispatch("LoginModule/USER_LOGIN_OUT",{})
            let data = this.$store.state.LoginModule.USER_LOGIN_OUT
            if(data.status == 200){
                this.$router.push({
                    path:"/login"
                })
            }
        },
        exitBtn(){
            this.userLoginOut();
        },
        goBack(){
             this.$router.go(-1);//返回上一层
        },
        goUser(command){
            this.$router.push({
                path:command
            })
        },
        goHome(){
            this.$router.push({
                path:"/homePage"
            })
        }
    },
    mounted(){
        this.userName =JSON.parse(getStore("userInfo")).username
    }
}
</script>
<style lang="scss">
    .home{
        height: 100%;
        .el-container{
            height: 100%;
            .el-main{
                overflow-x: hidden;
                overflow-y: auto;
            }
        }
         .el-header {
            // border-bottom: 1px #dcdcdc solid;
            color: #333;
        }
        
        .el-aside {
            // border-right: 1px #dcdcdc solid;
            color: #333;
            padding: 20px;
        }
        
        .el-main {
           background-color: #f5f5f5;
            color: #333;
            height: 100%;
        }
        .logo{
            height: 90px;
            width: 90px;
            margin-left: 30px;
            display: inline-block;
            vertical-align: top;
            img{
                width: 100%;
                height: 100%;
            }
            // border: 1px #dcdcdc solid;
        }
        .nav{
            margin-top: 30px;
        }
        .el-menu-item{
            padding: 0px;
           
        }
        .heade_home{
            margin-left: 20px;
            width: 40px;
            height: 60px;
            display: inline-block;
            img{
                width: 20px;
                
            }
        }
        .header-cont{
            line-height: 60px;
            .exit{
                width: 40px;
                height: 60px;
                display: inline-block;
                float: right;
            }
            .goback{
                display: inline-block;
                width: 80px;
                height: 60px;
                float: left; 
                font-size: 14px;
                .el-icon-back{
                    font-size: 17px;
                    margin-right: 6px;
                    -ms-flex-item-align: center;
                    align-self: center;
                }
            }
        }
       
        .el-dropdown-link {
            cursor: pointer;
            // color: #409EFF;
        }
        .el-icon-arrow-down {
            font-size: 12px;
        }
    }
    .el-popper[x-placement^=bottom]{
         margin-top: -10px;
    }
    .el-dropdown-menu__item{
        line-height: 24px;
    }
</style>
