<!-- <h2> 企业详情</h2> -->
<template>
  <div class="firmUserDetail">
    <myBrea :my-nav="brea"></myBrea>
    <div class="firmUser-cont">
      <div class="firmTop">
        <h2>企业信息</h2>
        <div class="firmInfo">
          <el-row>
            <el-col :span="8">
              <ul class="firmInfo-ul">
                <h3>企业信息</h3>
                <li>企业ID：{{busInfo.id}}</li>
                <li>员工数量：{{busInfo.staff_num}}</li>
                <li>门店数量：{{busInfo.store_num}}</li>
                <li>登录手机号：{{busInfo.login_phone}}</li>
                <li>添加时间：{{busInfo.create_time}}</li>
              </ul>
            </el-col>
            <el-col :span="8">
              <ul class="firmInfo-ul">
                <h3></h3>
                <li>企业名称：{{busInfo.business_name}}</li>
                <li>企业类型：{{busInfo.type_name}}</li>
                <li>门店地址：{{busInfo.province_name}}{{busInfo.city_name}}{{busInfo.area_name}}{{busInfo.address}}</li>
                <li>联系电话：{{busInfo.phone}}</li>
                <li>负责人：{{busInfo.responsible}}</li>
              </ul>
            </el-col>
            <el-col :span="8">
              <ul class="firmInfo-ul">
                <h3>营业执照</h3>
                <div class="firm-license">
                  <img :src='busInfo.license' alt="营业执照" />
                </div>
              </ul>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="firm-cont">
        <div class="nav-cont">
          <nav class="checkNav dis_inl_blo">
            <span :class="nacAct == 'empList'?'actSpan':''" @click="navBtn('empList')">员工列表</span>
            <span :class="nacAct == 'storeList'?'actSpan':''" @click="navBtn('storeList')">门店列表</span>
          </nav>
            <el-button type="primary" class="fr" @click="addShopBtn">添加门店</el-button>

          <el-button type="primary" class="fr mr20" @click="addStaffBtn">添加员工</el-button>
        </div>
        <div class="frimCnt mt20">
          <!-- <component :is="comAct"></component> -->
          <empList :key='empKey' @strfEdit='strfEditBtn' v-if='comAct=="empList"'></empList>
          <storeList :key='shopKey' @storeEdit='storeEditBtn' v-if='comAct=="storeList"'></storeList>
        </div>
      </div>
    </div>
    <!-- 添加门店 -->
    <el-dialog :title="shopAddData.id?'编辑门店':'添加门店'" :visible.sync="shopDia" width="55%">
      <div class="add-shop-cont">
        <el-row :gutter="10" class="mt20">
          <el-col :span="4">
            <span class="my-span-notice">*</span>门店名称：
          </el-col>
          <el-col :span="12">
            <el-input 
            v-model="shopAddData.store_name" 
            clearable 
             maxlength="20"
            show-word-limit
            placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="mt20">
          <el-col :span="4">
            <span class="my-span-notice">*</span>负责人姓名：
          </el-col>
          <el-col :span="12">
            <el-input 
            v-model="shopAddData.responsible" 
            clearable 
            placeholder="请输入内容"
            maxlength="20"
            show-word-limit
            ></el-input>
          </el-col>
        </el-row>
         <el-row :gutter="10" class="mt20">
          <el-col :span="4">
            <span class="my-span-notice">*</span>联系电话：
          </el-col>
          <el-col :span="12">
            <el-input type="number" v-model="shopAddData.phone" clearable placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="mt20">
          <el-col :span="4">
            <span class="my-span-notice">*</span>店铺类型：
          </el-col>
          <el-col :span="12">
            <el-select v-model="shopAddData.type" clearable style="width:100%" placeholder="请选择">
              <el-option
              v-for="item in firmTypeOpn"
               :key="item.codeInfoValue"
               :label="item.codeInfoName"
               :value="item.codeInfoValue"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="mt20">
          <el-col :span="4">
            <span class="my-span-notice">*</span>所在地区：
          </el-col>
          <el-col :span="12">
            <el-select
            style="width:32%;margin-right:2%"
            v-model="shopAddData.province_name"
            @visible-change="((fl,val)=>{fireVisibleChange(fl,val,'1')})"
            @change="((val)=>{fireSelecChange(val,'1')})"
            
            placeholder="省"
          >
            <el-option
              v-for="item in provinceOpn"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            style="width:32%;;margin-right:2%"
            v-model="shopAddData.city_name"
            placeholder="市"
            @visible-change="((fl,val)=>{fireVisibleChange(fl,val,'2')})"
            @change="((val)=>{fireSelecChange(val,'2')})"
            
          >
            <el-option v-for="item in cityOpn" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select
            style="width:32%"
            v-model="shopAddData.area_name"
            @visible-change="((fl,val)=>{fireVisibleChange(fl,val,'3')})"
            @change="((val)=>{fireSelecChange(val,'3')})"
            
            placeholder="区"
          >
            <el-option v-for="item in areaOpn" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="mt20">
          <el-col :span="4">
            <span class="my-span-notice">*</span>详细地址：
          </el-col>
          <el-col :span="12">
            <el-input 
            v-model="shopAddData.address" 
            clearable 
             maxlength="100"
            show-word-limit
            placeholder="请输入内容"
            ></el-input>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shopDia = false">取 消</el-button>
        <el-button type="primary" @click="addSureShopBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加员工 -->
    <el-dialog :title="addStorffData.id?'编辑员工':'添加员工'" :visible.sync="staffDia" width="55%">
      <div class="add-staff-cont">
        <el-row :gutter="10" class="mt20">
          <el-col :span="5">
            <span class="my-span-notice">*</span>关联对应门店：
          </el-col>
          <el-col :span="12">
            <div class='addressList' 
              v-for='(itm,inx) in addressData' 
              :key='inx'
              @click="addressBtn(inx)"
              >
              <span>{{itm.address}}</span>
                <i :class="itm.isCheck==1?'actCheckIcon':''" class='el-icon-success checkIcon'></i>
            </div>
            <div class='addNewShop' @click='straffAddShopBtn'>
              添加新门店
              <i class='el-icon-circle-plus-outline'></i>
            </div>
            <!-- <el-input placeholder="请输入内容"></el-input> -->
          </el-col>
        </el-row>
        <el-row :gutter="10" class="mt20">
          <el-col :span="5">
            <span class="my-span-notice">*</span>员工姓名：
          </el-col>
          <el-col :span="12">
            <el-input 
            v-model="addStorffData.staff_name" 
            clearable 
             maxlength="10"
            show-word-limit
            placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="mt20">
          <el-col :span="5">
            <span class="my-span-notice">*</span>登录手机号：
          </el-col>
          <el-col :span="12">
             <el-input type="number" v-model="addStorffData.login_phone" clearable placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="staffDia = false">取 消</el-button>
        <el-button type="primary" @click="addStraffSureBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import myBrea from "../../../components/breadcrumb.vue";
