<template>
  <div class="articleList-page">
   <myBrea :my-nav='brea'></myBrea>
    <div class="articleList-top">
      <el-row>
        <el-col :span="10">
          <div class="data-box">
            <span>总共文章数</span>
            <strong>{{num.total_history || "..."}}</strong>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="data-box">
            <span>今日文章数</span>
            <strong>{{num.total_today || "..."}}</strong>
          </div>
        </el-col>
        <!-- <el-col :span="8">
          <div class="data-box">
            <span>待审核文章数</span>
            <strong>......</strong>
          </div>
        </el-col> -->
      </el-row>
    </div>
    <div class="articleList-cont">
      <el-divider content-position="left">文章列表</el-divider>
      <div class="filtrate">
        <!-- <el-button-group>
          <el-button type="primary" plain size="medium">文字</el-button>
          <el-button type="primary" plain size="medium">图片</el-button>
        </el-button-group> -->
        <search :holderTxt='holder' @searchVal='searchFun'></search>
        <MyDatePicker @datePicker='datePickerFun'></MyDatePicker>
        <el-button-group style="float:right">
          <el-button type="primary" size="medium" @click="addArticle">发布文章</el-button>
          <el-button type="primary" size="medium" @click="addvideo">发布视频</el-button>
        </el-button-group>
      </div>
      <div class="article-table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="封面">
            <template slot-scope="scope">
              <img v-if='scope.row.picture' :src='scope.row.picture' alt="封面图"/>
              <span v-else>无图片</span>
              <!-- <el-image  v-if="scope.row.picture" :src='scope.row.picture' lazy></el-image> -->
            </template>
          </el-table-column>
          <el-table-column
            v-for="(itm,index) in tableHead"
            :key="index"
            :prop="itm.prop"
            :label="itm.label"
          ></el-table-column>
          <el-table-column label="文章统计" width="140">
              <template  slot-scope='scope'>
                <span>喜欢 : {{scope.row.praise}}</span> <span style="margin-left:10px;">转发 : {{scope.row.forward}}</span>
                <br>
                <span>浏览 : {{scope.row.view_times}}</span> <span style="margin-left:10px;">评论 : {{scope.row.comment}}</span>
               
              </template>
          </el-table-column>

           <!-- <el-table-column label="投放精选">
              <template  slot-scope='scope'>
               <span>{{scope.row.is_select | fileterYesOrNo}}</span>
              </template>
          </el-table-column>
          <el-table-column label="投放发现">
              <template  slot-scope='scope'>
                <span> <span>{{scope.row.is_recommend | fileterYesOrNo}}</span></span>
              </template>
          </el-table-column> -->

          <el-table-column label="文章类型">
            <template slot-scope="scope">
                {{scope.row.publish_type | publishType}}
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="240">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="setSelectBtn(scope.row)">{{scope.row.is_select |select}}</el-button> -->
              <!-- <el-button type="text" @click="setIscoverBtn(scope.row)">{{scope.row.is_recommend |iscover }}</el-button> -->
              <el-button type="text" @click="articEditor(scope.row)">编辑</el-button>
              <el-button type="text" @click="delArticBtn(scope.row) ">删除</el-button>
              <br/>
              <el-button type="text" @click="viewComment(scope.row)">查看评论</el-button>
              <el-button type="text" @click="pushArtic(scope.row)">文章推送</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <MyPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></MyPackage>
    </div>

    <!-- 推送时间 -->
    <el-dialog
      title="设置文章定时推送"
      :visible.sync="timeDialog"
      width="50%">
        <el-row style="margin-bottom:20px">
            <el-col :span="4"><span class='my-span-notice'>*</span>推送时间：</el-col>
            <el-col :span="12">
              <el-date-picker
                v-model="pushMsgData.push_time"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change='timeChange'
                >
            </el-date-picker>
            </el-col>
        </el-row>

        <el-row style="margin-bottom:20px">
            <el-col :span="4"><span class='my-span-notice'>*</span>推送标题：</el-col>
            <el-col :span="12">
                <el-input
                type="text"
                placeholder="请输入内容"
                v-model="pushMsgData.title"
                maxlength="30"
                show-word-limit
                >
                </el-input>
            </el-col>
        </el-row>
        <el-row style="margin-bottom:20px">
            <el-col :span="4"><span class='my-span-notice'>*</span>推送简介：</el-col>
            <el-col :span="12">
                <el-input
                type="text"
                placeholder="请输入内容"
                v-model="pushMsgData.content"
                maxlength="100"
                show-word-limit
                >
                </el-input>
            </el-col>
        </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="timeDialog = false">取 消</el-button>
        <el-button type="primary" @click="pushTimeClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import place from "../../../components/place.vue";
