<!-- <h2>员工列表</h2> -->
<template>
  <div class="emp-list">
    <div class="user-cont">
      <div class="user-table">
        <div class="seachTop">
          <div class="seachlist dis_inl_blo mr20">
            <span>姓名：</span>
            <el-input style="width:200px" v-model="searchData.staff_name" clearable @clear="clearBtn('staff_name')" placeholder="请输入内容"></el-input>
          </div>
          <div class="seachlist dis_inl_blo mr20">
            <span>用户ID：</span>
            <el-input style="width:200px" v-model="searchData.user_id" clearable @clear="clearBtn('user_id')" placeholder="请输入内容"></el-input>
          </div>
          <div class="seachlist dis_inl_blo mr20">
            <span>状态：</span>
            <el-select v-model="searchData.status" clearable placeholder="请选择">
              <el-option
                v-for="item in statusOpn"
                :key="item.codeInfoValue"
                :label="item.codeInfoName"
                :value="item.codeInfoValue"
              ></el-option>
            </el-select>
          </div>
          <el-button class="fr" type="primary" plain @click="starSearchBtn">查询</el-button>
        </div>
        <!-- <el-divider content-position="left">企业用户列表</el-divider> -->
        <div class="cloum-table mt20">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="user_id" label="用户ID"></el-table-column>
            <el-table-column prop="staff_name" label="姓名"></el-table-column>
            <el-table-column prop="store_num" label="关联门店数"></el-table-column>
            <el-table-column prop="create_time" label="添加时间"></el-table-column>
            <!-- <el-table-column prop="codeTypeCpltName" label="入住时间"></el-table-column> -->
            <el-table-column label="状态">
              <template slot-scope="scope">{{scope.row.status_code | codeStatus}}</template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click='strfChangeStatus(scope.row)'
                >{{scope.row.status_code | statusBtnTxt}}</el-button>
                <!-- <el-button type="text" size="small"></el-button> -->
                <el-button type="text" size="small" @click='strfEditorBtn(scope.row)'>编辑</el-button>
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
      genderOpn: [],
      statusOpn: [],
      packTotal:1,
      tableData:[],
      searchData:{
        staff_name:"",
        user_id:"",
        status:"",
        page_size:'10',
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
    async getStaList(){
      await this.$store.dispatch(
            "AllUserModule/POST_STA_LIST",
            this.searchData
        );
        let data = this.$store.state.AllUserModule.POST_STA_LIST;
        this.tableData = data.out.result;
        this.packTotal = parseInt(data.out.total)
    },
    async staChangeStatus(postData){
      await this.$store.dispatch(
            "AllUserModule/POST_STA_CHANGE_STATUS",
            postData
        );
        let data = this.$store.state.AllUserModule.POST_STA_CHANGE_STATUS;
        this.$message.success("操作成功");
        this.getStaList() 
    },
    
    clearBtn(str) {
      this.searchData[str]= "";
      this.getStaList();
    },
    handleCurrentFunc(val){
        this.searchData.current_page= val;
        this.getStaList();
    },
    starSearchBtn(){
      this.getStaList();
    },
    strfEditorBtn(row){
      this.$emit("strfEdit",{data:row})
    },
    strfChangeStatus(row){
      let _this = this;
      myConfirm(_this,`是否进行${row.status_code=='00001001'?'禁用':'启用'}操作`,function(){
        _this.staChangeStatus({
          id:row.id,
          status:row.status_code=='00001001'?'00001002':'00001001'
        })
      })
    }
  },
  created() {
    this.getStaList();
    let _this =this;
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