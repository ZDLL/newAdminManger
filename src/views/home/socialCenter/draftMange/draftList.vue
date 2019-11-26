<template>
  <div class="draft-page">
    <!-- <myPlace :place-text="draftTxt"></myPlace> -->
    <div class="draft-cont">
      <el-divider content-position="left">草稿列表</el-divider>
      <div class="draft-table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="封面">
            <template slot-scope="scope">
              <img v-if="scope.row.picture" :src="scope.row.picture" alt="封面图" />
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
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" @click="dirftReleaseClick(scope.row)">发布</el-button>
              <el-button type="text" @click="driftDeleteClick(scope.row)">删除</el-button>
              <el-button type="text" @click="driftEditorClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <myPackage v-if="total" :key="total" :pageTotal="total" @handleCurrent="handleCurrentFunc"></myPackage>
    </div>
  </div>
</template>
<script>
import myPlace from "../../../../components/place.vue";
import myPackage from "../../../../components/package.vue";
// import until from '../../../comm/until.js'
import { myConfirm } from "../../../../comm/until";
export default {
  name: "draft",
  data() {
    return {
      draftTxt: "草稿箱",
      tableHead: [
        // { prop: "picture", label: "封面" },
        { prop: "title", label: "标题" },
        { prop: "publish_type", label: "文章类型" },
        { prop: "author_name", label: "作者" },
        { prop: "category_name", label: "所属专栏" },
        { prop: "create_time", label: "添加时间" }
      ],
      postData: {
        page_size: 10,
        current_page: 1
      },
      tableData: [],
      total: 0
    };
  },
  components: {
    myPlace,
    myPackage
  },
  methods: {
    async getDraftList() {
      await this.$store.dispatch("draftModule/getRaftListAct", this.postData);
      let data = this.$store.state.draftModule.getRaftListData;
      this.tableData = data.info.result;
      this.total = parseInt(data.info.total);
    },
    async deleteDraft(Id){
       await this.$store.dispatch("draftModule/deleteRaflAct",{draft_id:Id});
        let data = this.$store.state.draftModule.deleteRafl;
        this.$message.success("删除草稿成功");
        this.getDraftList();

    },
    async addArticle(postData) {
      await this.$store.dispatch("articleModule/arcticleAddAct",postData);
      let data = this.$store.state.articleModule.arcticleAdd;
      if (data.status == 200) {
        this.$message.success("发布成功");
        this.getDraftList();
        this.$router.push({
          path: "/article"
        });
      }
    },
    async editorArticle(postData) {
      // if(this.is_draft){
      //   this.postData.draft_id= this.draft_id;
      //   this.postData.id= this.id;
      // }else{
      //     this.postData.id= this.id;
      // }
      await this.$store.dispatch(
        "articleModule/editArcticleAct",
        postData
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
    handleCurrentFunc(val) {
      this.postData.current_page = val;
      this.getDraftList();
    },
    dirftReleaseClick(row) {
      let _this = this;
      myConfirm(_this, `是否确认进行发布草稿的操作？`,function(val){
        if(row.id){
           _this.editorArticle(row)
        }else{
           _this.addArticle(row);
        }
      })
    },
    driftDeleteClick(row) {
      let _this = this;
      myConfirm(_this, `是否确认进行删除草稿的操作？`,function(val){
          _this.deleteDraft(row.draft_id)
      })
    },
    driftEditorClick(row) {
        this.$router.push({
        path: "/addarticle",
        query: {
          drift: 1,
          id: row.subject_id,
          draft_id:row.draft_id,
          addType:row.publish_type
        }
      });
    }
  },
  created() {
    this.getDraftList();
  },
  mounted() {}
};
</script>
<style lang="scss">
.draft-page {
  position: relative;
  .draft-cont {
    @extend %extreme;
    .draft-table {
     @extend %tableborder;
      img {
        max-height: 80px;
        width: auto;
      }
    }
  }
}
</style>


