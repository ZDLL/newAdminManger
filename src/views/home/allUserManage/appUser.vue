<!-- <h2>普通用户</h2> -->
<template>
  <div class="user-page">
    <myBrea :my-nav="brea"></myBrea>
    <div class="user-cont">
      <div class="user-table">
        <div class="seachTop">
          <div class="seachlist dis_inl_blo mr20">
            <span>昵称：</span>
            <el-input style="width:200px" clearable @clear="clearBtn" placeholder="请输入内容"></el-input>
          </div>
          <div class="seachlist dis_inl_blo mr20">
            <span>性别：</span>
            <el-select v-model="value" clearable placeholder="请选择">
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
            <el-select v-model="value" clearable placeholder="请选择">
              <el-option
                v-for="item in statusOpn"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <el-button class="fr" type="primary" plain>查询</el-button>
        </div>
        <el-divider content-position="left">普通用户列表</el-divider>

        <div class="cloum-table mt20">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="codeTypeCpltId" label='用户ID'></el-table-column>
            <el-table-column prop="codeTypeCpltName" label="昵称"></el-table-column>
            <el-table-column prop="codeTypeCpltName" label="性别"></el-table-column>
            <el-table-column prop="codeTypeCpltName" label="所在地"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">{{scope.row.state | codeStatus}}</template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <!-- <el-button
                  type="text"
                  size="small"
                >{{scope.row.state | statusBtnTxt}}</el-button> -->
                <el-button type="text" size="small" >删除</el-button>
                <el-button type="text" size="small">详情</el-button>
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
      brea: [{ txt: "用户中心", url: "/" }, { txt: "普通用户", url: "/" }],
      tableData:[],
      packTotal:1
    };
  },
  components: {
    myBrea,
    proUpload,
    myPackage
  },
  methods: {
    clearBtn() {},
    handleCurrentFunc(val){

    }
  },
  created() {}
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