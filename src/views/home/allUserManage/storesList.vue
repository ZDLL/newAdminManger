<!-- <h2>门店列表</h2> -->
<template>
  <div class="emp-list">
    <div class="user-cont">
      <div class="user-table">
        <div class="seachTop">
          <div class="seachlist dis_inl_blo mr20">
            <span>门店名称：</span>
            <el-input style="width:200px" v-model="searchData.store_name" clearable @clear="clearBtn('business_name')" placeholder="请输入内容"></el-input>
          </div>
          <div class="seachlist dis_inl_blo mr20">
            <span>店铺类型：</span>
            <el-select v-model="searchData.type" clearable @clear="clearBtn('type')" placeholder="请选择">
              <el-option
                v-for="item in storeTypeOpn"
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
          <el-button class="fr" type="primary" plain @click="storeSearchBtn">查询</el-button>
        </div>
        <!-- <el-divider content-position="left">企业用户列表</el-divider> -->
        <div class="cloum-table mt20">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="store_name" label="门店名称"></el-table-column>
            <el-table-column prop="responsible" label="负责人姓名"></el-table-column>
            <el-table-column prop="phone" label="联系电话"></el-table-column>
            <el-table-column prop="type_name" label="店铺类型"></el-table-column>
            <el-table-column prop="address" label='店铺地址'></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">{{scope.row.status_code | codeStatus}}</template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="storeChangeStatusBtn(scope.row)"
                >{{scope.row.status_code | statusBtnTxt}}</el-button>
                <el-button type="text" size="small" @click='storeEdit(scope.row)'>编辑</el-button>
                <!-- <el-button type="text" size="small">详情</el-button> -->
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
      storeTypeOpn: [],
      statusOpn: [],
      packTotal:1,
      brea: [{ txt: "用户中心", url: "/" }, { txt: "企业用户", url: "/" }],
      tableData:[],
      searchData:{
        store_name:"",
        type:"",
        status:"",
        page_size:"10",
        current_page:"1"
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
    async getStoreList(){
      await this.$store.dispatch(
            "AllUserModule/POST_STORE_LIST",
            this.searchData
        );
        let data = this.$store.state.AllUserModule.POST_STORE_LIST;
        this.tableData = data.out.result;
        this.packTotal = parseInt(data.out.total)
    },
    async StoreChangeStatus(postData){
      await this.$store.dispatch(
            "AllUserModule/POST_STORE_CHANGE_STATUS",
            postData
        );
        let data = this.$store.state.AllUserModule.POST_STORE_CHANGE_STATUS;
        this.$message.success("操作成功");
        this.getStoreList() 
    },
    clearBtn(str) {
      this.searchData[str]='';
      this.getStoreList()
    },
    handleCurrentFunc(val){
       this.searchData.current_page=val;
       this.getStoreList()
    },
    storeEdit(row){
      this.$emit("storeEdit",{data:row})
    },
    storeChangeStatusBtn(row){
      let _this = this;
      myConfirm(_this,`是否进行${row.status_code=='00001001'?'禁用':'启用'}操作`,function(){
        _this.StoreChangeStatus({
          id:row.id,
          status:row.status_code=='00001001'?'00001002':'00001001'
        })
      })
    },
    storeSearchBtn(){
        this.getStoreList()
    }
  },
  created() {
    this.getStoreList()
    let _this = this;
     this.getCodelist({codeTypes:"storeType"},function(callData){
      _this.storeTypeOpn=callData
    });
     this.getCodelist({codeTypes:"status"},function(callData){
      _this.statusOpn=callData
    })
  }
};
</script>
<style lang="scss">
.emp-list {
  .user-cont {
    // @extend %pagecont;
    background-color: #fff;
    margin-top: 20px;
    overflow: hidden;
    .user-table {
    }
    .seachTop {
      overflow: hidden;
    }
  }
}
</style>