import proUpload from "../../../components/proUpload.vue";
import myPackage from "../../../components/package.vue";
import { myConfirm } from "../../../comm/until";
import empList from "./empList.vue";
import storeList from "./storesList.vue";

export default {
  data() {
    return {
      packTotal: 1,
      brea: [{ txt: "用户中心", url: "/" }, { txt: "企业详情", url: "/" }],
      tableData: [],
      shopDia: false,
      staffDia: false,
      nacAct: "empList",
      comAct: "empList",
      firmTypeOpn: [],
      provinceOpn: [],
      cityOpn: [],
      areaOpn: [],
      bus_id:"",
      busInfo:{},
      addressData:[],
      shopAddData:{
        id:"",
        business_id:"",
        store_name:"",
        responsible:"",
        phone:"",
        type:"",
        province_id:"",
        city_id:"",
        area_id:"",
        address:"",
        area_name: "",
        city_name: "",
        province_name: ""
      },
      aleaData: {
        type: "1",
        parent_id: ""
      },
      addStorffData:{
        id:"",
        business_id:"",
        store_id:"",
        staff_name:"",
        login_phone:""
      },
      empKey:0,
      shopKey:0,
      sfAddSp:false
    };
  },
  computed: {
    
  },
  components: {
    myBrea,
    proUpload,
    myPackage,
    empList,
    storeList
  },
  methods: {
    async busDet(postData) {
      await this.$store.dispatch("AllUserModule/POST_BUS_DET", 
        // this.aleaData
        postData
      );
      let data = this.$store.state.AllUserModule.POST_BUS_DET;
      this.busInfo = data.out
    },
    async getStoreSecList(){
      await this.$store.dispatch(
            "AllUserModule/POST_STORE_SELC_LIST",
            {business_id:this.bus_id}
        );
        let data = this.$store.state.AllUserModule.POST_STORE_SELC_LIST;
        this.addressData = data.out
    },
    async getCodelist(postData, callBack) {//获取码值
        await this.$store.dispatch(
            "GdsSkuTypeModule/POST_GDS_CODES_LIST",
            postData
        );
        let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CODES_LIST;
        callBack(data.out[postData.codeTypes])
    },
    async busGetArea() {
      await this.$store.dispatch(
        "AllUserModule/POST_COM_GET_AREA",
        this.aleaData
      );
      let data = this.$store.state.AllUserModule.POST_COM_GET_AREA;
      if (this.aleaData.type == 1) {
        this.provinceOpn = data.out;
        this.cityOpn = [];
        this.areaOpn = [];
        this.shopAddData.city_name='';
        this.shopAddData.area_name=''
      } else if (this.aleaData.type == 2) {
        this.cityOpn = data.out;
        this.areaOpn = [];
        this.shopAddData.area_name=''
      } else if (this.aleaData.type == 3) {
        this.areaOpn = data.out;
      }
    },
    async addShop(postData) {
      await this.$store.dispatch("AllUserModule/POST_STORE_ADD", 
        // this.aleaData
        postData
      );
      let data = this.$store.state.AllUserModule.POST_STORE_ADD;
      this.$message.success("添加成功");
      if(this.sfAddSp){
        this.getStoreSecList()
      }else{
         this.shopKey++
      }
     
      this.shopDia=false
    },
    async addStraff(postData) {
      await this.$store.dispatch("AllUserModule/POST_STA_ADD", 
        // this.aleaData
        postData
      );
      let data = this.$store.state.AllUserModule.POST_STA_ADD;
      this.$message.success("添加成功");
      this.empKey++;
      this.staffDia = false;
    },
    async straffDet(postData) {
      await this.$store.dispatch("AllUserModule/POST_STA_DET", 
        // this.aleaData
        postData
      );
      let data = this.$store.state.AllUserModule.POST_STA_DET;
      this.addStorffData =data.out
      let _this = this;
      this.addressData.map((itm,inx)=>{
          itm.isCheck=0
         this.addStorffData.store.map((it,ix)=>{
           if(itm.id == it){
             itm.isCheck=1
           }
         })
      });
      
    },
    async straffEdit(postData) {
      await this.$store.dispatch("AllUserModule/POST_STA_EIDT", 
        // this.aleaData
        postData
      );
      let data = this.$store.state.AllUserModule.POST_STA_EIDT;
      this.$message.success("编辑成功") ;
      this.empKey++
      this.staffDia = false;
    },
    async storeDet(postData) {
      await this.$store.dispatch("AllUserModule/POST_STORE_DET", 
        // this.aleaData
        postData
      );
      let data = this.$store.state.AllUserModule.POST_STORE_DET;
       this.shopAddData = data.out
       this.shopAddData.business_id = this.bus_id
    },
    async shopEdit(postData) {
      await this.$store.dispatch("AllUserModule/POST_STORE_EIDT", 
        // this.aleaData
        postData
      );
      let data = this.$store.state.AllUserModule.POST_STORE_EIDT;
      this.$message.success("编辑成功")
      this.shopKey++
      this.shopDia=false
    },
    clearBtn() {},
    handleCurrentFunc(val) {},
    navBtn(val) {
      this.nacAct = val;
      this.comAct = val;
    },
    addShopBtn() {
      this.shopAddData={
        id:"",
        business_id:this.bus_id,
        store_name:"",
        responsible:"",
        phone:"",
        type:"",
        province_id:"",
        city_id:"",
        area_id:"",
        address:""
      }
      this.sfAddSp= false;
      this.shopDia = true;
    },
    addStaffBtn(){
      this.getStoreSecList();
      this.addStorffData={
        staff_name:"",
        login_phone:"",
        id:""
      }
      this.staffDia = true;
    },
    fireVisibleChange(e, val, index) {
      if(e){
        this.aleaData.type = index;
        if (index == 1) {
          this.aleaData.parent_id = "";
        }else if(index == 2){
          this.aleaData.parent_id = this.shopAddData.province_id;
        }else if(index == 3){
          this.aleaData.parent_id = this.shopAddData.city_id;
        }
      }
      this.busGetArea();
    },
    fireSelecChange(val, type) {
      if (type == 1) {
        this.shopAddData.province_id = val;
      } else if (type == 2) {
        this.shopAddData.city_id = val;
      } else if (type == 3) {
        this.shopAddData.area_id = val;
      }
    },
    addSureShopBtn(){
      if(this.shopAddData.id){
        this.shopEdit(this.shopAddData)
      }else{
        this.addShop(this.shopAddData)
      }
      
    },
    addressBtn(index){
      let mm =this.addressData;
      if(mm[index].isCheck==1){
         mm[index].isCheck=0;
      }else{
         mm[index].isCheck=1;
      }
      this.addressData=[];
      this.addressData =mm
    },
   
    strfEditBtn(backData){
      this.getStoreSecList();
      let _this =this;
      setTimeout(()=>{
        _this.straffDet({id:backData.data.id});
        _this.addStorffData.id = backData.data.id
        this.staffDia = true;
      },100)
    },
     addStraffSureBtn(){
      let store_id_Ary=[]
      this.addressData.map((itm,index)=>{
        if(itm.isCheck==1){
          store_id_Ary.push(itm.id)
        }
      });
      this.addStorffData.store_id = store_id_Ary.join(",")
      this.addStorffData.business_id=this.bus_id;
      console.log(this.addStorffData)
      if(this.addStorffData.id){
         this.straffEdit(this.addStorffData)
      }else{
        this.addStraff(this.addStorffData)
      }
    },
    storeEditBtn(callData){
      // this.shopAddData=callData.data;
      this.storeDet({id:callData.data.id})
      this.shopAddData.id=callData.data.id
      this.sfAddSp =false
      this.shopDia=true
    },
    straffAddShopBtn(){
      this.shopAddData={
        id:"",
        business_id:this.bus_id,
        store_name:"",
        responsible:"",
        phone:"",
        type:"",
        province_id:"",
        city_id:"",
        area_id:"",
        address:""
      }
      this.sfAddSp = true;
      this.shopDia=true
    }
  },
  created() {
     this.bus_id=this.$route.query.bus_id;
    if(this.bus_id){
        this.busDet({id:this.bus_id})
    }
    let _this = this;
    this.getCodelist({codeTypes:"storeType"},function(callData){
      _this.firmTypeOpn=callData
    });
    this.busGetArea();
  }
};
</script>
<style lang="scss">
.firmUserDetail {
  .firmUser-cont {
    overflow: hidden;
    .firmTop {
      @extend %pagecont;
      // padding:0 20px;
      overflow: hidden;
      h2 {
        font-size: 32px;
        font-weight: 500;
        padding: 20px 0;
        padding-top: 0px;
        border-bottom: 1px #e2e2e2 solid;
      }
      .firmInfo {
        h3 {
          height: 90px;
          font-size: 16px;
          line-height: 90px;
        }
        .firmInfo-ul {
          padding: 0px;
          margin: 0px;
          li {
            font-size: 14px;
            color: #9b9b9b;
            margin-bottom: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .firm-license{
            img{
              height: 150px;
            }
          }
        }
      }
    }
    .firm-cont {
      @extend %pagecont;
      .nav-cont {
        overflow: hidden;
      }
      .checkNav {
        span {
          display: inline-block;
          padding: 15px 20px;
          font-size: 16px;
          color: #a4a4a4;
          //   transition: border-color 1s, background-color 1s, color 1s;
        }
        .actSpan {
          position: relative;
          transition: border-color 0.5s, background-color 0.5s, color 0.5s;
          &::after {
            position: absolute;
            content: "";
            bottom: 0px;
            width: 60%;
            height: 2px;
            background-color: #a4a4a4;
            left: 20%;
          }
        }
      }
      .frimCnt {
        border-top: 1px #e4e4e4 solid;
        padding: 20px;
      }
    }
  }
  .add-staff-cont{
    .addressList{
      width: 100%;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      border:1px #e2e2e2 solid;
      padding: 10px;
      box-sizing: border-box;
      margin-bottom: 10px;
      .checkIcon{
        position: absolute;
        right: 10px;
        font-size: 18px;
        color: #e2e2e2;
      }
      .actCheckIcon{
        color: #409EFF;
      }
    }
    .addNewShop{
       color: #409EFF;
       font-size: 12px;
       margin-top: 10px;
       .el-icon-circle-plus-outline{
         font-size: 15px;
         position: relative;
         top:2px;
       }
    }
  }
}
</style>