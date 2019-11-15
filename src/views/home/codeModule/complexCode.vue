<!-- <h2>复杂码表</h2> -->
<template>
  <div class="complex-code-page">
    <myBrea :my-nav="brea"></myBrea>
    <div class="page-cont">
      <div class="page-left">
        <el-divider content-position="left">复杂码表类型</el-divider>
        <div style="margin-top:20px;margin-bottom:20px">
          <el-input style="width:200px" v-model='typeSeach.codeTypeCpltName' clearable @clear="clearFun" placeholder="请输入类型名称"></el-input>
          <el-button style="margin-left:20px" type="primary" plain @click='searBtn'>查询</el-button>
          <el-button style="float:right" type="primary" @click="addTypeBtn">添加类型</el-button>
        </div>
        <el-table :data="tableDataLeft" stripe style="width: 100%">
          <el-table-column prop="codeTypeCpltId" label="类型编码"></el-table-column>

          <el-table-column prop="codeTypeCpltName" label="类型名称"></el-table-column>

          <el-table-column label="状态">
            <template slot-scope="scope">{{scope.row.state | codeStatus}}</template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click='statusChange(scope.row)'
              >{{scope.row.state | statusBtnTxt}}</el-button>
              <el-button type="text" size="small" @click="editTypeBtn(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="typeViewInfo(scope.row)">查看</el-button>
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
      <div class="page-right">
        <el-divider content-position="left">复杂码表属性</el-divider>
        <div style="overflow: hidden;margin-bottom:20px">
            <el-button type="primary" v-show="showAddAttr" @click="addAttrBtn">添加属性</el-button>

        </div>
        <div v-show="!showLoading" class='code-tree'>
            <el-tree
                :data="treeData"
                :props="defaultProps"
                accordion
               >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span style="line-height: 26px">{{ node.label }} [ {{data.state | codeStatus}} ]</span>
                    <span style="float: right;margin-left:15px" @click.stop="() => InfoEditor(node, data)">
                         <el-button size="mini">编辑</el-button>
                    </span>
                    <span style="float: right;" @click.stop="() => cAddInfo(node, data)">
                         <el-button size="mini">添加子级</el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <div v-show="showLoading" style="text-align:center;">
            <i style="font-size:20px" class='el-icon-loading'></i>
            <p>数据加载中</p>
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
            <el-col :span="12"><el-input :disabled='addTypeData.type!="save"' v-model='addTypeData.codeTypeCpltId' maxlength="30"  show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
            </el-row>
            <el-row :gutter="10" class="mt20">
            <el-col :span="4"><span class="my-span-notice">*</span>类型名称:</el-col>
            <el-col :span="12"><el-input v-model='addTypeData.codeTypeCpltName' maxlength="30"  show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="leftDia = false">取 消</el-button>
            <el-button type="primary" @click="addTypeSureBtn">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 添加属性 -->
    <el-dialog
      :title='!addAttrData.type=="save"?"添加属性":"编辑属性"'
      :visible.sync='rightDia'
      width="40%"
      >
        <div>
            <el-row :gutter="10" >
                <el-col :span="4"><span class="my-span-notice">*</span>类型编码:</el-col>
                <el-col :span="12"><el-input v-model='addAttrData.codeTypeCpltId' disabled maxlength="30" show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
            </el-row>
            <el-row :gutter="10" class="mt20">
                <el-col :span="4"><span class="my-span-notice">*</span>类型名称:</el-col>
                <el-col :span="12"><el-input v-model='codeTypeData.codeTypeCpltName' disabled maxlength="30" show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
            </el-row>
            <el-row :gutter="10" class="mt20">
                <el-col :span="4"><span class="my-span-notice">*</span>属性编码:</el-col>
                <el-col :span="12"><el-input :disabled='addAttrData.type!="save"' v-model='addAttrData.codeValueCpltId' maxlength="30" show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
            </el-row>
            <el-row :gutter="10" class="mt20">
                <el-col :span="4"><span class="my-span-notice">*</span>属性名称:</el-col>
                <el-col :span="12"><el-input v-model='addAttrData.codeValueCpltName' maxlength="30" show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
            </el-row>
             <el-row :gutter="10" class="mt20">
                <el-col :span="4"><span class="my-span-notice">*</span>属性顺序:</el-col>
                <el-col :span="12"><el-input v-model='addAttrData.nodeOrder' type="number" clearable placeholder="请输入内容"></el-input></el-col>
            </el-row>
            <el-row :gutter="10" class="mt20">
                <el-col :span="4"><span class="my-span-notice">*</span>属性状态:</el-col>
                <el-col :span="12">
                    <el-radio v-model="addAttrData.state" label="00001001">正常</el-radio>
                    <el-radio v-model="addAttrData.state" label="00001002">冻结</el-radio>

                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="rightDia = false">取 消</el-button>
            <el-button type="primary" @click="addAttrSureBtn">确 定</el-button>
        </span>
    </el-dialog>


  </div>
