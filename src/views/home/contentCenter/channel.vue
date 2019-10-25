<!-- <h2>频道列表</h2> -->
<template>
    <div class="channel-page">
        <myBrea :my-nav='brea'></myBrea>
        <div class="channel-cont">
           <span>频道名称 </span> <el-input style="width:200px;margin-right:20px" v-model="sarchData.channelName" placeholder="请输入频道名称关键词" clearable @clear='clearBtn'></el-input>
            <el-button type="primary" @click="channelSeachBtn">查询</el-button>
            <el-button style="float:right" type="primary" @click='addColumBtn'>添加频道</el-button>
            <div class="channel-table">
                 <el-divider content-position="left">所有频道</el-divider>
                 <!-- <div class="goods-table"> -->
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                            <el-table-column
                            prop="channelNo"
                            label="频道编号">
                            </el-table-column>
                            <el-table-column
                            prop="channelName"
                            label="频道名称">
                            </el-table-column>

                            <el-table-column
                            prop="channelTypeName"
                            label="频道类型">
                                <!-- <template slot-scope="scope">
                                   
                                </template> -->
                            </el-table-column>

                            <el-table-column
                            prop="channelOrder"
                            label="频道顺序">
                                <!-- <template slot-scope="scope">
                                   
                                </template> -->
                            </el-table-column>

                            <el-table-column
                            label="状态">
                            <template slot-scope="scope">
                                    {{scope.row.state == '00001001'?'启用':"停用"}}
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="添加时间">
                            <template slot-scope="scope">
                                   {{scope.row.insTime | dateformat}}
                                </template>
                            </el-table-column>
                             <el-table-column
                             prop="realName"
                            label="添加人">
                            <!-- <template slot-scope="scope">
                                   
                                </template> -->
                            </el-table-column>
                                
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="100">
                                <template slot-scope="scope">
                                    <!-- <el-button type="text" size="small">删除</el-button>  {{scope.row.state == '00001001'?'停用':"启用"}}-->
                                    <el-button type="text" size="small" @click="channelEdi(scope.row)">编辑 </el-button>
                                    <el-button type="text" size="small" @click="channelStatusChange(scope.row)">{{scope.row.state == '00001001'?'停用':"启用"}}</el-button>
                                     <el-button type="text" size="small" @click='channelView(scope.row)'>查看</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                    <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>
                 <!-- </div> -->
            </div>
        </div>
         <el-dialog
            :title='dialogTitle'
            :visible.sync="dialogAdd"
            width="40%"
           >
            <div>
                <el-row class='mt20'>
                    <el-col :span="4"><span class="my-span-notice">*</span>频道名称</el-col>
                    <el-col :span="10">
                        <el-input v-model="addChannel.channelName" clearable maxlength="32" show-word-limit placeholder="请输入内容"></el-input>
                    </el-col>
                </el-row>
                <el-row class='mt20'>
                    <el-col :span="4"><span class="my-span-notice">*</span>频道类型</el-col>
                    <el-col :span="10">
                        <el-select v-model="addChannel.channelType" placeholder="请选择">
                            <el-option
                            v-for="item in channelTypeOpn"
                            :key="item.codeInfoValue"
                            :label="item.codeInfoName"
                            :value="item.codeInfoValue">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class='mt20'>
                    <el-col :span="4"><span class="my-span-notice">*</span>频道顺序</el-col>
                    <el-col :span="10">
                        <el-input type="number" v-model="addChannel.channelOrder" clearable  placeholder="请输入内容"></el-input>
                    </el-col>
                </el-row>
                 <el-row v-if="addChannel.channelType=='07001004'" class='mt20'>
                    <el-col :span="4"><span class="my-span-notice">*</span>选择模版</el-col>
                    <el-col :span="10">
                        <el-select v-model="addChannel.templateNo" placeholder="请选择">
                            <el-option
                            v-for="item in templateOpn"
                            :key="item.templateNo"
                            :label="item.templateName"
                            :value="item.templateNo">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAdd = false">取 消</el-button>
                <el-button type="primary" @click="addSureBtn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import myBrea from "../../../components/breadcrumb.vue"
