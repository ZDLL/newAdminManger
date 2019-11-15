  <!-- <h2>添加轮播</h2> -->
<template>
  <div class="addCar-page">
    <myBrea :my-nav="brea"></myBrea>
    <div class="addCar-cont">
      <el-row class="mt30">
        <el-col :span="4">
          <span class="my-span-notice">*</span>轮播图名称
        </el-col>
        <el-col :span="10">
          <el-input type="text" placeholder="请输入内容" v-model="saveBannerData.bannerName" maxlength="30" show-word-limit clearable></el-input>
        </el-col>
      </el-row>
      <el-row class="mt30">
        <el-col :span="4">
          <span class="my-span-notice">*</span>类型
        </el-col>
        <el-col :span="10">
          <el-select v-model="saveBannerData.bannerType" placeholder="请选择">
            <el-option
              v-for="item in typeOpn"
              :key="item.codeInfoValue"
              :label="item.codeInfoName"
              :value="item.codeInfoValue"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row v-show='saveBannerData.bannerType =="07001202"' class="mt30">
        <el-col :span="4">
          <span class="my-span-notice">*</span>链接地址
        </el-col>
        <el-col :span="10">
          <el-input type="text" v-model="saveBannerData.url" placeholder="请输入内容" maxlength="80" show-word-limit clearable></el-input>
        </el-col>
      </el-row>
      <el-row v-show='saveBannerData.bannerType =="07001201"' class="mt30">
        <el-col :span="4">
          <span class="my-span-notice">*</span>链接类型
        </el-col>
        <el-col :span="10">
          <el-select v-model="saveBannerData.urlType" @change='changeSel' placeholder="请选择">
            <el-option
              v-for="item in typeUrlOpn"
              :key="item.codeInfoValue"
              :label="item.codeInfoName"
              :value="item.codeInfoValue"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      
      <el-row v-show='saveBannerData.bannerType =="07001201"' class="mt30">
        <el-col :span="4">
          <span class="my-span-notice">*</span>选择内容
        </el-col>
        <el-col :span="10">
          <el-button type="primary" plain @click="addActBtn">添加内容</el-button>
          <p style="margin-top:10px" :key='artData.name' v-show='artData.name'>内容名称：{{artData.name}}</p>
        </el-col>
      </el-row>
      <el-row class="mt30">
        <el-col :span="4">
          <span class="my-span-notice">*</span>顺序
        </el-col>
        <el-col :span="10">
          <el-input type="number" placeholder="请输入内容" v-model="saveBannerData.bannerOrder" maxlength="30" show-word-limit clearable></el-input>
        </el-col>
      </el-row>
      <el-row class="mt30">
        <el-col :span="4">
          <span class="my-span-notice">*</span>上传封面图
        </el-col>
        <el-col :span="10">
          <proUpload :key='saveBannerData.attachUrl' :imgUrl='saveBannerData.attachUrl' @getUrl='getImgUrl'></proUpload>
        </el-col>
      </el-row>
      <el-row class="mt30">
        <el-col :span="4">
        &nbsp;
        </el-col>
        <el-col :span="10">
            <el-button style="width:200px" type="primary" @click="saveBannerBtn">保存</el-button>
        </el-col>
         
      </el-row>
    </div>
    <arcSelec v-if='showDia' :arc-search="arcSeac" :only-one='isOnlyOne' @closeDia='closeBtnClick' @sureDia='getContData'></arcSelec>
  </div>
</template>
<script>
import myBrea from "../../../components/breadcrumb.vue";
import proUpload from "../../../components/proUpload.vue";
import arcSelec from "./articleSelect.vue";


export default {
  name: "addcar",
  data() {
    return {
      // title:"",
      showDia:false,
      isOnlyOne:'1',
      arcSeac:{
        pageNo:"1",
        pageSize:10,
        categoryId:"",
        publishType:"",
        title:"",
        channelNo:"",
        columnNo:"",
        bannerNo:''
      },
      brea: [
        { txt: "内容中心", url: "/goods" },
        { txt: "添加轮播图", url: "/" }
      ],
      typeOpn:[],
      typeUrlOpn:[],
      artData:{},
      bannerNo:"",
      saveBannerData:{
        bannerNo:"",
        bannerName:"",
        bannerType:'',
        urlType:'',
        url:"",
        bannerOrder:"",
        attachUrl:"",
        attachId:"",
        businessNo:""//内容id
      },
    };
  },
  props: {},
  components: {
    proUpload,
    myBrea,
    arcSelec
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
    async bannerSave(postData){
        await this.$store.dispatch('ContentModule/POST_BANNER_SAVE',postData);
        let data = this.$store.state.ContentModule.POST_BANNER_SAVE;
        this.$message.success("操作成功");
        this.$router.push({
          path:"/carousel"
        })
    },
    async bannerDetail(postData){
        await this.$store.dispatch('ContentModule/GET_BANNER_DETAIL',postData);
        let data = this.$store.state.ContentModule.GET_BANNER_DETAIL;
        this.saveBannerData = data.out.value
        this.artData.name=data.out.value.subjectTitle
    },

    getImgUrl(url){
      if(this.saveBannerData.attachUrl !=url){
        this.saveBannerData.attachId = ''
      }
      this.saveBannerData.attachUrl = url
    },
    addActBtn(){
      let type=''
      if(this.saveBannerData.urlType =='07001301'){
        type='1'//富文本
      }else if(this.saveBannerData.urlType =='07001302'){
         type='2'//视频
      }
      this.arcSeac.publishType=type;
      this.showDia = true;
    },
    closeBtnClick(){
      this.showDia = false;
    },
    getContData(data){
      this.saveBannerData.businessNo = data.id;
      this.artData= data
    },
    saveBannerBtn(){
      if(!this.saveBannerData.bannerName){
        this.$message.warning("请添加轮播图名称");
        return;
      }
      if(!this.saveBannerData.bannerType){
        this.$message.warning("请选择轮播图类型");
        return;
      }
      if(!this.saveBannerData.bannerOrder ||this.saveBannerData.bannerOrder<1){
        this.$message.warning("请输入大于0的顺序");
        return;
      }
      if(!this.saveBannerData.attachUrl){
        this.$message.warning("请上传图片");
        return;
      }
     
      if(this.saveBannerData.bannerType =='07001201'){//内部
        this.saveBannerData.url='';
        if(!this.artData.name){
          this.$message.warning("请选择内容");
          return;
        }
      }else if(this.saveBannerData.bannerType =='07001202'){//外部
        this.saveBannerData.urlType ='';
        this.saveBannerData.businessNo ='';
        this.artData={
          id:'',
          name:"",
        }
      };
      this.bannerSave(this.saveBannerData)
    },
    changeSel(){
      this.artData.name =''
    }
  },
  created(){
    let _this = this;
    this.bannerNo = this.$route.query.bannerNo;
   
    this.getCodelist({codeTypes:"bannerType"},function(data){
      _this.typeOpn = data
    });
    this.getCodelist({codeTypes:"urlType"},function(data){
      _this.typeUrlOpn = data
    })
     if(this.bannerNo){
       this.arcSeac.bannerNo = this.bannerNo;
      this.bannerDetail({bannerNo:this.bannerNo})
    }
  }
};
</script>
<style lang="scss">
.addCar-page {
  
  .addCar-cont {
    @extend %pagecont;
  }
}
</style>