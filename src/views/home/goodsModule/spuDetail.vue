<template>
<!-- <div>SKU详情</div> -->
    <div class="spudetail-page">
        <myBrea :my-nav='brea'></myBrea>
         <div class="spudetail-cont">
             <div class="spu-detail-top" v-if='Object.keys(detailData).length>0'>
                 <div class="spu-detail-left" >
                    <p class='spu-p'><span class='p-title'>SPU编号:</span><span class='p-cont'>{{detailData.spu.spuNo || '--'}}</span></p>
                    <p class='spu-p'><span class='p-title'>添加时间:</span><span class='p-cont'>{{detailData.spu.insTime | dateformat}}</span></p>
                    <p class='spu-p'><span class='p-title'>SPU名称:</span><span class='p-cont'>{{detailData.spu.spuName || '--'}}</span></p>
                    <p class='spu-p'><span class='p-title'>添加人:</span><span class='p-cont'>{{detailData.spu.insUser || '--'}}</span></p>
                    <p class='spu-p'><span class='p-title'>SPU英文名:</span><span class='p-cont'>{{detailData.spu.spuNameEn || '--'}}</span></p>
                    <p class='spu-p'><span class='p-title' :class="{'isUse':detailData.spu.state=='00001001'}">{{detailData.spu.state=='00001001'? "启用中":"已禁用"}}</span></p>
                 </div>
                 <div class="spu-detail-right">
                     <el-button type="primary" @click="spuEditorClick">编辑SPU名称</el-button>
                     <el-button type="primary" plain @click="ableClick"> {{detailData.spu.state=='00001001'? "禁用":"启用中"}}</el-button>
                 </div>
             </div>
              <my-nocont v-else :cont-txt='"暂无数据!!"'></my-nocont>

             <div class="spu-detail-mid">
                 <div class="spu-table" >
                      <el-table
                        :data="detailData.skus"
                        stripe
                        style="width: 100%">
                        <el-table-column
                        prop="skuInfoNo"
                        label="SPU编号">
                        </el-table-column>
                        <el-table-column
                        prop="skuTypeName"
                        label="类型名称"
                    >
                        </el-table-column>

                        <el-table-column
                        prop="skuInfoName"
                        label="属性名称">
                        </el-table-column>

                        <el-table-column
                        label="状态">
                            <template slot-scope="scope">
                                {{scope.row.state=='00001001'? "启用中":"已禁用"}}
                            </template>
                        </el-table-column>
                    </el-table>
                 </div>
                 <div class='spu-mid-let'>
                     <h2>核心SKU</h2>
                </div>
             </div>
         </div>
         <!-- 编辑sku -->
         <el-dialog
            title="编辑SPU名称"
            :visible.sync="editorSpuDialog"
            width="40%"
            >
            <div>
                <el-row class='mt20'>
                    <el-col :span="5"><span class='my-span-notice'>*</span> SPU名称:</el-col>
                    <el-col :span="10"><el-input v-model="spuDetor.spuName" placeholder="请输入内容" maxlength="32" show-word-limit></el-input></el-col>
                </el-row>
                <el-row class='mt20'>
                    <el-col :span="5"><span class='my-span-notice'>*</span>SPU英文名称:</el-col>
                    <el-col :span="10"><el-input v-model="spuDetor.spuNameEn" placeholder="请输入内容" maxlength="32" show-word-limit></el-input></el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editorSpuDialog = false">取 消</el-button>
                <el-button type="primary" @click="editorSureSpuClick">确 定</el-button>
            </span>
            </el-dialog>
    </div>
</template>
<script>
import { myConfirm } from '../../../comm/until';
import myBrea from "../../../components/breadcrumb.vue"

