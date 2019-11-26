<template>
  <div class="columList-page">
    <myBrea :my-nav='brea'></myBrea>
    <!-- <div class="columList-top">
      <el-row>
        <el-col :span="8">
          <div class="data-box">
            <span>总共专栏数</span>
            <strong>1000</strong>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="data-box">
            <span>今日专栏数</span>
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
    <div class="columList-cont">
      <el-divider content-position="left">专栏列表</el-divider>
    <div>
       <!-- <mySearch :holder-txt='placehover' @searchVal='getSearchVal'/> -->
        <el-button type="primary" size="medium" @click="addCloum">添加专栏</el-button>
    </div>
      <!-- <el-button-group>
        <el-button type="primary" plain size="medium">图片</el-button>
        <el-button type="primary" size="medium">视频</el-button>
      </el-button-group>
      <div class="time">
        <div class="block">
          <el-date-picker v-model="startTime" type="date" placeholder="选择开始日期"></el-date-picker>
        </div>
        <div class="block">
          <el-date-picker v-model="endTime" type="date" placeholder="选择结束日期"></el-date-picker>
        </div>
      </div> -->
     
      
      <div class='columList-table'>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="专栏ID" property="id"></el-table-column> 
             <el-table-column label="专栏顺序" property="sort"></el-table-column> 
            <el-table-column label="时间" property="create_time"></el-table-column> 
            <el-table-column label="标题" property="name"></el-table-column>  
            <el-table-column label="背景图片">
                <template slot-scope="scope">
                  <img v-if='scope.row.picture' :src='scope.row.picture' alt="背景图片"/>
                   <!-- <el-image v-if='scope.row.picture' :src='scope.row.picture' lazy></el-image> -->
                   <span v-else>无图片</span>
                    <!-- <img v-if='scope.row.picture' :src='scope.row.picture'/> -->
                </template>
            </el-table-column>  
             <el-table-column label="动态数" property="publish_num">
            </el-table-column>  

            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                <el-button type="text" @click="columEditor(scope.row)">编辑</el-button>
                <el-button type="text" @click="columDel(scope.row)">删除</el-button>
                <el-button type="text" @click="toCloumDetail(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
      </div>
        <MyPackage v-if='total' :key='total' :pageTotal='total' @handleCurrent='handleCurrentFunc'></MyPackage>
      <!-- <MyPackage :page-total='total' @handleCurrent='handleCurrentFun'></MyPackage> -->
    </div>


    <el-dialog :title='title'  width="50%" :visible.sync="dialogFormVisible">
        <div>
            <el-row class='mt20'>
                <el-col :span="4"><span class='my-span-notice'>*</span>专栏背景图:</el-col>
                <el-col :span="12">   
                   <proUpload :key="cloumData.picture" :imgUrl="cloumData.picture" @getUrl="getImgUrl"></proUpload>
                    <p style="margin-top:8px;color: rgb(153, 153, 153); font-size: 12px;">注：请上传375*500小于1M的图片</p>
                </el-col>
            </el-row>
            <el-row class='mt20'>
                <el-col :span="4"><span class='my-span-notice'>*</span>专栏标题:</el-col>
                <el-col :span="12">   
                    <el-input
                    placeholder="请输入内容"
                    v-model="cloumData.name"
                    show-word-limit 
                    maxlength="10"
                    clearable>
                </el-input>
                </el-col>
            </el-row>
            <el-row class='mt20'>
                <el-col :span="4"><span class='my-span-notice'>*</span>英文标题:</el-col>
                <el-col :span="12">   
                    <el-input
                    placeholder="请输入内容"
                    v-model="cloumData.en_name"
                    show-word-limit 
                    maxlength="30"
                    clearable>
                </el-input>
                </el-col>
            </el-row>
            <el-row class='mt20'>
                <el-col :span="4"><span class='my-span-notice'>*</span>专栏副标题:</el-col>
                <el-col :span="12">   
                    <el-input
                    placeholder="请输入内容"
                    v-model="cloumData.sub_name"
                    show-word-limit 
                    maxlength="30"
                    clearable>
                </el-input>
                </el-col>
            </el-row>
             <el-row class='mt20'>
                <el-col :span="4"><span class='my-span-notice'>*</span>专栏介绍:</el-col>
                <el-col :span="12">   
                    <el-input
                    placeholder="请输入内容"
                    v-model="cloumData.describe"
                    show-word-limit 
                    maxlength="300"
                    clearable>
                </el-input>
                </el-col>
            </el-row>
             <el-row class='mt20'>
                <el-col :span="4"><span class='my-span-notice'>*</span>专栏顺序:</el-col>
                <el-col :span="12">   
                    <el-input
                      placeholder="请输入内容"
                      v-model="cloumData.sort"
                      type="number"
                      clearable>
                    </el-input>
                    <p style="color: rgb(153, 153, 153); font-size: 12px;">注：请输入1以上的数字，数字越小，越靠前</p>
                </el-col>
            </el-row>
            <el-row class='mt20'>
                 <el-col :span="4"></el-col>
                 <el-button style="width:50%;margin-left:17%;margin-top:10px;" type="primary" @click="sureSubmit">确认提交</el-button>
            </el-row>
            
        </div>
    </el-dialog>
  </div>
