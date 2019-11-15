<template>
  <div class="columDetail-page">
    <myBrea :my-nav="brea"></myBrea>
    <div class="columDetail-cont">
      <div class="columDetail-top">
        <ul class="columDe-top-ul" v-if='Object.keys(columData).length>0'>
          <li class="top-li">栏目名称：{{columData.columnName}}</li>
          <li class="top-li">创建时间：{{columData.insTime | dateformat}} </li>
          <li class="top-li">栏目编号：{{columData.columnNo}}</li>
          <li class="top-li">创建人：{{columData.insUser}}</li>
          <!-- <li class="top-li">栏目顺序：columData.</li>
          <li class="top-li">模版编号：columData.</li> -->
          <li class="top-li">栏目类型：{{columData.columnTypeName}}</li>
        </ul>
        <el-button style="float:right" type="primary" @click="addArtic">添加内容</el-button>
      </div>
      <div class="columDetail-table">
        
        <div>
             <span>名称：</span><el-input
                placeholder="请填写名称关键词搜索"
                v-model="searchData.title"
                clearable
                style="width:200px;margin-left:20px"
                @clear='clearBtnClick'
            ></el-input>
            <el-button style="float:right" type="primary" plain @click="searchBtnClick">搜索</el-button>
        </div>
        <el-divider content-position="left">文章列表</el-divider>
        <div class="detail-table">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="keyId" label="编号"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>

            <el-table-column  prop="author" label="作者">
              <!-- <template slot-scope="scope"></template> -->
            </el-table-column>

            <el-table-column label="权重">
              <template slot-scope="scope">
                 <span style="margin-right:8px">{{scope.row.weight}}</span>
                  <i @click="weightBtn(scope.row)" class="el-icon-edit"></i>
              </template>
            </el-table-column>
            <el-table-column label="所属专栏">
              <template slot-scope="scope">
                {{scope.row.categoryName}}
              </template>
            </el-table-column>

            <el-table-column label="添加时间">
              <template slot-scope="scope">
                {{scope.row.insTime | dateformat}}
                <!-- {{scope.row.state == '00001001'?'启用':"停用"}} -->
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                {{scope.row.state == '00001001'?'启用':"停用"}}
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="subjectBtnClick(scope.row)">{{scope.row.state=='00001001'?'禁用':'启用'}}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>
        </div>
      </div>
    </div>
    <arcSelec v-if='showDia' :arc-search="arcSeac" :only-one='isOnlyOne' @closeDia='closeBtnClick' @sureDia='getContData'></arcSelec>
     <!-- 设置权重 -->
      <el-dialog
            title="设置权重"
            :visible.sync="weightDia"
            width="40%"
           >
            <el-input
                style="wight:200px;"
                type="number"
                placeholder="请输入权重"
                v-model="weightVal"
                clearable>
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="weightDia = false">取 消</el-button>
                <el-button type="primary" @click="weightBtnClick">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>
<script>
import myBrea from "../../../components/breadcrumb.vue";
import arcSelec from "./articleSelect.vue";
import myPackage from '../../../components/package.vue'
import { myConfirm } from '../../../comm/until';

export default {
  name: "columndetail",
  components: {
    myBrea,
    arcSelec,
    myPackage
  },
  data() {
    return {
      input:"",
      tableData: [],
      brea: [{ txt: "内容中心", url: "/goods" }, { txt: "栏目详情", url: "/" }],
      showDia:false,
      columNo:"",
      packTotal:1,
      columData:{},
      contTxtData:{},
      searchData:{
        pageNo:1,
        pageSize:"10",
        title:"",
        columnNo:""
        
      },
      arcSeac:{
        pageNo:"1",
        pageSize:10,
        categoryId:"",
        publishType:"",
        title:"",
        channelNo:"",
        columnNo:""
      },
      isOnlyOne:"-1",
      weightDia:false,
      clikData:{},
      weightVal:""
    };
  },
  methods:{
      async getSubjectList(postData){
            await this.$store.dispatch('ContentModule/POST_COLUMN_CONTXT_LIST',postData);
            let data = this.$store.state.ContentModule.POST_COLUMN_CONTXT_LIST;
            this.packTotal = parseInt(data.out.totalSize)
            this.tableData = data.out.list;
      },
       async getSubjectDetail(postData){
            await this.$store.dispatch('ContentModule/GET_COLUMN_DETAIL',postData);
            let data = this.$store.state.ContentModule.GET_COLUMN_DETAIL;
            this.columData = data.out.value
        },
      async saveSubject(postData){
          await this.$store.dispatch('ContentModule/POST_COLUMN_CONTXT_SAVE',postData);
          let data = this.$store.state.ContentModule.POST_COLUMN_CONTXT_SAVE;
          this.getSubjectList(this.searchData)
          this.$message.success("操作成功")
      },
      async arcWeightSave(postData){
        await this.$store.dispatch('ContentModule/POST_COLUMN_ADD_ARC',postData);
          let data = this.$store.state.ContentModule.POST_COLUMN_ADD_ARC;
          this.getSubjectList(this.searchData)
          this.weightDia = false;
          this.$message.success("操作成功")
      },
      addArtic(){
         let type=''
          if(this.columData.columnType =='07001101'){
              type='1'
          }else if(this.columData.columnType =='07001102'){
              type='2'
          }else if(this.columData.columnType=='07001103'){
              type=''
          }
          this.arcSeac.publishType=type;
          this.showDia = true;
      },
      closeBtnClick(bakData){
           this.showDia = false;
      },
      getContData(data){
        this.contTxtData = data;
        this.saveSubject({columnNo:this.columNo,contextIds:data.id})
      },
      handleCurrentFunc(val){
        this.searchData.pageNo = val;
        this.getSubjectList(this.searchData)
      },
      subjectBtnClick(row){
        console.log(row)
        let _this = this;
        let st= this.columData.state=='00001001'?1:-1;
        let txt=''
        if(st==-1){
          txt='是否启用该文章'
        }else{
          txt='是否禁用该文章'
        }
        myConfirm(_this,txt,function(){
            _this.arcWeightSave({keyId:row.keyId,state:row.state=='00001001'?'00001002':'00001001'})
        })
      },
      searchBtnClick(){
         this.getSubjectList(this.searchData)
      },
      clearBtnClick(){
          this.searchData.title=''
         this.getSubjectList(this.searchData)
      },
      weightBtn(row){
        this.clikData = row;
        this.weightDia = true;
      },
      weightBtnClick(){
        if(this.weightVal<1){
          this.$message.warning("权重设置不能低于1");
          return
        }
          this.arcWeightSave({keyId:this.clikData.keyId,weight:this.weightVal})
      }
  },
  created(){
    this.columNo = this.$route.query.columnNo;
    this.arcSeac.columnNo = this.columNo;
    this.searchData.columnNo = this.columNo;
    this.getSubjectList(this.searchData)
    this.getSubjectDetail({columnNo:this.columNo})
  }
};
</script>
<style lang="scss">
.columDetail-page {
  .columDetail-cont {
    
    .columDetail-top {
        @extend %pagecont;
      .columDe-top-ul {
        padding: 0px;
        margin: 0px;
        position: relative;
        display: inline-block;
        width: 900px;
        overflow: hidden;
        .top-li {
          display: inline-block;
          vertical-align: top;
          width: 300px;
          line-height: 1.8;
        }
      }
    }
    .columDetail-table {
      @extend %pagecont;
    }
  }
}
</style>