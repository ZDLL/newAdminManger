<!-- <h2>商品组编辑</h2> -->

<template>
  <div class="gdsGroup-page">
    <myBrea :my-nav='brea'></myBrea>
    <div class="editor-group">
      <div class="skuInfo-list">
        <div class="editorGrup-left">
          <h3 class="editorGrup-title">唯一SKU</h3>
        </div>
        <div class="editorGrup-right">
          <div v-if="placeArr.length>0">
            <div class="onlySku" v-for='(im,inx) in placeArr' :key='inx'>
              <span class="place-txt"><span class="my-span-notice">*</span>{{im.skuTypeName}}</span>
              <ul class="place" v-show='im.skus.length>0' >
                <li
                  class="place-list"
                  v-for="(itm,index) in im.skus"
                  :class='{"place-active":itm.isChecked ==1}'
                  :isCheck='itm.isChecked'
                  :key="index"
                  @click="chosePlaceClick(inx,im,itm,index)"
                >
                  {{itm.skuInfoName}}
                  <!-- <span class='el-icon-check isPlaceCheck'></span> -->
                </li>
              </ul>
              <!-- <p v-else class="place">暂无产地！！</p> -->
            </div>
          </div>
           <my-nocont v-else :cont-txt='"暂无数据!!"'></my-nocont>
        </div>
      </div>
      <div class="skuInfo-list">
        <div class="editorGrup-left">
          <h3 class="editorGrup-title">其它</h3>
        </div>
        <div class="editorGrup-right">
          <div class="other" style="margin-top:0">
            <span class="place-txt"><span class="my-span-notice">*</span>商品图片</span>
            <div class="place">
                <!-- <el-upload
                class="upload-demo"
                action='#'
                multiple
                :auto-upload="false"
                :limit="6"
                :file-list="fileList"
                :before-upload='beforeUploadFunc'
                :before-remove="handleRemove"
                >
                <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>

              <span class="upImgList" v-show='fileList.length>0' v-for='(itm,inx) in fileList' :key='inx' >
                <img :src='itm.attachPath' alt='图片' />
              </span>
              <p>根据基本信息上传对应图片，最多上传6张，建议尺寸750*750并保持一致</p> -->
              <el-form>
              <el-form-item label="">
                <el-upload
                  ref="upload"
                  action="string"
                  accept="image/jpeg,image/png,image/jpg"
                  list-type="picture-card"
                  multiple
                  :limit="6"
                  :on-progress='uploadProgress'
                  :before-upload="onBeforeUploadImage"
                  :http-request="UploadImage"
                  :on-change="fileChange"
                  :file-list="fileList"
                  :on-remove='handleRemove'
                > 
                 <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
              </el-form>
              <my-notice :tip-txt='"根据基本信息上传图片，最多上传6张，建议尺寸750*750并保持一致"'></my-notice>
            </div>
          </div>
          <div class="other">
            <span class="place-txt">关键词</span>
            <div class="place">
              <el-input placeholder="请输入内容" v-model="savePostData.keyWords" clearable></el-input>
              <my-notice :tip-txt='"填写关键后便于用户搜索，用斜杠/隔开"'></my-notice>
              <!-- <p>填写关键后便于用户搜索，用斜杠/隔开，最多可添加4个关键词</p> -->
            </div>
          </div>
          <div class="other">
            <span class="place-txt">权重</span>
            <div class="place">
              <el-input placeholder="请输入内容" type="number" v-model="savePostData.weight" clearable></el-input>
              <my-notice :tip-txt='"数字越大越靠前"'></my-notice>
            </div>
          </div>
        </div>
      </div>
      <div class="skuInfo-list">
        <div class="editorGrup-left">
          <h3 class="editorGrup-title">图文详情</h3>
        </div>
        <div class="editorGrup-right">
          <editor id="tinymce" v-model="savePostData.goodsGroupIntroduce" :init="init"></editor>
          <!-- <editor id='tinymce' v-model="tinyCont" :init='init'></editor> -->
        </div>
      </div>
      <div class="skuInfo-list">
        <div class="editorGrup-left"></div>
        <div class="editorGrup-right">
          <el-button type="primary" style="width:200px;" @click="saveEditorClick">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { tinymceInitFig } from "../../../comm/tinymceInit.js";
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import myBrea from "../../../components/breadcrumb.vue"

