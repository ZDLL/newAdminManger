<template>
  <div class="home">
    <el-container>
        <el-aside width="200px">
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
                    <span class='exit' @click="exitBtn">退出</span>
                    <span class='exit' style="margin-right:20px">{{userName}}</span>
                   
                </div>
            </el-header>
            <el-main id='searchBar'>
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
            console.log(data)
            if(data.status == 200){
                this.$router.push({
                    path:"/login"
                })
            }
        },
        exitBtn(){
            console.log("退出")
            this.userLoginOut();

        },
        goBack(){
             this.$router.go(-1);//返回上一层
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
            margin-left: 6px;
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
    }
</style>
