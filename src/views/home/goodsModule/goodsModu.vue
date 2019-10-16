<template>
    <!-- <div>商品组管理</div> -->
    <div class="goodsModu-page">
        <myBrea :my-nav='brea'></myBrea>
        <div class="goods-cont">
            <div class="goods-top">
                <el-input style="width:200px" v-model="pageData.goodsGroupName" placeholder="请输入商品组关键词"></el-input>
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
                 <el-divider content-position="left">商品组列表</el-divider>
                 <div class="goods-table">
                        <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                            <el-table-column
                            prop="goodsGroupNo"
                            label="商品编号">
                            </el-table-column>

                            <el-table-column
                            
                            label="商品"
                            >
                            <template slot-scope="scope">
                                <span class='groupImg'>
                                    <img v-if='scope.row.pic' :src='scope.row.pic' alt="图片">
                                    <span style="line-height:1.8;" v-else>无图片</span>
                                </span>
                                
                                <span class='grupTxt'>{{scope.row.goodsGroupName}}</span>
                            </template>
                            </el-table-column>

                            <el-table-column
                            prop="goodsCount"
                            label="商品数量">
                            </el-table-column>

                            <el-table-column
                            label="创建时间">
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
                                    <el-button type="text" size="small" @click="groupViewClick(scope.row)">查看</el-button>
                                    <el-button type="text" size="small" @click="isAnbleClick(scope.row)">{{scope.row.state=='00001001'?"禁用":"启用"}}</el-button>
                                    <!-- <el-button type="text" size="small">编辑</el-button> -->
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
import { myConfirm, translateDataToTree } from "../../../comm/until";
import myPackage from '../../../components/package.vue'
import myBrea from "../../../components/breadcrumb.vue"

export default {
    name:"goodsmodus",
    data(){
        return{
            brea:[{"txt":"商品中心","url":"/goods"},{"txt":"商品组管理","url":"/"}], 
            tableData:[],
            packTotal:1,
            cascaderOps:[],//联动搜索
            cadVal:[],
            pageData:{
                pageNo:1,
                pageSize:10,
                skuInfoNo:'',
                goodsGroupName:""
            }
        }
    },
    components:{
        myPackage,
        myBrea
    },
    methods:{
        async getGdsGroupList(postData){
            await this.$store.dispatch("GdsGroupModule/POST_GDS_GROUP_LIST",postData)
            let data = this.$store.state.GdsGroupModule.POST_GDS_GROUP_LIST;
            this.tableData =data.out.list;
            this.packTotal = parseInt(data.out.totalSize)
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
        async postGroupAnble(postData) {
            await this.$store.dispatch(
                "GdsGroupModule/POST_GDS_GROUP_ANBLE",
                postData
            );
            let data = this.$store.state.GdsGroupModule.POST_GDS_GROUP_ANBLE;
            this.getGdsGroupList(this.pageData)
            this.$message.success("操作成功")
        },
        searchClick(){
            let lastLen = this.cadVal.length-1
            this.pageData.skuInfoNo = this.cadVal[lastLen];
            this.getGdsGroupList(this.pageData)
        },
        groupViewClick(row){
            // console.log(row)
            let data ={
                groupNo:row.goodsGroupNo,
                com:"gdsGruopDetail"
            }
            this.$router.push({
                path:"/gdsGruopDetail",
                query:data
            })
            // this.$router.push({
            //     path:"gdsGruop",
            //     query:data
            // })
            // this.$emit("show-gorup-detail",data)
        },
        handleCurrentFunc(val){
            this.pageData.pageNo= val;
            this.getGdsGroupList(this.pageData)
        },
        isAnbleClick(row){
            let _this=this;
            let endAble = row.state=='00001001'?true:false;
            let st= row.state=='00001001'?"00001002":"00001001";
            myConfirm(_this,endAble?'禁用后该商品组下的商品，将一起禁用？':'是否启用该商品组',function(){
                _this.postGroupAnble({groupNo:row.goodsGroupNo,state:st})
            })
        }
    },
    
    created(){
        this.getCadList({skuType: "01021001" });
        this.getGdsGroupList(this.pageData)
    }
}
</script>
<style lang="scss">
    .goods-cont{
          @extend %pagecont;
    }
    .groupImg{
        width: 80px;
        height: 80px;
        display: inline-block;
        vertical-align: top;
        float: left;
        border:1px #dcdcdc solid;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .grupTxt{
        display: block;
        margin-left: 90px;
        text-align: left;
    }
</style>