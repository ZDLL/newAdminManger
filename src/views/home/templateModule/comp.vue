<!-- <h2>模版管理</h2> -->
<template>
    <div class="tel-page">
          <myBrea :my-nav='brea'></myBrea>
        <div class="tel-con">
          <!-- <span>名称 </span> <el-input style="width:200px;margin-right:20px" placeholder="请输入关键词" clearable @clear='clearBtn'></el-input> -->
            <!-- <el-button type="primary" >查询</el-button> -->
            <div style="overflow: hidden;">
                <el-button type="primary" @click="addComBtn">新建组件</el-button>
            </div>
            <div class="tel-table">
                 <el-divider content-position="left">所有组件</el-divider>
                 <div class="telCont-table">
                        <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                            <el-table-column
                            prop="element_no"
                            label="组件ID">
                            </el-table-column>
                            <el-table-column
                            prop="element_name"
                            label="组件名称">
                            </el-table-column>

                            <el-table-column
                            label="组件图标">
                                <template slot-scope="scope">
                                    <img style="width:80px" :src='scope.row.picture_url' alt="组件图标">
                                </template>
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
                                    <el-button type="text" size="small" @click="editorEleBtn(scope.row)">编辑 </el-button>
                                    <!-- <el-button type="text" size="small" >查看</el-button> -->
                                    <el-button type="text" size="small" @click="changeStatusBtn(scope.row)">{{scope.row.status == '00001001'?'停用':"启用"}}</el-button>
                                    <br/>
                                    <el-button type="text" size="small" @click="delCompBtn(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>
                 </div>
            </div>
        </div>
        <el-dialog
            title="新建组件"
            :visible.sync="addComp"
            width="45%"
           >
            <div>
                <el-row class="mt20" :gutter="10">
                    <el-col :span="4">组件类型：</el-col>
                    <el-col :span="10">
                        <el-select 
                        v-model="comData.element_type" 
                        :disabled="comData.element_no?true:false"
                        placeholder="请选择">
                            <el-option
                                v-for="item in comOpn"
                                :key="item.element_type"
                                :label="item.element_type_name"
                                :value="item.element_type"
                               
                                >
                                </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                 <el-row class="mt20" :gutter="10">
                    <el-col :span="4">组件名称：</el-col>
                    <el-col :span="10">
                       <el-input style="width:200px" v-model="comData.element_name" maxlength="30" show-word-limit clearable placeholder="请输入内容"></el-input>
                    </el-col>
                </el-row>
                <el-row class="mt20" :gutter="10">
                    <el-col :span="4">组件图标：</el-col>
                    <el-col :span="10">
                        <proUpload :key='comData.picture_url' :imgUrl='comData.picture_url' @getUrl='getImgUrl'></proUpload>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addComp = false">取 消</el-button>
                <el-button type="primary" @click="saveSureBtn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import myBrea from "../../../components/breadcrumb.vue"
import myPackage from '../../../components/package.vue'
import { myConfirm } from "../../../comm/until";
import proUpload from '../../../components/proUpload.vue'

export default {
    name:"tel",
    components:{
        myBrea,
        myPackage,
        proUpload
    },
    data(){
        return{
            brea:[{"txt":"模版中心","url":"/goods"},{"txt":"组件管理","url":"/"}],
            packTotal:1,
            tableData:[],
            comOpn:[],
            addComp:false,
            seachData:{
                current_page:"1",
                page_size:'10'
            },
            comData:{
                element_no:"",
                element_type:"",
                element_name:"",
                picture:"",
                picture_url:""
            },
        }
    },
    methods:{
        async getAllTeList(){
            await this.$store.dispatch("TemplateModule/POST_ALL_EL_LISTA",this.seachData);
            let data = this.$store.state.TemplateModule.POST_ALL_EL_LISTA;
            this.tableData = data.out.result
            this.packTotal = parseInt(data.out.total)
        },
        async eleChangeSta(postData){
            await this.$store.dispatch("TemplateModule/POST_EL_CHANGE_STATUS",postData);
            let data = this.$store.state.TemplateModule.POST_EL_CHANGE_STATUS;
            this.$message.success("操作成功")
            this.getAllTeList();
        },
        async getEleType(){
            await this.$store.dispatch("TemplateModule/POST_EL_TYPE",{});
            let data = this.$store.state.TemplateModule.POST_EL_TYPE;
            this.comOpn = data.out;
        },
        async addEle(postData){
            await this.$store.dispatch("TemplateModule/POST_ADD_ELE",postData);
            let data = this.$store.state.TemplateModule.POST_ADD_ELE;
            this.$message.success("操作成功")
            this.addComp = false;
            this.getAllTeList();
        },
         async editEle(postData){
            await this.$store.dispatch("TemplateModule/POST_EL_EDITE",postData);
            let data = this.$store.state.TemplateModule.POST_EL_EDITE;
            this.$message.success("操作成功")
            this.addComp = false;
            this.getAllTeList();
        },
        
        clearBtn(){},
        handleCurrentFunc(val){
            this.seachData.current_page = val;
            this.getAllTeList();
        },
        getImgUrl(url){
            if(this.comData.picture_url!=url){
                this.comData.picture=''
            }
            this.comData.picture_url = url;
        },
        addComBtn(){
            this.comData={
                element_no:"",
                element_type:"",
                element_name:"",
                picture:"",
                picture_url:""
            };
            this.addComp = true;
        },
        saveSureBtn(){
            if(!this.comData.element_type){
                this.$message.warning("请选择组件类型")
                return;
            }
            if(!this.comData.element_name){
                this.$message.warning("请输入组件名称")
                return;
            }
             if(!this.comData.picture_url){
                this.$message.warning("请上传图片")
                return;
            }
            if(this.comData.element_no){
                this.editEle(this.comData)
            }else{
                this.addEle(this.comData)
            }
        },
        changeStatusBtn(row){
            let _this = this;
            myConfirm(_this,row.status=='00001001'?'是否禁用该组件？':'是否启用该组件',function(){
                _this.eleChangeSta({
                    element_no:row.element_no,
                    status:row.status=='00001001'?'00001002':'00001001'
                })
            })
        },
        delCompBtn(row){
           let _this = this;
            myConfirm(_this,'是否删除该组件',function(){
                _this.eleChangeSta({
                    element_no:row.element_no,
                    status:'00001003'
                })
            }) 
        },
        editorEleBtn(row){
            let newObj=Object.assign({},row)
            this.comData = newObj;
            this.addComp = true;
        }  
    },
    created(){
        this.getAllTeList();
        this.getEleType();
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