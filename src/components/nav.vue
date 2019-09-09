<template>
    <div class='menu'>
       <el-menu :router="true">
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
     
      await this.$store.dispatch("LoginModule/GET_USER_MENU",{roleId:this.roleId});
      let data = this.$store.state.LoginModule.GET_USER_MENU
      let _this = this;
      if(data.list && data.list.length>0){
           _this.allMenu = menuSetData(data.list)
      }
     
      // if(data.list && data.list.length>0){
      //   sidebarConfig.map((subVal,ix)=>{
      //     data.list.map((val,index)=>{
      //         if(val.menuId == subVal.menuId){
      //           val.menuUrl = subVal.url
      //         }else{
      //           val.menuUrl = val.menuId
      //         }
      //     // console.log(val)
      //         if(val.nodeLv == 1){
      //           _this.allMenu.push(val);
      //         };
      //         if(val.nodeLv == 2){
      //             _this.twoMenu.push(val)
      //         };
      //         if(val.nodeLv == 3){
      //           _this.threeMenu.push(val)
      //         }
      //       })
      //   })
        
      // }else{
      //   this.$message.warning("该账号无权限")
      // }
      // _this.allMenu.map((cv,inx)=>{
      //   _this.allMenu[inx].children=[];
      //    _this.twoMenu.map((nv,ix)=>{
      //      if(cv.menuId == nv.parentMenuId){
      //           nv.children=[];
      //          _this.allMenu[inx].children.push(nv)
      //           _this.threeMenu.map((ccv,ccinx)=>{
      //             if(ccv.parentMenuId == nv.menuId){
      //                 nv.children.push(ccv)
      //             }
      //           })
      //      }
      //    });
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
.el-menu {
  border: none;
  overflow: hidden;
  a {
    color: #333;
    text-decoration: none;
  }
  // .is-active {
  //   background-color: #fffae9;
  //   color: #4a4a4a;
  //   font-weight: 600;
  //   // border-left: 3px solid #ffc000;
  //   // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  // }
  .el-menu-item, .el-submenu__title{
    height: 50px;
    line-height: 50px;
  }
}
</style>


