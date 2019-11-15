<!-- <h2>参数配置</h2> -->
<template>
  <div class="param-code-page">
    <myBrea :my-nav="brea"></myBrea>
    <div class="page-cont">
      <div class="page-left">
        <div style="margin-top:20px;margin-bottom:20px">
          <el-input style="width:200px" v-model='searchData.paraName' clearable @clear="clearFun" placeholder="请输入参数名称"></el-input>
          <el-button style="margin-left:20px" type="primary" plain @click="searchBtn">查询</el-button>
          <el-button style="float:right" type="primary" @click="addParaBtn">添加参数</el-button>
        </div>
        <div class="page-table">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="paraId" label="参数编码"></el-table-column>

            <el-table-column prop="paraName" label="参数名称"></el-table-column>
            <el-table-column prop="paraValue" label="参数值"></el-table-column>

            <el-table-column label="状态">
              <template slot-scope="scope">{{scope.row.state | codeStatus}}</template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="stateChange(scope.row)">{{scope.row.state | statusBtnTxt}}</el-button>
                <el-button type="text" size="small" @click='editParaBtn(scope.row)'>编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <myPackage
            v-if="packTotal"
            :key="packTotal"
            :pageTotal="packTotal"
            @handleCurrent="handleCurrentFunc"
          ></myPackage>
        </div>
      </div>
    </div>
    <!-- 添加参数 -->
    <el-dialog
      :visible.sync="paraDia"
      width="40%"
      :title='type == 1?"添加参数":"编辑参数"'
    >
      <div>
        <el-row :gutter="10">
          <el-col :span="4"><span class="my-span-notice">*</span>参数编码:</el-col>
          <el-col :span="12">
            <el-input
             v-model='paraData.paraId'
              maxlength="30"
              show-word-limit
              clearable
              :disabled='type == 2'
              placeholder="请输入内容"
            ></el-input>
            <p style="color:#999;font-size:12px;margin-top:5px">参数编码可输入，下划线、英文、数字</p>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="mt20">
          <el-col :span="4"><span class="my-span-notice">*</span>参数名称:</el-col>
          <el-col :span="12">
            <el-input
              v-model='paraData.paraName'
              maxlength="30"
              show-word-limit
              clearable
              placeholder="请输入内容"
            ></el-input>
          </el-col>
        </el-row>
         <el-row :gutter="10" class="mt20">
          <el-col :span="4"><span class="my-span-notice">*</span>参数值:</el-col>
          <el-col :span="12">
            <el-input
              v-model='paraData.paraValue'
              maxlength="30"
              show-word-limit
              clearable
              placeholder="请输入内容"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="mt20">
          <el-col :span="4"><span class="my-span-notice">*</span>参数状态:</el-col>
          <el-col :span="12">
            <el-radio v-model="paraData.state" label="00001001">正常</el-radio>
            <el-radio v-model="paraData.state" label="00001002">冻结</el-radio>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="paraDia = false">取 消</el-button>
        <el-button type="primary" @click="paraSureBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import myBrea from "../../../components/breadcrumb.vue";
import proUpload from "../../../components/proUpload.vue";
import myPackage from "../../../components/package.vue";
import { myConfirm } from "../../../comm/until";
export default {
  name: "complex",
  data() {
    return {
      brea: [{ txt: "系统管理", url: "/" }, { txt: "系统参数", url: "/" }],
      tableData: [],
      packTotal: 1,
      paraDia:false,
      paraData:{
          paraId:"",
          paraName:"",
          paraValue:"",
          state:""
      },
      searchData:{
          pageNo:"1",
          pageSize:"10",
          paraName:"",
      },
      type:"1",//1 添加 2 编辑
    };
  },
  components: {
    myBrea,
    proUpload,
    myPackage
  },
  methods: {
    async getParaList(){
        await this.$store.dispatch(
        "CodeModule/POST_PARA_CODE_LISY",
        this.searchData
        );
        let data = this.$store.state.CodeModule.POST_PARA_CODE_LISY;
        this.tableData = data.out.list;
        this.packTotal = parseInt(data.out.totalSize)

    },
    async paraSave(saveData){
        await this.$store.dispatch(
        "CodeModule/POST_PARA_CODE_SAVE",
        saveData
      );
      let data = this.$store.state.CodeModule.POST_PARA_CODE_SAVE;
      this.$message.success("操作成功");
      this.getParaList();
    },
    searchBtn(){
        this.getParaList();
    },
    clearFun() {
        this.searchData.paraName ='';
        this.getParaList();
    },
    handleCurrentFunc(val) {
        this.searchData.pageNo =val;
        this.getParaList();
    },
    addParaBtn(){
        this.paraData={
            paraId:"",
            paraName:"",
            paraValue:"",
            state:"00001001"
        }
        this.type = 1
        this.paraDia = true
    },
    paraSureBtn(){
        let reg = /^([a-zA-Z0-9_]+$)/i
        if(!this.paraData.paraId || !reg.test(this.paraData.paraId)){
            this.$message.warning("请输入正确的参数编码")
            return
        }
        if(!this.paraData.paraName){
            this.$message.warning("请输入参数名")
            return
        };
        if(!this.paraData.paraValue){
            this.$message.warning("请输入参数值")
            return
        };
        this.paraSave(this.paraData);
        this.paraDia = false;
    },
    editParaBtn(row){
        let newObj = Object.assign({},row);
        this.paraData = newObj;
        this.type = 2
        this.paraDia = true;
    },
    stateChange(row){
         let newObj = Object.assign({},row);
         this.paraData = newObj;
         this.paraData.state = this.paraData.state=='00001001'?'00001002':'00001001'
         let _this = this ;
         myConfirm(_this,'是否进行此操作？',function(){
            _this.paraSave(_this.paraData);
         })
    }
  },
  created() {
      this.getParaList();
  }
};
</script>
<style lang="scss">
.param-code-page {
  .page-cont {
    overflow: hidden;
    .page-left {
      padding: 20px;
      box-sizing: border-box;
      overflow: hidden;
      margin-top: 20px;
      background-color: #fff;
    }
  }
}
</style>