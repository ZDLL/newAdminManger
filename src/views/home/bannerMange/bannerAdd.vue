<template>
  <div class="addbanner">
    <myPlace :place-text='t'></myPlace>
    <div class="addbanner-cont">
      <div class="addBanner-warp">
        <span class="avatar-uploader" @click="uploadClick">
          <i class="el-icon-plus avatar-uploader-icon"></i>
          <img v-if="postData.picture_url" :key='postData.picture_url' :src="postData.picture_url" alt="广告" />
        </span>
          <p style="margin-top:8px;color: rgb(153, 153, 153); font-size: 12px;">注：请上传360*50小于1M的图片</p>
        <myPload @getFile="fileUrlFun"></myPload>

        <el-row class="mt20 add-banner-inp">
          <el-col class="add-banner-left" :span="3"><span class='my-span-notice'>*</span>显示或隐藏：</el-col>
          <el-col :span="10">
            <el-radio v-model="postData.display" label="1">显示</el-radio>
            <el-radio v-model="postData.display" label="2">隐藏</el-radio>
          </el-col>
        </el-row>
        <el-row class="mt20 add-banner-inp">
          <el-col class="add-banner-left" :span="3"><span class='my-span-notice'>*</span>选择类型：</el-col>
          <el-col :span="10">
            <el-select v-model="postData.type" placeholder="请选择">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row class="mt20 add-banner-inp">
          <el-col class="add-banner-left" :span="3"><span class='my-span-notice'>*</span>广告名称：</el-col>
          <el-col :span="10">
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="postData.name"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-col>
        </el-row>

        <el-row class="mt20 add-banner-inp">
          <el-col class="add-banner-left" :span="3"><span class='my-span-notice'>*</span>跳转方式：</el-col>
          <el-col :span="10">
            <el-radio v-model="postData.mode" label="1">链接</el-radio>
            <el-radio v-model="postData.mode" label="2">app内部</el-radio>
          </el-col>
        </el-row>
        <el-row v-show="postData.mode==1" class="mt20 add-banner-inp">
          <el-col class="add-banner-left" :span="3"><span class='my-span-notice'>*</span>链接网址：</el-col>
          <el-col :span="10">
            <el-input type="text" placeholder="请输入内容" v-model="postData.redirect_url" clearable></el-input>
          </el-col>
        </el-row>

        <el-row v-show="postData.mode==2" class="mt20 add-banner-inp">
          <el-col class="add-banner-left" :span="3">选择分类：</el-col>
          <el-col :span="10">
            <el-select v-model="postData.page" placeholder="请选择">
              <el-option
                v-for="item in pageOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row v-show="postData.mode==2" class="mt20 add-banner-inp">
          <el-col class="add-banner-left" :span="3">文章ID：</el-col>
          <el-col :span="10">
            <el-input type="text" placeholder="请输入内容" v-model="postData.page_detail" clearable></el-input>
          </el-col>
        </el-row>

        <el-button class="mt20 addbannerBtn" type="primary" @click="addBannerOkClick">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import myPload from "../../../components/upload";
import myPlace from "../../../components/place.vue";
import { bannerTypeConfig } from "../../../config/objConfig.js";
export default {
  name: "banneradd",
  data() {
    return {
      bannerTxt: "",
      t:"广告位管理",
      options: bannerTypeConfig,
      pageOptions: [
        {
          id: "2",
          name: "动态"
        },
        {
          id: "3",
          name: "专栏"
        }
      ],
      bannerId: "",
      postData: {
        name: "",
        picture: "",
        picture_url:"",
        display: "",
        type: "",
        mode: "1",
        redirect_url: "",
        page: "",
        page_detail: ""
      }
    };
  },
  components: {
    myPload,
    myPlace
  },
  methods: {
    async getBannerDetail(objData) {
      await this.$store.dispatch("bannerModule/getBannerDetaildAct", objData);
      let data = this.$store.state.bannerModule.bannerDetailData;
      this.postData = data.info;
      this.postData.mode = "1";
      // this.postData.picture = data.info.picture_url || "";
    },
    async editorBanner(objData) {
      await this.$store.dispatch("bannerModule/setEditorBannerAct", objData);
      let data = this.$store.state.bannerModule.bannerEditData;
      this.$message.success("编辑广告位成功");
      this.$router.push({
        path: "/banner"
      });
    },
    async setAddBanner(objData) {
      await this.$store.dispatch("bannerModule/setAddBannerAct", objData);
      let data = this.$store.state.bannerModule.addBannerData;
      this.$message.success("添加广告位成功");
      this.$router.push({
        path: "/banner"
      });
    },
    addBannerOkClick() {
      if (
        !this.postData.name ||
        !this.postData.picture_url ||
        !this.postData.display ||
        !this.postData.type || 
        !this.postData.mode
      ) {
        this.$message.warning("请查看是否有必填项未填写")
        return;
      }
      this.postData.picture = this.postData.picture_url;
      if (this.postData.mode == 1) {
        this.postData.page = "";
        this.postData.page_detail = "";
      } else if (this.postData.mode == 2) {
        this.postData.redirect_url = "";
      }
      if (this.bannerId) {
        this.postData.id = this.bannerId;
        this.editorBanner(this.postData);
      } else {
        this.setAddBanner(this.postData);
      }
    },
    uploadClick() {
      document.querySelector("#uploader").click();
    },
    fileUrlFun(url) {
      this.postData.picture_url = url;
    }
  },
  created() {
    this.bannerId = this.$route.query.id || "";
    if (this.bannerId) {
      this.getBannerDetail({ id: this.bannerId });
    }
  },
  watch:{

  },
  filters: {
    bannerType(val) {
      if (!val) {
        return;
      }
      switch (parseInt(val)) {
        case 1:
          return "";
        case 2:
          return "动态";
        case 3:
          return "专题";
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/style/avatar-uploader.scss";
.addbanner-cont {
  // padding: 20px;
  // border-radius: 8px;
  // overflow: hidden;
  // background-color: #fff;
  @extend %extreme;
  .avatar-uploader {
    width: 320px;
  }
  .mt20 {
    margin-top: 30px;
  }
  .addbannerBtn {
    margin-left: 13%;
    width: 120px;
  }
  // .addBanner-warp {
  //   max-width: 1000px;
  //   margin-left: 30px;
  //   // min-height: px;
  //   // margin: 0 auto;
  // }
}
</style>