import myBrea from "../../../../components/breadcrumb.vue"
import search from "../../../../components/search.vue";
import MyPackage from "../../../../components/package.vue";
import MyDatePicker from "../../../../components/datepicker.vue";
// import until from '../../../comm/until.js'
import { myConfirm } from "../../../../comm/until";
export default {
  name: "articlelist",
  data() {
    return {
      brea:[{"txt":"社交中心","url":"/"},{"txt":"文章管理","url":"/"}],
      holder:"搜索",
      tableHead: [
        { prop: "id", label: "文章ID" },
        // { prop: "publish_type", label: "文章类型" },
        { prop: "title", label: "标题" },
        { prop: "nickname", label: "作者" },
        { prop: "category", label: "所属专栏" },
        { prop: "create_time", label: "发布时间" },
        // { prop: "is_recommend", label: "投放发布" },
        // { prop: "is_select", label: "投放精选" }
      ],
      tableData: [],
      postData: {
        title: "",
        start_time: "",
        end_time: "",
        page_size: "10",
        current_page: 1
      },
      num:{},
      packTotal:0,
      timeDialog:false,
      pushTime:"",
      pushMsgData:{
        push_time:"",
        title:"",
        content:"",
        type:'2'
      },
      articDetail:{}
    };
  },
  computed:{
  },
  components: {
    // "my-place": place,
    myBrea,
    search,
    MyPackage,
    MyDatePicker
  },
  computed: {},
  methods: {
    async getArticList() {
      await this.$store.dispatch("articleModule/arcticleGetListAct", this.postData);
      let data = this.$store.state.articleModule.articleList;
      this.tableData = data.info.result;
      this.num = data.info.num;
      this.packTotal = parseInt(data.info.total)
    },
    // async setSelect(prameData) {
    //   await this.$store.dispatch("articleModule/addselectAct", prameData);
    //   let data = this.$store.state.articleModule.addselect;
    //   if (data.info.is_select == 1) {
    //     this.$message.success("设置成功推荐成功");
    //   } else if (data.info.is_select == 2) {
    //     this.$message.success("取消推荐成功");
    //   }
    //   this.getArticList();
    // },
    async setIscover(prameData) {
      await this.$store.dispatch("articleModule/adddiscoverAct", prameData);
      let data = this.$store.state.articleModule.adddiscover;
      if (data.info.is_recommend == 1) {
        this.$message.success("设置发现成功");
      } else if (data.info.is_recommend == 2) {
        this.$message.success("取消发现成功");
      }
      this.getArticList();
    },
    async delArticle(prameData){
        await this.$store.dispatch("articleModule/arcticleDelAct",prameData)
        let data = this.$store.state.articleModule.delArticle;
        this.$message.success("删除成功");
        this.getArticList();
    },
    async pushMsg(prameData){
       await this.$store.dispatch("msgModule/artMesgPushArt",prameData);
        let data = this.$store.state.msgModule.artMesgPushData;
        this.$message.success("文章推送成功");
        this.timeDialog = false
        this.getArticList()
    },
    articEditor(row) {
      this.$router.push({
        path: "/addarticle",
        query: {
          editor: 1,
          id: row.id,
          addType:row.publish_type
        }
      });
    },
    addArticle() {
      this.$router.push({
        path: "/addarticle",
        query:{
          addType:1
        }
      });
    },
    addvideo() {
      this.$router.push({
        path: "/addarticle",
        query:{
          addType:2
        }
      });
    },
    handleCurrentFunc(val) {
      this.postData.current_page = val;
      this.postData.page_size = 10;
      this.getArticList()
    },
    // setSelectBtn(row) {
    //   let postData = {
    //     id: row.id
    //   };
    //   let _this = this;
    //   until.myConfirm(_this, `是否确认进行投放精选的操作？`,function(val){
    //      _this.setSelect(postData);
    //   })
     
    // },
    setIscoverBtn(row) {
      let postData = {
        id: row.id
      };
      let _this = this;
      myConfirm(_this, `是否确认进行投放发现的操作？`,function(val){
          _this.setIscover(postData);
      })
     
    },
    delArticBtn(row){
       let _this = this;
      myConfirm(_this, `是否删除该文章？`,function(val){
          _this.delArticle({id:row.id})
      })
        // this.confirm("是否删除该文章？",row.id)
    },
    searchFun(val){
         this.postData={};
         this.postData={
            title: val,
            start_time: "",
            end_time: "",
            page_size: "10",
            current_page: 1
         }
         this.getArticList(this.postData)
    },
    datePickerFun(time){
      this.postData ={}
      this.postData.start_time =time?time[0]:'';
      this.postData.end_time = time?time[1]:'';
      this.postData.page_size='10';
      this.postData.current_page=1;
      this.getArticList(this.postData)
      // this.getlist()
    },
    pushArtic(row){
      this.timeDialog=true;
      this.articDetail = row;
    },
    viewComment(row){
        this.$router.push({
          path: "/comment",
          query:{
            id:row.id,
            type:2,
            title:row.title
          }
          
        });
    },
    timeChange(val){
      // console.log(val)
    },
    pushTimeClick(){
      this.pushMsgData.id= this.articDetail.id;
      let _this = this;
      if(!this.pushMsgData.push_time){
        this.$message.warning("请选择推送时间");
        return;
      }
       if(!this.pushMsgData.title){
           this.$message.warning("请填写推送标题");
          return;
      }
       if(!this.pushMsgData.content){
          this.$message.warning("请填写推送简介");
          return;
      }
      myConfirm(_this,"是否进行文章定时推送操作？推送后将不能被撤回",function(val){
           _this.pushMsg(_this.pushMsgData)
      })
    }
  },
  created() {
    this.getArticList();
  },
  mounted() {},
  filters: {
      select(val){
          if(val == 1){
                return "撤回精选"
            }else if(val == 2){
                return "投放精选"
            }else{
                return "投放精选"
            }
      },
      iscover(val){
             if(val==1){
                return "撤回发现"
            }else if(val == 2){
                return "投放发现"
            }
      },
      publishType(val){
        if(val == 1){
                return "图文"
            }else if(val == 2){
                return "视频"
            }else{
                return "图文"
            }
      }
  }
};
</script>
<style lang="scss">
@import "@/style/topbox.scss";
.articleList-page {
  .articleList-top,
  .articleList-cont {
    // padding: 20px;
    // border-radius: 8px;
    // overflow: hidden;
    // background-color: #fff;
     @extend %extreme;

  }
   .articleList-top{
      padding: 3% 10px;
   }
  .articleList-cont {
    // margin-top: 20px;
    .filtrate{
      .time{
        margin-top: 0px;
      }
    }
    .article-table {
      @extend %tableborder;
      .el-table__row {
        img {
          max-width: 80px;
          // height: 60px;
        }
      }
    }
  }
  .el-button-group .el-button--primary:last-child {
    border-left-color: #b3d8ff;
  }
}
</style>

