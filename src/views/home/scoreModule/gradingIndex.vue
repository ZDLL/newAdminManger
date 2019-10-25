<!-- <h2>评分指标</h2> -->
<template>
  <div class="gradIndex-page">
      <div class="gradInde-cont">
           <div class="grupList-table">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                prop="index_no"
                label="指标编号">
                </el-table-column>
                <el-table-column
                prop="index_name"
                label="指标名称">
                </el-table-column>

                <el-table-column
                prop="index_type_name"
                label="指标类型"
                >
                </el-table-column>
                <el-table-column
                label="添加时间">
                <template slot-scope="scope">
                        {{scope.row.ins_time | dateformat}}
                        <!-- {{scope.row.state == '00001001'?'启用':"停用"}} -->
                    </template>
                </el-table-column>

                <el-table-column
                    prop="ins_user"
                    label="添加人">
               
                </el-table-column>
                <el-table-column
                    label="权重">
                    <template slot-scope="scope">
                        {{scope.row.index_weight || 0}}%
                    </template>
                </el-table-column>
                <el-table-column
                    prop="index_score"
                    label="指标评分">
                    <template slot-scope="scope">
                        {{scope.row.index_score || "暂无评分"}}
                    </template>
               
                </el-table-column>
                <el-table-column
                    prop="status_name"
                    label="状态">
                </el-table-column>
                    
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="scoreChangeStatusBtn(scope.row)">{{scope.row.status == '00001001'?'停用':"启用"}} </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>

         </div>
      </div>
  </div>
</template>
<script>
import { myConfirm,getStore } from "../../../comm/until";
import myPackage from '../../../components/package.vue'

export default {
    name:"grad",
     props:{
        groupNo:{
            type:String,
            default:""
        }
    },
    data(){
        return{
            tableData:[],
            packTotal:0,
            gruopId:this.groupNo,
            search:{
                goods_group_no:"",
                current_page:1,
                page_size:10
            }
        }
    },
   components:{
       myPackage
   },
    methods:{
        async getScoreList(postData){
            await this.$store.dispatch('ScoreModule/POST_SCORE_LIST',postData);
            let data = this.$store.state.ScoreModule.POST_SCORE_LIST;
            this.tableData = data.out.result;
            this.packTotal = parseInt(data.out.total)
        },
         async scoreChangeStatus(postData) {//禁用启用
            await this.$store.dispatch(
                "ScoreModule/POST_CHANGE_STATUS",
                postData
            );
            let data = this.$store.state.ScoreModule.POST_CHANGE_STATUS;
            this.getScoreList({goods_group_no:this.groupNo});
            this.$message.success("操作成功")
        },
        scoreChangeStatusBtn(row){
            let pData={
                index_no:row.index_no,
                status:row.status =="00001001"?"00001002":"00001001" ,
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
        handleCurrentFunc(val){
            this.search.current_page = val
            this.search.goods_group_no = this.groupNo
            this.getScoreList(this.search)
        }
    },
    created(){
        this.getScoreList({goods_group_no:this.groupNo})
    }
}
</script>
<style lang="scss">

</style>