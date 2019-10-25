<!-- <h2>指标设置</h2> -->
<template>
    <div class="targetSet">
         <myBrea :my-nav='brea'></myBrea>
        <div class="targetSet-cont">
            <div class="targetSet-top">
                <el-input style="width:200px" v-model="seachData.keywords" clearable @clear='clearClick' placeholder="输入商品类型名称搜索"></el-input>
                <el-button style="float:right;margin-left:20px;" type="primary" @click="showAddDialog">添加商品类型</el-button>
                <el-button type="primary" plain  @click="searchBtnClick">查询</el-button>
            </div>
            <div class="target-set-left">
                <h2>商品类型名称</h2>
                <ul class='set-left-ul' v-if='styleOpn.length>0'>
                    <li  v-for='(itm,inx) in styleOpn' 
                        :key='inx' 
                        :no='itm.goods_type_no' 
                        :class="itm.goods_type_no==actv?'leftActive':''" 
                        @click="typeClick(itm)"
                        >{{itm.goods_type_name}}
                    </li>
                </ul>
                <p v-else style="text-align: center;margin-top:10px">暂无数据</p>
               
            </div>
            <div class="target-set-right" v-if='Object.keys(gdsData).length>0'>
                <div class="target-set-right-top" v-if='Object.keys(gdsData).length>0'>
                    <span class='right-top-img'>
                        <img :src="gdsData.picture_url" alt="商品图片">
                    </span>
                    <div class="set-right-mid">
                        <h3>{{gdsData.goods_type_name}}</h3>
                        <ul class='set-rught-mid-ul'>
                            <li class="set-right-li">
                                SKU名称：{{gdsData.sku_name || '--'}}
                            </li>
                            <li class="set-right-li">
                                启用中商品组：{{gdsData.start_num || '0'}}个
                            </li>
                             <li class="set-right-li">
                                创建时间：{{gdsData.ins_time || '--'}}
                            </li>
                            <li class="set-right-li">
                                禁用中商品组：{{gdsData.stop_num || '0'}}个
                            </li>
                        </ul>
                    </div>
                    <el-button class='mt20' type="primary" style="float:right" plain @click="delGdsBtnClick">删除</el-button>
                    <el-button class='mt20' type="primary" style="float:right;margin-right:10px" plain @click="editorBtnClick">编辑</el-button>

                    <el-button class='mt20' type="primary" style="float:right;" @click="showSetDialog">设置</el-button>
                    
                </div>
                <div class="target-set-table">
                     <el-table
                        :data="tableData"
                        style="width: 100%">

                        <el-table-column
                             prop="index_no"
                             label="指标编号"
                        >

                        </el-table-column>
                        <el-table-column
                            prop="index_name"
                             label="指标名称"
                        >
                        </el-table-column>

                        <el-table-column
                            prop="index_type_name"
                             label="指标类型"
                        >
                             
                        </el-table-column>

                        <el-table-column
                             label="权重"
                        >  
                        <template slot-scope="scope">
                            {{scope.row.index_weight || 0}}%
                        </template>  
                        </el-table-column>
                        <el-table-column
                             label="样式"
                        >  
                            <template slot-scope="scope">
                                {{scope.row.display_type_name || '暂无样式'}}
                            </template>  
                        </el-table-column>
                        <el-table-column
                            prop="status_name"
                             label="状态"
                        >    
                        </el-table-column>
                    </el-table>
                    <!-- <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage> -->
                </div>
            </div>
            <div v-else class="target-set-right">
                暂无数据
            </div>
        </div>
        <!-- 设置 -->
        <el-dialog
            title="设置"
            :visible.sync="setDialog"
            width="60%"
           >
            <div class="set-dialog">
                <ul class="dialog-ul">
                    <li class="dialog-li" v-for='(itm,inx) in setData' :key='inx'>
                        <div class='dialog-div' style="margin-top:20px">
                            <span class='diaTitle' style="margin-right:20px"><span class="my-span-notice">*</span>{{itm.index_name}}</span>
                            <div class='inp-div'>
                                <el-input v-model="itm.index_weight" type="number" clearable placeholder="请输入内容"></el-input>
                                <span class='per'>%</span>
                            </div>
                            <span class='diaTitle' style="margin:0 20px;text-align: right">展示样式</span>
                            <el-select v-model="itm.display_type" placeholder="请选择">
                                <el-option
                                v-for="item in disOpn"
                                :key="item.codeInfoValue"
                                :label="item.codeInfoName"
                                :value="item.codeInfoValue">
                                </el-option>
                            </el-select>
                        </div>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setDialog = false">取 消</el-button>
                <el-button type="primary" @click="setBtnClick">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加商品类型 -->
         <el-dialog
            title="添加商品类型"
            :visible.sync="addDialog"
            width="60%"
           >
            <div class="set-dialog">
                 <el-row class='mt20'>
                    <el-col :span="3"><span class="my-span-notice">*</span>上传图标</el-col>
                    <el-col :span="10">
                        <proUpload :key='addTypeData.picture_url' :img-url='addTypeData.picture_url' @getUrl='uploadUrl'></proUpload>
                    </el-col>
                </el-row>
                <el-row class='mt20'>
                    <el-col :span="3"><span class="my-span-notice">*</span>SKU</el-col>
                    <el-col :span="10">
                        <el-select v-model="addTypeData.sku_no" :disabled="skuNoDis" placeholder="请选择">
                            <el-option
                            v-for="item in skuOpn"
                            :key="item.sku_no"
                            :label="item.sku_name"
                            :value="item.sku_no">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
               
                <el-row class='mt20'>
                    <el-col :span="3"><span class="my-span-notice">*</span>类型名称</el-col>
                    <el-col :span="10">
                        <el-input v-model="addTypeData.goods_type_name" maxlength="30" show-word-limit placeholder="请输入内容"></el-input>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="addTypeSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import myBrea from "../../../components/breadcrumb.vue"
