<template>
  <div class="topic-page">
    <myBrea :my-nav='brea'></myBrea>
    <!-- <div class="topic-top">
      <el-row>
        <el-col :span="10">
          <div class="data-box">
            <span>话题总数</span>
            <strong>1000</strong>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="data-box">
            <span>最高话题 你真美</span>
            <strong>1000</strong>
          </div>
        </el-col>
        <el-col :span="8">
                <div class="data-box">
                    <span>待审核文章数</span>
                    <strong>......</strong>
                </div>
        </el-col>
      </el-row>
    </div> -->
    <div class="topic-cont">
      <el-divider content-position="left">话题列表</el-divider>
      <mySearch :holderTxt ='holdTxt' @searchVal='getSearchTxt'></mySearch>
      <el-button style="float:right" type="primary" size="medium" @click="AddtopicBtn">添加话题</el-button>
      <div class="topicList-table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="话题头像">
              <template slot-scope="scope">
                <img v-if='scope.row.picture' :src='scope.row.picture' />
                <!-- <el-image v-if='scope.row.picture' :src='scope.row.picture' lazy></el-image> -->
                <span v-else>---</span>
              </template>
          </el-table-column>
          <el-table-column
            v-for="(itm,index) in tableHead"
            :key="index"
            :prop="itm.prop"
            :label="itm.label"
          ></el-table-column>
           <el-table-column label="是否上架">
              <template slot-scope="scope">
                 {{scope.row.status|fileterYesOrNo}}
              </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" @click="topicEditor(scope.row)">编辑</el-button>
              <el-button type="text" @click='topicChange(scope.row)'>{{scope.row.status | statusChange}}</el-button>
              <el-button type="text" @click='topicDel(scope.row)'>删除</el-button>
              <el-button type="text" @click="topicToView(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
       <myPackge v-if='total' :key='total' :pageTotal='total' @handleCurrent='handleCurrentFunc'></myPackge>
    </div>

    <el-dialog :title="title" width="50%" :visible.sync="dialogFormVisible">
      <div>
        <el-row class="mt20">
          <el-col :span="4"><span class='my-span-notice'>*</span>话题头像:</el-col>
          <el-col :span="12">
            <proUpload :key="topicPostData.picture" :imgUrl="topicPostData.picture" @getUrl="getImgUrl"></proUpload>
          </el-col>
        </el-row>
        <el-row class="mt20">
          <el-col :span="4"><span class='my-span-notice'>*</span>话题背景:</el-col>
          <el-col :span="12">
            <proUpload :key="topicPostData.cover" :imgUrl="topicPostData.cover" @getUrl="getCoverImgUrl"></proUpload>
          </el-col>
        </el-row>
        <el-row class="mt20">
          <el-col :span="4"><span class='my-span-notice'>*</span>话题标题:</el-col>
          <el-col :span="12">
            <el-input placeholder="请输入内容" v-model='topicPostData.name' show-word-limit  maxlength="10"></el-input>
          </el-col>
        </el-row>
        <!-- <el-row class="mt20">
          <el-col :span="4">话题副标题:</el-col>
          <el-col :span="12">
            <el-input placeholder="请输入内容" clearable></el-input>
          </el-col>
        </el-row> -->
        <el-row class="mt20">
          <el-col :span="4"><span class='my-span-notice'>*</span>话题描述:</el-col>
          <el-col :span="12">
            <el-input placeholder="请输入内容" type='textarea' v-model="topicPostData.describe" show-word-limit  maxlength="300"></el-input>
          </el-col>
        </el-row>
        <el-row class="mt20">
          <el-col :span="4"><span class='my-span-notice'>*</span>设置话题顺序:</el-col>
          <el-col :span="12">
            <el-input type="number" placeholder="请输入1以上的数字" v-model="topicPostData.sort" clearable></el-input>
            <p style="color: rgb(153, 153, 153); font-size: 12px;">注：请输入1以上的数字，数字越小，越靠前</p>
          </el-col>
        </el-row>

        <el-row class="mt20">
          <el-col :span="4"></el-col>
          <el-button style="width:50%;margin-left:17%;margin-top:10px;" type="primary" @click="topicBtn">确认提交</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import place from "../../../components/place.vue";
import myBrea from "../../../../components/breadcrumb.vue"
// import upload from '../../../../components/upload.vue';
import proUpload from '../../../../components/proUpload'
import myPackge from '../../../../components/package.vue';
import mySearch from '../../../../components/search.vue';
// import until from '../../../comm/until.js'
import { myConfirm } from "../../../../comm/until";

import { setTimeout } from 'timers';

