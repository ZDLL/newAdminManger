<!-- <h2>普通用户</h2> -->
<template>
  <div class="user-page">
    <myBrea :my-nav="brea"></myBrea>
    <div class="user-cont">
      <div class="user-table">
        <div class="seachTop">
          <div class="seachlist dis_inl_blo mr20">
            <span>昵称：</span>
            <el-input style="width:200px" v-model="searchData.business_name" clearable @clear="clearBtn('business_name')" placeholder="请输入内容"></el-input>
          </div>
          <div class="seachlist dis_inl_blo mr20">
            <span>企业类型：</span>
            <el-select v-model="searchData.type" clearable @clear="clearBtn('type')" placeholder="请选择">
              <el-option
                v-for="item in firmTypeOpn"
                :key="item.codeInfoValue"
                :label="item.codeInfoName"
                :value="item.codeInfoValue"
              ></el-option>
            </el-select>
          </div>
          <div class="seachlist dis_inl_blo mr20">
            <span>状态：</span>
            <el-select v-model="searchData.status" clearable @clear="clearBtn('status')" placeholder="请选择">
              <el-option
                v-for="item in statusOpn"
                :key="item.codeInfoValue"
                :label="item.codeInfoName"
                :value="item.codeInfoValue"
              ></el-option>
            </el-select>
          </div>
          <el-button type="primary" plain @click='frimSearchBtn'>查询</el-button>
          <el-button class="fr ml20" type="primary" @click="firmAddBtn">添加企业用户</el-button>
        </div>
        <el-divider content-position="left">企业用户列表</el-divider>
        <div class="cloum-table mt20">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="user_id" label="用户ID"></el-table-column>
            <el-table-column prop="business_name" label="企业名称"></el-table-column>
            <el-table-column prop="type_name" label="企业类型"></el-table-column>
            <el-table-column prop="store_num" label="门店数量"></el-table-column>
            <el-table-column prop="staff_num" label="员工数量"></el-table-column>
            <el-table-column prop="create_time" label="入住时间"></el-table-column>
            <el-table-column prop="status_name" label="状态">
              <!-- <template slot-scope="scope">{{scope.row.state | codeStatus}}</template> -->
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="changeStatusBtn(scope.row)"
                >{{scope.row.status_code | statusBtnTxt}}</el-button>
                <el-button type="text" size="small" @click='editBtn(scope.row)'>编辑</el-button>
                <el-button type="text" size="small" @click="busView(scope.row)">详情</el-button>
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
  </div>
</template>
<script>
import myBrea from "../../../components/breadcrumb.vue";
import proUpload from "../../../components/proUpload.vue";
import myPackage from "../../../components/package.vue";
import { myConfirm } from "../../../comm/until";
export default {
  data() {
    return {
      value: "",
      firmTypeOpn: [],
      statusOpn: [],
      packTotal:1,
      brea: [{ txt: "用户中心", url: "/" }, { txt: "企业用户", url: "/" }],
      tableData:[],
      searchData:{
        business_name:"",
        type:"",
        status:"",
        page_size:"10",
        current_page:'1'
      }
    };
  },
  components: {
    myBrea,
    proUpload,
    myPackage
  },
  methods: {
    async getCodelist(postData, callBack) {//获取码值
        await this.$store.dispatch(
            "GdsSkuTypeModule/POST_GDS_CODES_LIST",
            postData
        );
        let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CODES_LIST;
        callBack(data.out[postData.codeTypes])
    },
    async getBusList(){
      await this.$store.dispatch(
            "AllUserModule/POST_BUS_LIST",
            this.searchData
        );
        let data = this.$store.state.AllUserModule.POST_BUS_LIST;
        this.tableData = data.out.result;
        this.packTotal = parseInt(data.out.total)
    },
    async busChangeStatus(postData){
      await this.$store.dispatch(
            "AllUserModule/POST_BUS_CHNAGE_STATUS",
            postData
        );
        let data = this.$store.state.AllUserModule.POST_BUS_CHNAGE_STATUS;
        this.$message.success("操作成功")
        this.getBusList();
    },
    clearBtn(key) {
      this.searchData[key]='';
      this.getBusList()
    },
    handleCurrentFunc(val){
      this.searchData.current_page= val;
      this.getBusList();
    },
    firmAddBtn(){
      this.$router.push({
        path:"firmUserAdd"
      })
    },
    changeStatusBtn(row){
      let _this = this;
      myConfirm(_this,`是否${row.status_code=='00001001'?'禁用':'启用'}该企业用户？`,function(){
        _this.busChangeStatus({
          id:row.id,
          status:row.status_code=='00001001'?'00001002':'00001001'
        })
      })
    },
    editBtn(row){
      this.$router.push({
        path:"/firmUserAdd",
        query:{
          bus_id:row.id
        }
      })
    },
    busView(row){
      this.$router.push({
        path:"/firmUserDetail",
        query:{
          bus_id:row.id
        }
      })
    },
    frimSearchBtn(){
       this.getBusList();
    }
  },
  created() {
    let _this = this;
    this.getCodelist({codeTypes:"businessType"},function(callData){
      _this.firmTypeOpn=callData
    });
    this.getCodelist({codeTypes:"status"},function(callData){
      _this.statusOpn=callData
    })
    this.getBusList()
  }
};
</script>
<style lang="scss">
.user-page {
  .user-cont {
    @extend %pagecont;
    overflow: hidden;
    .user-table {
    }
    .seachTop {
      overflow: hidden;
    }
  }
}
</style>