<template>
  <div class="arcticle-page">
   <myBrea :my-nav='brea'></myBrea>
    <div class="article-cont">

       <div v-if='postData.publish_type == 1' style="margin-bottom:20px">

            <editor id="tinymce" v-model="postData.content" :init="init"></editor>
             <p style="color:#666; font-size: 12px;margin-top: 8px;">注：如设置富文本中的图片宽度最好设置为340，若不设置，则最大宽度为100%，上传图片小于1M</p>
        </div>

       <!-- <div v-if="hasQuill" style="margin-bottom:20px">
        <my-quillEditor v-if="quillCont" :parentEditorCont="quillCont" @quillEditorFun="getcont" @quillEditorScrollTop='getEditorScrollTop'></my-quillEditor>
      </div>
      <div v-else style="margin-bottom:20px">
        <my-quillEditor :parentEditorCont='""' @quillEditorFun="getcont" @quillEditorScrollTop='getEditorScrollTop'></my-quillEditor>
      </div> -->
      <div class="avatar">
        <span class='my-span-notice'>*</span>上传封面:
        <proUpload :key="postData.picture" :imgUrl="postData.picture" @getUrl="getImgUrl"></proUpload>

        <!-- <span class="avatar-uploader left10" @click="avatarUpload">
          <i class="el-icon-plus avatar-uploader-icon"></i>
          <img v-if="postData.picture" :src="postData.picture" alt="头像" />
          <el-image v-if="imageUrl" :src="imageUrl" lazy></el-image>
        </span> -->

        <p style="color: rgb(153, 153, 153); font-size: 12px;margin-left: 82px;margin-top: 8px">注：封面请上传375*257小于1M的图片</p>
      </div>
       <div v-if='postData.publish_type == 2' class="avatar mgt20 video">
        <span class='my-span-notice'>*</span>上传视频:
          <proUploadVideo :key="postData.video_url" :imgUrl="postData.video_url" @getUrl="getVideoUrl"></proUploadVideo>

        <!-- <span style="height:180px;width:300px" class="avatar-uploader left10" @click="videoUpload">
          <i style='line-height: 170px;' class="el-icon-plus avatar-uploader-icon"></i>
          <video class='myVideo' v-if='postData.video_url' controls="controls">
            <source :src='postData.video_url' type="video/mp4" />
          </video>
        </span> -->
        <p style="color: rgb(153, 153, 153); font-size: 12px;margin-left: 82px;margin-top: 8px">注：请上传小于200M的视频</p>
      </div>
      <!-- <my-upload :up-type='uploadType' @getFile="fileUrlFun"></my-upload> -->
      <div class="mgt20">
        <span class='my-span-notice'>*</span>标题:
        <el-input class="with40 left10" v-model="postData.title" show-word-limit maxlength="30" placeholder="请输入标题"></el-input>
      </div>
      <div class="mgt20">
        <span class='my-span-notice'>*</span>作者:
        <el-select class="left10" v-model="postData.author" placeholder="请选择">
          <el-option v-for="item in authorOptions" :key="item.id" :label="item.nickname" :value="item.user_id"></el-option>
        </el-select>
        <!-- <el-input class="with40 left10" v-model="postData.author" placeholder="请输入作者ID"></el-input> -->
      </div>
      <div class="mgt20">
       <span class='my-span-notice'>*</span> 所属专栏:
        <el-select class="left10" v-model="postData.category" placeholder="请选择">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <!-- <div class='mgt20'>
          文章类型:
        <el-select class='left10' v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </div>-->
      <!-- <div class="mgt20">
        是否投放到每日精选:
        <span class="left10">
          <el-radio v-model="postData.is_select" label="1">是</el-radio>
          <el-radio v-model="postData.is_select" label="2">否</el-radio>
        </span>
      </div> -->
      <!-- <div style="margin-top:30px">
         <el-button-group>
            <el-button type="primary" plain>文字</el-button>
            <el-button type="primary" plain>图片</el-button>
            <el-button type="primary" plain>视频</el-button>
        </el-button-group>
      </div>-->

      <el-button class='mybtnstyle' @click="articleSure" type="primary">确认发布</el-button>
      <el-button class='mybtnstyle' @click="draftClick" plain type="primary">保存</el-button>

      <el-button class='mybtnstyle' @click='previewClick'>预览文章</el-button>


    </div>
    <!-- <myCropper></myCropper> -->
    <!-- 预览弹层 -->
    <div class='preview' v-show='preview'>

      <div class ='preview-warp'>
         <div class='close' @click="closeClick">
          <i class='el-icon-circle-close'></i>
        </div>
        <div class='preview-cont' :class='{"preview-cont-video":postData.publish_type == 2}'>
          <div class='preview-cont-warp'  v-if='postData.publish_type == 1'>
            <div class='preview-top-img'>
              <img :src='postData.picture' />
              <div class='preview-type'>
                {{categoryName}}
              </div>
            </div>
            <div class='preview-mind-cont'>
              <div class='title'>
                {{postData.title}}
              </div>
              <div class='preview-author'>
                <span class='author-span'>头像</span>
                <span>用户名</span>
                <br>
                <span>用户标签</span>
                <span class='guanzhu'> + 关注</span>

              </div>
              <div class='xian'></div>
              <div  class='text' v-html='postData.content'>
              </div>
            </div>
          </div>
          <div class='preview-cont-warp' v-if='postData.publish_type == 2'>
              <div class='preview-mind-cont'>
                <div class='preview-author' style="line-height: 1.8;">
                  <span class='author-span'>头像</span>
                  <span>用户名</span>
                  <br>
                  <span>用户标签</span>
                  <!-- <span class='guanzhu'> + 关注</span> -->

                </div>
              </div>
              <div class='preview_video' style="margin-top:20px;">
                <video  class='myVideo' v-if='postData.video_url' controls="controls">
                  <source :src='postData.video_url' type="video/mp4" />
                </video>
              </div>
              <div class='preview-mind-cont'>
                 <div class='title'>
                  {{postData.title}}
                </div>
                <span class='videoCate'>#{{categoryName}}#</span>
                 
              </div>
             
           </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import place from "../../../../components/place.vue";
