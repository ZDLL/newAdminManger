<!-- <h2>添加企业</h2> -->
<template>
  <div class="addFirm">
    <myBrea :my-nav="brea"></myBrea>
    <div class="addFrim-cont">
      <el-row :gutter="10" class="mt20">
        <el-col :span="3">
          <span class="my-span-notice">*</span>企业名称：
        </el-col>
        <el-col :span="10">
          <el-input 
          v-model="addBusData.business_name" 
          clearable 
          maxlength="40"
          show-word-limit
          placeholder="请输入内容"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mt20">
        <el-col :span="3">
          <span class="my-span-notice">*</span>负责人姓名：
        </el-col>
        <el-col :span="10">
          <el-input 
          v-model="addBusData.responsible" 
          clearable 
          maxlength="10"
          show-word-limit
          placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mt20">
        <el-col :span="3">
          <span class="my-span-notice">*</span>联系电话：
        </el-col>
        <el-col :span="10">
          <el-input type="number" v-model="addBusData.phone" clearable placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mt20">
        <el-col :span="3">
          <span class="my-span-notice">*</span>企业类型：
        </el-col>
        <el-col :span="10">
          <el-select v-model="addBusData.type" style="width:100%" placeholder="请选择">
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
        <el-col :span="3">
          <span class="my-span-notice">*</span>所在地区：
        </el-col>
        <el-col :span="10">
          <el-select
            style="width:32%;margin-right:2%"
            v-model="addBusData.province_name"
            @change="((val)=>{selecChange(val,'1')})"
            @visible-change="((fl,val)=>{visibleChange(fl,val,'1')})"
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
            v-model="addBusData.city_name"
            placeholder="市"
            @change="((val)=>{selecChange(val,'2')})"
            @visible-change="((fl,val)=>{visibleChange(fl,val,'2')})"
          >
            <el-option v-for="item in cityOpn" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select
            style="width:32%"
            v-model="addBusData.area_name"
            @change="((val)=>{selecChange(val,'3')})"
            @visible-change="((fl,val)=>{visibleChange(fl,val,'3')})"
            placeholder="区"
          >
            <el-option v-for="item in areaOpn" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mt20">
        <el-col :span="3">
          <span class="my-span-notice">*</span>详细地址：
        </el-col>
        <el-col :span="10">
          <el-input 
          v-model="addBusData.address" 
          clearable 
          maxlength="100"
          show-word-limit
          placeholder="请输入内容"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mt20">
        <el-col :span="3">
          <span class="my-span-notice">*</span>营业执照：
        </el-col>
        <el-col :span="10">
          <proUpload :key="addBusData.license" :imgUrl="addBusData.license" @getUrl="getImgUrl"></proUpload>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mt20">
        <el-col :span="3">
          <span class="my-span-notice">*</span>登录手机号：
        </el-col>
        <el-col :span="10">
          <el-input type="number" v-model="addBusData.login_phone" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="10">
          <el-button
            style="margin-top:40px;width:200px"
            type="primary"
            @click="saveBusUserBtn"
          >{{editOrAdd}}</el-button>
        </el-col>
      </el-row>
    </div>
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
      firmTypeOpn: [],
      value: "",
      provinceOpn: [],
      cityOpn: [],
      areaOpn: [],
      attachUrl: "",
      bus_id: "",
      brea: [{ txt: "用户中心", url: "/" }, { txt: "添加企业用户", url: "/" }],
      addBusData: {
        business_name: "",
        responsible: "",
        phone: "",
        type: "",
        province_id: "",
        city_id: "",
        area_id: "",
        address: "",
        license: "",
        login_phone: "",
        area_name: "",
        city_name: "",
        province_name: ""
      },
      aleaData: {
        type: "1",
        parent_id: ""
      }
    };
  },
  computed: {
    editOrAdd() {
      return this.bus_id ? "编辑企业用户" : "生成企业用户";
    }
  },
  methods: {
    getImgUrl(url) {
      this.addBusData.license = url;
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
      } else if (this.aleaData.type == 2) {
        this.cityOpn = data.out;
        this.areaOpn = [];
      } else if (this.aleaData.type == 3) {
        this.areaOpn = data.out;
      }
    },
    async getCodelist(postData, callBack) {
      //获取码值
      await this.$store.dispatch(
        "GdsSkuTypeModule/POST_GDS_CODES_LIST",
        postData
      );
      let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CODES_LIST;
      callBack(data.out[postData.codeTypes]);
    },
    async busSave(postData) {
      await this.$store.dispatch(
        "AllUserModule/POST_BUS_ADD",
        // this.aleaData
        postData
      );
      let data = this.$store.state.AllUserModule.POST_BUS_ADD;
      this.$message.success("生成成功");
      this.$router.push({
        path: "/firmUser"
      });
    },
    async busDet(postData) {
      await this.$store.dispatch(
        "AllUserModule/POST_BUS_DET",
        // this.aleaData
        postData
      );
      let data = this.$store.state.AllUserModule.POST_BUS_DET;
      this.addBusData = data.out;
    },
    async busEdit(postData) {
      await this.$store.dispatch(
        "AllUserModule/POST_BUS_EDIT",
        // this.aleaData
        postData
      );
      let data = this.$store.state.AllUserModule.POST_BUS_EDIT;
      this.$message.success("编辑成功");
      this.$router.push({
        path: "/firmUser"
      });
    },

    visibleChange(e, val, index) {
      if (e) {
        this.aleaData.type = index;
        if (index == 1) {
          this.aleaData.parent_id = "";
          this.addBusData.province_id = val;
          this.addBusData.city_name = "";
          this.addBusData.area_name = "";
        } else if (index == 2) {
          this.aleaData.parent_id = this.addBusData.province_id;
          this.addBusData.city_id = val;
          this.addBusData.area_name = "";
        } else if (index == 3) {
          this.addBusData.area_id = val;
          this.aleaData.parent_id = this.addBusData.city_id;
        }
        this.busGetArea();
      }
    },
    selecChange(val, type) {
      if (type == 1) {
        this.addBusData.province_id = val;
      } else if (type == 2) {
        this.addBusData.city_id = val;
      } else if (type == 3) {
        this.addBusData.area_id = val;
      }
    },
    saveBusUserBtn() {
      // console.log(this.addBusData)
      if (!this.addBusData.business_name) {
        this.$message.warning("请输入企业名称");
        return;
      }
      if (!this.addBusData.responsible) {
        this.$message.warning("请输入负责人姓名");
        return;
      }
      if (!this.addBusData.phone) {
        this.$message.warning("请输入联系电话");
        return;
      }
      if (!this.addBusData.type) {
        this.$message.warning("请选择企业类型");
        return;
      }
      if (!this.addBusData.province_id) {
        this.$message.warning("请选择所在区域省份");
        return;
      }
      if (!this.addBusData.city_id) {
        this.$message.warning("请选择所在区域市区");
        return;
      }
      if (!this.addBusData.area_id) {
        this.$message.warning("请选择所在区域地区");
        return;
      }
      if (!this.addBusData.address) {
        this.$message.warning("请输入详细地址");
        return;
      }
      if (!this.addBusData.license) {
        this.$message.warning("请上传营业执照");
        return;
      }
      if (!this.addBusData.login_phone) {
        this.$message.warning("请输入登录手机号");
        return;
      }
      if (this.bus_id) {
        this.busEdit(this.addBusData);
      } else {
        this.busSave(this.addBusData);
      }
    }
  },
  created() {
    this.busGetArea();
    let _this = this;
    this.getCodelist({ codeTypes: "businessType" }, function(callData) {
      _this.firmTypeOpn = callData;
    });
    this.bus_id = this.$route.query.bus_id;
    if (this.bus_id) {
      this.busDet({ id: this.bus_id });
      this.brea[1].txt = "编辑企业用户";
    }
  }
};
</script>
<style lang="scss">
.addFirm {
  .addFrim-cont {
    @extend %pagecont;
    .el-upload {
      width: 100%;
      .proUpload-span {
        width: 100%;
      }
    }
  }
}
</style>