export default {
  name: "editorgroup",
  data() {
    return {
      brea:[{"txt":"商品中心","url":"/goods"},{"txt":"商品组编辑","url":"/"}], 
      init: tinymceInitFig,
      placeArr: [],
      imgUrl:"",
      input: "",
    //   placeChoseArr: [],
      fileList:[],//图片列表
      skuObj:{},
      uploadData:{
        attachId:"",
        attachPath:""
      },
      savePostData:{
          goodsGroupNo:"",
          skus:"",//
          pics:"",//图片
          weight:"",//权重
          goodsGroupIntroduce:"",//图文详情
          keyWords:""//关键词
      }
    };
  },
  components: {
    Editor,
    myBrea
  },
  methods: {
    async getGroupEditorData(postData){
        await this.$store.dispatch('GdsGroupModule/POST_GDS_GRUOP_EDITOR',postData);
        let data = this.$store.state.GdsGroupModule.POST_GDS_GRUOP_EDITOR;
        this.savePostData = data.out;
        if(Object.keys(data.out).length<1){
          return;
        }
        this.placeArr = data.out.uniq;
        data.out.pics.map((itm,index)=>{
            itm.url=itm.attachPath
        })
        this.fileList = data.out.pics
    },
     async groupEditorSave(postData){
        await this.$store.dispatch('GdsGroupModule/POST_GDS_GROUP_EDITOR_SAVE',postData);
        let data = this.$store.state.GdsGroupModule.POST_GDS_GROUP_EDITOR_SAVE;
         this.getGroupEditorData({goodsGroupNo:this.groupNo})
         this.$message.success("操作成功")
    },
    async upImgFun(param){
            let fromData=new FormData();
            fromData.append("file",param.file)
            await this.$store.dispatch("ComUploadModule/COM_UPLOAD_IMG",fromData)
            let data = this.$store.state.ComUploadModule.COM_UPLOAD_IMG
            this.fileList.push({name: param.file.name, url: data.out.value,attachPath:data.out.value});
            param.onSuccess()
    },
    onBeforeUploadImage(file){
        const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
        const isLt1M = file.size / 1024 / 1024 < 1
        if (!isIMAGE) {
          this.$message.error('上传文件只能是图片格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传文件大小不能超过 1MB!')
        }
        return isIMAGE && isLt1M
    },
    UploadImage(param){
      this.upImgFun(param)
    },
    fileChange(file){
        // this.imgUrl = file.url
       this.$refs.upload.clearFiles() //清除文件对象
      //  console.log(file)
      //  this.fileList.push({name: file.name, url: file.url});
    },
    handleRemove(file,list){
        for(let i=0;i<this.fileList.length;i++ ){
            if(this.fileList[i].url == file.url){
                this.fileList.splice(i,1)
            }
        }
    },
    uploadProgress(event, file, fileList){
      console.log(file.percentage.toFixed(0))
    },
    chosePlaceClick(parinx,partData,li_itm, inx) {
        this.placeArr[parinx].skus[inx].isChecked =0;
         if (this.placeArr[parinx].skus.length > 0) {
             this.placeArr[parinx].skus.map((itm,index)=>{
                 itm.isChecked = 0;
             })
         }
        this.placeArr[parinx].skus[inx].isChecked = 1;
    },
    saveEditorClick(){
        let skuArr =[];
        // skuArr.push(this.skuObj)
        this.placeArr.map((itm,inx)=>{
            if(itm.skus.length>0){
                itm.skus.map((ittm,iixx)=>{
                    if(ittm.isChecked==1){
                       skuArr.push(ittm) 
                    }
                })
            }
        });
       if(skuArr.length<1){
         this.$message.warning("请选择的SKU");
         return
       }
        if(this.fileList.length<1){
         this.$message.warning("请上传图片");
         return
       }
       if(this.savePostData.weight<0){
          this.$message.warning("权重请输入1以上的数字");
          return
       }
        this.savePostData.skus =skuArr
        this.savePostData.goodsGroupNo = this.groupNo;
        this.savePostData.pics= this.fileList
        this.groupEditorSave({group:JSON.stringify(this.savePostData)})
    }
  },
  mounted() {
    tinymce.init({});
  },
  created() {
    this.groupNo = this.$route.query.groupNo;
    this.getGroupEditorData({goodsGroupNo:this.groupNo})
  }
};
</script>
<style lang="scss">
.gdsGroup-page {
  // padding: 20px;
  ul {
    margin: 0px;
    padding: 0px;
  }
  .editor-group {
    overflow: hidden;
     @extend %pagecont;
    .editorGrup-left,
    .editorGrup-right {
      display: inline-block;
      vertical-align: top;
      padding: 20px 0;
    }
    .editorGrup-left {
      width: 220px;
    }
    .editorGrup-right {
      width: calc(100% - 240px);
      float: right;
      overflow: hidden;
      // border: 1px red solid;
      font-size: 16px;
      color: #403f4c;
    }
    .skuInfo-list {
      overflow: hidden;
    }
    .place {
      display: inline-block;
      width: calc(100% - 100px);
      margin-left: 20px;
      padding: 10px 0;
      p {
        font-size: 12px;
        color: #999;
        margin-top: 5px;
      }
      .place-list {
        display: inline-block;
        border: 1px #dcdcdc solid;
        width: 120px;
        height: 40px;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        color: #999;
        margin: 5px;
        position: relative;
        // .isPlaceCheck{
        //     font-size: 16px;
        //     color: #409EFF;
        //     position: absolute;
        // }
      }
      .place-active {
        color: #409eff;
        border-color: #409eff;
      }
    }
    .place-txt {
      vertical-align: top;
      margin-top: 10px;
      display: inline-block;
      width: 80px;
    }
    .upImgList {
      display: inline-block;
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      width: 148px;
      height: 148px;
      line-height: 146px;
      vertical-align: top;
      margin: 5px;
      img{
          width: 100%;
          height: 100%;
      }
    }
  }
  .editorGrup-title {
    font-size: 24px;
  }
  .other{
      margin-top: 20px;
  }
}
</style>