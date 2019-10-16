<template>
    <!-- <div>SPU管理</div> -->
    <div class="spuModu-page">
         <myBrea :my-nav='brea'></myBrea>
       <div class="spucont">
           <div class="spu-cont-top">
                <el-input style="width:200px" v-model="pageData.goodsName" placeholder="请输入商品关键词"></el-input>
                <el-button style="float:right" type="primary" plain @click="searchClick">查询</el-button>
           </div>
           <div class="spu-cont-mid">
               <div class="spu-mid-let">
                   <el-tree :data="TreeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
               </div>
               <div class="spu-mid-right">
                    <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                        <el-table-column
                        prop="spuNo"
                        label="SPU编号">
                        </el-table-column>
                        <el-table-column
                        prop="spuName"
                        label="SPU名称"
                        >
                        </el-table-column>

                        <el-table-column
                        prop="spuNameEn"
                        label="SPU英文">
                        </el-table-column>

                        <el-table-column
                        label="状态">
                            <template slot-scope="scope">
                                {{scope.row.state=='00001001'? "启用中":"已禁用"}}
                            </template>
                        </el-table-column>
                        

                        <el-table-column
                        label="添加时间">
                        <template slot-scope="scope">
                                {{scope.row.insTime | dateformat}}
                            </template>
                        </el-table-column>
                            
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="viewClick(scope.row)">查看</el-button>
                                <el-button type="text" size="small" @click="spuAbleClick(scope.row)">{{scope.row.state=='00001001'? "禁用":"启用"}}</el-button>
                                <!-- <el-button type="text" size="small">编辑</el-button> -->
                            </template>
                        </el-table-column>
                    </el-table>
                    <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>
               </div>
           </div>
       </div>
        <!-- <spuDetail v-if='detailShow && spuNo' :spu-no='spuNo'></spuDetail> -->
    </div>
</template>
<script>
import { myConfirm, translateDataToTree } from "../../../comm/until";
import myPackage from '../../../components/package.vue'
import myBrea from "../../../components/breadcrumb.vue"
export default {
    name:"spu",
    // props:['showDetail'],
    data(){
        return{
            // detailShow:this.showDetail,
            brea:[{"txt":"商品中心","url":"/goods"},{"txt":"SPU管理","url":"/"}], 
            search:"",
            TreeData: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                    label: '三级 1-1-1'
                    }]
                }]
                }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                    label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                    label: '三级 2-2-1'
                    }]
                }]
                }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                    label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                    label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'skuInfoName'
            },
            tableData:[],
            packTotal:1,
            spuNo:"",
            pageData:{
                pageSize:10,
                pageNo:1,
                goodsName:""
            },
            detailData:{},
            skuInfoNo:""

        }
    },
    components:{
        myPackage,
        myBrea
    },
    methods:{
        async getList(postData) {
            await this.$store.dispatch(
                "GdsSkuTypeModule/POST_GDS_CHILD_LIST",
                postData
            );
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CHILD_LIST;
            if (data.out.list && data.out.list.length > 0) {
                this.TreeData = translateDataToTree(data.out.list, {
                    id: "skuInfoNo",
                    parId: "parSkuInfoNo"
                });
            }else{
                this.TreeData =[]
            }
        },
        async getSpuList(postData){
             await this.$store.dispatch(
                "GdsSpuModule/POST_SPU_LIST",
                postData
            );
            let data = this.$store.state.GdsSpuModule.POST_SPU_LIST;
            this.tableData = data.out.list
            this.packTotal = parseInt(data.out.totalSize)
        },
        async getSpuAnble(postData){
             await this.$store.dispatch(
                "GdsSpuModule/POST_SPU_ABLE",
                postData
            );
            let data = this.$store.state.GdsSpuModule.POST_SPU_ABLE;
            // this.getSpuList(this.pageData)
            this.getSpuList({skuInfoNo:this.skuInfoNo,pageNo:this.pageData.pageNo,pageSize:this.pageData.pageSize})

            this.$message.success(data.message)
        },
        handleNodeClick(data){
          
            this.skuInfoNo = data.skuInfoNo
            this.getSpuList({skuInfoNo:data.skuInfoNo,pageNo:this.pageData.pageNo,pageSize:this.pageData.pageSize})
        },
        handleCurrentFunc(val){
           
            this.pageData.pageNo =val;
            this.getSpuList(this.pageData)
        },
        searchClick(){
           this.getSpuList(this.pageData) 
        },
        viewClick(row){
            this.spuNo = row.spuNo
            let data={
               spuNo: row.spuNo
            }
            this.$router.push({
                path:"/spuDetail",
                query:data
            })
            // this.$emit("show-detail",{com:"spuDetail",spuNo:row.spuNo})
        },
        spuAbleClick(row){
            let pData={
                "spuNo":row.spuNo,
                "state":row.state=='00001001'?'00001002':'00001001'
            }
            let _this = this;
            myConfirm(_this,row.state=='00001001'?'是否要禁用该spu？':'是否要启用该spu？',function(){
                 _this.getSpuAnble(pData)
            })
        }
    },
    created(){
        this.getList({skuType: "01021001" });
    }
}
</script>
<style lang="scss">
    .spuModu-page{
        // padding: 20px;
        .spucont{
              @extend %pagecont;
            .spu-cont-mid{
                margin-top: 30px;
                position: relative;
                &:after{
                    content:'';
                    width:1px;
                    height: 100%;
                    position: absolute;
                    left: 30%;
                    background-color: #dcdcdc;                  
                }
                // border-top:40px #f5f5f5 solid;
                .spu-mid-let,.spu-mid-right{
                    display: inline-block;
                    vertical-align: top;
                    box-sizing: border-box;
                    padding: 20px;
                    padding-top: 0px;
                }
                .spu-mid-let{
                    width: 30%;
                    .el-tree-node__content .node__label{
                         font-weight: 500;
                    }
                }
                 .spu-mid-right{
                      width: 70%;
                }
            }
        }
    }
</style>