</template>
<script>
import myBrea from "../../../components/breadcrumb.vue";
import proUpload from "../../../components/proUpload.vue";
import myPackage from "../../../components/package.vue";
import { myConfirm ,translateDataToTree,transAeaTree} from "../../../comm/until";
export default {
  name: "complex",
  data() {
    return {
      brea: [{ txt: "系统管理", url: "/" }, { txt: "复杂码表", url: "/" }],
      tableDataLeft: [],
      typeSeach:{
          pageNo:1,
          pageSize:10,
          codeTypeCpltName:""
      },
      addTypeData:{
          codeTypeCpltId:"",
          codeTypeCpltName:"",
          type:"",//edit //save
          state:"",
      },
      codeTypeData:{},
      packTotalLeft:1,
      leftDia:false,
      treeData:[],
      defaultProps:{
        children: 'children',
        label: 'codeValueCpltName'
      },
      addAttrData:{
          codeValueCpltId:"",
          codeValueCpltName:"",
          parCodeValCpltId:"",
          codeTypeCpltId:"",
          nodeOrder:"",
          state:"",
      },
      rightDia:false,
      showAddAttr:false,
      showLoading:false,
      areaData:[]
    };
  },
  components: {
    myBrea,
    proUpload,
    myPackage
  },
  methods: {
    async comCodeTypeList() {
      await this.$store.dispatch(
        "CodeModule/POST_COM_CODE_TYPE_LIST",
        this.typeSeach
      );
      let data = this.$store.state.CodeModule.POST_COM_CODE_TYPE_LIST;
      this.tableDataLeft = data.out.list;
      this.packTotalLeft = parseInt(data.out.totalSize);
    },
    async comCodeTypeSave(saveData) {
      await this.$store.dispatch(
        "CodeModule/POST_COM_CODE_TYPE_SAVE",
        saveData
      );
      let data = this.$store.state.CodeModule.POST_COM_CODE_TYPE_SAVE;
      this.$message.success("操作成功");
      this.comCodeTypeList();
    },
    async comCodeInfoList() {
       if(this.codeTypeData.codeTypeCpltId == "area" && 
            this.areaData.length>0){
                this.showLoading = false;
                this.treeData = this.areaData;
                return
       }
      await this.$store.dispatch(
        "CodeModule/POST_COM_CODE_VALUE_LIST",
       {codeTypeCpltId:this.codeTypeData.codeTypeCpltId}
      );
      let data = this.$store.state.CodeModule.POST_COM_CODE_VALUE_LIST;
        this.treeData=[];
        this.showLoading = false;
        if(data.out.list.length>0){
            let _this= this;
            this.treeData= transAeaTree(data.out.list)
            if(this.codeTypeData.codeTypeCpltId == "area" ){
                this.areaData =  this.treeData
            }
            
        }
        
    },
    async comCodeAttrSave(saveData) {
      await this.$store.dispatch(
        "CodeModule/POST_COM_CODE_VALUE_SAVE",
        saveData
      );
      let data = this.$store.state.CodeModule.POST_COM_CODE_VALUE_SAVE;
      this.$message.success("操作成功");
      this.comCodeInfoList();
    },
    clearFun() {
        this.typeSeach.codeTypeCpltName= '';
        this.comCodeTypeList();
    },
    handleCurrentLeftFunc(val){
        this.typeSeach.pageNo= val;
        this.comCodeTypeList();
    },
    searBtn(){
       this.comCodeTypeList();
    },
    addTypeBtn(){
        this.addTypeData={
          codeTypeCpltId:"",
          codeTypeCpltName:"",
          type:"save",//edit //save
          state:"00001001"
        };
      this.leftDia = true;
    },
    addTypeSureBtn(){
        if(!this.addTypeData.codeTypeCpltId){
            this.$message.warning('请添加类型编码');
            return;
        }
        if(!this.addTypeData.codeTypeCpltName){
            this.$message.warning('请添加类型名称');
            return;
        }
        this.comCodeTypeSave(this.addTypeData);
        this.leftDia = false;
    },
    editTypeBtn(row){
        this.addTypeData = Object.assign({},row);
        this.addTypeData.type = 'edit'
        this.leftDia = true;
    },
    typeViewInfo(row){
        this.codeTypeData = row;
        this.showAddAttr= true;
        this.showLoading = true;
        this.comCodeInfoList();
    },
  
    addAttrBtn(){
        this.addAttrData={
          parCodeValCpltId:'',
          codeTypeCpltId:this.codeTypeData.codeTypeCpltId,
          codeValueCpltId:"",
          codeValueCpltName:"",
          nodeOrder:"",
          state:"",
          type:"save"
        },
        this.rightDia = true
    },
    cAddInfo(node,data){
        
        this.addAttrData={
          parCodeValCpltId:data.codeValueCpltId,
          codeTypeCpltId:data.codeTypeCpltId,
          codeValueCpltId:"",
          codeValueCpltName:"",
          nodeOrder:"",
          state:"",
          type:"save"
        },
        this.rightDia = true
    },
    InfoEditor(node, data){
        this.addAttrData={
          parCodeValCpltId:data.parCodeValCpltId,
          codeTypeCpltId:data.codeTypeCpltId,
          codeValueCpltId:data.codeValueCpltId,
          codeValueCpltName:data.codeValueCpltName,
          nodeOrder:data.nodeOrder,
          state:data.state,
          type:"edit"
        },
        this.rightDia = true
        
    },
    addAttrSureBtn(){
        this.comCodeAttrSave(this.addAttrData)
        this.rightDia = false
    },
    statusChange(row){
        let _this = this;
        let postData= Object.assign({},row);
        this.addTypeData = Object.assign({},row);
        postData.type = 'edit';
        postData.state = row.state =='00001001'?'00001002':'00001001';
        myConfirm(_this,"是否进行此操作？",function(){
            _this.comCodeTypeSave(postData)
        })
    }

  },
  created() {
      this.comCodeTypeList();
  }
};
</script>
<style lang="scss">
.complex-code-page {
  .page-cont {
    overflow: hidden;
    .page-left,
    .page-right {
      display: inline-block;
      vertical-align: top;
      width: calc(50% - 10px);
      padding: 20px;
      box-sizing: border-box;
      overflow: hidden;
      margin-top: 20px;
      background-color: #fff;
    }
    .page-right {
      float: right;
      .el-tree-node__content{
          padding: 5px 0;
      }
      .custom-tree-node{
          width: 300px;
          .el-button--mini{
              padding: 4px 4px;
          }
      }
    }
  }
}
</style>