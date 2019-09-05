<template>
    <div>
        <el-menu>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
    </div>
  <!-- <el-menu v-if='navList'  :default-active='$route.path | navActive' class="el-menu-vertical-demo" :router="true">
    <el-menu-item v-for="(itm,index) in navList" :index="itm.url" :key="index">
       {{itm.text}}
      <el-badge v-if='itm.badge' is-dot class="item"></el-badge>
    </el-menu-item> -->
    <!-- <el-submenu index="1">
        <template slot="title">
          <span>导航一</span>
        </template>
        <el-menu-item-group v-for="(itm,idx) in navList" :key="idx">
          <el-menu-item :index='itm.url'>{{itm.text}}</el-menu-item>
        </el-menu-item-group>
    </el-submenu></el-menu> -->
  
</template>
<script>
import { sidebarConfig} from '../config/objConfig.js';
import {getStore} from '../comm/until.js'
console.log(getStore)
export default {
  name: "mynav",
  data() {
    return {
      navList:[],
      dymBadge:false,
      roleId:"",
      fisteMenu:[],
      twoMenu:[],
      threeMenu:[]
    };
  },
  filters:{
    // navActive(val){
    //   let newRou = val.replace("/","")
    //   for(let i =0;i<sidebarConfig.length;i++){
    //     if(newRou.indexOf(sidebarConfig[i].url.replace("/",""))>-1){
    //       return sidebarConfig[i].url
    //     }
    //   }
    // }
  },
  methods:{
   async getMenu(){
     console.log(this)
      await this.$store.dispatch("LoginModule/GET_USER_MENU",{roleId:this.roleId});
      let data = this.$store.state.LoginModule.GET_USER_MENU
      console.log(data)
      let _this = this;
      if(data.list && data.list.length>0){
        data.list.map((val,index)=>{
          // console.log(val)
          if(val.nodeLv == 1){
            _this.fisteMenu.push(val)
          };
          if(val.nodeLv == 2){
              _this.twoMenu.push(val)
          };
          if(val.nodeLv == 3){
            _this.threeMenu.push(val)
          }
         
        })
      }else{
        this.$message.warning("该账号无权限")
      }
      console.log(this.fisteMenu)
      console.log(this.twoMenu)
      console.log(this.threeMenu)
      // Object.keys(data).map((val,index)=>{
      //   console.log(val)
      // })
      
    }
  },
  created(){
    this.roleId = JSON.parse(getStore("userInfo")).sysRoles[0].roleId;
    this.getMenu()
  }
};
</script>
<style lang="scss" scoped>
// .el-menu {
//   border: none;
//   a {
//     color: #333;
//     text-decoration: none;
//   }
//   .is-active {
//     background-color: #fffae9;
//     color: #4a4a4a;
//     font-weight: 600;
//     border-left: 3px solid #ffc000;
//     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
//   }
//   .el-menu-item, .el-submenu__title{
//     height: 50px;
//     line-height: 50px;
//   }
// }
</style>