import proUpload from '../../../components/proUpload.vue'
import { myConfirm } from "../../../comm/until";
import myPackage from '../../../components/package.vue'
export default {
    name:"targetset",
    data(){
        return{
            gdsTypeName:"",
            tableData:[],
            setDialog:false,
            addDialog:false,
            styleOpn:[],
            gdsList:[],
            skuOpn:[],
            brea:[{"txt":"指标中心","url":"/goods"},{"txt":"商品类型","url":"/"}],
            actv:"",
            gdsData:{},
            addTypeData:{
                sku_no:"",
                picture:"",
                picture_url:'',
                goods_type_name:"",
            },
            setData:[],
            disOpn:[],
            seachData:{
               keywords:"",
            },
            pageDaga:{
                goods_type:"",
                current_page:"-1",
                page_size:'10'
            },
            skuNoDis:false,
            packTotal:1,
            allTableData:[]
        }
    },
    components:{
        myBrea,
        proUpload,
        myPackage
    },
    methods:{
        async getGdsList(postData){
            await this.$store.dispatch('TargetModule/POST_GDS_TYPE_LIST',postData);
            let data = this.$store.state.TargetModule.POST_GDS_TYPE_LIST;
            this.styleOpn = data.out
            if(this.styleOpn.length==0){
                this.gdsData={};
                this.tableData=[];
            }
        },
        async getGdsDetail(postData){
            await this.$store.dispatch('TargetModule/POST_GET_GDS_DETAIL',postData);
            let data = this.$store.state.TargetModule.POST_GET_GDS_DETAIL;
            this.gdsData = data.out
        },
        async getIndexList(postData){
            await this.$store.dispatch('TargetModule/POST_GET_INDEX_LIST',postData);
            let data = this.$store.state.TargetModule.POST_GET_INDEX_LIST;
            this.tableData=data.out.result;
            this.packTotal = parseInt(data.out.total)
            
        },
        async getSkuNo() {
            await this.$store.dispatch(
                "TargetModule/POST_GET_SKU_NO",
                {}
            );
            let data = this.$store.state.TargetModule.POST_GET_SKU_NO;
            this.skuOpn = data.out;
        },
        async getCodelist(postData, callBack) {//获取码值
            await this.$store.dispatch(
                "GdsSkuTypeModule/POST_GDS_CODES_LIST",
                postData
            );
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CODES_LIST;
            callBack(data.out[postData.codeTypes])
        },
        async addType(postData) {
            await this.$store.dispatch(
                "TargetModule/POST_ADD_TYPE",
                postData
            );
            let data = this.$store.state.TargetModule.POST_ADD_TYPE;
            this.getGdsList({})
            this.addDialog = false;
            
        },
        async setWeight(postData) {
            await this.$store.dispatch(
                "TargetModule/POST_SET_WEIGHT",
                postData
            );
            let data = this.$store.state.TargetModule.POST_SET_WEIGHT;
            this.getIndexList({goods_type:this.actv})
            this.$message.success("操作成功");
            this.setDialog = false;
        },
        async delGdsType(postData) {
            await this.$store.dispatch(
                "TargetModule/POST_DEL_GDS_TYPE",
                postData
            );
            let data = this.$store.state.TargetModule.POST_DEL_GDS_TYPE;
            // this.getIndexList({goods_type:this.actv})
             this.getGdsList(this.seachData)
            this.gdsData={};
            this.tableData=[];
            this.$message.success("操作成功");
        },
        async editorGdsType(postData) {
            await this.$store.dispatch(
                "TargetModule/POST_EDITOR_GDS_TYPE",
                postData
            );
            let data = this.$store.state.TargetModule.POST_EDITOR_GDS_TYPE;
            // this.getIndexList({goods_type:this.actv})
            this.getGdsList(this.seachData)
            this.gdsData={};
            this.tableData=[];
            this.addDialog= false;
            this.$message.success("操作成功");
        },
        showSetDialog(){
            let mysetData = this.tableData;
            let _this = this;
            _this.setData=[];
            mysetData.map((itm,inx)=>{
                let obj={};
                 obj={
                    key_id:itm.key_id,
                    index_name:itm.index_name,
                    display_type:itm.display_type || _this.disOpn[0].codeInfoValue,
                    index_weight:itm.index_weight || 0
                }
                _this.setData.push(obj)
            })
            this.setDialog = true;
        },
        showAddDialog(){
           this.addTypeData={
                sku_no:"",
                picture:"",
                picture_url:'',
                goods_type_name:"",
            }
            this.skuNoDis = false;
            this.addDialog = true;
        },
        typeClick(itm){
            this.actv = itm.goods_type_no
            this.getGdsDetail({goods_type_no:itm.goods_type_no})
            this.pageDaga.goods_type = itm.goods_type_no
            this.getIndexList(this.pageDaga)
        },
        uploadUrl(url){
            if(this.addTypeData.picture_url !=url){
                this.addTypeData.picture = ''
            }
            this.addTypeData.picture_url=url;
        },
        addTypeSure(){
          
            if(this.addTypeData.goods_type_no){
                this.editorGdsType(this.addTypeData)
            }else{
                this.addType(this.addTypeData)
            }
            
        },
        setBtnClick(){
            this.setWeight({config:JSON.stringify(this.setData)})
        },
        searchBtnClick(){
            this.getGdsList(this.seachData)
        },
        clearClick(){
            this.seachData.keywords='';
             this.getGdsList(this.seachData)
        },
        delGdsBtnClick(){
            let _this= this;
            myConfirm(_this,'是否删除该商品类型',function(){
                _this.delGdsType({goods_type_no:_this.actv})
            })
        },
        handleCurrentFunc(val){
            this.pageDaga.current_page = val
            this.getIndexList(this.pageDaga)
        },
        editorBtnClick(){
             this.addTypeData={
                sku_no:"",
                picture:"",
                goods_type_name:"",
            };
            this.skuNoDis = true;
            this.addDialog = true;
            this.addTypeData = this.gdsData;
            this.addTypeData.goods_type_no = this.gdsData.goods_type_no
            // this.editorGdsType(this.addTypeData)
        }
    },
    created(){
        this.getGdsList(this.seachData)
        this.getSkuNo();
        let _this = this;
            _this.getCodelist({codeTypes:'indexDisplayType'},function(backData){
             _this.disOpn = backData
        })
    }

}
</script>
<style lang="scss">
.targetSet{
    .mt20{
        margin-top: 20px;
    }
    .targetSet-top{
        @extend %pagecont; 
    }
    .targetSet-cont{
        overflow: hidden;
        .target-set-left,
        .target-set-right{
            display: inline-block;
            vertical-align: top;
            background-color: #fff;
            padding: 20px;
            box-sizing: border-box;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 20px;
            // height: 100%;
            // overflow-x: hidden;
            // overflow-y: auto;
            // margin-bottom: -1000px;
            // padding-bottom: 1000px;
        }
        .target-set-left{
            width: 200px;
            font-size: 14px;
            color: #1d1e2c;
            padding:15px;
            h2{
                padding-left: 50px;
            }
            .set-left-ul{
                padding: 0px;
                margin: 0px;
                text-align: left;
                font-size: 14px;
                color: #1d1e2c;
                li{
                    margin: 15px 0;
                    padding: 5px;
                    padding-left: 50px;
                }
            }

        }
        .leftActive{
            font-weight: 600;
            background: rgba(245,245,245,1);
            border-radius: 2px;
            overflow: hidden;
        }
        .target-set-right{
            width: calc(100% - 220px);
            float:right;
            .target-set-right-top{
                border-bottom: 1px #eee solid;
                padding-bottom: 60px;
                margin-bottom: 30px;
            }
            .right-top-img{
                display: inline-block;
                width: 64px;
                height: 64px;
                border-radius: 50%;
                overflow: hidden;
                border:1px #eee solid;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .set-right-mid{
                display: inline-block;
                width: 450px;
                margin-left: 20px;
                overflow: hidden;
                vertical-align: top;
                h3{
                    margin-bottom: 20px;
                    font-size: 24px;
                    color: #403f4c;
                }
                .set-rught-mid-ul{
                    padding: 0px;
                    margin: 0px;
                    .set-right-li{
                        display: inline-block;
                        vertical-align: top;
                        width: 50%;
                        box-sizing: border-box;
                    }
                }
            }
            //  margin-bottom: -1000px;
            // padding-bottom: 1000px;
            // @extend %pagecont; 
        }
    }
    .set-dialog{
        .dialog-div{
            position: relative;
            .per{
               position: absolute;
                top: 10px;
                right: 50px;
            }
            .diaTitle{
                width: 100px;
                padding: 0 10px;
                display: inline-block;
                vertical-align: top;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                // text-align: right;
            }
            .inp-div{
                display: inline-block;
                width: 200px;
                position: relative;
                vertical-align: top;
                margin-right: 20px;
            }
        }
    }
}
</style>