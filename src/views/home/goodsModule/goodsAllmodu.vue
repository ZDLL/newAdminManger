<!-- <h2>商品管理</h2> -->

<template>
    <div class="gdsInfopage">
        <myBrea :my-nav='brea'></myBrea>
        <div class="gds-info-cont">
            <div class="goods-top">
                <el-input style="width:200px" v-model="pageData.goodsName" placeholder="请输入商品关键词"></el-input>
                <span style="margin-left:30px">类型：</span>
                <el-cascader
                    v-model='cadVal'
                    :options="cascaderOps"
                    :props="{ checkStrictly: true ,value:'skuInfoNo',label:'skuInfoName'}"
                    clearable>
                </el-cascader>
                <el-button style="float:right" type="primary" plain @click="searchClick">查询</el-button>
            </div>
            <div class="good-mid">
                 <el-divider content-position="left">商品列表</el-divider>
                 <div class="goods-table">
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
                                     <el-button type="text" size="small" @click="gdsInfoAnbaleClick(scope.row)"> {{scope.row.state == '00001001'?'停用':"启用"}}</el-button>
                                    <el-button type="text" size="small" @click="gdsViewClick(scope.row)">查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
import { myConfirm,translateDataToTree } from "../../../comm/until";
import myPackage from '../../../components/package.vue'
import myBrea from "../../../components/breadcrumb.vue"
export default {
    name:"goodsall",
    data(){
        return{
            brea:[{"txt":"商品中心","url":"/goods"},{"txt":"商品管理","url":"/"}], 
            tableData:[],
            packTotal:1,
            cadVal:[],
            cascaderOps:[],
            pageData:{
                pageNo:1,
                pageSize:10,
                goodsName:"",
                skuInfoNo:""
            }
        }
    },
    components:{
        myPackage,
        myBrea
    },
    methods:{
        async getGdsInfoList(postData){
          await this.$store.dispatch("GdsInfoModule/POST_GDS_INFO_LIST",postData);
          let data = this.$store.state.GdsInfoModule.POST_GDS_INFO_LIST;
          this.tableData = data.out.list
          this.packTotal = parseInt(data.out.totalSize)
        },
        async getGdsInfoAble(postData){
          await this.$store.dispatch("GdsInfoModule/POST_GDS_INFO_ABLE",postData);
          let data = this.$store.state.GdsInfoModule.POST_GDS_INFO_ABLE;
            this.$message.success("操作成功");
            this.getGdsInfoList(this.pageData)
        },
        
        async getCadList(postData) {
            await this.$store.dispatch(
                "GdsSkuTypeModule/POST_GDS_CHILD_LIST",
                postData
            );
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CHILD_LIST;
            if (data.out.list && data.out.list.length > 0) {
                this.cascaderOps = translateDataToTree(data.out.list, {
                    id: "skuInfoNo",
                    parId: "parSkuInfoNo"
                });
            }else{
                this.cascaderOps =[]
            }
        },

        searchClick(){
            let lastLen = this.cadVal.length-1
            this.pageData.skuInfoNo = this.cadVal[lastLen];
            this.getGdsInfoList(this.pageData)
        },
        handleCurrentFunc(val){
            this.pageData.pageNo = val;
            this.getGdsInfoList(this.pageData)
        },
        gdsInfoAnbaleClick(row){
            let _this=this;
            let endAble = row.state=='00001001'?true:false;
            let st= row.state=='00001001'?"00001002":"00001001";
            myConfirm(_this,endAble?'禁用后该商品组下的商品，将一起禁用？':'是否启用该商品组',function(){
                _this.getGdsInfoAble({goodsNo:row.goodsNo,state:st})
            })
        },
        gdsViewClick(row){
             let data={
              com:"gdsDetail",
              gdsNo:row.goodsNo
          }
          this.$router.push({
              path:"/gdsDetail",
              query:data
          })
        //   this.$emit("show-gds-detail",data)
        }
    },
    created(){
        this.getCadList({skuType: "01021001" });
        this.getGdsInfoList(this.pageData)
    }
}
</script>
<style lang="scss">
    .gdsInfopage{
        
        .gds-info-cont{
            @extend %pagecont;
        }
    }
</style>