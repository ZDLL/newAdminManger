<!-- <h2>模版管理</h2> -->
<template>
    <div class="addtel-page">
          <myBrea :my-nav='brea'></myBrea>
        <div class='addtel-cont'>

            <div class="addTel-left">
                <div class='addTel-left-tmp'>
                    <ul v-if='allData.length>0'>
                        <li v-for='(itm,inx) in allData' 
                            :key='inx' 
                            @click="eleClickBtn(itm,inx)"
                            :class='activeEle==inx?"eleStyle":""'
                            >
                            <img v-if='itm.turl' :src='itm.turl' alt="">
                            <img v-if='itm.url' :src='itm.url' alt="">
                            <span class='eleDel' @click.stop="eleDelBtn(inx)">删除</span>
                        </li>
                    </ul>
                </div> 
                <div>
                    <div  class="addTmpName mt20">
                        模版名称：
                        <el-input 
                        style="width:300px"  
                        maxlength="30"
                        show-word-limit 
                        clearable
                        placeholder="请输入内容"
                        v-model="template_name"></el-input>
                    </div>
                    <el-button class='mt20' style="width:100%;margin-left:0px;" type="primary" @click="tempBtnClick(1)">{{template_no?"保存模版":"生成模版"}}</el-button>
                </div>
            </div>
            <div class="addTel-right">
                <div class='addtel-top'>
                    <h2>常用组件</h2>
                    <ul class='comp-ul'>
                        <li v-for='(itm,inx) in elArr' :key='inx' @click="elBtnClick(itm)">
                            <span class='span-img'>
                                <img v-if='itm.picture_url' :src='itm.picture_url' alt="">
                            </span>
                            <span>{{itm.element_name}}</span>
                        </li>
                    </ul>
                </div>
                <div class='addtel-btm' v-if='showConfig'>
                    <h2>{{elemData.element_name}}</h2>
                    <div v-if='elemData.element_type == "0104"' class='select-cof'>
                        <div class='chooseSel'>
                            <img :src="elemData.turl" alt="">
                            <div class='selec-txt' @click="chooseTitleBtn">
                                选择标题样式
                            </div>
                        </div>
                    </div>
                    <div class='select-cof'>
                        <div class='chooseSel'>
                            <img :src="elemData.url" alt="">
                            <div class='selec-txt' @click="chooseStyleBtn">
                                选择样式
                            </div>
                        </div>
                    </div>
                   
                    <div v-if='elemData.element_type == "0104"' class='addtel-cof'>
                        <div class='mt20' >
                           <span class='conf-span'><span class="my-span-notice">*</span>选择栏目:</span>
                          <el-button type="primary" plain @click="addClumBtn">{{clumTitle?"重选栏目":"添加栏目"}}</el-button> 
                        </div>
                        <div v-if='clumTitle'>
                           <span class='conf-span'></span>
                          已选栏目： {{clumTitle}}
                        </div>
                         
                    </div>
                    <div class='addtel-cof'>
                        <div class='mt20' v-for='(itm,inx) in elCigArr' :key='inx'>
                                <span v-if='itm.attr_name_en=="ORDER" || itm.attr_name_en=="COLUMN_NO" || itm.attr_name_en=="LINE_NUMBER" || itm.attr_name_en=="MAX_LINE" || itm.attr_name_en=="COLUMN_DISPLAY_NUM"' 
                                        class='conf-span'><span class="my-span-notice">*</span>{{itm.attr_name}}:</span>
                                <span v-else class='conf-span'>{{itm.attr_name}}:</span>
                               
                                <span v-if='itm.com =="inp"'>
                                    <!-- <el-input v-if='itm.attr_name_en =="ORDER"' placeholder="请输入内容" v-model="sendData[itm.attr_name_en]" style="width:200px"></el-input> -->
                                    <el-input placeholder="请输入内容" v-model="sendData[itm.attr_name_en]" style="width:200px"></el-input>
                                </span>
                                <span v-if='itm.com =="color"'>
                                    <colorPicker :key='sendData[itm.attr_name_en]' :defVale='sendData[itm.attr_name_en]' :valueKey='itm.attr_name_en' @getColor='getColorFun'></colorPicker>
                                </span>
                                <span v-if='itm.com =="shape"'>
                                     <shapePicker :key='sendData[itm.attr_name_en]' :defVale='sendData[itm.attr_name_en]' :valueKey='itm.attr_name_en'  @getActShape ='getActShapeFun'></shapePicker>
                                </span>
                                <span v-if='itm.com =="position"'>
                                     <positionPicker :key='sendData[itm.attr_name_en]' :defVale='sendData[itm.attr_name_en]' :valueKey='itm.attr_name_en'  @getActposition ='getActpositionFun'></positionPicker>
                                </span>
                                <span v-if='itm.com =="upload"'>
                                     <elConPicker 
                                        :valueKey='itm.attr_name_en' 
                                        :key="sendData[itm.attr_name_en]" 
                                        :imgUrl='sendData[itm.attr_name_en]' 
                                        @getActUpload="getActUploadFun"></elConPicker>
                                </span>  
                        </div>
                        
                    </div>
                    <el-button class='mt20' style="width:200px;margin-left:130px;" type="primary" @click="tempBtnClick(2)">提交设置</el-button>
                    <!-- @click="tempBtnClick" -->
                </div>
            </div>
        </div>
        <div class="styleChoose">
            <el-dialog
                title='选择样式'
                :visible.sync="chooseStyle"
                width="80%"
                >
                <div class='style_list'>
                    <ul>
                        <li v-for='(itm,inx) in selecImgArr' :key='inx'>
                            <div>
                                <span class='img_pan'>
                                    <img v-if='itm.imgUrl' :src='itm.imgUrl' alt="">
                                    
                                </span>
                            </div>
                           <div class='shooseStyle' :in='activeImg' :key="activeImg" @click="chooseImgBtn(itm)">
                                <p>{{itm.name}}</p> 
                                <i :class='activeImg==itm.key?"acIcon":""' class='el-icon-success'></i>
                            </div>
                        </li>
                    </ul>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="chooseStyle = false">取 消</el-button>
                    <el-button type="primary" @click="chooseSureBtn">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 标题样式 -->
         <div class="styleChoose">
            <el-dialog
                title='选择样式'
                :visible.sync="titleStyle"
                width="80%"
                >
                <div class='style_list'>
                    <ul>
                        <li v-for='(itm,inx) in titleImgArr' :key='inx'>
                            <div>
                                <span class='img_pan'>
                                    <img v-if='itm.imgUrl' :src='itm.imgUrl' alt="">
                                    
                                </span>
                            </div>
                           <div class='shooseStyle' :in='activeImg' :key="activeImg" @click="chooseImgBtn(itm)">
                                <p>{{itm.name}}</p> 
                                <i :class='activeImg==itm.key?"acIcon":""' class='el-icon-success'></i>
                            </div>
                        </li>
                    </ul>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="titleStyle = false">取 消</el-button>
                    <el-button type="primary" @click="titleStyleBtn">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 选择栏目 -->
        <el-dialog
                title='选择样式'
                :visible.sync='clumShow'
                width="60%"
                >
                <div>
                    <el-table
                            :data="tableData"
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
                                    <el-button :type='clumAct==scope.$index?"primary":""' round size="small" @click="chooseClumBtn(scope.row,scope.$index)">选择 </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <myPackage v-if='packTotal2' :key='packTotal2' :pageTotal='packTotal2' @handleCurrent="handleCurrentFunc"></myPackage>


                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="clumShow = false">取 消</el-button>
                    <el-button type="primary" @click="clumSureBtn">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>