export default {
    name:"spudetail",
    // props:{
    //      spuNo: {
    //         type: String,
    //         default: ""
    //     },
    // },
    data(){
        return{
            brea:[{"txt":"商品中心","url":"/goods"},{"txt":"SPU详情","url":"/"}], 
            editorSpuDialog:false,
            detailData:{},
            spuDetor:{
                spuNo:"",
                spuName:"",
                spuNameEn:""
            }
        }
    },
    methods:{
        async getSpuDetail(postData){
             await this.$store.dispatch(
                "GdsSpuModule/POST_SPU_DETAIL",
                postData
            );
            let data = this.$store.state.GdsSpuModule.POST_SPU_DETAIL;
            this.detailData =data.out.value
        },
        async getSpuUpdata(postData){
             await this.$store.dispatch(
                "GdsSpuModule/POST_SPU_UPDATA",
                postData
            );
            let data = this.$store.state.GdsSpuModule.POST_SPU_UPDATA;
             this.editorSpuDialog = false;
             this.getSpuDetail({spuNo:postData.spuNo})
            // this.detailData =data.out.value
        },
        async getSpuAnble(postData){
             await this.$store.dispatch(
                "GdsSpuModule/POST_SPU_ABLE",
                postData
            );
            let data = this.$store.state.GdsSpuModule.POST_SPU_ABLE;
            this.getSpuDetail({spuNo:postData.spuNo})
            this.$message.success(data.message)
        },
        spuEditorClick(){
            this.spuDetor={
                spuNo:"",
                spuName:"",
                spuNameEn:""
            }
            this.editorSpuDialog = true;
        },
        editorSureSpuClick(){
            this.spuDetor.spuNo = this.detailData.spu.spuNo;
            if(!this.spuDetor.spuName){
                this.$message.warning("请输入SPU名称");
                return;
            }
            if(!this.spuDetor.spuNameEn){
                this.$message.warning("请输入SPU英文名称");
                return;
            }
            this.getSpuUpdata(this.spuDetor)
        },

        ableClick(){
            let pData={
                "spuNo":this.detailData.spu.spuNo,
                "state":this.detailData.spu.state=='00001001'?'00001002':'00001001'
            }, _this = this;
            myConfirm(_this,_this.detailData.spu.state=='00001001'?'是否要禁用该spu？':'是否要启用该spu？',function(){
                 _this.getSpuAnble(pData)
            })
           
        }
    },
    components:{
        myBrea
    },
    created(){
        let nu='';
         nu = this.$route.query.spuNo
        // if(this.$route.query.spuNo){
        //     nu = this.$route.query.spuNo
        // }else{
        //     nu = this.spuNo
        // }
        this.getSpuDetail({spuNo:nu})
    }
}
</script>
<style lang="scss">
    .spudetail-page{
        .spudetail-cont{
              @extend %pagecont;
            .isUse{
                padding: 2px 5px;
                background-color: #0198fb;
                color: #fff;
                margin-left: 4px;
            }
            .spu-detail-top{
                padding: 20px;
                border-bottom: 1px #dcdcdc solid;
                .spu-detail-right,
                .spu-detail-left{
                    display: inline-block;
                    vertical-align: top;
                }
                .spu-detail-right{
                    text-align: right;
                    float: right;
                }
                .spu-detail-left{
                    
                    width: 620px;
                    overflow: hidden;
                    .spu-p{
                        display: inline-block;
                        width: 50%;
                        box-sizing: border-box;
                        vertical-align: top;
                        margin: 3px 0;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .p-title, .p-cont{
                        display: inline-block;
                        vertical-align: top;
                        padding: 5px;
                    }
                    .p-title{

                    }
                    .p-cont{
                        width: 210px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
            .spu-detail-mid{
                overflow: hidden;
                .spu-table,.spu-mid-let{
                    display: inline-block;
                    vertical-align: top;
                    padding: 20px 0;
                }
                .spu-table{
                   width: calc(100% - 140px);
                   float: right;
                }
                .spu-mid-let{
                     width: 120px;
                    
                     overflow: hidden;
                     h2{
                         margin-top: 20px;
                          font-size: 24px;
                     }
                    //  padding-left: 20p
                }
            }
            
        }
    }
</style>