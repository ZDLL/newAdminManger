<template>
  <div class="appUser-page">
    <myBrea :my-nav="brea"></myBrea>
    <div class="appUser-cont">
      <span class="userPhoto">
        <img v-if='userAppInfo.head_portrait' :src='userAppInfo.head_portrait' alt="用户头像" />
      </span>
      <div class="userInfo">
        <h2>
          {{userAppInfo.nickname}}
          <span class="isOk">{{userAppInfo.status | codeStatus}}</span>
        </h2>
        <ul class="userInfo-ul">
          <li>用户ID：{{userAppInfo.user_id}}</li>
          <li v-if='userAppInfo.type=="03000003"'>真实姓名：{{userAppInfo.realname}}</li>
          <li v-if='userAppInfo.type=="03000003"'>身份证号：{{userAppInfo.idcard}}</li>
          <li>注册时间：{{userAppInfo.register_time}}</li>
          <li>手机号：{{userAppInfo.username}}</li>
          <li>所在地：{{userAppInfo.area || '--'}}</li>
          <li>用户标签：{{userAppInfo.cert || '--'}}</li>
        </ul>
      </div>
      <div class="dynamic">
        <div class="dyaTxt">动态数</div>
        <div class="dyas">
          {{userAppInfo.publish_num}}
          <span style="font-size:16px">条</span>
        </div>
      </div>
      <div v-if='userAppInfo.type=="03000003"' class="dynamic">
        <div class="dyaTxt">文章数</div>
        <div class="dyas">
          {{userAppInfo.subject_num}}
          <span style="font-size:16px">条</span>
        </div>
      </div>
      <div v-if='userAppInfo.type=="03000003"' class="dynamic">
        <div class="dyaTxt">视频数</div>
        <div class="dyas">
          {{userAppInfo.video_num}}
          <span style="font-size:16px">条</span>
        </div>
      </div>

      <el-button class="fr mt20" type="primary" @click="appUserChangeBtn">{{userAppInfo.status | statusBtnTxt}}</el-button>
    </div>
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
  computed: {},
  data() {
    return {
      brea: [{ txt: "用户中心", url: "/" }, { txt: "用户详情", url: "/" }],
      userAppInfo:{},
      user_id:""
    };
  },
  methods: {
    async getAppUserDet() {
      await this.$store.dispatch(
        "AllUserModule/POST_GENUSER_DET",
        {user_id:this.user_id}
      );
      let data = this.$store.state.AllUserModule.POST_GENUSER_DET;
      this.userAppInfo = data.out;
    },
    async appUserChange(postData) {
      await this.$store.dispatch(
        "AllUserModule/POST_GENUSER_CHNAGE_STATUS",
        postData
      );
      let data = this.$store.state.AllUserModule.POST_GENUSER_CHNAGE_STATUS;
      this.$message.success("操作成功")
      this.getAppUserDet();
    },
    appUserChangeBtn(){
        let _this = this;
        myConfirm(_this,`是否进行${_this.userAppInfo.status=='00001001'?"禁用":"启用"}操作?`,function(){
            _this.appUserChange({
                user_id:_this.user_id,
                status:_this.userAppInfo.status=='00001001'?"00001002":"00001001"
            })
        })
    }
  },
  created() {
      this.user_id = this.$route.query.user_id;
      this.getAppUserDet()
  }
};
</script>
<style lang="scss">
.appUser-page {
  .appUser-cont {
    @extend %pagecont;
    overflow: hidden;
    .userPhoto,
    .userInfo,
    .dynamic {
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
    }
    .userPhoto {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .userInfo {
      width: 330px;
      .isOk {
        padding: 2px 10px;
        background-color: #5377fd;
        color: #fff;
        font-size: 12px;
        position: relative;
        top: -1px;
        left: 5px;
      }
      h2 {
        font-weight: 500;
        font-size: 20px;
        color: #333;
        margin-bottom: 15px;
      }
      .userInfo-ul {
        padding: 0px;
        margin: 0px;
        font-size: 14px;
        color: #9b9b9b;
        li {
          margin-bottom: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .dynamic {
      width: 150px;
      text-align: center;
      .dyaTxt {
        position: relative;
        font-size: 16px;
        color: #9b9b9b;
        width: 100%;

        margin-bottom: 20px;
        margin-top: 10px;
        height: 32px;
        line-height: 32px;
        // &::after {
        //   content: "";
        //   position: absolute;
        //   width: 32px;
        //   height: 32px;
        //   border-radius: 50%;
        //   overflow: hidden;
        //   background-color: #d8d8d8;
        //   left: 36px;
        // }
      }
      .dyas {
        color: #333;
        font-size: 40px;
        font-weight: 600;
      }
    }
  }
}
</style>