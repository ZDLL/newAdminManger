<template>
    <div class='skuStatu-page'>
         <myBrea :my-nav='brea'></myBrea>
        <div class='page-cont'>

            <div class='page-cont-left'>
                <el-button type="primary" style="margin-bottom:20px" @click="addSkuBtnClick">添加SKU类型</el-button>

                <!-- 
                    @enable-tree-data="enableBtnClick"
                    @add-tree-data='addButnClick'
                    @edr-tree-data='edrBtnClick'
                    @del-tree-data='delBtnClick'
                -->
               <my-tree :data="treeData" 
               :treeProps='propsxxx' 
                @enable-tree-data='getSelData' 
                @add-tree-data='getAddData'
                @edr-tree-data='getEdrData'
                @del-tree-data='delBtnClick'
               ></my-tree>
            </div>
            <div class='page-cont-right'>
               <div class='addSku'>
                    <el-row class='mt20'>
                        <el-col :span="4"><span class='title'> <span class='my-span-notice'>*</span>类型名称：</span></el-col>
                        <el-col :span="10"><el-input class='search-cont' clearable  v-model="edrPostData.skuTypeName"  maxlength="30" show-word-limit placeholder="请输入内容"></el-input></el-col>
                    </el-row>
                    <el-row class='mt20'>
                        <el-col :span="4"><span class='title'> <span class='my-span-notice'>*</span>节点顺序：</span></el-col>
                        <el-col :span="10">
                            <el-input v-model="edrPostData.nodeOrder" placeholder="请输入节点顺序"></el-input>
                            <my-notice :tip-txt='"数字越小排序越靠前"'></my-notice>

                        </el-col>
                    </el-row> 
                    <el-row class='mt20'>
                        <el-col :span="4"><span class='title'> <span class='my-span-notice'>*</span>SKU类型：</span></el-col>
                        <el-col :span="10">
                            <el-select v-model="edrPostData.skuType" placeholder="请选择SKU类型">
                                <el-option
                                v-for="item in skuTypeOpt"
                                :key="item.codeInfoValue"
                                :label="item.codeInfoName"
                                :value="item.codeInfoValue">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class='mt20'>
                        <el-col :span="4">&nbsp;</el-col>
                        <el-col :span="10">
                            <el-button type="primary" plain style="width:100px" @click="saveBtnClick">保存</el-button>
                        </el-col>
                    </el-row> 
                    
                   
            </div>
            </div>
        </div>
        <!-- 添加sku类型 -->
        <el-dialog
            title="新增SKU类型 "
            :visible.sync="addSkudialog"
            width="40%"
           >
           <div class='addSku'>
                <el-row class='mt20'>
                    <el-col :span="4"><span class='title'> <span class='my-span-notice'>*</span>类型名称：</span></el-col>
                    <el-col :span="10"><el-input class='search-cont' clearable  v-model="addPostData.skuTypeName"  maxlength="30" show-word-limit placeholder="请输入内容"></el-input></el-col>
                </el-row>
                <el-row class='mt20'>
                    <el-col :span="4"><span class='title'> <span class='my-span-notice'>*</span>节点顺序：</span></el-col>
                    <el-col :span="10">
                        <el-input v-model="addPostData.nodeOrder" placeholder="请输入节点顺序"></el-input>
                    </el-col>
                </el-row> 
                <el-row class='mt20'>
                    <el-col :span="4"><span class='title'> <span class='my-span-notice'>*</span>SKU类型：</span></el-col>
                    <el-col :span="10">
                        <el-select v-model="addPostData.skuType" placeholder="请选择SKU类型">
                            <el-option
                                v-for="item in skuTypeOpt"
                                :key="item.codeInfoValue"
                                :label="item.codeInfoName"
                                :value="item.codeInfoValue">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
           </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addSkudialog = false">取 消</el-button>
                <el-button type="primary" @click="addGdsTypeBtnClick">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import myTree from '../../../components/mytree/mytree.vue'
import {myConfirm,translateDataToTree} from '../../../comm/until'
import myBrea from "../../../components/breadcrumb.vue"

