 <!-- <h2>指标详情</h2> -->
<template>
   <div class="tagretDetail">
        <myBrea :my-nav='brea'></myBrea>
       <div class="targetDetail-cont">
           <div class="cont-top" v-if='Object.keys(targetData)'>
               <el-row>
                    <el-col class='pad15' :span="6">
                        <h3>基本信息</h3>
                        <ul class='target-ul'>
                            <li>商品编号：{{targetData.index_no}}</li>
                            <li>状态：{{targetData.status_name}}</li>
                            <li>指标名称：{{targetData.index_name}}</li>
                            <li>添加时间：{{targetData.ins_time}}</li>
                            <li>指标类型：{{targetData.index_type_name}}</li>
                            <li>添加人：{{targetData.ins_user}}</li>
                        </ul>
                    </el-col>
                    <el-col class='pad15' :span="6">
                        <h3>指标描述</h3>
                        <div class='targetdec'>{{targetData.index_describe}}</div>
                    </el-col>
                    <el-col class='pad15' :span="6">
                        <h3>所属分类</h3>
                        <div class='tag-list'>
                            <el-tag v-for="(itm,inx) in targetData.goods_type" :key='inx'>{{itm.goods_type_name}}</el-tag>
                           
                        </div>
                    </el-col>
                    <el-col class='pad15' :span="6">
                         <el-button type="primary" plain @click="scoreChangeStatusBtn">{{targetData.status=='00001002'?"启用":"禁用"}}</el-button>
                         <el-button type="primary" @click="targetEditor">编辑</el-button>
                    </el-col>
                </el-row>
           </div>
            <div class="cont-mid">
                    <div class="goods-top">
                    <el-input style="width:200px" 
                    v-model="searchData.keywords" 
                    placeholder="输入商品关键词搜索"
                    clearable
                    @clear='clearClick("keywords")'
                    ></el-input>
                    <span style="margin-left:30px">商品类型：</span>
                    <el-select 
                    v-model="searchData.goods_type" 
                    placeholder="请选择"
                    clearable
                    @clear='clearClick("goods_type")'>
                        <el-option
                        v-for="item in goodTypeOpn"
                        :key="item.goods_type_no"
                        :label="item.goods_type_name"
                        :value="item.goods_type_no">
                        </el-option>
                    </el-select>
                    <el-button type="primary" style='margin-left:20px' plain @click="searchClick">查询</el-button>
                </div>
                <el-divider content-position="left">关联商品组列表</el-divider>
                <div class='group-table'>
                     <el-table
                        :data="tableData"
                        style="width: 100%">

                        <el-table-column
                            prop="goods_group_no"
                             label="商品编号"
                              width="160"
                        >

                        </el-table-column>
                        <el-table-column
                             label="商品"
                             width="350"
                        >
                        <template slot-scope="scope">
                            <span class='goodImg-span'>
                                <img v-if='scope.row.picture_url' :src='scope.row.picture_url' alt="商品图片">
                                <span v-else>无图片</span>
                            </span>
                                <p class="margin-left:70px;text-align:left;">{{scope.row.goods_group_name}}</p>
                        </template>
                        </el-table-column>

                        <el-table-column
                             label="权重"
                        >
                        <template slot-scope="scope">
                            {{scope.row.index_weight || 0}}%
                        </template>
                             
                        </el-table-column>

                        <el-table-column
                            label="指标评分"
                        >   
                         <template slot-scope="scope">
                            {{scope.row.index_score || '暂无评分'}}
                        </template>
                        </el-table-column>
                        <el-table-column
                            prop="ins_time"
                             label="创建时间"
                        >    
                        </el-table-column>
                         <el-table-column
                            prop="status_name"
                            label="状态"
                        >    
                        </el-table-column>
                        <!-- <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="scoreChangeStatusBtn(scope.row)">禁用/启用</el-button>
                        </template>
                        </el-table-column> -->
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
    name:"targetdetail",
    data(){
        return{
             tableData:[],
             classVal:[],
             targetData:{},
             index_no:"",
             goodTypeOpn:[],
             packTotal:0,
             searchData:{
                 index_no:"",
                 keywords:"",
                 goods_type:"",
                 current_page:'1',
                 page_size:'10'
             },
             brea:[{"txt":"指标中心","url":"/goods"},{"txt":"指标详情","url":"/"}],
        }
    },
    components:{
        myBrea,
        myPackage
    },
    methods:{
         async getTargetDetail(postData){
            await this.$store.dispatch('TargetModule/POST_TARGET_DETAIL',postData);
            let data = this.$store.state.TargetModule.POST_TARGET_DETAIL;
            this.targetData = data.out;
            this.classVal=[];
            console.log(data)
            data.out.goods_type.map((itm)=>{
                this.classVal.push(itm.goods_type_no)
            })
        },
        async getGroupList(postData){
            await this.$store.dispatch('TargetModule/POST_GET_GROUP_LIST',postData);
            let data = this.$store.state.TargetModule.POST_GET_GROUP_LIST;
            console.log(data)
            this.tableData = data.out.result
            this.packTotal = parseInt(data.out.total)
        },
        async scoreChangeStatus(postData) {//禁用启用
            await this.$store.dispatch(
                "ScoreModule/POST_CHANGE_STATUS",
                postData
            );
            let data = this.$store.state.ScoreModule.POST_CHANGE_STATUS;
            this.getTargetDetail({index_no: this.index_no})
            this.$message.success("操作成功")
        },
        async getGdsList(postData){
            await this.$store.dispatch('TargetModule/POST_GDS_TYPE_LIST',postData);
            let data = this.$store.state.TargetModule.POST_GDS_TYPE_LIST;
            this.goodTypeOpn = data.out
        },
         scoreChangeStatusBtn(){//启用或禁用
            let pData={
                index_no:this.targetData.index_no,
                status:this.targetData.status =="00001001"?"00001002":"00001001" ,
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
        clearClick(type){
            this.searchData[type]='';
            this.getGroupList(this.searchData);
        },
        searchClick(){
             this.getGroupList(this.searchData);
        },
        handleCurrentFunc(val){
            this.searchData.current_page = val;
            this.getGroupList(this.searchData);
        },
        targetEditor(){
            let _this = this;
            this.$router.push({
                path:"/addTarget",
                query:{
                    index_no:_this.index_no
                }
            }) 
        }

    },
    created(){
         this.index_no = this.$route.query.index_no;
         this.getTargetDetail({index_no: this.index_no})
         this.searchData.index_no =  this.index_no
         this.getGroupList(this.searchData);
        this.getGdsList({})
    }
}
</script>
<style lang="scss">
.tagretDetail{
    .targetDetail-cont{
        //  @extend %pagecont;
        .cont-top{
              @extend %pagecont;
             h3{
                 margin-bottom: 25px;
                 font-size: 16px;
                 color: #403f4c;
             }
            .pad15{
                padding: 0 15px;
            }
            .tag-list{
                .el-tag{
                    margin-right: 10px;
                    margin-bottom: 10px;
                }
            }
            .targetdec{
                color: #999;
                font-size: 14px;
            }
         }
        .target-ul{
            padding: 0px;
            margin: 0px;
            font-size: 14px;
           
            li{
                color: #999;
                display: inline-block;
                vertical-align: top;
                line-height: 1.8;
                width: 50%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .cont-mid{
             @extend %pagecont;
        }
        .goodImg-span{
            display: inline-block;
            vertical-align: top;
            width: 60px;
            height: 60px;
            float: left;
            margin-right: 10px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}

</style>