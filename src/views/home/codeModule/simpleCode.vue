<!-- <h2>简单码表</h2> -->
<template>
  <div class="simple-code-page">
    <myBrea :my-nav="brea"></myBrea>
    <div class="simple-code-cont">
      <div class="simple-code-left">
        <el-divider content-position="left">简单码表类型</el-divider>
        <div style="margin-top:20px;margin-bottom:20px">
          <el-input style="width:200px" v-model='typeSeach.codeTypeName' clearable @clear='clearFun' placeholder="请输入类型名称"></el-input>
          <el-button style="margin-left:20px" type="primary" plain @click="searchBtn">查询</el-button>
          <el-button style="float:right" type="primary" @click="addTypeBtn">添加类型</el-button>
        </div>
        
        <div class="simple-code-table">
          <el-table :data="tableDataLeft" stripe style="width: 100%">
            <el-table-column prop="codeTypeId" label="类型编码" ></el-table-column>

            <el-table-column prop="codeTypeName" label="类型名称"></el-table-column>

            <el-table-column label="状态">
              <template slot-scope="scope">{{scope.row.status | codeStatus}}</template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="codeTypeStatusBtn(scope.row)">{{scope.row.status | statusBtnTxt}}</el-button>
                <el-button type="text" size="small" @click="codeTypeEdiBtn(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="viewBtn(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <myPackage
            v-if="packTotalLeft"
            :key="packTotalLeft"
            :pageTotal="packTotalLeft"
            @handleCurrent="handleCurrentLeftFunc"
          ></myPackage>
        </div>
      </div>
      <div class="simple-code-right">
        <el-divider content-position="left">简单码表属性</el-divider>
        <div style="margin-top:20px;margin-bottom:20px">
          <el-button v-show='showRight' type="primary" @click="addValBtn">添加属性</el-button>
        </div>
        <div class="simple-code-table">
          <el-table :data="tableDataRight" stripe style="width: 100%">
            <el-table-column prop="codeTypeId" label="属性编码"></el-table-column>

            <el-table-column prop="codeInfoName" label="属性名称"></el-table-column>

            <el-table-column label="状态">
              <template slot-scope="scope">{{scope.row.status | codeStatus}}</template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <!-- <el-button type="text" size="small">删除</el-button> -->
                <el-button type="text" size="small" @click="attrChangeBtn(scope.row)">{{scope.row.status | statusBtnTxt}}</el-button>
                <el-button type="text" size="small" @click="ediAttrBtn(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <myPackage
            v-if="packTotalRight"
            :key="packTotalRight"
            :pageTotal="packTotalRight"
            @handleCurrent="handleCurrentRightFunc"
          ></myPackage>
        </div>
      </div>
    </div>
    <!-- 添加类型 -->
    <el-dialog
      :title='addTypeData.type=="save"?"添加类型":"编辑类型"'
      :visible.sync='leftDia'
      width="40%"
      >
     <div>
        <el-row :gutter="10" >
          <el-col :span="4"><span class="my-span-notice">*</span>类型编码:</el-col>
          <el-col :span="12"><el-input :disabled='addTypeData.type!="save"' v-model='addTypeData.codeTypeId' maxlength="30"  show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
        </el-row>
         <el-row :gutter="10" class="mt20">
          <el-col :span="4"><span class="my-span-notice">*</span>类型名称:</el-col>
          <el-col :span="12"><el-input v-model='addTypeData.codeTypeName' maxlength="30"  show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
        </el-row>
     </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="leftDia = false">取 消</el-button>
        <el-button type="primary" @click="addTypeSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加属性 -->
     <el-dialog
      :title='addInfoData.type=="save"?"添加属性":"编辑属性"'
      :visible.sync='rightDia'
      width="40%"
      >
     <div>
        <el-row :gutter="10" >
          <el-col :span="4"><span class="my-span-notice">*</span>属性编码:</el-col>
          <el-col :span="12"><el-input :disabled='addInfoData.type!="save"' v-model='addInfoData.codeInfoValue' maxlength="30"  show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
        </el-row>
         <el-row :gutter="10" class="mt20">
          <el-col :span="4"><span class="my-span-notice">*</span>属性名称:</el-col>
          <el-col :span="12"><el-input v-model='addInfoData.codeInfoName' maxlength="30"  show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
        </el-row>
     </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightDia = false">取 消</el-button>
        <el-button type="primary" @click="addValSure">确 定</el-button>
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
  components: {
    myBrea,
    proUpload,
    myPackage
  },
  data() {
    return {
      packTotalLeft: 1,
      packTotalRight: 1,
      brea: [{ txt: "系统管理", url: "/goods" }, { txt: "简单码表", url: "/" }],
      tableDataLeft:[],
      tableDataRight:[],
      typeSeach:{
        pageNo:1,
        pageSize:10,
        codeTypeName:""
      },
      leftDia:false,
      rightDia:false,
      addTypeData:{
        codeTypeId:"",
        codeTypeName:"",
        type:""//edit //save
      },
      
      addInfoData:{
        codeInfoValue:"",
        codeTypeId:"",
        codeInfoName:"",
        type:""//edit //save
      },
      infoSeach:{
        pageNo:1,
        pageSize:10,
        codeTypeId:'',
      },
      showRight:false,
      // codeTypeId:""
    };
  },
  methods: {
    async CodeTypeList(){
      await this.$store.dispatch("CodeModule/POST_CODE_TYPE_LIST",this.typeSeach)
      let data = this.$store.state.CodeModule.POST_CODE_TYPE_LIST;
      this.tableDataLeft = data.out.list;
      this.packTotalLeft = parseInt(data.out.totalSize)
    },
    async addCodeType(addTypeData){
      await this.$store.dispatch("CodeModule/POST_ADD_CODE_TYPE",addTypeData)
      let data = this.$store.state.CodeModule.POST_ADD_CODE_TYPE;
      this.CodeTypeList()
    },
    async codeChangeStatus(typeData){
      await this.$store.dispatch("CodeModule/GET_CODE_TYPE_STATUS",typeData)
      let data = this.$store.state.CodeModule.GET_CODE_TYPE_STATUS;
      this.$message.success("操作成功")
      this.CodeTypeList()
    },
    async CodeValueList(){
      await this.$store.dispatch("CodeModule/POST_CODE_INFO_LIST",this.infoSeach)
      let data = this.$store.state.CodeModule.POST_CODE_INFO_LIST;
      this.tableDataRight = data.out.list;
      this.packTotalRight = parseInt(data.out.totalSize)
    },
    async addCodeInfo(addInfoData){
      await this.$store.dispatch("CodeModule/POST_ADD_CODE_INFO",addInfoData)
      let data = this.$store.state.CodeModule.POST_ADD_CODE_INFO;
      this.CodeValueList()
    },
    async codeInfoAttrChange(infoData){
      await this.$store.dispatch("CodeModule/POST_CODE_ATTR_STATUS",infoData)
      let data = this.$store.state.CodeModule.POST_CODE_ATTR_STATUS;
      this.CodeValueList()
    },
    
    clearFun(){
        this.typeSeach.codeTypeName = '';
        this.CodeTypeList()
    },
    handleCurrentLeftFunc(val){
      this.typeSeach.pageNo = val
      this.CodeTypeList()
    },
    searchBtn(){
      this.CodeTypeList()
    },
    addTypeBtn(){
      this.addTypeData={
        codeTypeId:"",
        codeTypeName:"",
        type:"save"//edit
      };
      this.leftDia = true;
    },
    addTypeSure(){
      if(!this.addTypeData.codeTypeId){
        this.$message.warning("请填写类型编码");
        return;
      }
      if(!this.addTypeData.codeTypeName){
        this.$message.warning("请填写类型名称");
        return;
      }
     
      this.addCodeType(this.addTypeData)
     
      this.leftDia = false
    },
    codeTypeEdiBtn(row){
      let newObj=Object.assign({},row)
      this.addTypeData = newObj;
      this.addTypeData.type ='edit';
      this.leftDia = true;
    },
    codeTypeStatusBtn(row){
      let _this = this;
      myConfirm(_this,'是否进行此操作？',function(){
        _this.codeChangeStatus({
          codeTypeId:row.codeTypeId
        })
      })
    },
    viewBtn(row){
      this.infoSeach.codeTypeId = row.codeTypeId;
      this.showRight = true
      this.CodeValueList()
    },
    addValBtn(){
      this.addInfoData={
        codeInfoValue:"",
        codeInfoName:"",
        codeTypeId:this.infoSeach.codeTypeId,
        type:"save"//edit //save
      }
      this.rightDia = true;
    },
    addValSure(){
      if(!this.addInfoData.codeInfoValue){
          this.$message.warning("请填写属性编码")
        return
      }
      if(!this.addInfoData.codeInfoName){
          this.$message.warning("请填写属性名称")
        return
      }
      this.addCodeInfo(this.addInfoData)
      this.rightDia = false;
    },
    handleCurrentRightFunc(val){
      this.infoSeach.pageNo= val;
      this.CodeValueList()
    },
    ediAttrBtn(row){
      let newObj=Object.assign({},row)
      this.addInfoData= newObj;
      this.addInfoData.type = 'edit';
      this.rightDia = true;
    },
    attrChangeBtn(row){
      let _this = this;
      myConfirm(_this,'是否进行此操作？',function(){
        _this.codeInfoAttrChange({codeInfoValue:row.codeInfoValue})
      })
    }
  },
  created() {
    this.CodeTypeList()
  }
};
</script>
<style lang="scss">
.simple-code-page {
  //  @extend %pagecont;
  .simple-code-cont {
    overflow: hidden;
    .simple-code-left,
    .simple-code-right {
      display: inline-block;
      vertical-align: top;
      width: calc(50% - 10px);
      padding: 20px;
      box-sizing: border-box;
      overflow: hidden;
      // border: 1px red solid;
      margin-top: 20px;
      background-color: #fff;
    }
    .simple-code-right {
      float: right;
    }
  }
}
</style>