<template>
    <div class="navige-page">
        <myBrea :my-nav='brea'></myBrea>
        <div class="navige-cont">
           <span>名称：</span> <el-input style="width:200px;margin-right:20px" v-model="navSeachData.navigateName" clearable @clear='clearBtn' placeholder="请输入关键词"></el-input>
            <el-button type="primary" @click="navSearchBtn">查询</el-button>
            <el-button style="float:right" type="primary" @click='addColumBtn'>添加导航</el-button>
            <div class="colum-table">
                 <el-divider content-position="left">所有导航</el-divider>
                 <div class="goods-table">
                        <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                            <el-table-column
                            prop="navigateNo"
                            label="编号">
                            </el-table-column>
                            <el-table-column
                            label="图片">
                            <template slot-scope="scope">
                                <img width="80px" :src="scope.row.navigatePicUrl" alt="">
                                <p>{{scope.row.navigateName}}</p>
                            </template>
                            </el-table-column>

                            <el-table-column
                            prop="realName"
                            label="添加人">
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
                                    <el-button type="text" size="small" @click="editorNavBtn(scope.row)">编辑 </el-button>
                                    <el-button type="text" size="small" @click="disNavBtn(scope.row)">{{scope.row.state == '00001001'?'停用':"启用"}}</el-button>
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
                    <el-col :span="4"><span class="my-span-notice">*</span>上传图标</el-col>
                    <el-col :span="10">
                        <proUpload :key='navigate.navigatePicUrl' :img-url='navigate.navigatePicUrl'  @getUrl='uploadUrl'></proUpload>
                    </el-col>
                </el-row>
                <el-row class='mt20'>
                    <el-col :span="4"><span class="my-span-notice">*</span>导航名称</el-col>
                    <el-col :span="10">
                        <el-input v-model="navigate.navigateName" maxlength="32" show-word-limit clearable placeholder="请输入内容"></el-input>
                    </el-col>
                </el-row>
                <el-row class='mt20'>
                    <el-col :span="4"><span class="my-span-notice">*</span>顺序</el-col>
                    <el-col :span="10">
                            <el-input v-model="navigate.navigateOrder" type="number" maxlength="10" show-word-limit placeholder="请输入内容"></el-input>
                    </el-col>
                </el-row>
                <el-row class='mt20'>
                    <el-col :span="4"><span class="my-span-notice">*</span>链接地址</el-col>
                    <el-col :span="10">
                        <el-input v-model="navigate.navigateUrl" maxlength="128" show-word-limit clearable placeholder="请输入内容"></el-input>
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
    name:"navige",
    components:{
        myBrea,
        proUpload,
        myPackage
    },
    data(){
        return{
            dialogTitle:"",
            dialogAdd:false,
            inp:"",
            brea:[{"txt":"内容中心","url":"/goods"},{"txt":"导航栏管理","url":"/"}],
            tableData:[],
            navigate:{
                navigateNo:"",
                navigateName:"",
                navigatePhoto:"",//图片id
                navigateUrl:"",//跳转地址
                navigateOrder:"",
                navigatePicUrl:"",//图片地址
            },
            navSeachData:{
                pageNo:1,
                pageSize:10,
                navigateName:""
            },
            packTotal:1
        }
    },
    methods:{
        async saveNavigate(postData){
            await this.$store.dispatch("ContentModule/POST_NAVIGATE_SAVE",postData);
            let data = this.$store.state.ContentModule.POST_NAVIGATE_SAVE;
            this.$message.success("保存成功")
            this.dialogAdd = false;
            this.navSeachData={
                pageNo:1,
                pageSize:10,
                navigateName:""
            };
            this.getNavigateList(this.navSeachData)
        },
        async getNavigateList(postData){
            await this.$store.dispatch("ContentModule/POST_NAVIGATE_LIST",postData);
            let data = this.$store.state.ContentModule.POST_NAVIGATE_LIST;
            this.tableData = data.out.list;
            this.packTotal = parseInt(data.out.totalSize);
        },
        async navStatusChange(postData){
            await this.$store.dispatch("ContentModule/POST_NAVGATE_ABLEORDISABLE",postData);
            let data = this.$store.state.ContentModule.POST_NAVGATE_ABLEORDISABLE;
            this.$message.success("操作成功")
            this.getNavigateList(this.navSeachData)
        },

        addSureBtn(){
           if(!this.navigate.navigatePicUrl){
               this.$message.warning("请上传图片");
               return;
           };
           if(!this.navigate.navigateName){
                 this.$message.warning("请填写导航名称");
               return;
           }
            if(!this.navigate.navigateOrder || this.navigate.navigateOrder<1){
                 this.$message.warning("请填写大于0的导航顺序");
               return;
           }
           if(!this.navigate.navigateUrl){
                 this.$message.warning("请填写导航链接地址");
               return;
           };
           this.saveNavigate(this.navigate)
        },
        addColumBtn(){
            this.navigate={
                navigateNo:"",
                navigateName:"",
                navigatePhoto:"",//图片id
                navigateUrl:"",//跳转地址
                navigateOrder:"",
                navigatePicUrl:"",//图片地址
            },
            this.dialogAdd = true
            this.dialogTitle ='添加导航'
        },
        uploadUrl(url){
            if(this.navigate.navigatePicUrl != url){
                this.navigate.navigatePhoto = '';
            }
            this.navigate.navigatePicUrl = url;
        },
        handleCurrentFunc(val){
            this.navSeachData.pageNo = val;
            this.getNavigateList(this.navSeachData)
        },
        editorNavBtn(row){
            let newObj = Object.assign({},row)
            this.navigate =newObj;
            this.dialogTitle ='编辑导航'
            this.dialogAdd=true;
        },
        disNavBtn(row){
            let isDis = row.state =='00001001'?"00001002":"00001001";
            let txt =''
            if(isDis =='00001002'){
                txt='是否禁用该导航？'
            }else{
                txt='是否启用该导航？'
            }
            let _this = this;
            myConfirm(_this,txt,function(){
                _this.navStatusChange({navigateNo:row.navigateNo,state:isDis})
            })  
        },
        navSearchBtn(){
            this.getNavigateList(this.navSeachData)
        },
        clearBtn(){
            this.navSeachData.navigateName='';
             this.getNavigateList(this.navSeachData)
        }
    },
    
    created(){
        this.getNavigateList(this.navSeachData)
    }

}
</script>
<style lang="scss">
    .navige-page{
        .mt20{
            margin-top: 20px;
        }
        .navige-cont{
             @extend %pagecont;
        }
    }
</style>