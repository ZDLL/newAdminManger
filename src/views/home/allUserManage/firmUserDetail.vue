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
                <li>企业ID：</li>
                <li>员工数量：</li>
                <li>门店数量：</li>
                <li>登录手机号：</li>
                <li>添加时间：</li>
              </ul>
            </el-col>
            <el-col :span="8">
              <ul class="firmInfo-ul">
                <h3></h3>
                <li>企业名称：</li>
                <li>企业类型：</li>
                <li>门店地址：</li>
                <li>联系电话：</li>
                <li>负责人：</li>
              </ul>
            </el-col>
            <el-col :span="8">
              <ul class="firmInfo-ul">
                <h3>营业执照</h3>
                <div class="firm-license">
                  <img src alt="营业执照" />
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
          <el-button type="primary" class="fr ml20">添加门店</el-button>
          <el-button type="primary" class="fr">添加员工</el-button>
        </div>
        <div class="frimCnt mt20">
            <component :is='comAct'></component>
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
import empList from './empList.vue'
import storeList from './storesList.vue'

export default {
  data() {
    return {
      value: "",
      packTotal: 1,
      brea: [{ txt: "用户中心", url: "/" }, { txt: "企业详情", url: "/" }],
      tableData: [],
      nacAct: "empList",
      comAct:"empList"
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
    clearBtn() {},
    handleCurrentFunc(val) {},
    navBtn(val){
        this.nacAct =val;
        this.comAct = val;
    }
  },
  created() {}
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
        }
      }
    }
    .firm-cont {
      @extend %pagecont;
      .nav-cont{
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
      .frimCnt{
          border-top: 1px #e4e4e4 solid;
          padding: 20px;
      }
    }
  }
}
</style>