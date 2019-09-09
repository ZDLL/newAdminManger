<template>
    <div>
        <el-menu :router="true">
          <el-submenu v-for='(itm,inx) in allMenu' :key='inx' :index ='itm.menuUrl' >
            <template slot="title">
              <i :class='itm.menuIcon'></i>
              <span :menuId='itm.menuId'>{{itm.menuName}}</span>
            </template>
            <el-menu-item-group  v-for='(ittm,innx) in itm.children' :key='innx'>
             
              <el-menu-item v-if='ittm.children.length ==0' :index='ittm.menuUrl' :menuId='ittm.menuId'>
                      <i :class='ittm.menuIcon'></i>
                      {{ittm.menuName}}
              </el-menu-item>

              <el-submenu v-else  v-for='(ixm,icdx) in ittm.children' :key='icdx' :index='ixm.menuUrl' :menuId='ittm.menuId'>
                <template slot="title">
                   <i :class='ixm.menuIcon'></i>
                  {{ittm.menuName}}
                </template>
                <el-menu-item :menuId='ixm.menuId' v-if='ittm.children.length>0' :index='ixm.menuUrl'>
                    <i :class='ixm.menuIcon'></i>
                      {{ixm.menuName}}
                </el-menu-item>
              </el-submenu>

            </el-menu-item-group>
          </el-submenu>

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


