<!-- <h2>模版管理</h2> -->
<template>
    <div class="tel-page">
          <myBrea :my-nav='brea'></myBrea>
        <div class="tel-con">
          <span>名称 </span> <el-input style="width:200px;margin-right:20px" placeholder="请输入关键词" clearable @clear='clearBtn'></el-input>
            <el-button type="primary" >查询</el-button>
            <el-button style="float:right" type="primary" @click="addTempBtn">新建栏目</el-button>
            <div class="tel-table">
                 <el-divider content-position="left">所有模版</el-divider>
                 <div class="telCont-table">
                        <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                            <el-table-column
                            prop="columnNo"
                            label="模版编号">
                            </el-table-column>
                            <el-table-column
                            prop="columnName"
                            label="模版名称">
                            </el-table-column>

                            <el-table-column
                            prop="insTime"
                            label="添加时间">
                                <template slot-scope="scope">
                                   {{scope.row.insTime | dateformat}}
                                </template>
                            </el-table-column>
                             <el-table-column
                             prop="realName"
                            label="添加人">
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
                                    <el-button type="text" size="small" >编辑 </el-button>
                                    <el-button type="text" size="small" >查看</el-button>
                                    <el-button type="text" size="small" >{{scope.row.state == '00001001'?'停用':"启用"}}</el-button>
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
            tableData:[]
        }
    },
    methods:{
        clearBtn(){},
        handleCurrentFunc(val){},
        addTempBtn(){
            this.$router.push({
                path:"/tempAdd"
            })
        }
    },
    created(){

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