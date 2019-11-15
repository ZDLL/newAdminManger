<template>
    <!-- <h2>频道详情</h2> -->
    <div class="channelDet-page">
        <myBrea :my-nav='brea'></myBrea>
        <div class="channelDet-cont">
            <div class="channelDet-top">
                <ul class="CDet-ul" v-if='Object.keys(channelInfoData).length>0'>
                    <li class="CDet-li">频道名称：{{channelInfoData.channelName || '--'}}</li>
                    <li class="CDet-li">频道编号：{{channelInfoData.channelNo || '--'}}</li>
                    <li class="CDet-li">频道顺序：{{channelInfoData.channelOrder || '--'}}</li>
                    <li v-if='channelInfoData.channelType =="07001004"' class="CDet-li">模版编号：{{channelInfoData.templateNo || '--'}}</li>
                    <li class="CDet-li">频道类型：{{channelInfoData.channelTypeName || '--'}}</li>
                    <li class="CDet-li">创建时间：{{channelInfoData.insTime | dateformat}}</li>
                    <li class="CDet-li">创 建 人：{{channelInfoData.realName || '--'}}</li>
                </ul>
                 <el-button  v-if='channelInfoData.channelType !="07001004"' style="float:right;margin-top:10px;" type="primary" @click="addArcBtn">添加内容</el-button>
            </div>
            <div class='channelDet-mid'>
                <div v-if='channelInfoData.channelType =="07001004"' class='temp'>
                     <div class="addTel-left">
                        
                        <div class='addTel-left-tmp'>
                            <h2>
                                {{template_name}}
                            </h2>
                            <ul v-if='allData.length>0'>
                                <li v-for='(itm,inx) in allData' 
                                    :key='inx'
                                    >
                                    <img v-if='itm.turl' :src='itm.turl' alt="">
                                    <img v-if='itm.url' :src='itm.url' alt="">
                                </li>
                            </ul>
                        </div> 
                       
                    </div>
                </div>
                <div v-if='channelInfoData.channelType !="07001004"' class='channelDet-table'>
                    <!-- <el-divider content-position="left">文章列表</el-divider> -->
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                            <el-table-column
                            prop="channelNo"
                            label="编号">
                            </el-table-column>
                            <el-table-column
                            prop="title"
                            label="标题">
                            </el-table-column>

                            <el-table-column
                            label="类型">
                                <template slot-scope="scope">
                                   {{scope.row.publishTypeName || '--'}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            prop="categoryName"
                            label="所属专栏">
                                <!-- <template slot-scope="scope">
                                   
                                </template> -->
                            </el-table-column>
                            <el-table-column
                            prop="author"
                            label="作者">
                            </el-table-column>

                            <el-table-column
                            
                            label="状态">
                            <template slot-scope="scope">
                                    {{scope.row.state == '00001001'?'启用':"停用"}}
                                </template>
                            </el-table-column>
                             <el-table-column
                            label="权重">
                                <template slot-scope="scope">
                                    <span style="margin-right:8px">{{scope.row.weight}}</span>
                                    <i @click="weightBtn(scope.row)" class="el-icon-edit"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="添加时间">
                            <template slot-scope="scope">
                                   {{scope.row.insTime | dateformat}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="100">
                                <template slot-scope="scope">
                                    <!-- <el-button type="text" size="small">删除</el-button>  {{scope.row.state == '00001001'?'停用':"启用"}}-->
                                    <!-- <el-button type="text" size="small">编辑 </el-button> -->
                                    <el-button type="text" size="small" @click="stateChange(scope.row)"> {{scope.row.state == '00001001'?'停用':"启用"}}</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                    <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>
                </div>
            </div>
        </div>
        <arcSelec v-if='showDia' :arc-search="arcSeac" :only-one='isOnlyOne' @closeDia='closeBtnClick' @sureDia='getContData'></arcSelec>
        <!-- 设置权重 -->
        <el-dialog
            title="设置权重"
            :visible.sync="weightDia"
            width="40%"
           >
            <el-input
                style="wight:200px;"
                type="number"
                placeholder="请输入权重"
                v-model="weightVal"
                clearable>
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="weightDia = false">取 消</el-button>
                <el-button type="primary" @click="weightBtnClick">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import myBrea from "../../../components/breadcrumb.vue"
import arcSelec from "./articleSelect.vue";
import { myConfirm } from '../../../comm/until';
import myPackage from '../../../components/package.vue'
import {addTempCon,styelConf} from '../templateModule/tepCon.js'
export default {
    name:"channelDet",
    components:{
        myBrea,
        arcSelec,
        myPackage
    },
    data(){
        return{
            channelNo:'',
            tableData:[],
            channelInfoData:{},
            showDia:false,
            weightDia:false,
            arcSeac:{
                pageNo:"1",
                pageSize:10,
                categoryId:"",
                publishType:"",
                title:"",
                channelNo:"",
            },
            weightVal:'',
            isOnlyOne:'-1',
            artData:'',
            brea:[{"txt":"内容中心","url":"/goods"},{"txt":"频道详情","url":"/"}],
            searchData:{
                pageNo:"1",
                pageSize:"10",
                channelNo:""
            },
            packTotal:1,
            clickData:{},
            allData:[],
            imgConfig:styelConf(),
            template_name:""
        }
    },
    methods:{
        async channelDetail(postData) {
            await this.$store.dispatch(
                "ContentModule/GET_CHANNEL_DETAIL",
                postData
            );
            let data = this.$store.state.ContentModule.GET_CHANNEL_DETAIL;
            this.channelInfoData= data.out.value;
            if(this.channelInfoData.channelType=='07001004'){
                 this.getTempDetail({template_no:data.out.value.templateNo})
            }
           
        },
        async channelDetailList(postData) {
            await this.$store.dispatch(
                "ContentModule/POST_CHANNEL_CONT_LIST",
                postData
            );
            let data = this.$store.state.ContentModule.POST_CHANNEL_CONT_LIST;
            this.tableData= data.out.list;
            this.packTotal = parseInt(data.out.totalSize)
        },
        async channelAddArc(postData) {
            await this.$store.dispatch(
                "ContentModule/POST_CHANNEL_ADD_ARC",
                postData
            );
            let data = this.$store.state.ContentModule.POST_CHANNEL_ADD_ARC;
            this.channelDetailList(this.searchData)
            this.$message.success("操作成功")
        },
        async arcSave(postData) {
            await this.$store.dispatch(
                "ContentModule/POST_WEIGHT_SAVE",
                postData
            );
            let data = this.$store.state.ContentModule.POST_WEIGHT_SAVE;
            this.channelDetailList(this.searchData)
            this.weightDia = false;
            this.$message.success("操作成功")
        },
        async getTempDetail(postData){
            await this.$store.dispatch("TemplateModule/POST_TE_DETAIL",postData);
            let data = this.$store.state.TemplateModule.POST_TE_DETAIL;
            let tempConfig = addTempCon();
            let backArr=data.out.attr;
            let mm =[];
            let _this = this;
            let myarr=[];
            this.template_name = data.out.template_name
            backArr.map((itm,inx)=>{
                // console.log(Object.keys(itm))
                let newObj={
                    element_name:"",
                    element_no:"",
                    element_type:"",
                    conf:{},
                };
                if(itm.element_name){
                    newObj.element_name=itm.element_name;
                }
                 if(itm.element_no){
                    newObj.element_no=itm.element_no;
                } 
                if(itm.element_type){
                    newObj.element_type=itm.element_type;
                }
                // _this.$set(newObj.conf,)
                newObj.conf=itm;
                myarr.push(newObj)
            })
            myarr.map((itm,inx)=>{
                Object.keys(_this.imgConfig).map((ittm,innx)=>{
                    if(itm.element_type == ittm){
                        let type='';
                        let cont=''
                         switch(itm.element_type){
                            case '0101':
                                type ='SEARCH_STYLE'
                                break
                            case '0102':
                                type ='BANNER_STYLE'
                                break
                            case '0103':
                                type ='NAVIGATE_STYLE'
                                break
                            case '0104':
                                cont ='TITLE_STYLE';
                                type='COLUMN_STYLE'
                                break
                            case '0105':
                                type ='CHANNEL_STYLE'
                                break
                        }
                        itm.selecKey=type
                        itm.titleKey=cont;
                        let confKey='';
                        let titleKey='';
                        confKey=itm.conf[type]?itm.conf[type]:"1";
                        titleKey = ''
                       
                        itm.url=_this.imgConfig[ittm].styleArr[parseInt(confKey)-1].imgUrl;
                        itm.turl =''
                        if(itm.element_type=='0104'){
                            titleKey=itm.conf[cont]?itm.conf[cont]:'1'
                            itm.turl=_this.imgConfig[ittm].titleArr[parseInt(titleKey)-1].imgUrl
                        }
                    }
                })
            })
            this.allData = myarr;
        },
        //POST_WEIGHT_SAVE
        addArcBtn(){
            let type=''
           
            if(this.channelInfoData.channelType =='07001001'){
                type='1'
            }else if(this.channelInfoData.channelType =='07001002'){
                type='2'
            }else if(this.channelInfoData.channelType=='07001003'){
                type=''
            }
            
            this.arcSeac.publishType=type;
            this.showDia = true
        },
        closeBtnClick(){
            this.showDia = false
        },
        getContData(data){
            this.channelAddArc({channelNo:this.channelNo,contextIds:data.id})
        },
        weightBtn(row){
            this.clickData = row;
            this.weightDia = true;
        },
        weightBtnClick(){
            if(this.weightVal<1){
                this.$message.warning("权重设置不能低于1");
                return;
            }
            this.arcSave({keyId:this.clickData.keyId,weight:this.weightVal})
        },
        stateChange(row){
            let _this = this;
            myConfirm(_this,`是否进行${row.state=='00001001'?'禁用该文章':'启用该文章'}操作？`,function(){
                _this.arcSave({keyId:row.keyId,state:row.state=='00001001'?'00001002':'00001001'})
            })
             
        },
        handleCurrentFunc(val){
            this.searchData.pageNo=val;
            this.channelDetailList(this.searchData)
        }
    },
    created(){
        this.channelNo = this.$route.query.channelNo;
        this.channelDetail({channelNo:this.channelNo});
        this.searchData.channelNo = this.channelNo
        this.arcSeac.channelNo=this.channelNo;
        this.channelDetailList(this.searchData)
    }
}
</script>
<style lang="scss">
    .channelDet-page{
        .channelDet-cont{
             @extend %pagecont;
             overflow: hidden;
            .CDet-ul{
                padding: 0px;
                margin: 0px;
                display: inline-block;
                width: 80%;
                .CDet-li{
                    color: #403f4c;
                    font-size: 14px;
                    padding: 10px;
                }
            }
            .channelDet-mid{
                border-top:1px #e2e2e2 solid;
                margin-top: 20px;
                .el-table__header{
                    margin-top: 20px;
                }
                 .addTel-left{
                    width: 450px;
                    overflow: hidden;
                    margin: 20px auto;
                    h2{
                        font-size: 18px;
                        font-weight: 500;
                        text-align: center;
                        // padding: 20px 0;
                        height: 66px;
                        line-height: 66px;
                        border-bottom: 1px #e2e2e2 solid;
                        // border-radius: 20px;
                    }
                    .addTel-left-tmp{
                       
                        border: 1px #e2e2e2 solid;
                        border-radius: 20px;
                        height: 667px;
                        overflow-y: auto;
                    }
                    ul{
                        margin-top: 20px auto;
                        padding:20px;
                        margin: 0px;
                        li{
                            width: 100%;
                            margin-bottom: 10px;
                            overflow: hidden;
                            // height: 40px;
                            img{
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }
    }
</style>