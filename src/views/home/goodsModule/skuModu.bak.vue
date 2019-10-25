<template>
<!-- <div>SKU管理</div> -->
  <div class="skuModu-page">
    <myBrea :my-nav='brea'></myBrea>
    <div class="skuModu-cont">
      <div class="page-cont">
        <div class="page-cont-left">
          <h3>核心SKU</h3>
          <div>
            <el-button class="mt20" type="primary" @click="getAddData({skuTypeNo:''})">添加</el-button>
          </div>

          <sku-tree
            :data="treeData"
            :treeProps="propsxxx"
            @enable-tree-data="getSelData"
            @add-tree-data="getAddData"
            @edr-tree-data="getEdrData"
            @mod-tree-data="getModData"
          >
          </sku-tree>
        </div>
        <div class="page-cont-right" >
            <!-- v-if="otherData && Object.keys(otherData).length>0" -->
          <div v-if='showOther'>
            <div class="skulist" v-show='otherSkuAll.length>0' v-for='(itm,inx) in otherSkuAll' :key='inx'>
              <h3 :skuInfoNo='itm.skuInfoNo' :skuTypeNo='itm.skuTypeNo'>
                {{itm.skuTypeName}}
                <!-- <span class="el-icon-circle-plus"></span> -->
              </h3>
              <div class="list-itm" v-show='itm.child.length>0'>
                <div class="itm"  v-for='(ittm,innx) in itm.child' :key='innx' >
                  <div class='itmType'>
                    <span>[ {{ittm.skuTypeName}} ]</span>
                    <span
                      style="float:right"
                      class="el-icon-circle-plus"
                      @click="getAddData(ittm,2)"
                    ></span>
                    <span class="enable" @click="typedelClick(ittm)">删除</span>
                    <span>( {{ittm.state=='00001001'?"启用":"禁用"}} )</span>
                  </div>
                  <div v-show='ittm.skuInfos.length>0'>
                    <p class="itm-chen" v-for='(im,ix) in ittm.skuInfos' :key='ix'>
                      <!-- {{itmm.skuInfoName}} -->
                      <span style="margin-left:10px">{{im.skuInfoName}}</span>
                      <span class="infoBtn edir" @click="getModData(im,2)">编辑</span>
                      <span
                        class="infoBtn"
                        @click="getSelData(im,2)"
                      > {{im.state=='00001001'?"禁用":'启用'}} 
                      </span>
                      <span
                       style="margin-left:10px"
                      >( {{im.state=='00001001'?"启用":'禁用'}} )
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <my-nocont v-else :cont-txt='"暂无数据"'></my-nocont>
        </div>
      </div>
       <div class="sendbtn">
        <el-button type="primary" @click="saveSpuClick">生成SPU</el-button>
        <el-button type="primary" plain @click="saveGroupClick">生成全部商品组</el-button>
        <el-button type="primary" plain @click="saveGdsClick">生成全部商品</el-button>
      </div>
    </div>
   
    <!-- 编辑的弹层 -->
    <el-dialog title="编辑SKU属性" :visible.sync="edtorDialog" width="40%">
      <div>
       <el-select v-model="editorVal" placeholder="请选择">
            <el-option
            v-for="item in edtorOpn"
            :key="item.codeInfoValue"
            :label="item.codeInfoName"
            :value="item.codeInfoValue">
            </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edtorDialog = false">取 消</el-button>
        <el-button type="primary" @click="editorBtn">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加的弹层 -->
     <el-dialog title="添加SKU属性" :visible.sync="addDialog" width="40%">
      <div>
          <el-select v-if="addType==1" v-model="addVal" placeholder="请选择" @change='selectChange'>
                <el-option
                v-for="item in addOpn"
                :key="item.skuTypeNo"
                :label="item.skuTypeName"
                :value="item.skuTypeNo"
              >
                </el-option>
            </el-select>
            <div v-if="addSelcOpn.length>0">
               <div class='selecData' 
                v-show="addSelcOpn.length>0" 
                v-for="(itm,inx) in addSelcOpn" 
                :key='inx'
                >
                  <!-- <input class='inpCheck' type="checkbox" :name='itm.codeInfoValue' :value='itm.codeInfoValue' :checked='inpCheck' @click="inpCheckClick"> -->
                  <span style="margin-right:10px">{{itm.codeInfoName}}</span>
                  <input style="width:90px" v-model="itm.nodeOrder" placeholder="输入顺序"/>
                  <span>
                    <span style="margin-left:10px">是否拼接：</span>
                    <el-radio-group v-model="itm.isContact" @change='radioChange(itm,inx)'>
                      <el-radio label="1">是</el-radio>
                      <el-radio label="2">否</el-radio>
                    </el-radio-group>
                  </span>
                  <i class='el-icon-success checkIcon' 
                  :class='itm.inpCheck==1?"inptActive":""' 
                  @click="inpCheckClick(itm,inx)"></i>
                </div>
            </div>
           
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addBtnSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import skuTree from "../../../components/mytree/skutree.vue";
import { myConfirm, translateDataToTree } from "../../../comm/until";
import myBrea from "../../../components/breadcrumb.vue"

