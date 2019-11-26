<template>
  <div class="dynamicDetails-page">
    <myBrea :my-nav='brea'></myBrea>

    <!-- <my-place :place-text='"动态详情"'></my-place> -->
    <div class="dynaCont">
      <div v-if='detail.info' class="dynaCont-top">
        <el-row>
          <el-col :span="8">
            <div>
              <span class="dynaPhoto">
                <img v-if='detail.info.head_portrait' :src ='detail.info.head_portrait' alt="头像" />
              </span>
              <div class="dynaContP">
                <span>用户名：{{detail.info.nickname||"--"}}</span>
                <!-- <el-tag size="small">标签一</el-tag> -->
                <p>
                  是否推荐：
                  <span class="color33"> {{detail.info.is_recommend | fileterYesOrNo}}</span>
                </p>
              </div>
            
            </div>
          </el-col>
          <el-col :span="6" class="dynaText">
            <p>
              类型：
              <span class="color33">{{detail.info.publish_type | fileType}}</span>
            </p>
            <p>
              状态：
              <span class="color33">{{detail.info.status | fileStatus}}</span>
            </p>
          </el-col>
          <el-col :span="8" class="dynaText">
            <div>
              <p>
                所属话题：
                <span class="color33">{{detail.info.topic}}</span>
              </p>
              <p>
                发布时间：
                <span class="color33">{{detail.info.create_time}}</span>
              </p>
            </div>
          </el-col>
          <el-col :span="2">
            <div style="text-align: center;margin-top: 10px;">
              <!-- <el-button type="primary" size="small" plain @click="recommendBtn">{{recOrNo}}</el-button> -->
              <el-button style="margin-left:0px;margin-top:10px;" plain size="small" @click="deleteBtn">删除动态</el-button>
              <el-button style="margin-left:0px;margin-top:10px;" plain size="small" @click="goBackList">返回列表</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div class="dynDescribe dynaText">
            动态描述：
            <span class="color33">{{detail.info.content}}</span>
          </div>
        </el-row>
      </div>
    </div>

    <div class="imgGather" v-if='detail.info && detail.info.publish_type==1'>
      <el-divider content-position="left">图片集</el-divider>
      <div v-if='detail.info' class="imgLists">
        <viewer>
          <ul>
            <li class="imgList-li" v-for="(itm,index) in detail.info.picture" :key="index">
              <span class="viewerImg">
                <img style="object-fit: contain;" :src="itm.url" />
                <!-- <el-image
                  :src="itm.url"
                  fit="contain">
                </el-image> -->
              </span>
              <div class='viewerRight'>
                <span class="tag-span" v-for='(itmc,idx) in itm.label' :key='idx'>
                  <el-tag class='tag-span-tag' size="small">{{itmc.content}}</el-tag>
                </span>
              </div>
              
            </li>
          </ul>
        </viewer>
      </div>
    </div>
    <div class="imgGather" v-if='detail.info && detail.info.publish_type==2'>
      <el-divider content-position="left">视频</el-divider>
      <div v-if='detail.info'>
         <video width="300px" height="200px" class='myVideo' v-if='detail.info.video_url' controls="controls">
            <source :src='detail.info.video_url' type="video/mp4" />
          </video>
      </div>
    </div>
  </div>
</template>
<script>
// import place from "../../../../components/place.vue";
import { setTimeout } from 'timers';
import myBrea from "../../../../components/breadcrumb.vue"
import { myConfirm } from "../../../../comm/until";

export default {
  name: "dynamicdetails",
  data() {
    return {
      id:"",
      detail:{},
      page:1,
      brea:[{"txt":"社交中心","url":"/"},{"txt":"动态详情","url":"/"}],

    };
  },
  components: {
   myBrea
  },
  computed:{
    recOrNo(){
      return this.detail.info.is_recommend ==1?"取消推荐":"设置推荐"
    }
  },
  methods: {
    async getDetails(){
      await this.$store.dispatch("dynamicModule/getMomentsDetail",{id:this.id})
      let data = this.$store.state.dynamicModule.momentsDetail
      if(data.status != 200){
        this.$message.error(data.msg)
        return
      }
      this.detail = data
    },
    async recommend(){
      await this.$store.dispatch("dynamicModule/getRecommend",{id:this.id});
      let data = this.$store.state.dynamicModule.momentRecommend;
      if(data.status !=200){
        this.$message.error(data.msg);
        
        return
      }
       this.$message.success("操作成功");
       this.getDetails();
      // this.detail.info.is_recommend= data.info.is_recommend
      // this.$message.success("推荐至首页成功")
      // setTimeout(()=>{
      //   this.$router.push({
      //     path:"/dynamic"
      //   })
      // },1000)
    },
    async isDelMoment(){
      this.$store.dispatch("dynamicModule/delmoment",{id:this.id});
      let data = this.$store.state.dynamicModule.delmoment;
      if(Object.keys(data).length>1){
         this.$message.success("删除成功，一秒后到动态列表");
          setTimeout(()=>{
            this.$router.push({
              path:"/dynamic"
            })
          },1000)
      }
     
     
    },
    recommendBtn(){
       let _this = this;
        myConfirm(_this, `是否推荐该动态？`,function(val){
             _this.recommend()
        })
    },
    deleteBtn(){
      // this.isDelMoment()
       let _this = this;
        myConfirm(_this, `是否删除该动态？`,function(val){
             _this.isDelMoment()
        })
      // this.confirm("是否删除该动态？")
    },
    goBackList(){
       this.$router.push({
          path:"/dynamic",
          query:{
            page:this.page
          }
        })
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.page = this.$route.query.page;
    this.getDetails()
  },
  mounted() {
    //  this.$message.error('这是一条错误消息')
    //   this.$message.success("操作成功");
  },
  filters: {}
};
</script>
<style lang="scss">
.dynamicDetails-page {
  .color33 {
    color: #333;
  }
  .dynaCont {
    // padding: 20px;
    // border-radius: 8px;
    // overflow: hidden;
    // background-color: #fff;
    // margin-top: 30px;
    @extend %extreme;
    .dynaPhoto {
      display: inline-block;
      vertical-align: top;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px #eee solid;
      text-align: center;
      float: left;
      clear: both;
      margin-right: 15px;
      // line-height: 100px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .dynaContP {
      margin-top: 10px;
      line-height: 3;
      float: left;
      & > span {
        display: block;
        margin-bottom: 10px;
      }
    }
    .dynaText {
      margin-top: 10px;
      line-height: 3;
      color: #666;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .dynDescribe {
      margin-top: 30px;
      margin-left: 15px;
      line-height: 1.5;
    }
  }
  .imgGather {
     @extend %extreme;
    .imgLists {
      margin-top: 20px;
    }
    .imgList-li {
      display: inline-block;
      vertical-align: top;
      width: 320px;
      margin-right: 2%;
      box-sizing: border-box;
      padding: 15px;
      height: 200px;
      .el-tag {
        margin: 5px;
      }
    }
    .tag-span {
      display: inline-block;
     
      .tag-span-tag{
        max-width: 90px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .viewerRight{
      display: inline-block;
      width: 100px;
      margin-left: 5px;
    }
    .viewerImg {
      width: 180px;
      height: 180px;
      display: inline-block;
      vertical-align: top;
      border: 1px #F3F3F3 dashed;
      background: #f5f5f5;
      border-radius: 4px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

