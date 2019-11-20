<!-- <h2>普通用户</h2> -->
<template>
  <div class="user-page">
    <myBrea :my-nav="brea"></myBrea>
    <div class="user-cont">
      <div class="user-table">
        <div class="seachTop">
          <div class="seachlist dis_inl_blo mr20">
            <span>昵称：</span>
            <el-input style="width:200px" v-model="searchData.nickname" clearable @clear="clearBtn('nickname')" placeholder="请输入内容"></el-input>
          </div>
          <div class="seachlist dis_inl_blo mr20">
            <span>性别：</span>
            <el-select v-model="searchData.gender" clearable @clear="clearBtn('gender')" placeholder="请选择">
              <el-option
                v-for="item in genderOpn"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
          <el-button type="primary" plain @click="searchBtn">查询</el-button>
          <el-button class="fr ml20" type="primary" @click="addContUser">添加内容用户</el-button>
        </div>
        <el-divider content-position="left">内容用户列表</el-divider>

        <div class="cloum-table mt20">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="user_id" label="用户ID"></el-table-column>
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column label="性别">
              <template slot-scope="scope">
                {{scope.row.gender==1?"男":"女"}}
              </template>
            </el-table-column>
             <el-table-column prop="area" label="所在地"></el-table-column>
            <!-- <el-table-column prop="codeTypeCpltName" label="所在地"></el-table-column> -->
            <el-table-column label="状态">
              <template slot-scope="scope">{{scope.row.status | codeStatus}}</template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <!-- <el-button
                  type="text"
                  size="small"
                >{{scope.row.state | statusBtnTxt}}</el-button>-->
                <el-button type="text" size="small" @click="contUserChangeBtn(scope.row)">{{scope.row.status | statusBtnTxt}}</el-button>
                <el-button type="text" size="small" @click='contDetView(scope.row)'>详情</el-button>
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
      genderOpn: [{
        value:1,
        label:"男"
      },{
        value:2,
        label:"女"
      }],
      statusOpn: [],
      brea: [{ txt: "用户中心", url: "/" }, { txt: "内容用户", url: "/" }],
      tableData:[],
      packTotal:1,
      searchData:{
        nickname:"",
        gender:"",
        status:"",
        current_page:'1',
        page_size:"10"
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
    async getContUserList(){
      await this.$store.dispatch(
            "AllUserModule/POST_CONTUSER_LIST",
            this.searchData
        );
        let data = this.$store.state.AllUserModule.POST_CONTUSER_LIST;
        this.tableData = data.out.result;
        this.packTotal = parseInt(data.out.total)
    },
    async contUserChange(postData) {
      await this.$store.dispatch(
        "AllUserModule/POST_GENUSER_CHNAGE_STATUS",
        postData
      );
      let data = this.$store.state.AllUserModule.POST_GENUSER_CHNAGE_STATUS;
      this.$message.success("操作成功")
      this.getContUserList();
    },
    clearBtn(str) {
      this.searchData[str]='';
      this.getContUserList();
    },
    handleCurrentFunc(val){
      this.searchData.current_page=val;
       this.getContUserList();
    },
    addContUser(){
      this.$router.push({
        path:"/contUserAdd"
      })
    },
    contUserChangeBtn(row){
       let _this = this;
        myConfirm(_this,`是否进行${row.status=='00001001'?"禁用":"启用"}操作?`,function(){
            _this.contUserChange({
                user_id:row.user_id,
                status:row.status=='00001001'?"00001002":"00001001"
            })
        })
    },
    searchBtn(){
       this.getContUserList();
    },
    contDetView(row){
      this.$router.push({
        path:"/contUserAdd",
        query:{
          contUserId:row.user_id
        }
      })
    }
  },
  created() {
    this.getContUserList();
    let _this = this;
    this.getCodelist({codeTypes:"status"},function(callData){
      _this.statusOpn=callData
    })

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