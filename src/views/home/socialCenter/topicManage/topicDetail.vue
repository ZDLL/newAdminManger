<template>
    <div class='topicDetail-page'>
        <myBrea :my-nav='brea'></myBrea>
        <div class='topicDetail-top'>
            <el-row>
                <el-col :span="6">
                    <div class='ticpTop-div'>
                        <el-avatar :size="100" :src="topicData.picture"></el-avatar>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class='topicTxt' style="margin-top:10px;line-height: 2;">
                        <p>话题名称：<span class='bold'>{{topicData.name || "--"}}</span></p>
                        <p>推荐顺序：<span class='bold'>{{ topicData.is_recommend ==1? topicData.sort_recommend || "--" :"未推荐"}}</span></p>
                        <p>是否推荐：<span class='bold'>{{topicData.is_recommend | fileterYesOrNo}}</span></p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div style="margin-top:10px;line-height: 2;">
                        <p style="color:#666">动态数</p>
                        <strong style="font-size:30px;color:#333;font-weight:600">{{topicData.publish_num || "0"}}</strong>
                    </div>
                </el-col>
                <!-- <el-col :span="4">
                      <el-button type="primary" style="margin-top:20px" size="small" plain @click="recommendBtn">推荐设置</el-button>
                </el-col> -->
            </el-row>
            <div style="margin-top:30px" class='dec'>描述： <span class='bold'>{{topicData.describe || "--"}}</span></div>
        </div>
        <div class='topicDetail-cont'>
             <el-divider content-position="left">动态列表</el-divider>
             <div class='dyncTable'>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column
                            v-for="(itm,index) in tableHead"
                            :key="index"
                            :prop="itm.prop"
                            :label="itm.label"
                        ></el-table-column >
                        <el-table-column label="类型">
                            <template slot-scope="scope">
                            <span>{{scope.row.publish_type | fileType}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="是否推荐">
                            <template slot-scope="scope">
                            <span>{{scope.row.is_recommend | fileterYesOrNo}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.status | fileStatus}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="180">
                            <template slot-scope="scope">
                            <!-- <el-button type="text">删除</el-button> -->
                            <el-button type="text" @click="dynToView(scope.row)">查看</el-button>
                            <!-- <el-button type="text" @click='recomBtn(scope.row)'>推荐</el-button> -->
                            </template>
                        </el-table-column>
                    </el-table>
             </div>

              <myPackge v-if='total' :key='total' :pageTotal='total' @handleCurrent='handleCurrentFunc'></myPackge>

        </div>
        <!-- 推荐层 -->
        <el-dialog title="推荐设置" :visible.sync="recDialog">
        <el-form>
            <el-form-item label="是否推荐">
                <el-radio v-model="radio" label="1">推荐</el-radio>
                <el-radio v-model="radio" label="2">不推荐</el-radio>
            </el-form-item>
            <el-form-item v-show='radio==1' label="设置推荐顺序">
                <el-input v-model='recSort' type="number" placeholder="设置推荐顺序"></el-input>
                <p style="color:#999;font-size:12px">注：请输入1以上的数字，数字越小，越靠前</p>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="recDialog = false">取 消</el-button>
            <el-button type="primary" @click='topicRec'>确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>
<script>
// import place from "../../../components/place.vue";
import myBrea from "../../../../components/breadcrumb.vue"
import myPackge from '../../../../components/package.vue';
export default {
    name:"topicdetail",
    data(){
        return{
            brea:[{"txt":"社交中心","url":"/"},{"txt":"话题详情","url":"/"}],
            topicData:{},
            topicId:"",
            remId:"",
            tableHead: [
                 { prop: "id", label: "动态ID" },
                { prop: "nickname", label: "昵称" },
                { prop: "create_time", label: "发布时间" },
                // { prop: "topic", label: "所属话题" },
                { prop: "describe", label: "动态描述" }
            ],
            tableData:[],
            total:0,
            recDialog:false,
            radio:"1",
            recSort:1
        }
    },
    components:{
        myBrea,
        myPackge
    },
    methods:{
        async getTopicDetail(){
            await this.$store.dispatch('topicModule/topicDetailAct',{id:this.topicId});
            let data = this.$store.state.topicModule.topicDetailData;
            this.topicData =  data.info;
            this.recSort =  data.info.sort_recommend;
        },
        async getlist(objData){
            await this.$store.dispatch("topicModule/topicMomtList",objData)
            let momentsData = this.$store.state.topicModule.topipcMomtListData
            this.tableData = momentsData.info.result;
            this.total = parseInt(momentsData.info.total)
        },
        async recommend(){
            await this.$store.dispatch("dynamicModule/getRecommend",{id:this.remId});
            let data = this.$store.state.dynamicModule.momentRecommend;
            this.$message.success("推荐成功")
            this.getlist({id:this.topicId});
        },
        async topicRec(){
            await this.$store.dispatch("topicModule/topicRecAct",{id:this.topicId,sort:this.recSort});
            let data =this.$store.state.dynamicModule.topicRecData;
             this.$message.success("推荐成功")
            this.recDialog = false;
             this.getTopicDetail();
            // if(data.info.is_recommend == 1){
            //     this.$message.success("推荐成功")
            // }else if(data.info.is_recommend == 2){
            //     this.$message.success("取消推荐成功")
            // }
        },
        dynToView(row){
            this.$router.push({
                path:"/dynamicdetail",
                query:{
                    id:row.id
                }
            })
        },
        recomBtn(row){
            this.remId = row.id;
            this.recommend();
        },
        handleCurrentFunc(val){
            this.getlist({id:this.topicId,page_size:10,current_page:val})
        },
        recommendBtn(){
           this.recDialog = true;
        }
    },
    created(){
        this.topicId = this.$route.query.id;
        this.getTopicDetail();
        this.getlist({id:this.topicId});
        // console.log(this.topicId)
    },
    mounted(){}
}
</script>
<style lang="scss">
    .topicDetail-page{
        .topicTxt{
            color: #999;
            font-size: 14px;
        }
        .bold{
            color: #666;
            font-size: 15px;
        }
        .dec{
            margin-left: 20px;
            color: #666;
            margin-bottom: 5px;
        }
        .topicDetail-top,
        .topicDetail-cont{
            // background-color:#fff;
            // padding: 20px;
            // border-radius: 8px;
            // overflow: hidden;
             @extend %extreme;
        }
        .topicDetail-cont{
            .dyncTable{
              @extend %tableborder;
            }
        }
    }
</style>

