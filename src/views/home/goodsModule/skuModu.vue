<template>
<!-- <div>SKU管理</div> -->
  <div class="skuModu-page">
    <myBrea :my-nav='brea'></myBrea>
     <div class="skuModu-cont" v-if='Object.keys(skuLinkAgeData).length>0'>
         <ul class='typeUl' v-for='(itm,inx) in Object.keys(skuLinkAgeData)' :key='inx'>
            <!-- <div class='seInp'>
                <input type="text" >
            </div> -->
             <div v-if='Object.keys(skuLinkAgeData[itm]).length>0' >
                
                <div v-for='(ittm,innx) in skuLinkAgeData[itm]' :key='innx'>
                    <div class='isScoll' v-if='ittm.skus && ittm.skus.length>0'>
                        <li :class='actLi == im.skuInfoNo?"liAct":""' v-for='(im,ix) in ittm.skus' :key='ix'>
                            <!-- {{itm}} -->
                            <span>{{im.skuInfoName}}</span>
                            <span class='floatR' @click="infoClick(im)">
                                <i  class='el-icon-arrow-right'></i>
                            </span>
                            <div class='floatR'>
                                <span @click="statusChange(im,inx)">{{im.state=='00001001'?"禁用":"启用"}}</span>
                                <span style="margin-left:10px" @click="typeEditor(ittm,im,inx)">编辑</span>
                            </div>
                        </li>
                    </div>
                    <p style="height:50px;text-align: center;line-height: 50px;" v-else>暂无数据</p>
                    <el-button class='seBtn' @click="typeAddBtn(ittm,inx)">添加</el-button>

                </div>
             </div>
             <p style="height:50px;text-align: center;line-height: 50px;" v-else>暂无数据</p>
            
        </ul>

        <h2 class='hT'>规格属性</h2>
        <h3>已选择：{{allName.join("-")}}</h3>
        <ul class='typeUl' :key='showOther' v-show='showOther' style="width:300px">
             <!-- <div class='seInp'>
                   <input type="text" >
             </div> -->
             <div class='collaps'>
                <div class='collapsC isScoll'>
                    <el-collapse v-model="activeName" accordion>
                        <el-collapse-item  v-for='(itm,inx) in otherSku' :key='inx' :name="inx">
                            <template slot="title">
                            {{itm.skuTypeName}}<i @click="addTypeBtn(itm)" class="header-icon el-icon-circle-plus"></i>
                            </template>
                            <div v-if='itm.arry.length>0'>
                                <div class='pad10' :class='actLi == ittm.skuTypeNo?"liAct":""' v-for='(ittm,innx) in itm.arry' :key='innx'>
                                    <span >{{ittm.skuTypeName}}</span>
                                    <span class='floatR' @click="otherInfoClick(ittm)" >
                                        <i  class='el-icon-arrow-right'></i>
                                    </span>
                                    <span class="floatR" @click="infoDel(ittm)">删除</span>
                                    <!-- <span class="floatR">启用</span>
                                    <span class="floatR" style="margin-left:10px" @click="editorTwo(ittm)">编辑</span> -->
                                </div>
                            </div>
                            <p v-else>暂无数据</p>
                        </el-collapse-item>
                    </el-collapse>
                </div>
             </div>
        </ul>
        <ul class='typeUl' v-show='lastShow' style="width:300px;">
             <!-- <div class='seInp'>
                   <input type="text" >
             </div> -->
             <div class="isScoll" v-if='otherSkuList.length>0'>
                 <li v-for="(itm,inx) in otherSkuList" :key='inx'>
                    <span>{{itm.skuInfoName}}</span>
                    <div class='floatR'>
                        <span @click="statusChange(itm,inx)">{{itm.state=="00001001"?"禁用":"启用"}}</span>
                        <span style="margin-left:10px" @click="otherInfoEditor(itm,inx)">编辑</span>
                    </div>
                </li>
             </div>
             <p v-else style="text-align: center;height: 40px;line-height: 40px;">点击重新获取</p>
             <el-button class='seBtn' @click="addLastInfo">添加</el-button>
        </ul>
        <div class="sendbtn">
            <el-button type="primary" @click="saveSpuClick">生成SPU</el-button>
            <el-button type="primary" plain @click="saveGroupClick">生成全部商品组</el-button>
            <el-button type="primary" plain @click="saveGdsClick">生成全部商品</el-button>
        </div>
     </div>
      
     <!-- 添加SKU属性 -->
    <el-dialog
        title="添加SKU属性"
        :visible.sync='skuTypeAdd'
        width="40%"
        >
       <div>
           <div class='addTypediv' style="width:300px">{{addTypeData.skuTypeName}}</div>
           <el-input class='mt20' style="width:300px" v-model="addTypeData.skuInfoName" placeholder="请输入SKU信息名称"></el-input><br/>
           <el-input class='mt20' style="width:300px" v-model="addTypeData.skuInfoNameEn" placeholder="请输入SKU信息英文名称"></el-input><br/>
           <el-input class='mt20' style="width:300px" v-model="addTypeData.nodeOrder" placeholder="节点顺序"></el-input><br/>
            <el-select class='mt20' v-model="addTypeData.isContact" placeholder="是否拼接">
                <el-option
                v-for="item in joinOpn"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
       </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="skuTypeAdd = false">取 消</el-button>
            <el-button type="primary" @click="skuTypeBtn">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 选择主要SKU类型 -->
    <el-dialog
        title="选择主要SKU类型"
        :visible.sync="chooseSku"
        width="40%"
       >
        <div>
            <ul class='chooseUl'>
                <li :class='itm.isUsed==1?"liActive":""' v-for='(itm,inx) in subTypeList' :key='inx'  @click="typeAddLi(itm,inx)">
                    {{itm.skuTypeName}}
                    <i class='el-icon-check liCheck'></i>
                </li>
            </ul>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="chooseSku = false">取 消</el-button>
            <el-button type="primary" @click="chooseBtnClick">确 定</el-button>
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
      skuTypeSortData:[], 
      skuTypeLen:0,
      skuLinkAgeData:{},
      oldData:{},
      activeName: ['1'],
      skuTypeAdd:false,
      chooseSku:false,
      skuLen:0,
      //其它sku
      otherSku:[
        {
          sort:2,
          skuType:"01021002",
          skuTypeName:"主要SKU",
          arry:[]
         
        },{
          sort:3,
          skuType:"01021003",
          skuTypeName:"次要SKU",
           arry:[]
        },{
          sort:4,
          skuType:"01021004",
          skuTypeName:"唯一SKU",
          arry:[]
        },
        // {
        //   sort:5,
        //   skuType:"01021005",
        //   skuTypeName:"参数SKU",
        //   arry:[]
        // },{
        //   sort:6,
        //   skuType:"01021006",
        //   skuTypeName:"商家SKU",
        //     arry:[]
        // }
      ],
      otherSkuList:[],
      showOther:false,
      joinOpn:[
          {
              value:"1",
              label:"是"
          },
           {
              value:"2",
              label:"否"
          }
      ],
      addTypeData:{
          skuTypeName:"",
          skuTypeNo:"",
          skuInfoName:"",
          skuInfoNameEn:"",
          isContact:"",
          nodeOrder:"",
          parSkuInfoNo:""
      },
      activeInx:0,
      clickLiData:{},
      subTypeList:[],
      fLiData:{},
      otherClickData:{},
      lastShow:false,
      leftAdd:1,
      actLi:'',
      allName:['','','']
    }
  },
  components: {
    myBrea
  },
  methods:{
    up(x,y){
        return x.nodeLv-y.nodeLv
      },
    async getSkuTypeList(postData){
        await this.$store.dispatch('GdsSkuTypeModule/POST_GDS_LIST',postData);
        let data = this.$store.state.GdsSkuTypeModule.POST_GDS_LIST;
       
        let _this =this;
        this.skuTypeSortData= data.out.list.sort(_this.up)
        let len=this.skuTypeSortData.length
        this.skuTypeLen = this.skuTypeSortData[len-1].nodeLv;
    },
    async getInfoSub(postData,inx) {//根据父级id获取同级的类型
      await this.$store.dispatch(
        "GdsSkuModule/POST_SKUINFO_SUB_LIST",
        postData
      );
        let data = this.$store.state.GdsSkuModule.POST_SKUINFO_SUB_LIST;
        this.skuLinkAgeData={};
        if(Object.keys(data.out).length==0){
            this.oldData[inx] ={};
        }
        if(data.out['01021001'] && Object.keys(data.out['01021001']).length>0){
            this.skuLinkAgeData[inx] = data.out['01021001'];
            this.oldData[inx]=data.out['01021001'];
        }
        this.skuLinkAgeData = this.oldData;
        this.skuLen = Object.keys(this.skuLinkAgeData).length;
        this.otherSkuList=[];
        this.otherSku.map((itm,inx)=>{
            Object.keys(data.out).map((it,ix)=>{
                if(itm.skuType == it){
                    itm.arry=[];
                    itm.arry = data.out[it]
                }
            })
        });
        if(data.out['01021002'] ||data.out['01021003']||data.out['01021004']){
            this.showOther = true
        }else{
            this.showOther = false;
            this.otherSkuList=[];
        }
    },
    async saveSkuInfo(postData,inx) {
      await this.$store.dispatch(
        "GdsSkuModule/POST_SKUINFO_SAVE",
        postData
      );
        let data = this.$store.state.GdsSkuModule.POST_SKUINFO_SAVE;
        let _this = this;
        if(this.leftAdd==1){
            this.getInfoSub({skuInfoNo:_this.clickLiData.skuInfoNo})
        }else{
             this.getInfoSub({skuInfoNo:postData.parSkuInfoNo?postData.parSkuInfoNo:""},_this.activeInx)
        }
        this.skuTypeAdd = false;
        this.$message.success("操作成功")
    },
    async getSkuTypeSub(postData,inx) {
      await this.$store.dispatch(
        "GdsSkuModule/POST_SKUTYPES_SUB_LIST",
        postData
      );
        let data = this.$store.state.GdsSkuModule.POST_SKUTYPES_SUB_LIST;
        this.subTypeList = data.out.list;
    },
    async skuInfoDis(postData,parSkuInfoNo,inx) {
      await this.$store.dispatch(
        "GdsSkuModule/POST_SKUINFO_DISABLE",
        postData
      );
        let data = this.$store.state.GdsSkuModule.POST_SKUINFO_DISABLE;
        this.getInfoSub({skuInfoNo:parSkuInfoNo},inx)
        this.$message.success("操作成功")
    },
    async skuInfoEnable(postData,parSkuInfoNo,inx) {
      await this.$store.dispatch(
        "GdsSkuModule/POST_SKUINFO_ENABLE",
        postData
      );
        let data = this.$store.state.GdsSkuModule.POST_SKUINFO_ENABLE;
        this.getInfoSub({skuInfoNo:parSkuInfoNo},inx)
        this.$message.success("操作成功")
    },
    async skuInfoDel(postData) {
      await this.$store.dispatch(
        "GdsSkuModule/POST_SKUINFO_DEL",
        postData
      );
        let data = this.$store.state.GdsSkuModule.POST_SKUINFO_DEL;
        this.getInfoSub({skuInfoNo:this.clickLiData.skuInfoNo})
        this.$message.success("操作成功")
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
    
    infoClick(liData){
         this.allName[liData.nodeLv-1]=liData.skuInfoName
         this.clickLiData = liData
         this.actLi = liData.skuInfoNo
         this.getInfoSub({skuInfoNo:liData.skuInfoNo},liData.nodeLv)
    },
    typeAddBtn(data,inx){
       this.addTypeData={
          skuTypeName:data.skuTypeName,
          skuTypeNo:data.skuTypeNo,
          skuInfoName:"",
          skuInfoNameEn:"",
          isContact:"",
          nodeOrder:"",
          skuInfoNo:''
        //   parSkuInfoNo:this.clickLiData.skuInfoNo?this.clickLiData.skuInfoNo:null
      }
       if(this.clickLiData.skuInfoNo){
            this.addTypeData.parSkuInfoNo = this.clickLiData.skuInfoNo
        }else{
            delete(this.addTypeData["parSkuInfoNo"]);
        }
      this.activeInx = inx
      this.leftAdd = 2;
      this.skuTypeAdd= true;
    },
    typeEditor(pData,data,inx){

         this.addTypeData={
          skuTypeName:pData.skuTypeName,
          skuTypeNo:pData.skuTypeNo,
          skuInfoName:data.skuInfoName,
          skuInfoNameEn:data.skuInfoNameEn,
          isContact:data.isContact,
          nodeOrder:data.nodeOrder,
          skuInfoNo:data.skuInfoNo
        //   parSkuInfoNo:this.clickLiData.skuInfoNo?this.clickLiData.skuInfoNo:null
      }
       if(this.clickLiData.skuInfoNo){
            this.addTypeData.parSkuInfoNo = this.clickLiData.skuInfoNo
        }else{
            delete(this.addTypeData["parSkuInfoNo"]);
        }
      this.activeInx = inx
      this.leftAdd = 2;
      this.skuTypeAdd= true;
    },
    skuTypeBtn(){
        this.saveSkuInfo(this.addTypeData)
    },
   
    otherInfoClick(liData){
        this.otherClickData = liData

        this.actLi=liData.skuTypeNo
        this.lastShow = true;
        if(!liData.skus){
            this.otherSkuList=[];
        }else{
            this.otherSkuList = liData.skus;
        }
    },
    addTypeBtn(itm){
        this.fLiData = itm
        this.getSkuTypeSub({skuType:itm.skuType,skuInfoNo:this.clickLiData.skuInfoNo});
        this.chooseSku= true
    },
    infoDel(itm){
        let mm={
            skuTypeNo:itm.skuTypeNo,
            parSkuInfoNo:this.clickLiData.skuInfoNo
        }
        let _this = this;
        myConfirm(_this,'是否删除该类型？',function(){
            _this.skuInfoDel(mm)
        })
        
    },
    typeAddLi(data,inx){
        // console.log(data);
        let newAry=[];
        newAry=this.subTypeList;
        newAry[inx].isUsed =1;
        this.subTypeList=[];
        this.subTypeList = newAry;
        let pus=true
        this.fLiData.arry.map((itm,inx)=>{
            if(itm.skuTypeNo==data.skuTypeNo){
                pus= false;
            }
        });
        if(pus){
             this.fLiData.arry.push(data)
        }
    },
    chooseBtnClick(){
        this.chooseSku= false;
    },
    addLastInfo(){
        this.addTypeData={
          skuTypeName:this.otherClickData.skuTypeName,
          skuTypeNo:this.otherClickData.skuTypeNo,
          skuInfoName:"",
          skuInfoNameEn:"",
          isContact:"",
          nodeOrder:"",
        //   parSkuInfoNo:this.clickLiData.skuInfoNo?this.clickLiData.skuInfoNo:null
      }
       this.leftAdd = 1;
        if(this.clickLiData.skuInfoNo){
            this.addTypeData.parSkuInfoNo = this.clickLiData.skuInfoNo
        }else{
            delete(this.addTypeData["parSkuInfoNo"]);
        }
        this.skuTypeAdd= true;
    },
    otherInfoEditor(data,inx){
         this.addTypeData={
          skuTypeName:this.otherClickData.skuTypeName,
          skuTypeNo:this.otherClickData.skuTypeNo,
          skuInfoName:data.skuInfoName,
          skuInfoNameEn:data.skuInfoNameEn,
          isContact:data.isContact,
          nodeOrder:data.nodeOrder,
          skuInfoNo:data.skuInfoNo
        //   parSkuInfoNo:this.clickLiData.skuInfoNo?this.clickLiData.skuInfoNo:null
      }
        this.leftAdd = 1;
        if(data.parSkuInfoNo){
            this.addTypeData.parSkuInfoNo = data.parSkuInfoNo
        }else{
            delete(this.addTypeData["parSkuInfoNo"]);
        }
        this.skuTypeAdd= true;
    },
    statusChange(itm,inx){
        let _this = this;
        if(itm.state =='00001001'){
            myConfirm(_this,'是否禁用该sku？',function(){
                _this.skuInfoDis({skuInfoNo:itm.skuInfoNo},itm.parSkuInfoNo,inx)
            })
            
        }else{
            myConfirm(_this,'是否启用该sku？',function(){
                _this.skuInfoEnable({skuInfoNo:itm.skuInfoNo},itm.parSkuInfoNo,inx)
            })
        }
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
    this.getSkuTypeList({})
    this.getInfoSub({skuInfoNo:''},0)
    // this.getInfoList({skuType: "01021001" })
  }
};
</script>
<style lang="scss">
.skuModu-page {
   
  .skuModu-cont{
    @extend %pagecont;
    // text-align:center;
    .sendbtn{
        margin-top: 30px
        // text-align: right;
    }
  }
  .seInp{
    background-color: #fff;
    background-image: none;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    height: 39px;
    padding:0px 10px;
    margin-top: 10px;
    width: 100%;
   input{
       width: 100%;
       height: 100%;
        border: none;
         border-radius: 4px;
         border: 1px solid #dcdfe6;
         padding-left: 10px;
         box-sizing: border-box;
   }
  }
  .seBtn{
        position: absolute;
        bottom: 0px;
        width: 100%;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        text-align: center;
        font-size: 14px;
        // border-radius: 4px;
        padding: 12px 20px;
  }
  .isScoll{
      height: 300px;
      overflow-y: scroll;
  }
  .typeUl{
      display: inline-block;
      border: 1px #e2e2e2 solid;
      height: 350px;
      min-width: 200px;
      width: 20%;
    //   overflow: hidden;
      box-sizing: border-box;
      vertical-align: top;
     overflow: hidden;
      position: relative;
      li{
         padding: 10px 10px;
         overflow: hidden;
          color: #403f4c;
      }
     .liAct{
          background-color: #f5f5f5;
          border-left: 2px #409eff solid;
         color: #333;
         font-weight: 500;
      }
      .pad10{
          padding:5px;
      }
  }
  .floatR{
        float: right;
        margin: 0 5px;
    }
  .collaps{
      padding: 10px;
      .collapsT{
          
          padding-bottom: 5px;
          border-bottom: 1px #e2e2e2 solid;
      }
      .collapsC{
          overflow: hidden;
          padding: 10px 10px;
      }
     
  }
  .hT{
      margin: 20px 0; 
      font-size: 18px;
  }
  .header-icon{
      font-size: 15px;
      margin-left: 8px;
  }
  .addTypediv{
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      height: 40px;
    line-height: 40px;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .chooseUl{
      padding: 0px;
      margin: 0px;
      li{
          width: 300px;
          height: 40px;
          line-height: 40px;
          border-radius: 4px;
          overflow: hidden;
          border:1px #e2e2e2 solid;
          margin: 10px;
          text-align: center;
          position: relative;
          .liCheck{
              position: absolute;
              right: 0px;
              font-size: 20px;
            bottom: 0px;
            color: #e2e2e2
          }
      }
      .liActive{
          border: 1px #409eff solid;
          color: #409eff;
           .liCheck{
                color: #409eff
           }
      }
     
  }
}
</style>