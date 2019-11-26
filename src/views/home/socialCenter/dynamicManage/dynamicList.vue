<template>
  <div class="dynamicMange-page">
     <myBrea :my-nav='brea'></myBrea>
    <div class="dynamicMangeTop">
      <el-row>
        <el-col :span="8">
          <div class="data-box">
            <span>总共动态</span>
            <strong>{{momentsNum.total_history || '...'}}</strong>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="data-box">
            <span>本月动态</span>
            <strong>{{momentsNum.total_month || '...'}}</strong>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="data-box">
            <span>今日动态</span>
            <strong>{{momentsNum.total_today || '...'}}</strong>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="dynamicMangeCont">
      <el-divider content-position="left">动态列表</el-divider>
      
      <el-button-group>
        <el-button type="primary" plain size="medium" @click="statusBtn(-1)">全部</el-button>
        <el-button type="primary" plain size="medium" @click="statusBtn(1)">已审核</el-button>
        <el-button type="primary" plain size="medium" @click="statusBtn(3)">待审核</el-button>
      </el-button-group>
      <my-search :holder-txt='placehover' @searchVal='getSearchVal' style="margin-left:20px"></my-search>
      <my-datepicker @datePicker='datePickerFun'></my-datepicker>
      <div class="dynamincList-table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            v-for="(itm,index) in tableHead"
            :key="index"
            :prop="itm.prop"
            :label="itm.label"
          ></el-table-column >

          <el-table-column label="动态描述">
            <template slot-scope="scope">
              <!-- <span v-html="mytwemoji.parse(scope.row.describe)"></span> -->
            </template>
          </el-table-column>

          <el-table-column label="类型">
            <template slot-scope="scope">
              <span>{{scope.row.publish_type | fileType}}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态">
            <template slot-scope="scope">
                <span>{{scope.row.status | fileStatus}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="是否推荐">
            <template slot-scope="scope">
                <span>{{scope.row.status | fileStatus}}</span>
            </template>
          </el-table-column> -->
          
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" v-if='scope.row.status==3' @click="throughOrRefused(scope.row,1)">通过</el-button>
              <el-button type="text" v-if='scope.row.status==3' @click="throughOrRefused(scope.row,2)">拒绝</el-button>
              <!-- <el-button type="text" @click="recommendBtn(scope.row)">推荐</el-button> -->
              <el-button type="text" @click="dynToView(scope.row)">查看</el-button>
              <br/>
              <el-button v-if='scope.row.status==1' type="text" @click="pushDynClick(scope.row)">动态推送</el-button>
              <el-button type="text" @click="viewComment(scope.row)">查看评论</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <my-package :page-total='total' :page-current='postData.current_page' :key='total' @handleCurrent='handleCurrentFun'></my-package>
    </div>

    
    <!-- 推送时间 -->
    <el-dialog
      title="设置动态定时推送"
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
// import place from "../../../../components/place.vue";
import myBrea from "../../../../components/breadcrumb.vue"

import search from "../../../../components/search.vue";
import MyPackage from "../../../../components/package.vue";
import MyDatePicker from "../../../../components/datepicker.vue";
import { myConfirm } from "../../../../comm/until";

// import until from '../../../comm/until.js'
// import twemoji from 'twemoji'
export default {
  name: "dynamicmange",
  data() {
    return {
      time: "",
      brea:[{"txt":"社交中心","url":"/"},{"txt":"动态管理","url":"/"}],

      // mytwemoji:twemoji,
      placehover:"昵称",
      tableHead: [
        { prop: "id", label: "动态ID" },
        { prop: "nickname", label: "昵称" },
        { prop: "cert", label: "标签" },
        { prop: "create_time", label: "发布时间" },
        { prop: "topic", label: "所属话题" },
        // { prop: "describe", label: "动态描述" },
        {prop: "comment", label: "评论数"}
        //comment
        // { prop: "publish_type", label: "类型" },
        // { prop: "status", label: "状态" }
      ],
      momentsNum:{},
      total:0,
      postData:{
        nickname:'',
        status:'',
        start_time:'',
        end_time:'',
        page_size:'',
        current_page:1
      },
      tableData:[],
      timeDialog:false,
      pushMsgData:{
        push_time:"",
        title:"",
        content:"",
        type:'1'
      },
      dynDetail:{}
    };
  },
  components: {
    myBrea,
    'my-search':search,
    "my-package":MyPackage,
    'my-datepicker':MyDatePicker
  },
  methods: {
    async getlist(){
      await this.$store.dispatch("dynamicModule/getMomentsList",this.postData)
      let momentsData = this.$store.state.dynamicModule.momentsData
      if(momentsData.status !=200 ){
        this.$message.error(momentsData.msg)
        return
      }
      this.tableData = momentsData.info.result;
      this.momentsNum = momentsData.info.num;
      this.total = parseInt(momentsData.info.total)
    },
    async examine(postData){
      await this.$store.dispatch('dynamicModule/getExamine',postData)
      let data = this.$store.state.dynamicModule.momentExamine;
      if(data.status != 200){
        this.$message.error(momentsData.msg)
        return
      }
      this.$message.success("操作成功");
      this.getlist();
    },
     async recommend(objData){
      await this.$store.dispatch("dynamicModule/getRecommend",objData);
      let data = this.$store.state.dynamicModule.momentRecommend;
      this.$message.success("操作成功");
      this.getlist();
      // if(data.code !=10000){
      //   this.$message.error(data.msg);
      //   // this.getDetails();
      //   this.getlist();
      //   return
      // }
    },
    async pushMsg(prameData){
       await this.$store.dispatch("msgModule/artMesgPushArt",prameData);
        let data = this.$store.state.msgModule.artMesgPushData;
        this.$message.success("动态推送成功");
        this.timeDialog = false
        this.getArticList()
    },
    dynToView(row) {
      // console.log(this.postData.current_page)
      this.$router.push({
        path: "/dynamicdetail",
        query:{
          id:row.id,
          page:this.postData.current_page
        }
      });
    },
    viewComment(row){
        this.$router.push({
          path: "/comment",
          query:{
            id:row.id,
            type:1,
            title:row.topic
          }
        });
    },
    getSearchVal(val){
        this.postData ={};
        this.postData.current_page =1;
        this.postData.page_size = 10;
        this.postData.nickname = val;
        this.getlist()
    },
    statusBtn(state){
         if(state!=-1){
           this.postData.status = state;
         }else{
            this.postData.status = '';
         }
         this.postData.start_time='';
         this.postData.end_time=''
         this.postData.current_page=1;
         this.getlist()
    },
    handleCurrentFun(val){
      this.postData.current_page = val;
      // this.postData.page_size = 10;
      this.getlist()
    },
    datePickerFun(time){
      this.postData ={}
      this.postData.start_time =time?time[0]:'';
      this.postData.end_time = time?time[1]:'';
      this.getlist()
    },
    throughOrRefused(row,status){
      let postData ={"id":row.id,"status":status}
      let _this = this;
      myConfirm(_this,`是否确认进行审核${status==1?'通过':'拒绝'}操作？`,function(val){
         _this.examine(postData)
      })
      
    },
    recommendBtn(row){
      this.recommend({id:row.id})
    },
    pushDynClick(row){
      this.timeDialog=true;
      this.dynDetail = row;
    },
    timeChange(val){
      // console.log(val)
    },
    pushTimeClick(){
      this.pushMsgData.id= this.dynDetail.id;
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
      myConfirm(_this,"是否进行动态定时推送操作？推送后将不能被撤回",function(val){
           _this.pushMsg(_this.pushMsgData)
      })
    }
  },
  created() {
    this.postData.current_page = this.$route.query.page || 1
    this.getlist()
  },
  mounted() {
    //  this.$message.error('这是一条错误消息')
      // this.$message.success("操作成功");
  },
  filters: {
    
  }
};
</script>


<style lang="scss">
@import "@/style/topbox.scss";
.dynamicMange-page {
  .dynamicMangeTop,
  .dynamicMangeCont {
     @extend %extreme;
  }
  .dynamicMangeTop {
     padding: 3% 10px;
  }

  .dynamicMangeCont {
    .el-button-group>.el-button:not(:last-child){
          margin-right: 0px;
    }
    .el-button-group .el-button--primary:first-child{
      border-right-color: #b3d8ff;
    }
    .time{
      // margin-top: 10px;
    }
    .dynamincList-table {
      @extend %tableborder;
    }
  }
}
</style>


