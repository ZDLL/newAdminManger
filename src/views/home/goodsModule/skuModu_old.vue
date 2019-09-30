<template>
<!-- <div>SKU管理</div> -->
  <div class="skuModu-page">
    <div class="skuModu-cont">
      <div class="page-cont">
        <div class="page-cont-left">
          <h3>核心SKU</h3>
          <div>
            <el-button class="mt20" type="primary" @click="addBtnClick">添加</el-button>
          </div>

          <sku-tree
            :data="treeData"
            :treeProps="propsxxx"
            @enable-tree-data="getSelData"
            @add-tree-data="getAddData"
            @edr-tree-data="getEdrData"
            @mod-tree-data="getModData"
          ></sku-tree>
        </div>
        <div class="page-cont-right" >
            <!-- v-if="otherData && Object.keys(otherData).length>0" -->
          <div>
            <div class="skulist">
              <h3>
                主要SKU
                <span class="el-icon-circle-plus" @click="editorClick({skuType:'01021002'})"></span>
               
              </h3>
              <div class="list-itm">
                <div class="itm" v-for='(item,index) in otherData["01021002"]' :key="index">
                  <div class='itmType'>
                    <span>[ {{item.skuTypeName}} ]</span>
                    <span
                      style="float:right"
                      class="el-icon-circle-plus"
                      @click="childTypeClick(item)"
                    ></span>
                    <span class="enable" @click="typedelClick(item)">删除</span>
                    <span>( {{item.state=='00001001'?"启用":"禁用"}} )</span>
                    <!-- <span class='enable' @click="otherEnOrDis(item)">{{item.state=='00001001'?"启用":"禁用"}}</span>  -->

                  </div>
                  <div
                    v-show="item.skuInfos.length>0"
                    v-for="(itmm,inx) in item.skuInfos"
                    :key="inx"
                    >
                    <p class="itm-chen">
                      <!-- {{itmm.skuInfoName}} -->
                      <span style="margin-left:10px">{{itmm.skuInfoName}}</span>
                      <span class="infoBtn edir" @click="otherEdrData(itmm)">编辑</span>
                      <span
                        class="infoBtn"
                        @click="otherEnOrDis(item.skuInfos,itmm,inx)"
                      >{{itmm.state=='00001001'?"启用":"禁用"}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="skulist">
              <h3>
                次要SKU
                <span class="el-icon-circle-plus" @click="editorClick({skuType:'01021003'})"></span>
                <!--  -->
              </h3>
              <div class="list-itm">
                <div class="itm" v-for='(item,index) in otherData["01021003"]' :key="index">
                  <div class='itmType'>
                    <span>[ {{item.skuTypeName}} ] {{item.skuInfos.length}}</span>
                    <span style="float:right" class="el-icon-circle-plus"  @click="childTypeClick(item)"></span>
                    <span class="enable" @click="typedelClick(item)">删除</span>
                    <span>( {{item.state=='00001001'?"启用":"禁用"}} )</span>
                    <span class='enable' @click="otherEnOrDis(item)">{{item.state=='00001001'?"启用":"禁用"}}</span>
                  </div> 
                  <div
                    v-show="item.skuInfos.length>0"
                    v-for="(itmm,inx) in item.skuInfos"
                    :key="inx"
                  >
                    <p class="itm-chen">
                      <!-- {{itmm.skuInfoName}} -->
                      <span style="margin-left:10px">{{itmm.skuInfoName}}</span>
                      <span class="infoBtn edir" @click="otherEdrData(itmm)">编辑</span>
                      <span
                        class="infoBtn"
                         @click="otherEnOrDis(item.skuInfos,itmm,inx)"
                      >{{itmm.state=='00001001'?"启用":"禁用"}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="skulist">
              <h3>
                唯一SKU
                <span class="el-icon-circle-plus" @click="editorClick({skuType:'01021004'})"></span>
                <!--  -->
              </h3>
              <div class="list-itm">
                <div class="itm" v-for='(item,index) in otherData["01021004"]' :key="index">
                  <div class='itmType'>
                    <span>[ {{item.skuTypeName}} ]</span>
                    <span style="float:right" class="el-icon-circle-plus" @click="childTypeClick(item)"></span>
                    <span class="enable" @click="typedelClick(item)">删除</span>
                    <span>( {{item.state=='00001001'?"启用":"禁用"}} )</span>
                    <span class='enable' @click="otherEnOrDis(item)">{{item.state=='00001001'?"启用":"禁用"}}</span>
                  </div>
                  <div
                    v-show="item.skuInfos.length>0"
                    v-for="(itmm,inx) in item.skuInfos"
                    :key="inx"
                  >
                    <p class="itm-chen">
                      <!-- {{itmm.skuInfoName}} -->
                      <span style="margin-left:10px">{{itmm.skuInfoName}}</span>
                      <span class="infoBtn edir" @click="otherEdrData(itmm)">编辑</span>
                      <span
                        class="infoBtn"
                         @click="otherEnOrDis(item.skuInfos,itmm,inx)"
                      >{{itmm.state=='00001001'?"启用":"禁用"}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="skulist">
              <h3>
                参数SKU
                <span class="el-icon-circle-plus" @click="editorClick({skuType:'01021005'})"></span>
                <!--  -->
              </h3>
              <div class="list-itm">
                <div class="itm" v-for='(item,index) in otherData["01021005"]' :key="index">
                  <div class='itmType'>
                    <span>[ {{item.skuTypeName}} ]</span>
                    <span style="float:right" class="el-icon-circle-plus" @click="childTypeClick(item)"></span>
                    <span class="enable" @click="typedelClick(item)">删除</span>
                    <span>( {{item.state=='00001001'?"启用":"禁用"}} )</span>
                    <!-- <span class='enable' @click="otherEnOrDis(item)">{{item.state=='00001001'?"启用":"禁用"}}</span>  -->
                  </div>
                 
                  <div
                    v-show="item.skuInfos.length>0"
                    v-for="(itmm,inx) in item.skuInfos"
                    :key="inx"
                  >
                    <p class="itm-chen">
                      <!-- {{itmm.skuInfoName}} -->
                      <span style="margin-left:10px">{{itmm.skuInfoName}}</span>
                      <span class="infoBtn edir" @click="otherEdrData(itmm)">编辑</span>
                      <span
                        class="infoBtn"
                         @click="otherEnOrDis(item.skuInfos,itmm,inx)"
                      >{{itmm.state=='00001001'?"启用":"禁用"}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="skulist">
              <h3>
                商家SKU
                <span class="el-icon-circle-plus" @click="editorClick({skuType:'01021006'})"></span>
                <!--  -->
              </h3>
              <div class="list-itm">
                <div class="itm" v-for='(item,index) in otherData["01021006"]' :key="index">
                  <div class='itmType'>
                     <span>[ {{item.skuTypeName}} ]</span>
                      <span style="float:right" class="el-icon-circle-plus" @click="childTypeClick(item)"></span>
                      <span class="enable" @click="typedelClick(item)">删除</span>
                      <span>( {{item.state=='00001001'?"启用":"禁用"}} )</span>
                      <span class='enable' @click="otherEnOrDis(item)">{{item.state=='00001001'?"启用":"禁用"}}</span> 
                  </div>
                 
                  <div
                    v-show="item.skuInfos.length>0"
                    v-for="(itmm,inx) in item.skuInfos"
                    :key="inx"
                  >
                    <p class="itm-chen">
                      <span style="margin-left:10px">{{itmm.skuInfoName}}</span>
                      <span class="infoBtn edir" @click="otherEdrData(itmm)">编辑</span>
                      <span
                        class="infoBtn"
                        @click="otherEnOrDis(item.skuInfos,itmm,inx)"
                      >{{itmm.state=='00001001'?"启用":"禁用"}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sendbtn">
      <el-button type="primary" @click="saveSpuClick">生成SPU</el-button>
      <el-button type="primary" plain @click="saveGoodsClick">生成全部商品</el-button>
      <el-button type="primary" plain @click="saveGoodsGroupClick">生成全部商品组</el-button>
    </div>
    <!-- 左边添加按钮 -->
    <el-dialog title="添加SKU属性" :visible.sync="skudialog" width="40%">
      <div>
        <div class="mt20">
          <el-checkbox-group v-if="editorOpn.length>0" v-model="checkedEditor">
            <el-checkbox
              v-for="(itm,index) in editorOpn"
              :label="itm.skuTypeNo"
              :key="index"
            >{{itm.skuTypeName}}</el-checkbox>
          </el-checkbox-group>
          <p v-else class="nocont">没有数据！</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="skudialog = false">取 消</el-button>
        <el-button type="primary" @click="editorSkuBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 右边添加根类 -->
    <el-dialog title="添加SKU属性" :visible.sync="adddialog" width="40%">
      <div>
        <el-select v-model="addVale" @change="getNum" placeholder="请选择">
          <el-option
            v-for="item in typeOpt"
            :key="item.skuTypeNo"
            :label="item.skuTypeName"
            :value="item.skuTypeNo"
          ></el-option>
        </el-select>
        <div class="mt20">
          <el-checkbox-group v-if="typeArr.length>0" v-model="checkedAdd">
            <el-checkbox v-for="(itm,index) in typeArr" :label="itm.codeInfoValue" :key="index">
              <!-- {{itm.codeInfoName}} -->
              <div class="isCheck">
                <span style="margin-right:10px">{{itm.codeInfoName}}</span>
                <span>
                  <el-input style="width:80px" v-model="itm.nodeOrder" placeholder="输入顺序"></el-input>
                </span>
                <span>
                  <span style="margin-left:10px">是否拼接：</span>
                  <el-radio v-model="itm.isContact" label="1">是</el-radio>
                  <el-radio v-model="itm.isContact" label="2">否</el-radio>
                </span>
              </div>
            </el-checkbox>
          </el-checkbox-group>

          <!-- <el-checkbox-group v-if='typeArr.length>0' v-model="checkedAdd">
                            <el-checkbox v-for="(itm,index) in typeArr" :label="itm.codeInfoValue" :key="index">{{itm.codeInfoName}}</el-checkbox>
          </el-checkbox-group>-->
          <!-- <p v-else class='nocont'>没有数据！</p> -->
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialog = false">取 消</el-button>
        <el-button type="primary" @click="saveAddBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 右边添加子集弹层 -->
    <el-dialog title="添加SKU属性" :visible.sync="childDialog" width="40%">
      <div>
        <el-checkbox-group v-if="childOpn.length>0" v-model="childArr">
            <el-checkbox v-for="(itm,index) in childOpn" :label="itm.codeInfoValue" :key="index">
              <!-- {{itm.codeInfoName}} -->
              <div class="isCheck">
                <span style="margin-right:10px">{{itm.codeInfoName}}</span>
                <span>
                  <el-input style="width:80px" v-model="itm.nodeOrder" placeholder="输入顺序"></el-input>
                </span>
                <span>
                  <span style="margin-left:10px">是否拼接：</span>
                  <el-radio v-model="itm.isContact" label="1">是</el-radio>
                  <el-radio v-model="itm.isContact" label="2">否</el-radio>
                </span>
              </div>
            </el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="childDialog = false">取 消</el-button>
        <el-button type="primary" @click="childSaveAddBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
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
  </div>
</template>
<script>
import skuTree from "../../../components/mytree/skutree.vue";
import { myConfirm, translateDataToTree } from "../../../comm/until";
export default {
  name: "sku",
  data() {
    return {
      treeData: [],
      propsxxx: {
        children: "children",
        label: "skuInfoName"
      },
      edtorDialog:false,
      checkedAdd: [],
      skudialog: false,
      adddialog: false,
      childDialog:false,
      addVale: [],
      selcOpt: [],
      selcVale: [],
      typeOpt: [],
      typeArr: [],
      showOther: false,
      parSkuInfoNo: "",
      skuTypeNo: "",
      typenum: "",
      otherData: {},
      addPostData: {
        skuTypeNo: "",
        parSkuInfoNo: "",
        codeValues: ""
      },
      getListData: {
        skuType: "01021001",
        skuTypeNo: "",
        state: "00001001"
      },
      O_treeData: {},
      treeArr: [{ nodeOrder: "", isContact: "" }],
      skuTypeA: [],
      editorOpn: [],
      checkedEditor: [],
      childOpn:[],
      childArr:[],
      childData:{},
      editorData: {},
      otherInfoNo: "",
      otherTypeNo: "",
      editorVal:'',
      edtorOpn:[],
      edtorInfoNo:"",
      editorType:1
    };
  },
  components: {
    skuTree
  },
  methods: {
    async getParNolist(postData, callBack) {
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_SKU_TYPE_PARNO",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_SKU_TYPE_PARNO;
      // this.typeOpt = data.out.list
      callBack(data.out.list);
    },
    async getCodelist(postData, callBack) {//获取码值
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_CODES_LIST",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CODES_LIST;
      callBack(data.out[postData.codeTypes]);
      // this.typeArr=[];
      // this.skuTypeA = data.out[postData.codeTypes]
      // this.typeArr = data.out[postData.codeTypes]
    },
    async getAllCodelist(postData) {
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_CODES_LIST",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CODES_LIST;
      this.skuTypeA = data.out.skuType;
    },
    async postSavesku(postData) {
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_SKU_SAVE",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_SKU_SAVE;
      this.$message.success(data.message);
      this.adddialog = false;
     
      // this.postChildData({ skuType: "01021001" });
      // this.postSubData({skuInfoNo:this.otherInfoNo})
    },
    async postChildData(postData) {//右边主要sku
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_CHILD_LIST",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CHILD_LIST;
      if (data.out.list && data.out.list.length > 0) {
        this.treeData = translateDataToTree(data.out.list, {
          id: "skuInfoNo",
          parId: "parSkuInfoNo"
        });
      }
    },
    async postSubData(postData) {
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_SUB_LIST",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_SUB_LIST;
      if (Object.keys(data).length > 0) {
        this.showOther = true;
      }
      this.otherData = data.out;
    },
    async saveSpuData() {
      await this.$store.dispatch("GdsSkuTypeModule/POST_GDS_SAVE_SPU", {});
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_SAVE_SPU;
      this.$message.success(data.message);
    },
    async saveGoodsData() {
      await this.$store.dispatch("GdsSkuTypeModule/POST_GDS_SAVE_GOODS", {});
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_SAVE_GOODS;
      this.$message.success(data.message);
    },
    async saveGoodsGroupData() {
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_SAVE_GOODS_GROUP",
        {}
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_SAVE_GOODS_GROUP;
      this.$message.success(data.message);
    },
    async postgdsdis(postData) {
      //禁用
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_INFO_DISABLE",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_INFO_DISABLE;
      console.log("禁用成功");
      this.postChildData({ skuType: "01021001" });
      this.$message.success("禁用成功");
    },
    async postgdsenable(postData) {
      //启用
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_INFO_ENDABLE",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_INFO_ENDABLE;
      this.postChildData({ skuType: "01021001" });
      this.$message.success("启用成功");
      // this.$message.success(data.message)
    },
    async delGdsType(postData) {
      //删除类型
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_TYPE_DEL",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_TYPE_DEL;
      this.postChildData({ skuType: "01021001" });
      this.$message.success("启用成功");
      // this.$message.success(data.message)
    },
    async subType(postData) {
      //删除类型
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_INFO_SUBTYPES",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_INFO_SUBTYPES;
      this.editorOpn = data.out.list;
    },
    async saveEditor(postData,type) {
      //删除类型
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_INFO_SAVE",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_INFO_SAVE;
      this.$message.success("保存成功")
      this.edtorDialog = false;
      if(type==2){
          this.postSubData({skuInfoNo:this.otherInfoNo})
      }else{
           this.postChildData({ skuType: "01021001" });
      }
     
      
    },
    getSelData(data) {
      let _this = this;
      if (data.state == "00001001") {
        myConfirm(
          _this,
          "是否禁用该类型，禁用后该类型下所有子类型将不能使用！",
          function() {
            _this.postgdsdis({ skuTypeNo: data.skuTypeNo });
          }
        );
      } else {
        myConfirm(_this, "是否启用用该类型！", function() {
          _this.postgdsenable({ skuTypeNo: data.skuTypeNo });
        });
      }
    },
    otherEnOrDis(opt,data,indx) {
      let _this = this;
      if (data.state == "00001001") {
        myConfirm(
          _this,
          "是否禁用该类型，禁用后该类型下所有子类型将不能使用！",
          function() {
            _this.postgdsdis({ skuInfoNo: data.skuInfoNo });
            opt[indx].state='00001002'
          }
        );
      } else {
        myConfirm(_this, "是否启用用该类型！", function() {
          _this.postgdsenable({ skuInfoNo: data.skuInfoNo });
           opt[indx].state='00001001'
        });
      }
    },
    getAddData(data) {//右边sku type的点击增加
      if (data.skuType == "01021002") {
        this.adddialog = false;
        this.otherData = data;
        return;
      }
      this.adddialog = true;
      this.skuTypeNo = data.skuTypeNo;
      this.parSkuInfoNo = data.skuInfoNo;
      let _this = this;
      this.getParNolist({ parSkuTypeNo: data.skuTypeNo }, function(data) {
        _this.typeOpt = data;
      });
    },
    getNum(dataVal) {//下拉框点击切换
      this.skuTypeNo = dataVal;
      let _this = this;
      // _this.typeArr = [];
      //获取对应的码值
      this.getCodelist({ codeTypes: dataVal }, function(data) {
        _this.typeArr =[];
        _this.typeArr = data;
      });
    },
    saveAddBtn() {
      let codeArry = [];
      for (let i = 0; i < this.typeArr.length; i++) {
        for (let j = 0; j < this.checkedAdd.length; j++) {
          if (this.typeArr[i].codeInfoValue == this.checkedAdd[i]) {
            let mm = {
              //skuInfoNo:
              skuTypeNo: this.skuTypeNo,
              parSkuInfoNo: this.parSkuInfoNo,
              skuInfoName: this.typeArr[i].codeInfoValue,
              isContact: this.typeArr[i].isContact,
              nodeOrder: this.typeArr[i].nodeOrder
            };
            codeArry.push(mm);
            break;
          }
        }
      }
      console.log(codeArry);
      this.checkedAdd =[];
      this.typeOpt=[];
      this.postSavesku({ skus: JSON.stringify(codeArry) });
    },
    getEdrData(data) {
      this.otherInfoNo = data.skuInfoNo;
      this.otherTypeNo = data.skuTypeNo;
      this.postSubData({ skuInfoNo: data.skuInfoNo });
    },
    otherEdrData(data) {

      console.log("其它修改");
      this.edtorDialog = true;
      this.editorType=2;
       let _this = this;
       this.edtorInfoNo = data.skuInfoNo
       this.getCodelist({ codeTypes: data.skuTypeNo }, function(backData) {
        // _this.childOpn = [];
        _this.edtorOpn =[];
        _this.edtorOpn = backData;
      });
    },
    getModData(data) {
       this.edtorDialog = true;
       let _this = this;
       console.log(data)
       this.editorType=1;
       this.edtorInfoNo = data.skuInfoNo
       this.getCodelist({ codeTypes: data.skuTypeNo }, function(backData) {
        // _this.childOpn = [];
        _this.edtorOpn =[];
        _this.edtorOpn = backData;
      });
     
      // console.log(data)
    },
    editorBtn(){
        console.log("确定编辑")
        this.saveEditor({skuInfoNo:this.edtorInfoNo,skuInfoName:this.editorVal},this.editorType)
    },
    saveSkuBtn() {},
    addBtnClick() {
      this.addVale = [];
      this.adddialog = true;
      let _this = this;
      this.getParNolist({ parSkuTypeNo: "" }, function(data) {
        _this.typeOpt = data;
      });
      // this.getParNolist({parSkuTypeNo:""})
    },
    editorClick(data) {
      let _this = this;
      this.skudialog = true;
      this.subType({
        skuInfoNo: this.otherInfoNo,
        skuTypeNo: this.otherTypeNo,
        skuType: data.skuType
      });
    },
    typedelClick(data) {
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
    editorSkuBtn() {
        
      for (let j = 0; j < this.editorOpn.length; j++) {
        for (let i = 0; i < this.checkedEditor.length; i++) {
          if (this.editorOpn[j].skuTypeNo == this.checkedEditor[i]) {
            this.otherData[this.editorOpn[j].skuType].push(this.editorOpn[j]);
          }
          break;
        }
      }
      this.skudialog = false;
    },
    childTypeClick(data) {
      // this.checkedEditor =[];
      console.log(data)
      let _this = this;
      _this.childData = data
      this.otherTypeNo = data.skuTypeNo
      this.getCodelist({ codeTypes: data.skuTypeNo }, function(backData) {
        // _this.childOpn = [];
        console.log(backData)
        _this.childOpn = backData;
      });
      this.childDialog = true;
    },
    childSaveAddBtn(){
        let codeArry =[];
        for (let i = 0; i < this.childOpn.length; i++) {
            for (let j = 0; j < this.childArr.length; j++) {
            if (this.childOpn[i].codeInfoValue == this.childArr[j]) {
                    let mm = {
                    skuTypeNo: this.otherTypeNo,
                    parSkuInfoNo: this.otherInfoNo,
                    skuInfoName: this.childOpn[i].codeInfoValue,
                    isContact: this.childOpn[i].isContact,
                    nodeOrder: this.childOpn[i].nodeOrder
                    };
                    codeArry.push(mm);
                    // this.childData.skuInfos.push(this.childOpn[i])
                    break;
                }
            }
        }
        this.postSavesku({skus: JSON.stringify(codeArry)});
        this.childDialog = false;
    },
    saveSpuClick() {
      this.saveSpuData();
    },
    saveGoodsClick() {
      this.saveGoodsData(); //POST_GDS_SAVE_GOODS
    },
    saveGoodsGroupClick() {
      this.saveGoodsGroupData(); //POST_GDS_SAVE_GOODS
    }

    //saveGoodsGroupData
  },
  computed: {
    typeName() {
      let _this = this;
      return function(data) {
        let nam = "";
        _this.skuTypeA.map((val, index) => {
          if (val.codeInfoValue == data) {
            nam = val.codeInfoName;
          }
        });
        return nam;
      };
    }
  },
  created() {
    this.getAllCodelist({ codeTypes: "skuType" });
    this.postChildData({ skuType: "01021001" });//获取右边的主要sku
  }
};
</script>
<style lang="scss">
.skuModu-page {
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
        width: 60%;
      }
      .page-cont-left {
        width: 40%;
        //    border-right: 0.5px #dcdcdd solid;
      }
      &:after {
        position: absolute;
        content: "";
        left: 38%;
        width: 1px;
        height: 100%;
        background-color: #dcdcdc;
      }
    }
  }
  .sendbtn {
    margin-top: 20px;
    overflow: hidden;
    text-align: right;
  }
}
</style>