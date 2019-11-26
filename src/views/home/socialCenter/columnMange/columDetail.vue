<template>
  <div class="cloumDetail-page">
   <myBrea :my-nav='brea'></myBrea>
    <div class="cloumDetail-top">
      <el-row>
        <el-col :span="10">
          <div class="cloumDetail-top-txt">
            <span class="back">
              <img :src='cloumDetailData.picture' alt="背景" />
            </span>
            <p>
              标题：
              <span class="bold">{{cloumDetailData.name}}</span>
            </p>
            <p>
              副标题：
              <span class="bold">{{cloumDetailData.sub_name}}</span>
            </p>
            <p>
              英文标题：
              <span class="bold">{{cloumDetailData.en_name}}</span>
            </p>
           
          </div>
        </el-col>
        <el-col :span="7">
          <div class="data-txt">
            <h2>总文章数</h2>
            <h3>{{cloumDetailData.total_num || '查询中...'}}</h3>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="data-txt">
            <h2>今日文章数</h2>
            <h3>{{cloumDetailData.today_num || '查询中...'}}</h3>
          </div>
        </el-col>
      </el-row>
      <p style="margin-top:30px;margin-left: 15px">
        专栏介绍：
        <span class="bold">{{cloumDetailData.describe}}</span>
      </p>
    </div>
    <div class="cloumDetail-cont">
      <el-divider content-position="left">文章列表</el-divider>
      <div class="artic-table">
        <el-table :data="tableData" border style="width: 100%">
           <el-table-column label="封面">
             <template  slot-scope="scope">
                <img v-if="scope.row.picture" :src="scope.row.picture" alt="封面图片" />
                <span v-else>无图片</span>
                <!-- <el-image v-if="scope.row.picture" :src="scope.row.picture" lazy></el-image> -->
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
           <el-table-column label="投放精选">
              <template  slot-scope='scope'>
               <span>{{scope.row.is_select | fileterYesOrNo}}</span>
              </template>
          </el-table-column>
          <el-table-column label="投放发现">
              <template  slot-scope='scope'>
                <span> <span>{{scope.row.is_recommend | fileterYesOrNo}}</span></span>
              </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" @click="articEditor(scope.row)">编辑</el-button>
              <el-button type="text" @click="delArticBtn(scope.row)">删除</el-button>
              <!-- <el-button type="text" @click="setSelectBtn(scope.row)">{{scope.row.is_select |select}}</el-button> -->
              <el-button type="text" @click="setIscoverBtn(scope.row)">{{scope.row.is_recommend |iscover }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
// import place from "../../../components/place.vue";
// import until from '../../../comm/until.js';
import myBrea from "../../../../components/breadcrumb.vue"
import { myConfirm } from "../../../../comm/until";
export default {
  name: "cloumdetail",
  data() {
    return {
      // cloumTxt: "专栏详情",
      id:'',
     brea:[{"txt":"社交中心","url":"/"},{"txt":"专栏详情","url":"/"}],
      cloumDetailData:{},
      num:0,
      packTotal:0,
      tableHead: [
        { prop: "id", label: "文章ID" },
        { prop: "title", label: "标题" },
        { prop: "nickname", label: "作者" },
        { prop: "category", label: "所属专栏" },
        { prop: "create_time", label: "发布时间" },
        // { prop: "praise", label: "喜欢" },
        // { prop: "view_times", label: "浏览" },
        // { prop: "forward", label: "转发" },
        // { prop: "comment", label: "评论" }
      ],
      tableData: []
    };
  },
  components: {
     myBrea,
  },
  methods: {
    async cloumDetail(postObj){
        await this.$store.dispatch("colunModule/getCategoryDetailAct",{id:this.id})
        let data = this.$store.state.colunModule.categoryDetail;
        if(data.status == 200){
          this.cloumDetailData=data.info;
        }
    },
    async getArticList(postData) {
      await this.$store.dispatch("articleModule/arcticleGetListAct",{category:this.id});
      let data = this.$store.state.articleModule.articleList;
      this.tableData = data.info.result;
      this.num = data.info.num;
      this.packTotal = parseInt(data.info.total)
    },

    async setSelect(prameData) {
      await this.$store.dispatch("articleModule/addselectAct", prameData);
      let data = this.$store.state.articleModule.addselect;
      if (data.info.is_select == 1) {
        this.$message.success("设置成功推荐成功");
      } else if (data.info.is_select == 2) {
        this.$message.success("取消推荐成功");
      }
      this.getArticList();
    },
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
        this.cloumDetail();
    },
    articEditor(row) {
      this.$router.push({
        path: "/addarticle",
        query: {
          editor: 1,
          id: row.id
        }
      });
    },
    setSelectBtn(row) {
      let postData = {
        id: row.id
      };
      this.setSelect(postData);
    },
    setIscoverBtn(row) {
      let postData = {
        id: row.id
      };
      this.setIscover(postData);
    },
    delArticBtn(row){
        let _this = this;
        myConfirm(_this, `是否删除该文章？`,function(val){
            _this.delArticle({id:row.id})
        })
      // this.confirm("是否删除该文章？",row.id)
    }
  },
  created() {
    this.id =this.$route.query.id;
    this.cloumDetail();
    this.getArticList()
  },
  mounted() {},
  computed: {},
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
      }
  }
};
</script>
<style lang="scss">
@import "@/style/topbox.scss";
.cloumDetail-page {
  .bold {
    // font-size: 16px;
    color: #333;
  }
  .cloumDetail-top,
  .cloumDetail-cont {
    // background-color: #fff;
    // border-radius: 8px;
    // overflow: hidden;
    // padding: 20px;
    @extend %extreme;
  }
  .cloumDetail-cont {
    // margin-top: 20px;
  }
  .cloumDetail-top-txt {
    line-height: 2;
    font-size: 14px;
    color: #666;
    P{
      margin-top: 10px;
    }

    .back {
      display: inline-block;
      width: 100px;
      height: 100px;
      border-radius: 4px;
      overflow: hidden;
      float: left;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .data-txt {
    font-size: 16px;
    color: #666;
    margin-top: 10px;
    text-align: center;
    h3 {
      margin-top: 20px;
      font-size: 30px;
      color: #333;
    }
  }
  .artic-table {
    @extend %tableborder;
    img{
      height: 80px;
      width: auto;
    }
  }
}
</style>