import proUpload from '../../../components/proUpload.vue'
import myPackage from '../../../components/package.vue'
import { myConfirm } from "../../../comm/until";
export default {
    name:"channel",
    components:{
        myBrea,
        proUpload,
        myPackage
    },
    data(){
        return{
            dialogTitle:"",
            dialogAdd:false,
            channelTypeOpn:[],
            templateOpn:[],
            brea:[{"txt":"内容中心","url":"/goods"},{"txt":"频道管理","url":"/"}],
            tableData:[],
            addChannel:{
                channelNo:"",
                channelName:"",
                channelType:"",
                templateNo:"",
                channelOrder:"",
                state:""
            },
            packTotal:1,
            sarchData:{
                pageNo:"1",
                pageSize:"10",
                channelName:"",
                // channelNo:"",
                // channelType:""
            }
        }
    },
    methods:{
        async getCodelist(postData, callBack) {//获取码值
            await this.$store.dispatch(
                "GdsSkuTypeModule/POST_GDS_CODES_LIST",
                postData
            );
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CODES_LIST;
            callBack(data.out[postData.codeTypes])
        },
        async getTemplatlist(postData) {
            await this.$store.dispatch(
                "ContentModule/POST_TEMPLATE_LIST",
                postData
            );
            let data = this.$store.state.ContentModule.POST_TEMPLATE_LIST;
            this.templateOpn = data.out.list
        },
        async channelSave(postData) {
            await this.$store.dispatch(
                "ContentModule/POST_CHANNEL_SAVE",
                postData
            );
            let data = this.$store.state.ContentModule.POST_CHANNEL_SAVE;
            this.$message.success("操作成功")
            this.channelList(this.sarchData)
            this.dialogAdd = false;
        },
        async channelList(postData) {
            await this.$store.dispatch(
                "ContentModule/POST_CHANNERL_LIST",
                postData
            );
            let data = this.$store.state.ContentModule.POST_CHANNERL_LIST;
            this.tableData = data.out.list;
            this.packTotal = parseInt(data.out.totalSize)
        },

        //POST_CHANNEL_SAVE
        addColumBtn(){
            this.addChannel={
                channelNo:"",
                channelName:"",
                channelType:"",
                templateNo:"",
                channelOrder:"",
                state:""
            };
            delete(this.addChannel['channelNo'])
             this.dialogAdd = true
             this.dialogTitle ='新建频道'
        },
        addSureBtn(){
            //channelName:"",
                // channelType:"",
                // templateNo:"",
                // channelOrder:"",
            if(!this.addChannel.channelName){
                this.$message.warning('请填写频道名称');
                return
            }
            if(!this.addChannel.channelType){
                this.$message.warning('请选择频道类型');
                return
            }
            if(!this.addChannel.channelOrder || this.addChannel.channelOrder<1){
                this.$message.warning('请填写大于0的频道顺序');
                return
            }
            if(this.addChannel.channelType=='07001004'){
                if(!this.addChannel.templateNo){
                    this.$message.warning('请选择模版');
                    return
                }
            }
            
            this.channelSave(this.addChannel)
        },
        handleCurrentFunc(val){
            this.sarchData.pageNo= val;
            this.channelList(this.sarchData)
        },
        channelEdi(row){
            let newObj = Object.assign({},row);
            this.addChannel = newObj;
            this.dialogAdd = true
            this.dialogTitle ='编辑频道'
        },
        channelView(row){
            this.$router.push({
                path:"/channelDetail",
                query:{
                    channelNo:row.channelNo
                }
            })
        },
        channelStatusChange(row){
             let _this = this;
            myConfirm(_this,`是否进行${row.state=='00001001'?'禁用该频道':'启用该频道'}操作？`,function(){
                _this.channelSave({channelNo:row.channelNo,state:row.state=='00001001'?'00001002':'00001001'})
            })
        },
        channelSeachBtn(){
           this.channelList(this.sarchData) 
        },
        clearBtn(){
            this.sarchData.channelName ='';
             this.channelList(this.sarchData)
        }
    },
    created(){
        let _this = this;
        this.getCodelist({codeTypes:"channelType"},function(backData){
            _this.channelTypeOpn = backData
        });
        this.getTemplatlist({});
        this.channelList(this.sarchData)
    }

}
</script>
<style lang="scss">
    .channel-page{
        .mt20{
            margin-top: 20px;
        }
        .channel-cont{
             @extend %pagecont;
        }
    }
</style>