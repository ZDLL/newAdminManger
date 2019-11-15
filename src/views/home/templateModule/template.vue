<!-- <h2>模版管理</h2> -->
<template>
    <div class="tel-page">
          <myBrea :my-nav='brea'></myBrea>
        <div class="tel-con">
          <span>模版名称：</span> 
          <el-input style="width:200px;margin-right:20px" 
            v-model="seachData.keywords" 
            placeholder="请输入关键词" 
            clearable 
            @clear='clearBtn'></el-input>
            <el-button type="primary" @click="searchBtn">查询</el-button>
            <el-button style="float:right" type="primary" @click="addTempBtn">新建模版</el-button>
            <div class="tel-table">
                 <el-divider content-position="left">所有模版</el-divider>
                 <div class="telCont-table">
                        <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                            <el-table-column
                            prop="template_no"
                            label="模版编号">
                            </el-table-column>
                            <el-table-column
                            prop="template_name"
                            label="模版名称">
                            </el-table-column>

                            <el-table-column
                            prop="ins_time"
                            label="添加时间">
                                <!-- <template slot-scope="scope">
                                   {{scope.row.insTime | dateformat}}
                                </template> -->
                            </el-table-column>
                             <el-table-column
                             prop="ins_user"
                            label="添加人">
                            </el-table-column>

                            <el-table-column
                            prop="status_name"
                            label="状态">
                            <!-- <template slot-scope="scope">
                                    {{scope.row.state == '00001001'?'启用':"停用"}}
                                </template> -->
                            </el-table-column>
                                
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="100">
                                <template slot-scope="scope">
                                    <!-- <el-button type="text" size="small">删除</el-button>  {{scope.row.state == '00001001'?'停用':"启用"}}-->
                                    <el-button type="text" size="small" @click="editorTempBtn(scope.row)">编辑 </el-button>
                                    <!-- <el-button type="text" size="small" >查看</el-button> -->
                                    <el-button type="text" size="small" @click="changeTemStaBtn(scope.row)">{{scope.row.status == '00001001'?'停用':"启用"}}</el-button>
                                    <br/>
                                    <el-button type="text" size="small" @click='delTempBtn(scope.row)'>删除</el-button> 
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
import myPackage from '../../../components/package.vue'
import { myConfirm } from "../../../comm/until";
export default {
    name:"tel",
    components:{
        myBrea,
        myPackage
    },
    data(){
        return{
            brea:[{"txt":"模版中心","url":"/goods"},{"txt":"模版管理","url":"/"}],
            packTotal:1,
            tableData:[],
            seachData:{
                current_page:"1",
                page_size:'10',
                keywords:""
            }
        }
    },
    methods:{
        async getTeList(){
            await this.$store.dispatch("TemplateModule/POST_TE_LIST",this.seachData);
            let data = this.$store.state.TemplateModule.POST_TE_LIST;
            this.tableData = data.out.result
            this.packTotal = parseInt(data.out.total)
        },
        async postChangeTempSta(postData){
            await this.$store.dispatch("TemplateModule/POST_TE_CHANGE_STA",postData);
            let data = this.$store.state.TemplateModule.POST_TE_CHANGE_STA;
            this.$message.success("操作成功")
            this.getTeList();
        },
        clearBtn(){
            this.seachData.keywords =''
            this.getTeList();
        },
        handleCurrentFunc(val){
            this.seachData.current_page = val;
            this.getTeList();
        },
        editorTempBtn(row){
            this.$router.push({
                path:"/tempAdd",
                query:{
                    template_no:row.template_no
                }
            })
        },
        addTempBtn(){
            this.$router.push({
                path:"/tempAdd",
                query:{
                    template_no:""
                }
            })
        },
        changeTemStaBtn(row){
            let _this = this;
            myConfirm(_this,row.status=='00001001'?'是否禁用该模版？':'是否启用该模版',function(){
                _this.postChangeTempSta({
                    template_no:row.template_no,
                    status:row.status=='00001001'?'00001002':'00001001'
                })
            })
        },
        delTempBtn(row){
            let _this = this;
            myConfirm(_this,"是否删除该模版？",function(){
                _this.postChangeTempSta({
                    template_no:row.template_no,
                    status:'00001003'
                })
            })
        },
        searchBtn(){
             this.getTeList();
        }
    },
    created(){
         this.getTeList();
    }
}
</script>
<style lang="scss">
.tel-page{
    
    .tel-con{
        @extend %pagecont;
    }
}
</style>