<script>
import myBrea from "../../../components/breadcrumb.vue"
import myPackage from '../../../components/package.vue'
import { myConfirm,getNowDate } from "../../../comm/until";
import colorPicker from '../../../components/colorPicke.vue';
import shapePicker from '../../../components/shapePicke.vue'
import positionPicker from '../../../components/positionPicke.vue'
import proUpload from '../../../components/proUpload.vue'
import elConPicker from '../../../components/elupload.vue'
import {addTempCon,styelConf} from './tepCon.js'

// import myPackage from '../../../components/package.vue'
export default {
    name:"tel",
    components:{
        myBrea,
        myPackage,
        colorPicker,
        shapePicker,
        positionPicker,
        elConPicker,
        proUpload
    },
    data(){
        return{
            brea:[{"txt":"模版中心","url":"/goods"},{"txt":"新建模版","url":"/"}],
            packTotal:1,
            tableData:[],
            searchData:{
                current_page:"",
                page_size:""
            },
            elArr:[],
            elCigArr:[],
            sendData:{},
            attr_data:{},
            url:"",
            // element_name:"",
            template_no:'',
            postObj:[],
            elemData:{},
            chooseStyle:false,
            titleStyle:false,
            activeEleType:"",
            allData:[],
            imgConfig:styelConf(),
            selecImgArr:[],
            titleImgArr:[],
            clickSelecData:{},
            showConfig:false,
            activeImg:'0',
            template_name:'新增模版['+getNowDate()+']',
            activeEle:"-1",
            clumShow:false,
            tableData:[],
            packTotal2:1,
            clumSearch:{
                pageNo:"1",
                pageSize:10,
                columnName:""
            },
            clumAct:'-1',
            clumClickData:{},
            clumTitle:"",
            eleClickData:{},
            num:1
        }
    },
    methods:{
        async getElementList(){
            await this.$store.dispatch("TemplateModule/POST_EL_LIST",{});
            let data = this.$store.state.TemplateModule.POST_EL_LIST;
            this.elArr = data.out
        },
        async getElementDetail(postData){
            await this.$store.dispatch("TemplateModule/POST_EL_DETAIL",postData);
            let data = this.$store.state.TemplateModule.POST_EL_DETAIL;
            let backArr=data.out.attr;
            let mm =[];
            let _this = this;
            _this.sendData={}
            _this.activeEleType = data.out.element_type;
            if(this.allData.length==0){
                this.num= 1
            }else{
                this.num = parseInt(this.allData[this.allData.length-1].conf.ORDER)+1
            };
            backArr.map((im,ix)=>{
                _this.$set(_this.sendData,im.attr_name_en,"");
                _this.$set(_this.sendData,'element_type',data.out.element_type);
               _this.$set(_this.sendData,"ORDER",_this.num)
            });
            let type='';
            let cont=''
            switch(data.out.element_type){
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
            let newObj={
                element_name:data.out.element_name,
                element_no:data.out.element_no,
                element_type:data.out.element_type,
                url:this.imgConfig[data.out.element_type].styleArr[0].imgUrl,
                turl:data.out.element_type=='0104'?this.imgConfig[data.out.element_type].titleArr[0].imgUrl:"",
                conf:_this.sendData,
                selecKey:type,
                titleKey:cont
            };
         
            _this.allData.push(newObj);
        }, 
        async getTempDetail(postData){
            await this.$store.dispatch("TemplateModule/POST_TE_DETAIL",postData);
            let data = this.$store.state.TemplateModule.POST_TE_DETAIL;
            let tempConfig = addTempCon();
            let backArr=data.out.attr;
            let mm =[];
            let _this = this;
            let myarr=[];
             _this.allData=[]
            this.template_name = data.out.template_name
            backArr.map((itm,inx)=>{
                let newObj={}
                Object.keys(itm).map((itmk,inxk)=>{
                    _this.$set(newObj,itmk,itm[itmk])
                })
                let isObj={
                        url:"",
                        turl:"",
                        selecKey:'',
                        titleKey:'',
                        element_type:itm.element_type,
                        element_no:itm.element_no,
                        element_name:itm.element_name,
                        conf:newObj
                    }
                _this.allData.push(isObj)
            })
            
            _this.allData.map((itm,inx)=>{
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
        },
        async postAddTemp(postData,type){
            await this.$store.dispatch("TemplateModule/POST_TE_ADD",postData);
            let data = this.$store.state.TemplateModule.POST_TE_ADD;
            this.$message.success("操作成功")
            if(type==1){
                this.$router.push({
                    path:"/temp"
                })
            }else{
                this.$router.push({
                    path:"/tempAdd",
                    query:{
                        template_no:data.out.template_no
                    }
                })
            }
            this.template_no = data.out.template_no;
        },
        async postEdiTemp(postData,type){
            await this.$store.dispatch("TemplateModule/POST_TE_EDI",postData);
            let data = this.$store.state.TemplateModule.POST_TE_EDI;
            this.$message.success("操作成功");
            if(type==1){
                 this.$router.push({
                    path:"/temp"
                })
            }else{
                let poDa={
                    template_no:this.template_no
                }
                this.getTempDetail(poDa);
            }
           
        },
        async getColumnList(postData){
            await this.$store.dispatch('ContentModule/POST_COLUMN_LIST',postData);
            let data = this.$store.state.ContentModule.POST_COLUMN_LIST;
            this.tableData = data.out.list;
            this.packTotal2 = parseInt(data.out.totalSize);
        },
        clearBtn(){},
        handleCurrentFunc(val){
            this.clumSearch.pageNo = val;
            this.getColumnList(this.clumSearch)
        },
        getColorFun(data){
            Object.assign(this.sendData,data);
        },
        getActShapeFun(data){
            Object.assign(this.sendData,data);
        },
        getActPosFun(data){
            Object.assign(this.sendData,data);
        },
        getActpositionFun(data){
             Object.assign(this.sendData,data);
        },
        getActUploadFun(data){
             Object.assign(this.sendData,data);
        },
        elBtnClick(itm){
            
            this.getElementDetail({element_no:itm.element_no})
        },
        eleClickBtn(data,inx){
            let tempConfig = addTempCon();
            let mConf= {};
            let _this = this ;
            _this.elCigArr=[];
            _this.sendData={};
            _this.sendData = data.conf;
            _this.eleClickData=data;
            _this.showConfig = true;
            mConf = this.allData[inx].conf
            tempConfig.map((itm,inx)=>{
                Object.keys(mConf).map((ittm,iix)=>{
                    if(ittm == itm.key){
                        _this.elCigArr.push({
                            attr_name_en:ittm,
                            com:itm.com,
                            attr_name:itm.attr_name,
                            // ittm:''
                        })
                    }
                })
            });
            this.clumTitle = data.conf.COLUMN_NO_NAME?data.conf.COLUMN_NO_NAME:''
            this.activeEle = inx;
            this.elemData = data;
        },
        chooseStyleBtn(){
            this.selecImgArr = this.imgConfig[this.elemData.element_type].styleArr;
            let aK=this.eleClickData.selecKey
            this.activeImg = parseInt(this.sendData[aK])?parseInt(this.sendData[aK]):'';
            this.chooseStyle= true;
        },
        chooseTitleBtn(){
            this.titleImgArr =this.imgConfig[this.elemData.element_type].titleArr;
            let aT=this.eleClickData.titleKey
            this.activeImg = parseInt(this.sendData[aT])?parseInt(this.sendData[aT]):'' ;
            this.titleStyle= true;
        },
        chooseImgBtn(itm){
            this.activeImg = itm.key;
            this.clickSelecData = itm;
        },
        chooseSureBtn(){
            
            let styleId= this.elemData.selecKey;
            this.elemData.conf[styleId] =this.clickSelecData && this.clickSelecData.key?this.clickSelecData.key:'1';
            this.elemData.url = this.clickSelecData && this.clickSelecData.imgUrl?this.clickSelecData.imgUrl:this.imgConfig[this.elemData.element_type].styleArr[0].imgUrl;
            this.chooseStyle = false;
        },
        titleStyleBtn(){
            let titleId= this.elemData.titleKey;
            this.elemData.conf[titleId] = this.clickSelecData&&this.clickSelecData.key?this.clickSelecData.key:'1';
            this.elemData.turl = this.clickSelecData.imgUrl;
            this.titleStyle = false;
        },
        eleDelBtn(inx){
            let _this = this;
            myConfirm(_this,'是否删除该模版？',function(){
                 _this.allData.splice(inx,1);
            })
           
            this.activeEle='-1';
            this.showConfig = false;
        },
        tempBtnClick(type){
            this.sendData.element_no = this.elemData.element_no
            let postArr=[];
            this.allData.map((itm,inx)=>{
                itm.conf.element_no=itm.element_no;
                postArr.push(itm.conf)
            });
            if(this.template_no){
                this.postEdiTemp({
                    template_name:this.template_name,
                    attr:JSON.stringify(postArr),
                    template_no:this.template_no
                },type)
            }else{
                this.postAddTemp({
                    template_name:this.template_name,
                    attr:JSON.stringify(postArr)
                },type);
            }
            // this.activeEle ='-1'
        },
        addClumBtn(){
            let cloumNo=this.elemData.conf.COLUMN_NO;
            this.tableData.map((itm,inx)=>{
                if(itm.columnNo==cloumNo){
                    this.clumAct = inx;
                }
            })
            this.clumShow =true ;
        },
        chooseClumBtn(row,inx){
            this.clumClickData = row;
            this.clumAct = inx
        },
        clumSureBtn(){
            this.elemData.conf.COLUMN_NO=this.clumClickData.columnNo;
            this.clumTitle = this.clumClickData.columnName
            this.clumShow =false ;
        }
    },
    created(){
        this.template_no = this.$route.query.template_no;
        if(this.template_no){
            let poDa={
                template_no:this.template_no
            }
            this.getTempDetail(poDa)
        }
        this.getElementList();
        this.getColumnList(this.clumSearch)
    }
}
</script>
<style lang="scss">
.addtel-page{
    
    .addtel-cont{
        @extend %pagecont;
        overflow: hidden;
        .addTel-left,
        .addTel-right{
            display: inline-block;
            vertical-align: top;
           
            overflow: hidden;
        }
        .addTel-left{
            width: 400px;
           overflow: hidden;
            .addTel-left-tmp{
                border: 1px #e2e2e2 solid;
                border-radius: 4px;
                height: 766px;
                overflow-y: auto;
                .eleDel{
                   
                    vertical-align: top;
                    font-size: 12px;
                    color: #403f4c;
                    padding: 2px 10px;
                    background-color: #f0f0f0;
                    border-radius: 2px;
                    overflow: hidden;
                    margin-top: 5px;
                    display: none;
                    float: right;
                }
            }
            ul{
                padding:10px;
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
                .eleStyle{
                    border:1px #409EFF solid;
                    padding: 10px;
                    box-sizing: border-box;
                    padding-bottom: 4px;
                    .eleDel{
                         display: inline-block;
                    }
                }
            }
        }
        .addTel-right{
            width: calc(100% - 420px);
            float: right;
        }   
        .addtel-top{
            padding: 30px;
            border: 1px #e2e2e2 solid;
            border-radius: 4px;
            overflow: hidden;
            .comp-ul{
                padding: 20px 0;
                margin: 0px;
                li{
                   display: inline-block;
                   width: 90px;
                    overflow: hidden;
                    text-align: center;
                    font-size: 14px;
                    color: #bbb;
                    margin: 10px;
                    .span-img{
                        border:1px #e2e2e2 solid;
                        border-radius: 4px;
                        width: 80px;
                        height: 80px;
                        overflow: hidden;
                        display: inline-block;
                        vertical-align: top;
                        margin-bottom: 10px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
        .addtel-btm{
            margin-top: 30px;
            border: 1px #e2e2e2 solid;
            border-radius: 4px;
            padding: 20px;
            h2{
                font-size: 20px;
                font-weight: 500px;
            }
            .select-cof{
                margin-left: 80px;
                margin-bottom: 30px;
                .chooseSel{
                    display: inline-block;
                    vertical-align: top;
                    width: 446px;
                    height: 270px;
                    overflow: hidden;
                    margin: 50px auto;
                    border:1px #e2e2e2 solid;
                    position: relative;
                    img{
                        width: 290px;
                        position: absolute;
                        top: 26px;
                        left: 76px;
                        max-height: 190px;
                    }
                    .selec-txt{
                        height: 50px;
                        text-align: center;
                        line-height: 50px;
                        border-top: 1px #e2e2e2 solid;
                        font-size: 16px;
                        position: absolute;
                        bottom: 0px;
                        width: 100%;
                        color: #403f4c;
                    }
                }
            }
            .addTmpName{
                margin-top: 30px;
            }
        }
        .addtel-cof{
            margin-top: 20px;
        }
        // .mt20{
        //     margin-top: 20px;
        // }
        .mar10{
            margin-right: 20px;
        }
        .conf-span{
            display: inline-block;
            vertical-align: top;
            width: 130px;
            overflow: hidden;
        }
        
    }
    .style_list{
        ul{
            padding: 0px;
            margin: 0px;
            overflow:hidden;
            li{
                position:relative;
                display:table;
                float:left;
                font-size: 16px;
                margin: 10px;
                height: 252px;
                border:1px #e2e2e2 solid;
                text-align:center;
                overflow:hidden;
                .img_pan{
                    display:table-cell;
                    vertical-align:middle;
                    width: 300px;
                    height: 210px;
                    border-bottom:1px #e2e2e2 solid;
                    img{
                        // border:1px #ddd solid;
                        margin:0 auto;
                        max-width:260px;
                        max-height:210px;
                    }
                }
                .shooseStyle{
                    position: absolute;
                    width: 100%;
    
                    .acIcon{
                        color: #4066f5;
                    }
                }
                
            }
        }
    }
}
</style>