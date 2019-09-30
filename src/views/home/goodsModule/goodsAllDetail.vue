
<!-- <h2>商品详情</h2> -->
<template>
  <div class="gds-page">
     <myBrea :my-nav='brea'></myBrea>
    <div class="gds-cont" v-if='Object.keys(gdsInfo).length>0'>
      <div class="group-cont-top">
        <div class="group-contTop-top" v-if='Object.keys(gdsInfo.goodsInfo).length>0'>
          <!-- <span class="top-span-img">
            <img src alt="图片" />
          </span> -->
          <h3 v-if='gdsInfo.goodsInfo'>{{gdsInfo.goodsInfo.goodsName}}</h3>
          <div class="topbtns">
            <!-- <el-button type="primary">删除</el-button> -->
            <el-button type="primary" plain @click="gdsDetailAnbaleClick(gdsInfo.goodsInfo.state)">{{gdsInfo.goodsInfo.state=='00001002'?"启用":'停用'}}</el-button>
             
          </div>
        </div>
        <div class="group-contTop-mind" v-if='Object.keys(gdsInfo.labels).length>0'>
          <h3 style="margin-top:40px;">SKU信息</h3>
          <ul class="skuInfo" v-if='gdsInfo.labels.length>0'>
                <li class="skuInfoLi" v-for='(itm,inx) in gdsInfo.labels' :key='inx'>{{itm}}</li>
            </ul>
          <div class="gds-list">
            <div class="gds-left">
              <h3>商品图片</h3>
              <viewer v-if='gdsInfo.photos.length>0'>
                  <ul>
                      <li class="gdsImg" v-for='(itm,inx) in gdsInfo.photos' :key='inx' >
                          <img :src='itm.attachPath' alt="">
                      </li>
                  </ul>
                  
                  <!-- <p v-else>暂无数据！！！ </p> -->
              </viewer>
              <my-nocont v-else  :cont-txt='"暂无数据!!"'></my-nocont>
            </div>
          </div>
          <div class='gdsDetail'>
            <h3>商品详情</h3>
            <div class='gdsCont' v-if='gdsInfo.group.goodsGroupIntroduce' v-html="gdsInfo.group.goodsGroupIntroduce"></div>
             <my-nocont v-else :cont-txt='"暂无数据!!"'></my-nocont>
          </div>
        </div>
      </div>
    </div>
    <!-- <p v-else>暂无数据！！</p> -->
  </div>
</template>
<script>
import { myConfirm } from "../../../comm/until";
import myBrea from "../../../components/breadcrumb.vue"
// import myPackage from '../../../components/package.vue'
export default {
  name: "goodsdetail",
  data(){
    return{
      gdsInfo:{},
      goodsNo:'',
       brea:[{"txt":"商品中心","url":"/goods"},{"txt":"商品详情","url":"/"}], 
    }
  },
  components:{
    myBrea
  },
  methods:{
     async getGdsInfoDetail(postData){
          await this.$store.dispatch("GdsInfoModule/GET_GDS_INFO_DETAIL",postData);
          let data = this.$store.state.GdsInfoModule.GET_GDS_INFO_DETAIL;
          this.gdsInfo  = data.out
      },
      async getGdsInfoAble(postData){
          await this.$store.dispatch("GdsInfoModule/POST_GDS_INFO_ABLE",postData);
          let data = this.$store.state.GdsInfoModule.POST_GDS_INFO_ABLE;
            this.$message.success("操作成功");
            this.getGdsInfoDetail({goodsNo:this.goodsNo})
      },
      gdsDetailAnbaleClick(state){
            let _this=this;
            let endAble = state=='00001001'?true:false;
            let st=state=='00001001'?"00001002":"00001001";
            myConfirm(_this,(endAble?'禁用后该商品组下的商品，将一起禁用？':'是否启用该商品组'),function(val){
                console.log(val)
                _this.getGdsInfoAble({goodsNo:_this.goodsNo,state:st})
            })
            // myConfirm(_this,(endAble?'禁用后该商品组下的商品，将一起禁用？':'是否启用该商品组'),function(){
            //     _this.getGdsInfoAble({goodsNo:this.goodsNo,state:st})
            // })
        }
  },
  created(){
     if(this.$route.query.gdsNo){
          this.goodsNo = this.$route.query.gdsNo
      }else{
          this.$message.warning("")
      }

      this.getGdsInfoDetail({goodsNo:this.goodsNo})
  }
};
</script>
<style lang="scss">
    .gds-page{
        .gds-cont{
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
                        display: inline-block;
                        vertical-align: middle;
                        // margin-left: 100px;
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
                   
                }
                .topbtns{
                    float: right;
                }
            }
            .gdsDetail{
                margin-top: 30px;
            }
            .gdsCont{
              margin-top: 30px;
              width: 600px;
              border:1px #dcdcdc solid;
              padding:10px 20px;
            }
        }
    }
</style>