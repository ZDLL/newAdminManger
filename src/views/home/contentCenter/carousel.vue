
<!-- <h2>轮播列表</h2> -->
<template>
    <div class="carousel-page">
        <myBrea :my-nav='brea'></myBrea>
        <div class="carousel-cont">
           <span>名称 </span> <el-input style="width:200px;margin-right:20px" v-model="seacData.bannerName" placeholder="请输入轮播图名称关键词" clearable @clear='clearBtn'></el-input>
            <el-button type="primary" @click="bannerSeachBtn">查询</el-button>
            <el-button style="float:right" type="primary" @click='addColumBtn'>添加轮播图</el-button>
            <div class="colum-table">
                 <el-divider content-position="left">所有轮播图</el-divider>
                 <div class="goods-table">
                        <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                            <el-table-column
                            prop="bannerNo"
                            label="编号">
                            </el-table-column>

                             <el-table-column
                            prop="bannerName"
                            label=名称>
                            </el-table-column>

                            <el-table-column
                            prop="bannerTypeName"
                            label="轮播图类型">
                            </el-table-column>
                            <el-table-column
                            prop="urlTypeName"
                            label="链接类型">
                            </el-table-column>

                            <el-table-column
                            label="添加人">
                                <template slot-scope="scope">
                                   {{scope.row.userName}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="添加时间">
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
                                    <!-- <el-button type="text" size="small">删除</el-button>  {{scope.row.state == '00001001'?'停用':"启用"}}-->
                                    <el-button type="text" size="small" @click="bannerEditorBtn(scope.row)">编辑 </el-button>
                                    <el-button type="text" size="small" @click="bannerStatusChange(scope.row)">{{scope.row.state == '00001001'?'停用':"启用"}}</el-button>
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
import myBrea from "../../../components/breadcrumb.vue"
import proUpload from '../../../components/proUpload.vue'
import { myConfirm } from '../../../comm/until';
import myPackage from '../../../components/package.vue'


export default {
    name:"carousel",
    components:{
        myBrea,
        proUpload,
        myPackage
    },
    data(){
        return{
            brea:[{"txt":"内容中心","url":"/goods"},{"txt":"轮播图管理","url":"/"}],
            tableData:[],
            seacData:{
                pageNo:"1",
                pageSize:10,
                bannerName:""
            },
            packTotal:1,
        }
    },
    methods:{
         async getBannerList(postData){
            await this.$store.dispatch('ContentModule/POST_BANNER_LIST',postData);
            let data = this.$store.state.ContentModule.POST_BANNER_LIST;
            this.tableData = data.out.list;
            this.packTotal = parseInt(data.out.totalSize)
        },
        async getBannerChange(postData){
            await this.$store.dispatch('ContentModule/POST_BANNER_CHANGE',postData);
            let data = this.$store.state.ContentModule.POST_BANNER_CHANGE;
            this.$message.success("操作成功");
            this.getBannerList(this.seacData)
        },
        addColumBtn(){
            this.$router.push({
                path:"/carouselAdd",
                query:{
                    bannerNo:""
                }
            })
        },
        bannerEditorBtn(row){
             this.$router.push({
                path:"/carouselAdd",
                query:{
                    bannerNo:row.bannerNo
                }
            })
        },
        bannerStatusChange(row){
            let isDis= row.state=='00001001'?'00001002':'00001001';
            let txt='';
            if(isDis=='00001002'){
                txt='是否要禁用该轮播？'
            }else{
                txt='是否要启用该轮播？'
            }
            let _this = this;
            myConfirm(_this,txt,function(){
                _this.getBannerChange({
                    bannerNo:row.bannerNo,
                    state:isDis
                })
            })
            
        },
        clearBtn(){
            this.seacData.bannerName='';
            this.getBannerList(this.seacData)
        },
        bannerSeachBtn(){
             this.getBannerList(this.seacData)
        },
        handleCurrentFunc(val){
            this.seacData.pageNo = val;
             this.getBannerList(this.seacData)
        }
    },

    created(){
        this.getBannerList(this.seacData)
    }

}
</script>
<style lang="scss">
    .carousel-page{
        .mt20{
            margin-top: 20px;
        }
        .carousel-cont{
             @extend %pagecont;
        }
    }
</style>