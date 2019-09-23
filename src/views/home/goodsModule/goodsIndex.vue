<template>
    <div class="goods-page">
          <myBrea :my-nav='brea'></myBrea>
          <div class="goods-cont">
              <div class="goods-menu">
                  <el-menu :default-active="activeIndex" :key="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="goodsModu">商品组管理</el-menu-item>
                        <el-menu-item index="spuModu">SPU管理</el-menu-item>
                        <el-menu-item index='skuModu'>SKU管理</el-menu-item>
                        <el-menu-item index="skuStatuModu">SKU类型管理</el-menu-item>
                    </el-menu>
              </div>
              <div class="moduCont">
                  <component :is='actibeCom'></component>
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
export default {
    name:"goodindex",
    components:{
        myBrea,
        skuStatuModu,
        goodsModu,
        spuModu,
        skuModu
    },
    data(){
        return{
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
            }
            this.brea[1].txt=name
            this.actibeCom = index;
            this.$router.push({query: {com: index}})
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