
<!-- <h2>商品组详情</h2> -->

<template>
  <div class="group-page">
    <myBrea :my-nav='brea'></myBrea>
    <div class="group-cont" v-if='Object.keys(gruopData).length>0'>
      <div class="group-cont-top">
        <div class="group-contTop-top" >
          <span class='top-span-img'>
              <img v-if='gruopData.photos.length>0' :src='gruopData.photos[0].attachPath' alt="图片">
              <span v-else>无图片</span>
          </span>
          <h3 v-if='gruopData.group'>{{gruopData.group.goodsGroupName}}</h3>
            <div class="topbtns">
                <el-button type="primary" @click="editorGruop">编辑</el-button>
                <el-button type="primary" plain @click="isAnable(gruopData.group.state)">{{gruopData.group.state=='00001001'?'禁用':"启用"}}</el-button>
                <!-- <el-button type="primary" plain @click="moreGdsClick">查看详情</el-button> -->
            </div>
        </div>
        <div class="group-contTop-mind">
            <h3 style="margin-top:40px;">SKU信息</h3>
            <ul class="skuInfo" v-if='gruopData.labels.length>0'>
                <li class="skuInfoLi" v-for='(itm,inx) in gruopData.labels' :key='inx'>{{itm}}</li>
                <!-- <li class="skuInfoLi"><span class="tLt">适用人群：</span><span class="cont">男</span></li>
                <li class="skuInfoLi"><span class="tLt">材质：</span><span class="cont">蛇皮</span></li>
                <li class="skuInfoLi"><span class="tLt">开合方式：</span><span class="cont">折叠</span></li> -->
            </ul>
            <div class='gds-list'>
                <div class="gds-left">
                    <h3>商品图片</h3>
                    <viewer v-if='gruopData.photos.length>0'>
                        <ul v-if='gruopData.photos.length>0'>
                            <li class="gdsImg" v-for='(itm,inx) in gruopData.photos' :key='inx' >
                                <img :src='itm.attachPath' alt="">
                            </li>
                        </ul>
                    </viewer>
                    <my-nocont v-else  :cont-txt='"暂无数据!!"'></my-nocont>
                </div>
                <!-- <div class="gds-right">
                    <h3>商品详情</h3>
                     <ul>
                        <li class="gdsImg">
                            <img src="" alt="">
                            <span class='moretxt' @click="moreGdsClick">更多详情</span>
                        </li>
                    </ul>
                </div> -->
            </div>
           
        </div>
      </div>
      <div class="group-mid">
          <el-divider content-position="left">商品列表</el-divider>
         <div class="grupList-table">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                prop="goodsNo"
                label="商品编号">
                </el-table-column>
                <!-- 
                <el-table-column
                label="颜色"
                >
                <template slot-scope="scope">
                    {{scope.row}}{{}}
                </template>
                </el-table-column> -->

                <!-- <el-table-column
                prop="spuNameEn"
                label="尺寸">
                </el-table-column> -->
                <el-table-column
                prop="goodsName"
                label="商品">
                </el-table-column>

                <el-table-column
                label="发布时间">
                <template slot-scope="scope">
                        {{scope.row.insTime | dateformat}}
                    </template>
                </el-table-column>
                <el-table-column
                label="状态">
                <template slot-scope="scope">
                        {{scope.row.state == '00001001'?'启用':"停用"}}
                    </template>
                </el-table-column>
                    
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" size="small">删除</el-button> -->
                        <el-button type="text" size="small" @click="moreGdsClick(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>

         </div>
      </div>
    </div>
    <my-nocont v-else :cont-txt='"暂无数据!!"'></my-nocont>
  </div>