export default {
    name:"skustatumodu",
    props:{},
    components:{
        myTree,
        myBrea
    },
    data(){
        return{
            brea:[{"txt":"商品中心","url":"/goods"},{"txt":"SKU类型管理","url":"/"}], 
            addSkudialog: false,
            skuTypeOpt:[],
            addPostData:{
                skuTypeName:"",
                skuType:"",
                nodeOrder:"",
                parSkuTypeNo:""
            },
            edrPostData:{
                skuTypeName:"",
                skuType:"",
                nodeOrder:"",
                parSkuTypeNo:""
            },
            parentData:{},
            treeData:[],
            propsxxx:{
                children: 'children',
                label: 'skuTypeName'
            }
        }
    },
    computed:{},
    methods:{
        async addGdsType(postData){
            await this.$store.dispatch('GdsSkuTypeModule/POST_GDS_SAVE',postData);
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_SAVE
            this.$message.success(data.message);
            this.addSkudialog = false;
            this.getGdsList()
        },
        async getGdsParts(type){
            await this.$store.dispatch('GdsSkuTypeModule/POST_GDS_PARTS',{skuTypeValue:type});
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_PARTS
            this.skuTypeOpt = data.out.list
        },
        async getGdsList(postData){
            await this.$store.dispatch('GdsSkuTypeModule/POST_GDS_LIST',postData);
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_LIST
            this.treeData = translateDataToTree(data.out.list,{id:"skuTypeNo",parId:"parSkuTypeNo"});
        },
        async postGdsDel(postData){
            await this.$store.dispatch('GdsSkuTypeModule/POST_GDS_TYPE_DEL',postData);
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_TYPE_DEL
            this.$message.success(data.msg)
            this.getGdsList()
        },
        async postGdsDis(postData){
            await this.$store.dispatch('GdsSkuTypeModule/POST_GDS_TYPR_DISABLE',postData);
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_TYPR_DISABLE
            this.getGdsList()
            this.$message.success(date.msg)
        },
        async postGdsEnd(postData){
            await this.$store.dispatch('GdsSkuTypeModule/POST_GDS_TYPR_ENDABLE',postData);
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_TYPR_ENDABLE
            this.getGdsList()
            this.$message.success(date.msg)
        },
        addSkuBtnClick(){
            this.addPostData.parSkuTypeNo ='';
            this.addPostData={};
            this.addSkudialog = true;
        },
        addGdsTypeBtnClick(){
             if(!this.addPostData.skuTypeName){
                this.$message.warning("请输入SKU类型名称");
                return
            }
            if(!this.addPostData.nodeOrder){
                 this.$message.warning("请输入SKU类型节点顺序");
                return
            }
            if(!this.addPostData.skuType){
                 this.$message.warning("请选择SKU类型");
                return
            }
            this.addGdsType(this.addPostData)
        },
        saveBtnClick(){
            if(!this.edrPostData.skuTypeName){
                this.$message.warning("请输入SKU类型名称");
                return
            }
            if(!this.edrPostData.nodeOrder){
                 this.$message.warning("请输入SKU类型节点顺序");
                return
            }
            if(!this.edrPostData.skuType){
                 this.$message.warning("请选择SKU类型");
                return
            }
         this.addGdsType(this.edrPostData)
        },
        getSelData(data){
           let _this = this;
           myConfirm(_this,data.state =='00001001'? "是否禁用该SKU类型？禁用后所有子类将不能使用":"是否启用该SKU类型",function(){
               if(data.state =='00001001'){
                   _this.postGdsDis({skuTypeNo:data.skuTypeNo})
               }else{
                    _this.postGdsEnd({skuTypeNo:data.skuTypeNo})
               }
               
           })
        },
        getAddData(data){
            this.addSkudialog = true;
            this.addPostData.parSkuTypeNo = data.skuTypeNo;
            this.getGdsParts(data.skuType);
        },
        getEdrData(data){
            this.edrPostData = data;
            this.getGdsParts(data.skuType);
        },
        delBtnClick(data){
            let _this = this;
            if(data.state =='00001001'){
                _this.$message.warning("改SKU类型可能正在使用，请禁用后删除");
                return
            }
           myConfirm(_this,"是否删除该SKU类型？删除后所有子类将不能使用!",function(){
               _this.postGdsDel({skuTypeNo:data.skuTypeNo})
           })
        }
    },
    created(){
        this.getGdsParts("");
        this.getGdsList();
    },
    mounted(){}
}
</script>
<style lang="scss">
    .skuStatu-page{
        .page-cont{
              @extend %pagecont;
              overflow: hidden;
              padding-bottom: 30px;
        }
        .mt20{
            margin-top: 20px;
        }
        .page-cont{
            margin-top: 20px;
            position: relative;
           .page-cont-left,
           .page-cont-right{
               display: inline-block;
               vertical-align: top;
            //    width: 50%;
               box-sizing: border-box;
               padding-left: 10px;
           }
            .page-cont-right{
                 width: 60%;
            }
           .page-cont-left{
                 width: 40%;
            //    border-right: 0.5px #dcdcdd solid;
           }
           &:after{
               position: absolute;
               content: "";
                left: 38%;
                width: 1px;
                height: 85%;
                background-color: #dcdcdc;
           }
        }
    }
</style>