import myBrea from "../../../../components/breadcrumb.vue"
// import upload from "../../../../components/upload.vue";
import proUpload from '../../../../components/proUpload';
import proUploadVideo from '../../../../components/proVideoUpload'
// import quillEditor from "../../../components/quillEditor.vue";
// import myCropper from '../../../../components/myCropper.vue'
import {tinymceInitFig} from '../../../../comm/tinymceInit.js'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
export default {
  name: "addarticle",
  data() {
   let _this = this
    return {
      brea:[{"txt":"社交中心","url":"/"},{"txt":"添加文章","url":"/"}],
      quillCont: "",
      id: "",
      hasQuill: false,
      options: [],
      authorOptions:[],
      cont:"",
      uploadType:"1",//1 图片 2 视频
      // actType:"",
      postData: {
        author: "",
        category: "",
        title: "",
        picture: "",
        video_url:"",
        video_width:"",
        video_height:"",
        video_duration:"",
        publish_type:"",//1图文2视频
        // content_picture:"",
        content: "",
        // is_select: "2"
      },
      preview:false,
      pos:0,
      categoryName:'',
      is_draft:false,
      draft_id:"",
      top:'',
      init:tinymceInitFig,
    };
  },
  components: {
    myBrea,
    // "my-upload": upload,
    proUpload,
    proUploadVideo,
    Editor,
    // myCropper
  },
  computed: {},
  methods: {
    async cloumListFunc() {
      await this.$store.dispatch("colunModule/getCategoryListAct", {});
      let data = this.$store.state.colunModule.categoryList;
      if (data.status == 200) {
        this.options = data.info.result;
      }
    },
    async addArticle() {
      await this.$store.dispatch("articleModule/arcticleAddAct", this.postData);
      let data = this.$store.state.articleModule.arcticleAdd;
      if (data.status == 200) {
        this.$message.success("添加成功");
        this.$router.push({
          path: "/article"
        });
      }
    },
    async editorArticle() {
      if(this.is_draft){
        this.postData.draft_id= this.draft_id;
        this.postData.id= this.id;
      }else{
          this.postData.id= this.id;
      }
      await this.$store.dispatch(
        "articleModule/editArcticleAct",
        this.postData
      );
      let data = this.$store.state.articleModule.arcticleEditor;
      if(data.status == 200){
        this.$message.success("修改,发布成功返回到列表页面")
        setTimeout(()=>{
           this.$router.push({
            path:"/article"
          })
        },1000)
      }else {
        this.$message.error(data.msg)
      }
      // this.postData = data.info;
    },
    async detaclieArticle() {
      await this.$store.dispatch("articleModule/detaileArcticleAct", {
        id: this.id
      });
      let data = this.$store.state.articleModule.arcticleDetaile;
      this.quillCont = data.info.content;
      this.postData = {
        author: data.info.user_id,
        category: data.info.category,
        title: data.info.title,
        picture: data.info.picture,
        content: data.info.content,
        is_select: data.info.is_select,
        publish_type:data.info.publish_type,
        video_url:data.info.video_url
      };
    },
    async draftDetaile(){
      await this.$store.dispatch("draftModule/getRafDetailfAct",  {draft_id: this.draft_id});
      let data = this.$store.state.draftModule.getRafDetailData;
       this.quillCont = data.info.content;
        this.postData = {
          author: data.info.author,
          category: data.info.category,
          title: data.info.title,
          picture: data.info.picture,
          content: data.info.content,
          is_select: data.info.is_select,
          publish_type:data.info.publish_type,
          video_url:data.info.video_url
        };
    },
    async addDraft(draftData){
      await this.$store.dispatch("draftModule/addRafAct",draftData);
      let data = this.$store.state.draftModule.addRaftData;
      this.$message.success("添加草稿成功，请到草稿管理中查看")
    },
    async getSystemUserList(){
      await this.$store.dispatch("articleModule/getSystemUserAct",{})
      let data = this.$store.state.articleModule.getSystemUser;
      this.authorOptions =  data.info;
    },
    getImgUrl(url){
      this.postData.picture = url;  
    },
    getVideoUrl(backData){
      this.postData.video_url = backData.url;
      this.postData.video_width=backData.width
      this.postData. video_height=backData.height
      this.postData. video_duration=backData.duration
    },
    // avatarUpload() {
    //   this.uploadType ='1'
    //   document.querySelector("#uploader").click();
    // },
    // videoUpload(){
    //   this.uploadType ='2'
    //   document.querySelector("#uploader").click();
    // },
    // fileUrlFun(url) {
    //   if(this.uploadType ==1 ){
    //     this.postData.picture = url;
    //   }else if(this.uploadType ==2){
    //     this.postData.video_url = url;
    //   }
    // },
    //videoUrlFun(url){
    //   console.log(url)
    //   this.postData.videoUrl = url

    // },
    // getcont(cont) {
    //   this.cont = cont
    //   this.postData.content = cont;
    // },
    articleSure() {
      if(this.postData.publish_type==1 && !this.postData.content){
        this.$message.warning("请填写文章内容");
        return;
      }
      if(this.postData.publish_type==2 && !this.postData.video_url){
        this.$message.warning("请上传视频");
        return;
      }
      if(!this.postData.picture){
        this.$message.warning("请上传封面");
        return;
      }
       if(!this.postData.title){
        this.$message.warning("请填写文章标题");
        return;
      }
      if(!this.postData.author){
        this.$message.warning("请填选择作者");
        return;
      }
       if(!this.postData.category){
        this.$message.warning("请选择专栏");
        return;
      }

      if (this.id) {
        this.editorArticle();
      } else {
        if (!this.postData.picture) {
          this.$message.error("请上传封面");
        }
        this.addArticle();
      }
    },
    previewClick(){
      this.preview = true;
      for(let i=0;i<this.options.length;i++){
        if(this.options[i].id == this.postData.category){
          this.categoryName = this.options[i].name
          return
        }
      }
    },
    closeClick(){
      this.preview = false;
    },
    handleScroll(){
      let scrollObj = document.getElementById("searchBar"); // 滚动区域
      let scrollTop = scrollObj.scrollTop; // div 到头部的距离
      let dom = document.getElementsByClassName("tox-toolbar")[0];
      // let editorDom = document.getElementsByClassName("ql-editor")[0]
      if(!dom){
        return;
      }
      if(scrollTop>50){
          dom.classList.add("toolbar-fixed-top0");
          // editorDom.classList.add("editorPaddind")
      }
      if(scrollTop==0){
         dom.classList.remove("toolbar-fixed-top0");
        // editorDom.classList.remove("editorPaddind")
      }
    },
    draftClick(){
      if(this.$route.query.editor || this.$route.query.drift){
        this.postData.subject_id = this.id;
        this.postData.draft_id= this.draft_id
      }
      this.addDraft(this.postData)
    },
    getEditorScrollTop(top){
      this.top = top
      let scrollObj = document.getElementById("searchBar"); // 滚动区域
      let scrollTop = scrollObj.scrollTop; // div 到头部
       scrollObj.scrollTop= top;
    }
  },
  created() {
    this.cloumListFunc();
    this.id = this.$route.query.id;
    let draft = this.$route.query.drift;
    this.draft_id = this.$route.query.draft_id;
    let editor= this.$route.query.editor;
    this.postData.publish_type = this.$route.query.addType;
      if(draft){
        this.is_draft = true;
        this.draftDetaile();
        this.hasQuill = true;
        this.tit='编辑草稿'
      }
      if(editor){
         this.is_draft = false;
        this.detaclieArticle();
        this.hasQuill = true;
        this.tit='编辑文章'
      }
    this.getSystemUserList();

  },
  mounted() {
    // tinymce.init({})
    // window.addEventListener('scroll', this.handleScroll,true)
  },
  destroyed () {//离开该页面需要移除这个监听的事件
    // window.removeEventListener('scroll', this.handleScroll)
  },
  fliters: {}
};
</script>
<style lang="scss">
@import "@/style/avatar-uploader.scss";
.arcticle-page {
  .with40 {
    width: 40%;
  }
  .mgt20 {
    margin-top: 30px;
  }
  .left10 {
    left: 10px;
  }
  .article-cont {
    // padding: 20px;
    // border-radius: 8px;
    // background-color: #fff;
    // overflow: hidden;
     @extend %extreme;
    .mybtnstyle{
      width:120px;
      margin-top:30px;
      margin-right: 20px;
    }
    .avatar {
      .avatar-uploader {
      }
      .myVideo{
        position: absolute;
        top:0px;
        left: 0px;
        width: 100%;
        height: 100%;
      }
    }
    .video{
      .proUpload-span{
        width: 400px;
      }
    }
    .avatar-uploader {
      width: 300px;
    }
    .ql-editor{
      em{
        font-style: italic;
      }
      strong{
        font-weight: bold
      }
    }
    .ql-snow .ql-editor img{
      max-width: 400px;
      display: block;
      margin: 4px auto;
    }
    .tox-toolbar{
      background-color: #fff;
    }
    .toolbar-fixed-top0{
        position: fixed;
        left: 240px;
        top:22px;
         z-index: 99;
        border-top: 1px #ccc solid;
        width: calc(100% - 297px);
        border-left: 1px #ccc solid;
        border-right: 1px #ccc solid;
    }
  }
  .preview{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 2003;
    background: rgba(0,0,0,.5);
    .preview_video{
      width: 100%;
      position: relative;
      height: 300px;
      .myVideo{
         position: absolute;
          top:0px;
          left: 0px;
          width: 100%;
          height: 100%;
      }
    }
    .preview-warp{
      width: 366px;
      height: 668px;
      // background-color: #ffff;
      margin: 50px auto;
      background-image: url('../../../../assets/piverBack.png');
      background-size: 100% 100%;
      padding: 45px 24px 26px 24px;
      box-sizing: border-box;
      position: relative;
       .close{
          position:absolute;
          width: 40px;
          height: 40px;
          font-size: 28px;
          color: #fff;
          z-index: 2;
          top: -14px;
          right: -15px;
        }
      .preview-cont{
        position: relative;
        // border:1px red solid;
        width: 100%;
        height: 100%;
        border-bottom-right-radius: 24px;
        border-bottom-left-radius: 24px;
        // padding-bottom: 30px;
        overflow-x: hidden;
        overflow-y: auto;

        .preview-top-img{
          height: 250px;
          width: 100%;
          position: relative;
          img{
            width: 100%;
            height: 100%;
            // border:1px red solid;
          }
          .preview-type{
            position: absolute;
            width:110px;
            height:24px;
            background:rgba(255,204,0,1);
            opacity:0.5;
            text-align: center;
            color: #FFFFFF;
            font-size: 12px;
            bottom: 16px;
            line-height: 24px;
            left: 15px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .preview-author{
          height: 40px;
          font-size: 12px;
          margin-bottom: 15px;
          margin-top: 15px;
          .author-span{
            display: inline-block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            overflow: hidden;
            border:1px #dcdcdc solid;
            float: left;
            margin-right: 8px;
          }
          .guanzhu{
            float: right;
            // width: 44px;
            height: 22px;
            padding: 0 5px;
            background-color: #FFCC00;
            color: #1D1E2C;
            line-height: 22px;
            position: relative;
            bottom: 10px;
          }
        }
        .xian{
          width:128px;
          height:1px;
          background-color: #dcdcdc;
          position: relative;
          left: 90px;
           margin-top: 30px;
          margin-bottom: 30px;
        }
        .preview-mind-cont{
          padding:0 10px;
          .title{
            padding-top: 18px;
            line-height: 1.8;
            min-height: 28px;
            color: #1D1E2C;
            font-weight: 600;
          }
          .text{
            margin-top: 30px;
            font-size: 14px;
            color:rgba(29,30,44,1);
            // line-height: 1.8;
            letter-spacing: 1px;
            margin-bottom: 30px;
            padding: 0px;
            // text-align: center;
            p{
              margin: 10px 0;
              line-height: 1.6;
            }
            h1,h2,h3,h4,h5,h6{
               margin: 12px 0;
                line-height: 1.6;
            }
            img{
              max-width: 100%;
              height: auto;
              // height: 200px;
              margin-top: 3px;
              margin-bottom: 3px;
              text-align: center;
            }
          }
        }
      }
      .preview-cont-video{
        background-color: rgba(0,0,0,.5);
         color: #fff;
         .videoCate{
           background-color: #fff;
           padding: 3px 8px;
           color: #333;
           font-size: 14px;
           margin-top: 20px;
           display: inline-block;
           vertical-align: top;
         }
         .preview-mind-cont .title{
           color: #fff;
           font-weight: 500;
         }
      }
      .preview-cont::-webkit-scrollbar {
          display: none;
      }
    }
  }

}
</style>
