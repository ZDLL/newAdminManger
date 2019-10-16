 <!-- <h2>全部指标</h2> -->
<template>
    <div class="allTarget-page">
         <myBrea :my-nav='brea'></myBrea>
        <div class="allTarget-cont">
            <div class="goods-top">
                <el-input style="width:200px" 
                v-model="searchData.index_name" 
                placeholder="请输入指标名称搜索"
                clearable
                @clear='clearClick("index_name")'
                ></el-input>
                <span style="margin-left:30px">核心SKU：</span>
                <el-select 
                v-model="searchData.sku_no" 
                placeholder="请选择"
                clearable
                @clear='clearClick("sku_no")'>
                    <el-option
                    v-for="item in skuNoOpn"
                    :key="item.sku_no"
                    :label="item.sku_name"
                    :value="item.sku_no">
                    </el-option>
                </el-select>
                <el-button type="primary" style='margin-left:20px' plain @click="searchClick">查询</el-button>
                <el-button style="float:right" type="primary" @click="addTargetClick">添加指标</el-button>
            </div>
            <div class="target-table">
                <div class="table-cont">
                    <el-table
                        :data="tableData"
                        style="width: 100%">

                        <el-table-column
                            prop="index_no"
                             label="指标编号"
                        >

                        </el-table-column>
                        <el-table-column
                            prop="index_name"
                             label="指标名称"
                        >
                        </el-table-column>

                        <el-table-column
                            prop="type_name"
                             label="指标类型"
                        >
                             
                        </el-table-column>

                        <el-table-column
                            prop="ins_time"
                             label="添加时间"
                        >    
                        </el-table-column>
                        <el-table-column
                            prop="ins_user"
                             label="添加人"
                        >    
                        </el-table-column>

                        <el-table-column
                            prop="status_name"
                             label="状态"
                        >    
                        </el-table-column>
                        
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="scoreChangeStatusBtn(scope.row)">禁用/启用</el-button>
                            <el-button type="text" size="small" @click="editorTargetBtn(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="targetView(scope.row)">查看</el-button>

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
import { myConfirm } from "../../../comm/until";
import myPackage from '../../../components/package.vue'

export default {
    name:"alltarget",
    data(){
        return{
            skuNoOpn:[],
            tableData:[],
            searchData:{
                index_name:"",
                sku_no:"",
                current_page:"1",
                page_size:"10"
            },
            packTotal:1,
            brea:[{"txt":"指标中心","url":"/goods"},{"txt":"全部指标","url":"/"}],
        }
    },
    components:{
        myBrea,
        myPackage
    },
    methods:{
        async getTargetList(postData){
            await this.$store.dispatch("TargetModule/POST_TAERGET_LIST",postData)
            let data = this.$store.state.TargetModule.POST_TAERGET_LIST;
            this.tableData=data.out.result;
            this.packTotal =parseInt(data.out.total)

        },
        async scoreChangeStatus(postData) {//禁用启用
            await this.$store.dispatch(
                "ScoreModule/POST_CHANGE_STATUS",
                postData
            );
            let data = this.$store.state.ScoreModule.POST_CHANGE_STATUS;
            this.getTargetList(this.searchData)
            this.$message.success("操作成功")
        },
        async getSkuNo() {
            await this.$store.dispatch(
                "TargetModule/POST_GET_SKU_NO",
                {}
            );
            let data = this.$store.state.TargetModule.POST_GET_SKU_NO;
            this.skuNoOpn = data.out;
            // this.$message.success("操作成功")
        },
        searchClick(){
            this.getTargetList(this.searchData)
        },
        handleCurrentFunc(val){
            this.searchData.current_page = val;
            this.getTargetList(this.searchData)
        },
        scoreChangeStatusBtn(row){
            let pData={
                index_no:row.index_no,
                status:row.status_code =="00001001"?"00001002":"00001001" ,
            }
            let _this = this ;
            let txt=''
            if(pData.status== '00001002'){
                txt ='是否要禁用该指标，禁用后该指标将不会计算到总共得分中。'
            }else{
                txt='是否启用该指标，启用后该指标将会计算到总分中'
            }
            myConfirm(_this,txt,function(){
                _this.scoreChangeStatus(pData)
            })

        },
        editorTargetBtn(row){
           this.$router.push({
                path:"/addTarget",
                query:{
                    index_no:row.index_no
                }
            }) 
        },
        addTargetClick(){
            this.$router.push({
                path:"/addTarget",
                query:{
                    index_no:""
                }
            })
        },
        clearClick(type){
           this.searchData[type]='';
            this.getTargetList(this.searchData)
        },
        targetView(row){
            this.$router.push({
                path:"/targetDetail",
                query:{
                    index_no:row.index_no
                }
            })  
        }
    },
    created(){
        this.getTargetList(this.searchData)
        this.getSkuNo();
    }
}
</script>
<style lang="scss">
    .allTarget-page{
        .allTarget-cont{
             @extend %pagecont;
             .target-table{
                 margin-top: 30px;
             }
        }
    }
</style>