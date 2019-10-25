<template>
  <div class="articleCom-page" v-show='dataChoose'>
    <!-- <el-dialog title="数据选择" :visible.sync="dataChoose" width="60%"> -->
      <div class='articleCom-cont'>
        <h2>数据选择</h2>
        <div class="top">
          <el-select v-model="searchData.categoryId" clearable @clear="clearBtn" placeholder="请选择">
            <el-option
              v-for="item in subjectOpn"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-input
            placeholder="输入文章关键词搜索"
            v-model="searchData.title"
            clearable
            @clear="clearBtn"
            style="width:200px;margin-left:20px"
          ></el-input>
          <el-button style="float:right" type="primary" plain @click="actSearchBtnClick">搜索</el-button>
        </div>
        <div class="arct-table">
            <el-divider content-position="left">文章列表</el-divider>
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="title" label="文章"></el-table-column>
              <el-table-column prop="publishTypeName" label="类型"></el-table-column>

              <el-table-column label="所属专栏">
                <template slot-scope="scope">
                  {{scope.row.categoryName}}
                </template>
              </el-table-column>

              <el-table-column label="作者">
                <template slot-scope="scope">{{scope.row.author}}</template>
              </el-table-column>
              <el-table-column label="上传时间">
                <template slot-scope="scope">
                  {{scope.row.createTime | dateformat}}
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button :class="scope.row.isCheck==1 ?'choseAct':''" size="small" @click="contChoose(scope.row,scope.$index)">
                    {{scope.row.isCheck==1?'已选择':"选择"}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>
        </div>
        <span class="articleCom-footer mt30">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="sureDialog">确 定</el-button>
        </span>
      </div>
      
    <!-- </el-dialog> -->
  </div>
</template>
<script>
import myPackage from '../../../components/package.vue'
export default {
  name: "artc",
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    onlyOne:{
      type:String,
      default:"-1"
    },
    arcSearch:{
      type:Object,
      default:{
        pageNo:"1",
        pageSize:10,
        categoryId:"",
        publishType:"",
        title:"",
        channelNo:"",
        columnNo:"",
        bannerNo:""
      }
    }
    // typeNo:{

    // }
  },
  data() {
    return {
      input: "",
      subjectOpn: [],
      dataChoose: true,
      tableData:[],
      packTotal:1,
      contData:{},
      id:"",
      one:this.onlyOne,
      searchData:this.arcSearch
      // searchData:{
      //   pageNo:"1",
      //   pageSize:10,
      //   categoryId:"",
      //   publishType:"",
      //   title:"",
      // }
    };
  },
  components:{
    myPackage
  },
  methods: {
    async getSubjectList(postData){
        await this.$store.dispatch('ContentModule/POST_SUBJECT_LIST',postData);
        let data = this.$store.state.ContentModule.POST_SUBJECT_LIST;
        this.tableData = data.out.list;
        this.packTotal = parseInt(data.out.totalSize);
    },
    async getCatList(postData){
        await this.$store.dispatch('ContentModule/GET_CATEGORY_LIST',postData);
        let data = this.$store.state.ContentModule.GET_CATEGORY_LIST;
        this.subjectOpn = data.out.list;
        // this.packTotal = parseInt(data.out.totalSize);
    },
    clearBtn() {},
    closeDialog(){
        this.$emit("closeDia",{dataChoose:this.dataChoose})
    },
    handleCurrentFunc(val){
      this.searchData.pageNo = val;
      this.getSubjectList(this.searchData)
    },
    contChoose(row,inx){
      let newData = this.tableData;
      if(this.one == '-1'){
        if(newData[inx].isCheck == 1){
          newData[inx].isCheck =0
        }else{
          newData[inx].isCheck =1
        }
      }else{
        newData.map((itm)=>{
          itm.isCheck =0
        });
        newData[inx].isCheck =1
      }
      
      this.tableData =[];
      this.tableData = newData;
      this.id= row.id;
      this.contData = row;
    },
    sureDialog(){
      this.$emit("closeDia",{dataChoose:this.dataChoose})
      let idArry=[];
      this.tableData.map((itm)=>{
        if(itm.isCheck == 1){
          idArry.push(itm.id)
        }
      });
      console.log(idArry.join(","))
      this.$emit("sureDia",{id:idArry.join(","),category:this.contData.category,name:this.contData.title})
    },
    actSearchBtnClick(){
       this.getSubjectList(this.searchData)
    }
  },
  created(){
    let da={
      // channelNo:"",
      // columnNo:"",
      categoryId:"",
      title:"",
    }
    this.getSubjectList(this.searchData)
    this.getCatList({})
  }
};
</script>
<style lang="scss">
    .articleCom-page{
        width:100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        left:0;
        z-index: 200;
        position: absolute;
        top:0px;
        background: rgba(0,0,0,.5);
    }
    .articleCom-cont{
        position: absolute;
        top:20%;
        width: 70%;
        padding: 30px;
        box-sizing: border-box;
        left: 15%;
       background-color: #fff;
       h2{
           font-weight: 500;
           margin-bottom: 30px;
       }
        .arct-table{
            overflow: hidden;
        }
        .articleCom-footer{
            display: block;
            margin-top: 30px;
            text-align: right;
        }
        .choseAct{
          color: #FFF;
          background-color: #409EFF;
          border-color: #409EFF;
        }
    }
</style>