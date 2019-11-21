<!-- <h2>添加企业</h2> -->
<template>
  <div class="addFirm">
    <myBrea :my-nav="brea"></myBrea>
    <div class="addFrim-cont">
      <el-row :gutter="10" class="mt20">
        <el-col :span="3">
          <span class="my-span-notice">*</span>真实姓名：
        </el-col>
        <el-col :span="10">
          <el-input 
          v-model="addContUserData.realname"  
          clearable 
          maxlength="10"
          show-word-limit
          placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mt20">
        <el-col :span="3">
          <span class="my-span-notice">*</span>用户标签：
        </el-col>
        <el-col :span="10">
          <el-input 
          v-model="addContUserData.cert" 
          maxlength="10"
          show-word-limit
          clearable placeholder="请输入内容"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mt20">
        <el-col :span="3">
          <span class="my-span-notice">*</span>身份证号：
        </el-col>
        <el-col :span="10">
          <el-input  
          v-model="addContUserData.idcard" 
          clearable 
          maxlength="18"
          show-word-limit
          placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mt20">
        <el-col :span="3">
          <span class="my-span-notice">*</span>登录账号：
        </el-col>
        <el-col :span="10">
          <el-input 
          type="number" 
          v-model="addContUserData.username" 
          maxlength="11"
          show-word-limit
          clearable 
          placeholder="请输入内容"></el-input>
          <p style="font-size:12px;color:#999">注：登录账号为手机号</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="10">
          <el-button v-if='!contId' style="margin-top:40px;width:200px" type="primary" @click="contUserAddBtn">生成内容用户</el-button>
        </el-col>
      </el-row>
    </div>
    <div v-if='contId' class='isView'></div>
  </div>
</template>
<script>
import myBrea from "../../../components/breadcrumb.vue";
import proUpload from "../../../components/proUpload.vue";
import myPackage from "../../../components/package.vue";
import { myConfirm } from "../../../comm/until";
export default {
  components: {
    myBrea,
    proUpload,
    myPackage
  },
  data() {
    return {
      value: "",
      brea: [{ txt: "用户中心", url: "/" }, { txt: "添加内容用户", url: "/" }],
      addContUserData:{
          cert:"",
          realname:"",
          idcard:"",
          username:""
      },
      contId:""
    };
  },
  methods: {
    async addContUser(postData) {
      await this.$store.dispatch(
        "AllUserModule/POST_CONTUSER_ADD",
        postData
      );
      let data = this.$store.state.AllUserModule.POST_CONTUSER_ADD;
      this.$message.success("添加成功")
      this.$router.push({
          path:"/contUser"
      })
    },
    async contUserDet(postData) {
      await this.$store.dispatch(
        "AllUserModule/POST_GENUSER_DET",
        postData
      );
      let data = this.$store.state.AllUserModule.POST_GENUSER_DET;
      this.addContUserData = data.out
    },
    contUserAddBtn(){
        if(!this.addContUserData.realname){
            this.$message.warning("请输入真实姓名");
            return
        }
        if(!this.addContUserData.cert){
            this.$message.warning("请输入标签");
            return
        }
        if(!this.addContUserData.idcard){
            this.$message.warning("请输入身份证号");
            return
        }
        if(!this.addContUserData.username){
            this.$message.warning("请输入登录账号");
            return
        }
        this.addContUser(this.addContUserData)
    }
  },
  created() {
      this.contId=this.$route.query.contUserId;
      if(this.contId){
          this.contUserDet({user_id:this.contId})
          this.brea[1].txt='内容用户详情'
      }
  }
};
</script>
<style lang="scss">
.addFirm {
  .addFrim-cont {
    @extend %pagecont;
    .el-upload {
      width: 100%;
      .proUpload-span {
        width: 100%;
      }
    }
  }
  .isView{
      position:absolute;
      width: 100%;
      height: 100%;
      top:0px
  }
}
</style>