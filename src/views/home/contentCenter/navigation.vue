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
                                    <el-button type="text" size="small" @click="editorNavBtn(scope.row)">编辑 </el-button>
                                    <el-button type="text" size="small" @click="disNavBtn(scope.row)">{{scope.row.state == '00001001'?'停用':"启用"}}</el-button>
                                    <el-button type="text" size="small" @click="delNavBtn(scope.row)">删除</el-button>

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
                    <el-col :span="4"><span class="my-span-notice">*</span>类型</el-col>
                    <el-col :span="10">
                        <el-select v-model="navigate.navigateType1" placeholder="请选择">
                            <el-option
                            v-for="item in navType"
                            :key="item.codeInfoValue"
                            :label="item.codeInfoName"
                            :value="item.codeInfoValue">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row v-if='navigate.navigateType1=="07001402"' class='mt20'>
                    <el-col :span="4"><span class="my-span-notice">*</span>链接地址</el-col>
                    <el-col :span="10">
                        <el-input v-model="navigate.navigateUrl" maxlength="128" show-word-limit clearable placeholder="请输入内容"></el-input>
                    </el-col>
                </el-row>
                <el-row v-if='navigate.navigateType1=="07001401"' class='mt20'>
                    <el-col :span="4"><span class="my-span-notice">*</span>跳转目标</el-col>
                    <el-col :span="10">
                       <el-select v-model="navigate.navigateType2" placeholder="请选择">
                            <el-option
                            v-for="item in tagOpn"
                            :key="item.codeValueCpltId"
                            :label="item.codeValueCpltName"
                            :value="item.codeValueCpltId">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row v-if='navigate.navigateType2=="0701"' class='mt20'>
                    <el-col :span="4"><span class="my-span-notice">*</span>选择栏目</el-col>
                    <el-col :span="10">
                        <el-button type="primary" plain @click="chooseLumBtn">选择栏目</el-button>
                        <p v-if='navigate.columnName'>已选中：{{navigate.columnName}}</p>
                    </el-col>
                </el-row>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAdd = false">取 消</el-button>
                <el-button type="primary" @click="addSureBtn">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="选择栏目"
            :visible.sync='chooseLum'
            width="50%"
            >
           <div>
                <el-table
                    :data="LumTableData"
                    stripe
                    style="width: 100%">
                    <el-table-column
                    prop="columnName"
                    label="栏目名称">
                    </el-table-column>

                    <el-table-column
                    prop="columnTypeName"
                    label="栏目类型">
                    </el-table-column>

                    <el-table-column
                    prop="contextCount"
                    label="内容条数">
                    </el-table-column>

                    <el-table-column
                    prop="insTime"
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
                            <el-button :type='clumAct==scope.$index?"primary":""' round size="small" @click="selecClumBtn(scope.row,scope.$index)">{{clumAct==scope.$index?"选中":"选择"}} </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <myPackage v-if='packTotal2' :key='packTotal2' :pageTotal='packTotal2' @handleCurrent="handleCurrentLumFunc"></myPackage>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="chooseLum = false">取 消</el-button>
                <el-button type="primary" @click="chooseLum = false">确 定</el-button>
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
                navigateType1:"",//类型
                navigateType2:"",//小分类
                businessNo:"",//选中的栏目的id
                columnName:""
            },
            navSeachData:{
                pageNo:1,
                pageSize:10,
                navigateName:""
            },
            packTotal:1,
            navType:[],
            tagOpn:[],
            navTypeVal:"",
            chooseLum:false,
            LumTableData:[],
            clumSearch:{
                 pageNo:"1",
                pageSize:10,
                columnName:""
            },
            clumAct:'-1',
            packTotal2:1 ,
            clumClickData:{
                columnName:"",
                businessNo:""
            }
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
        async getNavType(postData,callBack){
            await this.$store.dispatch("ContentModule/POST_NAVGATE_TPLC",postData);
            let data = this.$store.state.ContentModule.POST_NAVGATE_TPLC;
            callBack(data)
            // this.$message.success("操作成功")
            // this.getNavigateList(this.navSeachData)
        },
        async getCodelist(postData, callBack) {//获取码值
            await this.$store.dispatch(
                "GdsSkuTypeModule/POST_GDS_CODES_LIST",
                postData
            );
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CODES_LIST;
            callBack(data.out[postData.codeTypes])
        },
        async getColumnList(postData){
            await this.$store.dispatch('ContentModule/POST_COLUMN_LIST',postData);
            let data = this.$store.state.ContentModule.POST_COLUMN_LIST;
            this.LumTableData = data.out.list;
            this.packTotal2 = parseInt(data.out.totalSize);
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
           if(!this.navigate.navigateType1){
                 this.$message.warning("请选择类型");
                return;
           }
           if(this.navigate.navigateType1=='07001402'){
               if(!this.navigate.navigateUrl){
                     this.$message.warning("请填写导航链接地址");
                     return;
               }
           }
           if(this.navigate.navigateType1=='07001401'){
               if(!this.navigate.navigateType2){
                    this.$message.warning("请选择跳转目标");
                     return;
               }
               if(this.navigate.navigateType2 =='0701' &&
                !this.navigate.businessNo){
                     this.$message.warning("请选择跳转内容");
                     return;
               }

           }
        
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
        handleCurrentLumFunc(val){
            this.clumSearch.pageNo = val;
            this.getColumnList(this.clumSearch)
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
        delNavBtn(row){
           let _this = this;
            myConfirm(_this,'是否删除该导航',function(){
                _this.navStatusChange({navigateNo:row.navigateNo,state:'00001003'})
            })  
        },
        navSearchBtn(){
            this.getNavigateList(this.navSeachData)
        },
        chooseLumBtn(){
            this.getColumnList(this.clumSearch)
            this.chooseLum = true;
        },
        selecClumBtn(row,inx){
            // this.clumClickData = row;
            this.clumAct = inx;
            this.navigate.businessNo = row.columnNo;
            this.navigate.columnName = row.columnName
        },
        clearBtn(){
            this.navSeachData.navigateName='';
             this.getNavigateList(this.navSeachData)
        }
    },
    
    created(){
        this.getNavigateList(this.navSeachData);
        let _this = this;
        this.getNavType({codeTypeCpltId:"navigateType"},(data)=>{
           _this.tagOpn = data.out.list;
        });
        this.getCodelist({codeTypes:"navigateType"},function(data){
             _this.navType = data;
        });
        
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