</template>
<script>
import { myConfirm } from "../../../comm/until";
import myPackage from '../../../components/package.vue';
import myBrea from "../../../components/breadcrumb.vue"
export default {
  name: "groupdetail",
  data() {
    return {
        brea:[{"txt":"商品中心","url":"/goods"},{"txt":"商组详情","url":"/"}], 
        groupNo:"",
        tableData:[],
        gruopData:{},
        packTotal:1,
        gdsInfoData:{
            pageSize:10,
            pageNo:1,
            goodsGroupNo:""
        }
    };
  },
  components: {
      myPackage,
      myBrea
  },
  methods: {
      async getGdsGroupDetail(postData){
          await this.$store.dispatch("GdsGroupModule/POST_GDS_GROUP_DETAIL",postData);
          let data = this.$store.state.GdsGroupModule.POST_GDS_GROUP_DETAIL;
          this.gruopData  = data.out
        //   console.log(data)
      },
     async getGdsInfoList(postData){
          await this.$store.dispatch("GdsInfoModule/POST_GDS_INFO_LIST",postData);
          let data = this.$store.state.GdsInfoModule.POST_GDS_INFO_LIST;
          this.tableData = data.out.list
      },
     async postGroupAnble(postData) {
            await this.$store.dispatch(
                "GdsGroupModule/POST_GDS_GROUP_ANBLE",
                postData
            );
            let data = this.$store.state.GdsGroupModule.POST_GDS_GROUP_ANBLE;
            this.getGdsGroupDetail({groupNo:this.groupNo})
            this.$message.success("操作成功")
     },
    moreGdsClick(row){
          let data={
              com:"gdsDetail",
              gdsNo:row.goodsNo
          }
          this.$emit("show-gds-detail",data)
    },
    editorGruop(){
          let data ={
              com:"gdsGruopEditor",
              groupNo:this.gruopData.group.goodsGroupNo
          }
          this.$router.push({
              path:"/gdsGruopEditor",
              query:data
          })
        // this.$emit("show-gds-editor",data)
    },
    isAnable(state){
           let _this=this;
            let endAble = state=='00001001'?true:false;
            let st= state=='00001001'?"00001002":"00001001";
            console.log(state)

            myConfirm(_this,endAble?'禁用后该商品组下的商品，将一起禁用？':'是否启用该商品组',function(){
                _this.postGroupAnble({groupNo:_this.groupNo,state:st})
            })
    },
    handleCurrentFunc(val){
        this.gdsInfoData.pageNo = val;
        this.getGdsInfoList(this.gdsInfoData)
    }
  },
  
  created() {
      if(this.$route.query.groupNo){
          this.groupNo = this.$route.query.groupNo
      }else{
          this.$message.warning("")
      }

      this.getGdsGroupDetail({groupNo:this.groupNo})
      this.gdsInfoData.goodsGroupNo = this.groupNo;
      this.getGdsInfoList(this.gdsInfoData)
  }
};
</script>
<style lang="scss">
.group-page {
  .group-cont {
        @extend %pagecont;
    .group-cont-top {
      padding: 20px;
      overflow: hidden;
      padding-bottom: 50px;
      span{
          display: inline-block;
          vertical-align: top;
      }
      .group-contTop-top{
        //   display: inline-block;
        //   vertical-align: top;
          overflow: hidden;
          border-bottom: 1px #dcdcdc solid;
          padding-bottom: 30px;
          h3{
              width: 300px;
              margin-left: 100px;
          }
            .top-span-img{
               width: 80px;
                height: 80px;
                margin-right: 20px;
                float: left;
                overflow: hidden;
                border:1px #dcdcdc solid;
                border-radius: 4px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
      }
      .group-contTop-mind{
         .skuInfo{
             padding: 0px;
             margin: 0px;
             margin-top: 20px;
         } 
         .skuInfoLi{
             font-size: 14px;
             line-height: 1.8;
             color: #9b9b9b ;
             display: inline-block;
             width: 25%;
             box-sizing: border-box;
         }
         .gds-list{
             position: relative;
             overflow: hidden;
             margin-top: 40px;
            //  &:after{
            //      content: "";
            //      position: absolute;
            //      top:20px;
            //      width: 1px;
            //      height: 100%;
            //      left: 50%;
            //      background-color: #dcdcdc;
            //  }
             .gdsImg{
                 width: 80px;
                 height: 80px;
                 display: inline-block;
                 overflow: hidden;
                 border:1px #dcdcdc solid;
                 margin-top: 30px;
                 margin-right: 10px;
                 overflow: hidden;
                 .moretxt{
                     float: left;
                    width: 100%;
                    height: 100%;
                    line-height: 80px;
                    font-size: 12px;
                    color: #666;
                    text-align: center;
                 }
                 img{
                     width: 100%;
                     height: 100%;
                 }
             }
         }
        //  .gds-left 
        //  , .gds-right{
        //      display: inline-block;
        //      vertical-align: top;
        //      width: 50%;
        //      box-sizing: border-box;
        //  }
        //   .gds-right{
        //       padding-left: 40px;
        //   }
        //   .gds-left{
        //       padding-right: 40px;
        //   }
      }
      .topbtns{
          float: right;
      }
    }
    .group-mid{
        
    }
  }
}
</style>