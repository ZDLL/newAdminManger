<!-- <h2>门店列表</h2> -->
<template>
  <div class="emp-list">
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
        <!-- <el-divider content-position="left">企业用户列表</el-divider> -->
        <div class="cloum-table mt20">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="codeTypeCpltId" label="用户ID"></el-table-column>
            <el-table-column prop="codeTypeCpltName" label="企业名称"></el-table-column>
            <el-table-column prop="codeTypeCpltName" label="企业类型"></el-table-column>
            <el-table-column prop="codeTypeCpltName" label="门店数量"></el-table-column>
            <el-table-column prop="codeTypeCpltName" label="入住时间"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">{{scope.row.state | codeStatus}}</template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                >{{scope.row.state | statusBtnTxt}}</el-button>
                <el-button type="text" size="small">编辑</el-button>
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
      packTotal:1,
      brea: [{ txt: "用户中心", url: "/" }, { txt: "企业用户", url: "/" }],
      tableData:[]
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