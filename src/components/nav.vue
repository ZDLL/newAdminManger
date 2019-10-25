<template>
    <div class='menu'>
    
       <el-menu :router="true" :default-active='$route.path | navActive'>
        <el-menu-item-group>
             <el-menu-item index='/homePage'>
             <i class='el-icon-s-home'></i>
                首页
             </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group v-for='(val,inx) in allMenu' :key='inx' :index='val.menuId'>
          <el-menu-item v-if='val.children.length==0' :index='val.menuUrl'>
            <i :class='val.menuIcon'></i>
            {{val.menuName}}
          </el-menu-item>

          <el-submenu v-else :index='val.menuUrl'>
             <template slot="title">
                <i :class='val.menuIcon'></i>
                <span>{{val.menuName}}</span>
              </template>
              <el-menu-item-group v-for='(vaxl,inxx) in val.children' :key='inxx' :index='vaxl.menuId'>
                <el-menu-item v-if='vaxl.children.length==0' :index='vaxl.menuUrl'>
                  <i :class='vaxl.menuIcon'></i>
                  {{vaxl.menuName}}
                </el-menu-item>
                
                <el-submenu v-else :index='vaxl.menuId'>
                  <template slot="title">
                     <i :class='vaxl.menuIcon'></i>
                    {{vaxl.menuName}}
                  </template>
                  <el-menu-item v-for='(vaxxl,indxx) in vaxl.children' :key='indxx' :index='vaxxl.menuUrl'>
                     <i :class='vaxxl.menuIcon'></i>
                    {{vaxxl.menuName}}
                    </el-menu-item>
                </el-submenu>
                
              </el-menu-item-group>

             
            </el-submenu>
        </el-menu-item-group>
          
       </el-menu>
    </div>
</template>
<script>

import {getStore,menuSetData} from '../comm/until.js'
export default {
  name: "mynav",
  data() {
    return {
      navList:[],
      dymBadge:false,
      roleId:"",
      userId:"",
      fisteMenu:[],
      twoMenu:[],
      threeMenu:[],
      allMenu:[]
    };
  },
  filters:{
   
  },
  methods:{
   async getMenu(){
     
      await this.$store.dispatch("LoginModule/GET_USER_MENU",{userId:this.userId});
      let data = this.$store.state.LoginModule.GET_USER_MENU
      let _this = this;
      if(data.list && data.list.length>0){
           _this.allMenu = menuSetData(data.list)
      }else{
        this.$message.warning("该用户无菜单")
      }
    }
  },
  created(){
    this.roleId = JSON.parse(getStore("userInfo")).sysRoles[0].roleId;
    this.userId = JSON.parse(getStore("userInfo")).userId;
    console.log(this.userId)
    this.getMenu()
  },
  filters:{
    navActive(val){
      return val
    }
  },
};
</script>
<style lang="scss" scoped>
.el-menu {
  border: none;
  overflow: hidden;
  a {
    color: #333;
    text-decoration: none;
  }
  .el-menu-item.is-active{
    font-weight: 600;
    background-color: #ecf5ff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  // .is-active {
  //   background-color: #fffae9;
  //   color: #4a4a4a;
  //   font-weight: 600;
  //   border-left: 3px solid #ffc000;
  //   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  // }
  .el-menu-item, .el-submenu__title{
    height: 50px;
    line-height: 50px;
  }
}
</style>