export default {
  name: "topic",
  imageUrl: "",
  data() {
    return {
      title: "话题管理",
      holdTxt:"标题",
      brea:[{"txt":"社交中心","url":"/"},{"txt":"话题管理","url":"/"}],
      dialogFormVisible: false,
      num:{},
      input: "",
      imageUrl: "",
      topicId:"",
      total:0,
      topicPostData:{
        name:'',
        describe:"",
        picture:"",
        sort:"",
        cover:"",
        page_size:10,
        current_page:1
      },
      tableHead: [
        // { prop: "describe", label: "话题描述" },
        { prop: "id", label: "话题ID" },
        { prop: "name", label: "话题标题" },
        { prop: "sort", label: "话题顺序" },
        // { prop: "status", label: "是否上架" },
        { prop: "publish_num", label: "动态数" }
      ],
      tableData: []
    };
  },
  components: {
      myBrea,
     proUpload,
      myPackge,
      mySearch
  },
  methods: {
    async getTopicList(){
      await this.$store.dispatch("topicModule/topicListaAct",this.topicPostData);
      let data = this.$store.state.topicModule.topicListData;
      this.tableData = data.info.result;
      this.num = data.num;
      this.total = parseInt(data.info.total)
    },
    async setAddTopic(){
      await this.$store.dispatch("topicModule/topicAddAct",this.topicPostData)
      let data = this.$store.state.topicModule.topicAddData;
      if(data.status == 200){
        this.$message.success("添加成功")
        let _this =this;
        setTimeout(()=>{
          _this.getTopicList();
          _this.dialogFormVisible = false;
        },1000)
      }
    },
    async getTopicDetail(){
      await this.$store.dispatch('topicModule/topicDetailAct',{id:this.topicId});
      let data = this.$store.state.topicModule.topicDetailData;
      this.topicPostData =  data.info;
       this.topicPostData.name = data.info.name
    },
    async setEditTopic(){
      await this.$store.dispatch("topicModule/topicEditAct",this.topicPostData);
        let data  = this.$store.state.topicModule.topicEditData;
        this.$message.success("编辑成功");
        this.dialogFormVisible =  false;
        this.getTopicList();
    },
    async setChangeTopic(){
      await this.$store.dispatch("topicModule/changeTopicAct",{id:this.topicId})
      let data =this.$store.state.topicModule.changeTopicData;
      this.$message.success("下架操作成功")
      this.getTopicList();
    },
    async delTopic(){
      await this.$store.dispatch("topicModule/topicDelAct",{id:this.topicId});
      let data = this.$store.state.topicModule.topicDelData;
      this.$message.success("删除成功")
      this.getTopicList();
    },
    // getImgUrl(url){
    //   this.topicPostData.picture = url;
    // },
    // uploadBtn(){
    //   document.querySelector("#uploader").click();
    // },
    getImgUrl(url){
      this.topicPostData.picture = url;
    },
    getCoverImgUrl(url){
      this.topicPostData.cover = url;
    },
    topicEditor(row) {
      this.dialogFormVisible = true;
      this.topicId = row.id;
      this.getTopicDetail();
    },
    topicToView(row) {
      this.$router.push({
        path: "/topicdetail",
        query:{
          id:row.id
        }
      });
    },
    AddtopicBtn(){
      this.topicId = '';
      this.dialogFormVisible = true;
    },
    topicBtn(){
      if(!this.topicPostData.picture){
        this.$message.warning("请上传话题头像")
        return
      }
      if(!this.topicPostData.name){
        this.$message.warning("请添加话题标题")
        return
      }
      if(!this.topicPostData.describe){
        this.$message.warning("请添加话题描述");
        return
      }
      if(!this.topicId){
         this.setAddTopic();
      }else{
        this.topicPostData.id = this.topicId;
        this.setEditTopic()
      }
    },
    handleCurrentFunc(current){
      this.topicPostData={}
      this.topicPostData.current_page = current;
      this.topicPostData.page_size=10;
      this.getTopicList(this.topicPostData)
    },
    topicChange(row){
      this.topicId = row.id;
      let _this =this
      myConfirm(_this, `是否确认进行${row.status==1?"下架":"上架"}操作？`,function(val){
         _this.setChangeTopic();
      })
     
    },
    topicDel(row){
      this.topicId = row.id;
      let _this =this;
      myConfirm(_this,"是否删除该话题？",function(val){
         _this.delTopic()
      })
     
    },
    getSearchTxt(val){
      this.topicPostData.current_page=1;
      this.topicPostData.title = val
      this.getTopicList()
    }
  },
  created() {
    // this.topicPostData={};
    this.getTopicList();
  },
  mounted() {},
  filters: {
    statusChange(val){
       if(!val){
        return
      }
      switch(parseInt(val)){
        case 1:
          return "下架"
        case 2:
          return "上架"
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/style/topbox.scss";
@import "@/style/avatar-uploader.scss";
.topic-page {
  .mt20 {
    margin-top: 20px;
  }
  .topic-top,
  .topic-cont {
    // padding: 20px;
    // border-radius: 8px;
    // background-color: #fff;
    // overflow: hidden;
     @extend %extreme;
  }
  .topic-cont {
    margin-top: 20px;
    .topicList-table {
      @extend %tableborder;
      img{
        height: 80px;
        width: auto;
      }
    }
  }
}
</style>



