<template>
    <div class="goods-page">
          <myBrea :my-nav='brea'></myBrea>
          <div class="goods-cont">
              <div class="goods-menu">
                  <el-menu :default-active="activeIndex" :active='activeIndex' class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="goodsAllModu">商品管理</el-menu-item>
                        <el-menu-item index="goodsModu">商品组管理</el-menu-item>
                        <el-menu-item index="spuModu">SPU管理</el-menu-item>
                        <el-menu-item index='skuModu'>SKU管理</el-menu-item>
                        <el-menu-item index="skuStatuModu">SKU类型管理</el-menu-item>
                    </el-menu>
              </div>
              <div class="moduCont">
                  <skuStatuModu  v-if='actibeCom == "skuStatuModu"'></skuStatuModu>
                  <goodsModu v-if='actibeCom == "goodsModu"' @show-gorup-detail='groupDetailFunc'></goodsModu>
                  <spuModu  v-if='actibeCom == "spuModu"' @show-detail='showDetaileFunc'></spuModu>
                  <spuDetail v-if='actibeCom == "spuDetail"'></spuDetail>
                  <skuModu v-if='actibeCom == "skuModu"'></skuModu>
                   <groupModu v-if='actibeCom == "groupModu"' @show-gds-detail='gdsDetailFunc' @show-gds-editor='gdsEditorFunc'></groupModu>
                   <gdsDetail v-if='actibeCom == "gdsDetail"'></gdsDetail>
                   <gdsModu v-if='actibeCom == "goodsAllModu"' @show-gds-detail='gdsDetailFunc'></gdsModu>
                   <gdsEditorModu v-if='actibeCom == "gdsEditorModu"'></gdsEditorModu>
                  <!-- <component :is='actibeCom' :key='actibeCom' @show-detail='showDetaileFunc'></component> -->
              </div>
          </div>
    </div>
</template>
<script>
import {menuSetData,myConfirm} from '../../../comm/until'
import myBrea from "../../../components/breadcrumb.vue"
import skuStatuModu from './skuStatuModu.vue'
import goodsModu from './goodsModu.vue'
import spuModu from './spuModu.vue'
import skuModu from './skuModu.vue'
import spuDetail from './spuDetail.vue'
import groupModu from './goodsDetail.vue'
import gdsDetail from './goodsAllDetail.vue'
import gdsModu from './goodsAllmodu.vue'
import gdsEditorModu from './editorGds.vue'
export default {
    name:"goodindex",
    components:{
        myBrea,
        skuStatuModu,
        goodsModu,
        spuModu,
        spuDetail,
        skuModu,
        groupModu,
        gdsDetail,
        gdsModu,
        gdsEditorModu
    },
    data(){
        return{
            spuDe:false,
            activeIndex:"goodsModu",
            actibeCom:"",
            brea:[{"txt":"商品管理","url":"/goods"},{"txt":"商品组管理","url":"/"}], 
        }
    },
    methods:{
        handleSelect(index){
            let name ='商品组管理'
            if(index =='goodsModu'){
                name= '商品组管理'
            }else if(index =='spuModu'){
                name= 'SPU管理'
            }else if(index =='skuModu'){
                name= 'SKU管理'
            }else if(index =='skuStatuModu'){
                name= 'SKU类型管理'
            }else if(index =='goodsAllModu'){
                name= '商品管理'
            }
            this.brea[1].txt=name
            this.actibeCom = index;
            this.$router.push({query: {com: index}})
        },
        showDetaileFunc(spuData){
            this.actibeCom =''
            this.actibeCom=spuData.com;
             this.brea[1].txt = 'SPU详情';
            this.$router.push({query: {com: spuData.com,spuNo:spuData.spuNo}})
        },
        groupDetailFunc(groupData){
            this.actibeCom = groupData.com//'商品组详情';
            this.brea[1].txt='商品组详情'
            this.$router.push({query: {com: groupData.com,groupNo:groupData.groupNo}})
        },
        gdsDetailFunc(gdsData){
            this.actibeCom = gdsData.com//'商品详情';
            this.brea[1].txt='商品详情'
            this.activeIndex ='';
            this.activeIndex="goodsAllModu";
            this.$router.push({query: {com: gdsData.com,goodsNo:gdsData.gdsNo}})
        },
        gdsEditorFunc(gdsErData){
            this.brea[1].txt='编辑商品组'
            this.actibeCom=gdsErData.com;
            this.$router.push({query: {com: gdsErData.com,gruopNo:gdsErData.groupNo}})
        }
    },
    created(){
        let initCom='goodsModu'
       if(this.$route.query.com){
            initCom=this.$route.query.com
       }else{
           this.$router.push({query: {com: "goodsModu"}});
       };
        this.actibeCom = initCom;
        this.activeIndex = initCom
        
    }

}
</script>
<style lang="scss">
    .goods-page{

        .goods-cont{
            @extend %pagecont;
            .goods-menu{
                .el-menu-item{
                    margin: 0 20px;
                    text-align: center;
                }
            }
            .moduCont{
                margin-top: 20px;
            }
        }
    }
</style>