export default {
  name: "sku",
  data() {
    return {
      brea:[{"txt":"商品中心","url":"/goods"},{"txt":"SKU管理","url":"/"}], 
      treeData: [],
      propsxxx: {
        children: "children",
        label: "skuInfoName"
      },
      treeDataInfo: [],
      treeDataInfoProps: {
        children: 'children',
        label: 'skuTypeName'
      },
      clickTxtData:{},
      //编辑
      edtorDialog:false,
      editorVal:"",
      edtorOpn:[],
      //其它sku
      otherSkuAll:[
        {
          sort:2,
          skuType:"01021002",
          skuTypeName:"主要SKU",
          skuInfoNo:"",
          skuTypeNo:"",
          child:[]
        },{
          sort:3,
          skuType:"01021003",
          skuTypeName:"次要SKU",
          skuInfoNo:"",
          skuTypeNo:"",
          child:[]
        },{
          sort:4,
          skuType:"01021004",
          skuTypeName:"唯一SKU",
          skuInfoNo:"",
          skuTypeNo:"",
          child:[]
        },{
          sort:5,
          skuType:"01021005",
          skuTypeName:"参数SKU",
          skuInfoNo:"",
          skuTypeNo:"",
          child:[]
        },{
          sort:6,
          skuType:"01021006",
          skuTypeName:"商家SKU",
          skuInfoNo:"",
          skuTypeNo:"",
          child:[]
        }
      ],
      showOther:false,
      //添加
      addDialog:false,
      addVal:'',
      addOpn:[],
      addSelcOpn:[],
      addType:1,//1 left 2 right
      testData:[]
    }
  },
  components: {
    skuTree,
    myBrea
  },
  methods:{
    //theCore
    async getTheCoreList(postData){//获取主要sku 数据
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_CHILD_LIST",
        postData
      );
      // await this.$store.dispatch('GdsSkuTypeModule/POST_GDS_LIST',postData);
      // let data2 = this.$store.state.GdsSkuTypeModule.POST_GDS_LIST

      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CHILD_LIST;
      // let list = data2.out.list;
      // let info = data.out.list;
      // this.testData = data.out.list
      // console.log(data.out.list)
      if (data.out.list && data.out.list.length > 0) {
        this.testData = data.out.list
        this.treeData = translateDataToTree(data.out.list, {
          id: "skuInfoNo",
          parId: "parSkuInfoNo"
        });
      }
      //  list.map((itm,inx)=>{
      //    itm.infoList=[];
      //     info.map((ittm,innx)=>{ 
      //       if(itm.skuTypeNo == ittm.skuTypeNo){
      //           itm.infoList.push(ittm);
      //       }
      //        return;
      //     })
      //   })
      //   this.treeDataInfo = translateDataToTree(list,{id:"skuTypeNo",parId:"parSkuTypeNo"});
    },
    async getGdsList(postData){
        await this.$store.dispatch('GdsSkuTypeModule/POST_GDS_LIST',postData);
        let data = this.$store.state.GdsSkuTypeModule.POST_GDS_LIST
        // await this.$store.dispatch(
        //   "GdsSkuTypeModule/POST_GDS_CHILD_LIST",
        //   postData
        // );
        let data2 = this.$store.state.GdsSkuTypeModule.POST_GDS_CHILD_LIST;
        let list = data.out.list;
        // let info = data2.out.list
       
        //  list.map((itm,inx)=>{
        //    itm.infoList=[];
        //   info.map((ittm,innx)=>{
        //     if(itm.skuTypeNo == ittm.skuTypeNo){
        //       itm.infoList.push(ittm)
        //     }
        //   })
        // })
        this.treeDataInfo = translateDataToTree(list,{id:"skuTypeNo",parId:"parSkuTypeNo"});
    },
    async disAble(postData) { //禁用
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_INFO_DISABLE",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_INFO_DISABLE;
      // console.log("禁用成功");
     
      if(this.addType ==2){
        this.postSubData({ skuInfoNo: this.clickTxtData.skuInfoNo });
      }else{
        this.getTheCoreList({ skuType: "01021001" });
      }
      this.$message.success("禁用成功");
    },
    async enAble(postData) { //启用
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_INFO_ENDABLE",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_INFO_ENDABLE;
      if(this.addType ==2){
        this.postSubData({ skuInfoNo: this.clickTxtData.skuInfoNo });
      }else{
        this.getTheCoreList({ skuType: "01021001" });
      }
      //  this.getTheCoreList({ skuType: "01021001" })
      //   this.postSubData({ skuInfoNo: this.clickTxtData.skuInfoNo });
      this.$message.success("启用成功");
    },
    async getCodelist(postData, callBack) {//获取码值
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_CODES_LIST",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CODES_LIST;
      // console.log(data)
      callBack(data.out[postData.codeTypes])
    },
    async saveEditor(postData) {//编辑类型
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_INFO_SAVE",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_INFO_SAVE;
      this.$message.success("保存成功")
      if(this.addType ==2){
        this.postSubData({ skuInfoNo: this.clickTxtData.skuInfoNo });
      }else{
        this.getTheCoreList({ skuType: "01021001" });
      }
      // this.getTheCoreList({ skuType: "01021001" });
      // this.postSubData({ skuInfoNo: this.clickTxtData.skuInfoNo });
      this.edtorDialog = false;
    },
    async postSubData(postData) {//获取非主要sku的数据
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_SUB_LIST",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_SUB_LIST;
      let cData={};
      cData = data.out;
      let _this = this;
      if( Object.keys(cData).length>0){
        this.showOther= true
      }else{
        this.showOther= false
      }
      this.otherSkuAll.map((itm,indx)=>{
        itm.skuInfoNo=_this.clickTxtData.skuInfoNo;
        itm.skuTypeNo=_this.clickTxtData.skuTypeNo;
        Object.keys(cData).forEach((key)=>{
          if(key == itm.skuType){
            itm.child = cData[key]
          }
        })
      })
    },
    async getParNolist(postData, callBack) {//根据父级id获取同级的类型
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_SKU_TYPE_PARNO",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_SKU_TYPE_PARNO;
      // this.typeOpt = data.out.list
      callBack(data.out.list);
    },
    async postSavesku(postData) {//添加保存
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_SKU_SAVE",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_SKU_SAVE;
      this.$message.success(data.message);
      if(this.addType==1){
        this.getTheCoreList({ skuType: "01021001" });
      }else{
        this.postSubData({ skuInfoNo: this.clickTxtData.skuInfoNo });
      }
      
      this.addDialog = false;
    },
    async delGdsType(postData) {//删除类型
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_TYPE_DEL",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_TYPE_DEL;
      this.postSubData({ skuInfoNo: this.clickTxtData.skuInfoNo });
      this.$message.success("操作成功");
      // this.$message.success(data.message)
    },
    async saveSpuData() {//生成spu
      await this.$store.dispatch("GdsSkuTypeModule/POST_GDS_SAVE_SPU", {});
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_SAVE_SPU;
      this.$message.success(data.message);
    },
    async saveGoodsData() {//生成全部商品
      await this.$store.dispatch("GdsSkuTypeModule/POST_GDS_SAVE_GOODS", {});
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_SAVE_GOODS;
      this.$message.success(data.message);
    },
    async saveGoodsGroupData() {//生成商品组
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_SAVE_GOODS_GROUP",
        {}
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_SAVE_GOODS_GROUP;
      this.$message.success(data.message);
    },
    getSortFun(order, sortBy) { //函数排序
        var ordAlpah = (order == 'asc') ? '>' : '<';
        var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
        return sortFun;
    },
    getSelData(tData,type){//启用禁用的点击事件
      let _this = this;
      if(type==2){
        this.addType = 2
      }else{
        this.addType=1
      }
      if (tData.state == "00001001") {
        myConfirm(
          _this,
          "是否禁用该类型，禁用后该类型下所有子类型将不能使用！",
          function() {
            _this.disAble({ skuInfoNo: tData.skuInfoNo });
          }
        );
      } else {
        myConfirm(_this, "是否启用该类型！", function() {
          _this.enAble({ skuInfoNo: tData.skuInfoNo });
        });
      }
    },
    getModData(tData,type){//编辑的点击事件
      // console.log("编辑")
      this.clickTxtData= tData;
      this.editorVal ='';
      if(type==2){
        this.addType = 2
      }else{
        this.addType=1
      }
      this.edtorDialog = true
      let _this=this;
      let typeNo ='';
      typeNo = tData.skuTypeNo
      this.getCodelist({ codeTypes:typeNo},function(backData){
        _this.edtorOpn = backData;
      })
    },
    editorBtn(){//编辑弹层确定
      // console.log("编辑确定");
      let ckeckData={};
      
      this.edtorOpn.map((itm,index)=>{
        if(itm.codeInfoValue == this.editorVal){
            ckeckData = itm;
        }
      })
      if(!ckeckData.codeInfoValue){
        this.$message.warning("请选择属性")
        return
      }
      this.saveEditor({skuInfoNo:this.clickTxtData.skuInfoNo,skuInfoName:ckeckData.codeInfoValue})
    },
    getEdrData(tData){//文字点击获取详情
      // console.log("文字点击")
      this.clickTxtData= tData;
      this.postSubData({ skuInfoNo: tData.skuInfoNo });
    },
    getAddData(tData,type){//添加的点击事件 type 1左边 2右边
      this.addVal = '';
      this.addSelcOpn =[];
      this.addDialog = true;
      let _this=this;
      if(!type){
          this.addType = 1
         _this.clickTxtData = tData;
          this.getParNolist({ parSkuTypeNo: tData.skuTypeNo }, function(backData) {
            _this.addOpn = backData;
          });
      }else if(type ==2){
            this.addType = 2
            this.addVal = tData.skuTypeNo;
            this.getCodelist({ codeTypes:tData.skuTypeNo},function(backData){
                backData.map((itm,inx)=>{
                    itm.inpCheck='-1'
                    itm.isContact ='1'
                    itm.nodeOrder = inx+1;
                  // _this.addSelcOpn.push(itm)
                })
               _this.addSelcOpn = backData;
            })
      }
     
    },
    // minAddClick(){},
    selectChange(){//下拉选择的切换事件
      let _this = this;
      this.getCodelist({ codeTypes: _this.addVal }, function(backData) {
        backData.map((itm,inx)=>{
            itm.inpCheck='-1'
            itm.isContact ='1'
            itm.nodeOrder = inx+1;
          //  _this.addSelcOpn.push(itm)
        });
        _this.addSelcOpn = backData;
      });
    },
    radioChange(data,index){//单选的切换
       let newArr = this.addSelcOpn;
      newArr[index].isContact=this.addSelcOpn[index].isContact;
      this.addSelcOpn=[];
      this.addSelcOpn = newArr;
    },
    inpCheckClick(data,index){//选中的切换
      let newArr = this.addSelcOpn;
      newArr[index].inpCheck=this.addSelcOpn[index].inpCheck==1?"-1":"1";
      this.addSelcOpn=[];
      this.addSelcOpn = newArr;
    },
    addBtnSure(){//添加的确定
     let _this=this;
      let codeArry =[];
      this.addSelcOpn.map((itm,inx)=>{
        if(itm.inpCheck==1){
            let mm = {
              skuTypeNo:_this.addVal,
              parSkuInfoNo: _this.clickTxtData.skuInfoNo,
              skuInfoName: itm.codeInfoValue,
              isContact: itm.isContact,
              nodeOrder: itm.nodeOrder
            };
            codeArry.push(mm)
        }
      })
     
      // console.log('添加确定');
      this.postSavesku({ skus: JSON.stringify(codeArry) });
    },
    typedelClick(data) {//类型删除
      let _this = this;
      if (data.state == "00001001") {
        this.$message.warning(
          "禁用后才能删除该类型，若要删除请先到SKU类型中禁用"
        );
        return;
      }
      myConfirm(
        _this,
        "是否删除该类型，删除后该类型下所有子集将失效！",
        function() {
          this.delGdsType({ skuTypeNo: data.skuTypeNo });
        }
      );
    },
    saveSpuClick(){
      this.saveSpuData();
    },
    saveGdsClick(){
      this.saveGoodsData();
    },
    saveGroupClick(){
      this.saveGoodsGroupData()
    }
  },
  created(){
    this.getTheCoreList({ skuType: "01021001" })
    // this.getGdsList();
    this.otherSkuAll = this.otherSkuAll.sort(this.getSortFun('asc','sort'))// 'desc':'降序'; 'asc':'升序'
  }
};
</script>
<style lang="scss">
.skuModu-page {
   
  .skuModu-cont{
    @extend %pagecont;
  }
  .el-checkbox {
    border: 1px #dcdcdd solid;
    padding: 10px;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 10px;
    input {
      height: 30px;
      font-size: 12px;
    }
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #333;
  }
  .skuModu-cont {
    h3 {
      font-size: 16px;
      font-weight: 600;
    }
    .page-cont-right {
      .skulist {
        .el-icon-circle-plus {
          font-size: 20px;
        }
        margin-top: 20px;
        width: 100%;
        overflow: hidden;
        .enable {
          padding: 2px 6px;
          background-color: #f5f5f5;
          font-size: 12px;
          color: #666;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          overflow: hidden;
          float: right;
          margin-right: 10px;
        }
        .infoBtn {
          padding: 2px 6px;
          background-color: #fff;
          font-size: 12px;
          color: #999;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          overflow: hidden;
          float: right;
          margin-right: 10px;
        }
        .list-itm {
          margin-top: 20px;
          width: 300px;
          padding: 10px;

          font-size: 14px;
          .itm {
            border: 1px #dcdcdc solid;
            border-radius: 4px;
            overflow: hidden;
            padding: 10px;
            margin-top: 20px;
          }
          .itm-chen {
            display: inline-block;
            margin-top: 20px;
            // width: 270px;
            width: 100%;
            // margin-top: 20px;
            // padding: 5px;
            padding: 5px 0;
            // padding-left: 5px;
            // border: 1px #dcdcdc solid;
            // margin: 10px 5px;
            background-color: #f5f5f5;
          }
          // height: 38px;
          // line-height: 38px;
        }
      }
    }

    .page-cont {
      margin-top: 20px;
      position: relative;
      .page-cont-left,
      .page-cont-right {
        display: inline-block;
        vertical-align: top;
        //    width: 50%;
        box-sizing: border-box;
        padding-left: 10px;
      }
      .page-cont-right {
        width: 50%;
      }
      .page-cont-left {
        width: 50%;
        .sku-min-tree{
          margin-top: 20px;
          .tree-label{
            width: 320px;
          }
        }
        //    border-right: 0.5px #dcdcdd solid;
      }
      &:after {
        position: absolute;
        content: "";
        left: 48%;
        width: 1px;
        height: 100%;
        background-color: #dcdcdc;
      }
    }
  }
  .selecData{
    // display: inline-block;
    min-width: 100px;
    max-width: 350px;
    vertical-align: top;
    font-size: 14px;
    color: #333;
    border:1px #dcdcdc solid;
    padding: 10px;
    border-radius: 4px;
    // overflow: hidden;
    margin-top:20px;
    position: relative;
    input{
      border: none;
      border-bottom: 1px #dcdcdc solid;
      padding: 3px;
    }
    .checkIcon{
      font-size: 20px;
      position: absolute;
      bottom: -4px;
      color: #999;
      z-index: 2;
    }
    .inptActive{
      color: #409EFF;
    }
  }
  .inpCheck{
    width: 16px;
    height: 16px;
    margin-right: 10px;
    .el-checkbox__inner{
      display: inline-block;
      position: relative;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      background-color: #fff;
      z-index: 1;
      transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
    }
  }
  .sendbtn {
    margin-top: 20px;
    overflow: hidden;
    text-align: right;
  }
}
</style>