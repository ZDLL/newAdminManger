<template>
    <div class="colum-page">
        <myBrea :my-nav='brea'></myBrea>
        <div class="colum-cont">
           <span>名称 </span> <el-input style="width:200px;margin-right:20px" v-model="searhData.columnName" placeholder="请输入关键词" clearable @clear='clearBtn'></el-input>
            <el-button type="primary" @click="searchBtnClick">查询</el-button>
            <el-button style="float:right" type="primary" @click='addColumBtn'>添加栏目</el-button>
            <div class="colum-table">
                 <el-divider content-position="left">所有栏目</el-divider>
                 <div class="goods-table">
                        <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                            <el-table-column
                            prop="columnNo"
                            label="编号">
                            </el-table-column>
                            <el-table-column
                            prop="columnName"
                            label="栏目名称">
                            </el-table-column>

                            <el-table-column
                            prop="columnTypeName"
                            label="栏目类型">
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
                                    <el-button type="text" size="small" @click="editorBtnClick(scope.row)">编辑 </el-button>
                                    <el-button type="text" size="small" @click="columnView(scope.row)">查看</el-button>
                                    <el-button type="text" size="small" @click="columnChange(scope.row)">{{scope.row.state == '00001001'?'停用':"启用"}}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>
                 </div>
            </div>
        </div>
        <el-dialog
            :title='dialogTitle'
            :visible.sync="dialogAdd"
            width="40%"
           >
            <div>
                <el-row class='mt20'>
                    <el-col :span="4"><span class="my-span-notice">*</span>栏目名称</el-col>
                    <el-col :span="10">
                        <el-input v-model="addCloumData.columnName" type="txt" clearable maxlength="10" show-word-limit placeholder="请输入内容"></el-input>
                    </el-col>
                </el-row>
                <el-row class='mt20'>
                    <el-col :span="4"><span class="my-span-notice">*</span>栏目类型</el-col>
                    <el-col :span="10">
                        <el-select v-model="addCloumData.columnType" placeholder="请选择">
                            <el-option
                            v-for="item in cloumTypeOpn"
                            :key="item.codeInfoValue"
                            :label="item.codeInfoName"
                            :value="item.codeInfoValue">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class='mt20'>
                    <el-col :span="4"><span class="my-span-notice">*</span>展示标题</el-col>
                    <el-col :span="10">
                        <el-input v-model="addCloumData.columnTitle" type="txt" clearable maxlength="30" show-word-limit placeholder="请输入内容"></el-input>
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
import myPackage from '../../../components/package.vue'
import { myConfirm } from "../../../comm/until";

export default {
    name:"colum",
    data(){
        return{
            dialogTitle:"",
            dialogAdd:false,
            inp:"",
            brea:[{"txt":"内容中心","url":"/goods"},{"txt":"栏目管理","url":"/"}],
            tableData:[],
            cloumTypeOpn:[],
            addCloumData:{
                columnName:"",
                columnType:"",
                columnTitle:"",
                columnNo:""
            },
            packTotal:1,
            searhData:{
                pageNo:"1",
                pageSize:10,
                columnName:""
            }
        }
    },
    components:{
        myBrea,
        myPackage
    },
    methods:{
        async getColumnList(postData){
            await this.$store.dispatch('ContentModule/POST_COLUMN_LIST',postData);
            let data = this.$store.state.ContentModule.POST_COLUMN_LIST;
            this.tableData = data.out.list;
            this.packTotal = parseInt(data.out.totalSize);
        },
        async columSave(postData){
            await this.$store.dispatch('ContentModule/POST_COLUMN_SAVE',postData);
            let data = this.$store.state.ContentModule.POST_COLUMN_SAVE;
            this.$message.success("添加成功");
            this.dialogAdd = false;
            this.getColumnList(this.searhData)
        },
        async getCodelist(postData, callBack) {//获取码值
            await this.$store.dispatch(
                "GdsSkuTypeModule/POST_GDS_CODES_LIST",
                postData
            );
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CODES_LIST;
            callBack(data.out[postData.codeTypes])
        },
        async statusChange(postData) {
            await this.$store.dispatch(
                "ContentModule/POST_COLUMN_ABLE_DISABLE",
                postData
            );
            let data = this.$store.state.ContentModule.POST_COLUMN_ABLE_DISABLE;
            this.$message.success("操作成功");
            this.getColumnList(this.searhData)
            // callBack(data.out[postData.codeTypes])
        },
        addSureBtn(){
            if(!this.addCloumData.columnName){
                this.$message.warning("请填写栏目名称");
                return;
            }
            if(!this.addCloumData.columnType){
                this.$message.warning("请选择栏目类型");
                return;
            }
            if(!this.addCloumData.columnTitle){
                this.$message.warning("请填写展示标题");
                return;
            }
            this.columSave(this.addCloumData)
           
        },
        addColumBtn(){
            this.addCloumData={
                columnName:"",
                columnType:"",
                columnTitle:"",
                columnNo:""
            }
            this.dialogTitle ='添加栏目'
            this.dialogAdd = true
        },
        editorBtnClick(row){
             this.addCloumData={
                columnName:"",
                columnType:"",
                columnTitle:"",
                columnNo:""
            }
            this.dialogTitle ='编辑栏目'
            let newObj = Object.assign({},row)
            this.addCloumData = newObj
            this.dialogAdd = true
        },
        handleCurrentFunc(val){
            this.searhData.pageNo = val;
            this.getColumnList(this.searhData)
        },
        columnView(row){
            this.$router.push({
                path:"/columnDetail",
                query:{
                    columnNo:row.columnNo
                }
            })
        },
        columnChange(row){
            let isDis= row.state =='00001001'?-1:1;
            let txt =''
            if(isDis){
                txt ='是否禁用该栏目？'
            }else{
                 txt ='是否启用该栏目？'
            }
            let _this = this;
            myConfirm(_this,txt,function(){
                _this.statusChange({columnNo:row.columnNo,state:row.state=='00001001'?'00001002':'00001001'})
            })
            // this.statusChange()
        },
        searchBtnClick(){
            this.getColumnList(this.searhData)
        },
        clearBtn(){
            this.searhData.columnName ='';
            this.getColumnList(this.searhData)
        }
    },
    
    created(){
        this.getColumnList(this.searhData)
        let _this = this;
        this.getCodelist({codeTypes:"columnType"},function(data){
            // console.log(data)
            _this.cloumTypeOpn = data
        })
    }

}
</script>
<style lang="scss">
    .colum-page{
        .mt20{
            margin-top: 20px;
        }
        .colum-cont{
             @extend %pagecont;
        }
    }
</style>