</template>
<script>
// import place from "../../../components/place.vue";
import myUpload from '../../../../components/upload';
import proUpload from '../../../../components/proUpload';
import MyPackage from "../../../../components/package.vue";
import mySearch from "../../../../components/search.vue";
// import until from '../../../comm/until.js';
import myBrea from "../../../../components/breadcrumb.vue"
import { myConfirm } from "../../../../comm/until";
export default {
  name: "columlist",
  data() {
    return {
      startTime: "",
      endTime: "",
      dialogFormVisible:false,
      input:"",
      total:0,
      title:"",
      brea:[{"txt":"社交中心","url":"/"},{"txt":"专栏管理","url":"/"}],
      btnType:1,//1编辑2修改
      cloumData:{
        picture:"",
        name:'',
        en_name:"",
        sub_name:"",
        describe:"",
        sort:''
      },
      tableData: [],
      total:0,
      placehover:"关键词搜索"

    };
  },
  components: {
      myBrea,
      // myUpload,
      proUpload,
      MyPackage,
      mySearch
  },
  methods: {
      async cloumListFunc(objData){
       await this.$store.dispatch("colunModule/getCategoryListAct",objData)
        let data = this.$store.state.colunModule.categoryList;
        if(data.status == 200){
          this.tableData=data.info.result
          this.total = parseInt(data.info.total)
        }
      },
      async edoitorCloum(){
        await this.$store.dispatch('colunModule/editCategoryAct',this.cloumData);
        let data = this.$store.state.colunModule.editCategory
        if(data.status ==200){
          this.$message.success("编辑成功");
           this.dialogFormVisible=false;
          this.cloumListFunc({});
        }
      },
      async cloumDetail(postObj){
          await this.$store.dispatch("colunModule/getCategoryDetailAct",postObj)
          let data = this.$store.state.colunModule.categoryDetail;
          if(data.status == 200){
            this.cloumData={};
            this.cloumData=data.info;
            this.dialogFormVisible=true;
          }
      },
      async addCloumFun(){
        await this.$store.dispatch('colunModule/addCategoryAct',this.cloumData);
        let data = this.$store.state.colunModule.addCloumData;
        if(data.status == 200){
          this.$message.success("添加成功")
          this.dialogFormVisible = false;
          this.cloumListFunc({})
        }
      },
      async delCategory(objData){
        //
        await this.$store.dispatch('colunModule/delCategoryAct',objData);
        let data = this.$store.state.colunModule.delCategory;
        this.$message.success("删除成功");
        this.cloumListFunc({})
      },
      columEditor(row){
        this.title ='编辑专栏'
        // this.cloumData = row;
        this.btnType =2;
        this.cloumDetail({id:row.id})
      },
      addCloum(){
          this.dialogFormVisible=true;
          this.cloumData={
            picture:"",
            name:'',
            en_name:"",
            sub_name:"",
            describe:""
          } ;
          this.btnType =1;
          this.title ='添加专栏'
      },
      columDel(row){
        // this.delCategory({id:row.id})
        let _this =this;
         myConfirm(_this, `是否删除该专栏？`,function(val){
           _this.delCategory({id:row.id})
        })
        // this.confirm("是否删除该专栏？",row.id)
      },
      toCloumDetail(row){
         this.$router.push({
           path:"/socialColumndetail",
           query:{
             id:row.id
           }
         })
      },
      // uploadBtn(){
      //    document.querySelector("#uploader").click();
      // },
      // fileUrlFun(url){
      //   this.cloumData.picture = url;
      // },
      getImgUrl(url){
        this.cloumData.picture= url;
      },
      sureSubmit(){
        if(!this.cloumData.picture){
          this.$message.warning("请上传专栏背景");
          return;
        }
        if(!this.cloumData.name){
            this.$message.warning("请填写专栏标题");
          return;
        }
        if(!this.cloumData.en_name){
          this.$message.warning("请填写专栏英文标题");
          return;
        }
         if(!this.cloumData.sub_name){
          this.$message.warning("请填写专栏副标题");
          return;
        }
        if(!this.cloumData.describe){
          this.$message.warning("请填写专栏描述");
          return;
        }
        if(this.btnType==1){
           this.addCloumFun();
        }else{
          this.edoitorCloum();
        }
       
      },
      handleCurrentFunc(val){
        this.cloumListFunc({page_size:10,current_page:val})
      },
      getSearchVal(val){
         this.cloumListFunc({page_size:10,current_page:val})
      }
  },
  created() {
    this.cloumListFunc({})
  },
  mounted() {
  },
  filters: {}
};
</script>
<style lang="scss">
@import "@/style/topbox.scss";
@import '@/style/avatar-uploader.scss';
.columList-page {
    .mt20{
        margin-top: 20px;
    }
  .columList-top,
  .columList-cont {
    // padding: 20px;
    // background-color: #fff;
    // border-radius: 8px;
    // overflow: hidden;
    @extend %extreme;
  }
  .columList-cont {
    // margin-top: 20px;
    .time {
      display: inline-block;
      vertical-align: top;
      margin-left: 20px;
      .block {
        display: inline-block;
        vertical-align: top;
        margin-right: 20px;
        .el-input__inner {
          height: 36px;
          line-height: 36px;
        }
      }
    }
    .columList-table{
       @extend %tableborder;
    }
    .el-table__row{
        img{
          max-width: 80px;;
          // height: 60px;
          }
    }
  }
}
</style>

