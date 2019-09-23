<template>
    <div class="skuModu-page">
       <div class="skuModu-cont">
           <div class="page-cont">
                <div class="page-cont-left">
                    <h3>核心SKU</h3>
                    <div>
                        <el-button class='mt20' type="primary" @click="addBtnClick">添加</el-button>
                    </div>
                    
                   <sku-tree :data="treeData" 
                    :treeProps='propsxxx' 
                        @enable-tree-data='getSelData' 
                        @add-tree-data='getAddData'
                        @edr-tree-data='getEdrData'
                    ></sku-tree>
                </div>
                <div class='page-cont-right'>
                    <h3>其他SKU</h3>
                    <div class='skulist'>
                        <h3>主要SKU <span class="el-icon-circle-plus"></span> </h3> 
                        <div class='list-itm'>
                            <div class='itm'>
                                <span>[ 适用性别 ]</span>
                                <!-- <span>删除</span> -->
                               
                                <span style="float:right" class="el-icon-circle-plus"></span>
                                 <span class='enable'>启用</span> 
                                <p class='itm-chen'>男</p>
                            </div>
                        </div>
                    </div>
                    <div class='skulist'>
                        <h3>次要SKU <span class="el-icon-circle-plus"></span> </h3> 
                    </div>
                    <div class='skulist'>
                        <h3>唯一SKU <span class="el-icon-circle-plus"></span> </h3> 
                    </div>
                    <div class='skulist'>
                        <h3>参数SKU <span class="el-icon-circle-plus"></span> </h3> 
                    </div>
                </div>
           </div>
       </div>
       <!-- 添加 -->
       <el-dialog
        title="添加SKU属性"
        :visible.sync="skudialog"
        width="40%"
       >
            <div>
                <el-select v-model="selcVale" placeholder="请选择">
                    <el-option
                    v-for="item in selcOpt"
                    :key="item.skuTypeNo"
                    :label="item.skuTypeName"
                    :value="item.skuTypeNo">
                    </el-option>
                </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="skudialog = false">取 消</el-button>
                <el-button type="primary" @click="saveSkuBtn">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加根类 -->
        <el-dialog
            title="添加SKU属性"
            :visible.sync="adddialog"
            width="40%"
            >
                <div>
                    <el-select v-model="addVale"  @change="getNum" placeholder="请选择">
                        <el-option
                        v-for="item in typeOpt"
                        :key="item.skuTypeNo"
                        :label="item.skuTypeName"
                        :value="item.skuTypeNo"
                        >
                        </el-option>
                    </el-select>
                    <div class='mt20'>
                        <el-checkbox-group v-if='typeArr.length>1' v-model="checkedAdd" @change="handleCheckedAddChange">
                            <el-checkbox v-for="(itm,index) in typeArr" :label="itm.codeInfoValue" :key="index">{{itm.codeInfoName}}</el-checkbox>
                        </el-checkbox-group>
                        <p v-else class='nocont'>没有数据！</p>
                    </div>
                
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="adddialog = false">取 消</el-button>
                    <el-button type="primary" @click="saveAddBtn">确 定</el-button>
                </span>
        </el-dialog>

    </div>
</template>
<script>
import skuTree from '../../../components/mytree/skutree.vue'
import {myConfirm,translateDataToTree} from '../../../comm/until'
export default {
    name:"sku",
    data(){
        return{
            treeData:[],
            propsxxx:{
                children: 'children',
                label: 'skuTypeName'
            },
            checkedAdd:[],
            skudialog:false,
            adddialog:false,
            addVale:[],
            selcOpt:[],
            selcVale:[],
            typeOpt:[],
            typeArr:[],
            skuTypeNo:"",
            addPostData:{
                skuTypeNo:"",
                parSkuInfoNo:"",
                codeValues:""
            },
            getListData:{
                skuType:"01021001",
                skuTypeNo:"",
                // parSkuInfoNo:"",
                state:"00001001"
            },
            O_treeData:{},
            treeArr:[]
        }
    },
    components:{
        skuTree
    },
    methods:{
        async getlist(){
            await this.$store.dispatch("GdsSkuTypeModule/POST_GDS_SKU_LIST",this.getListData)
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_SKU_LIST;
            this.typeOpt = data.out.list
            this.selcOpt = data.out.list
        },
        async getCodelist(postData){
            await this.$store.dispatch("GdsSkuTypeModule/POST_GDS_CODES_LIST",postData)
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CODES_LIST;
            this.typeArr = data.out[postData.codeTypes]
          
        },
        async getInfolist(postData){
            await this.$store.dispatch("GdsSkuTypeModule/POST_GDS_INFO_LIST",postData)
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_INFO_LIST;
            this.treeArr = data.out.list
            this.treeData= translateDataToTree(data.out.list,{id:"skuInfoNo",parId:"parSkuInfoNo"})
        },
        async postSavesku(postData){
            await this.$store.dispatch("GdsSkuTypeModule/POST_GDS_SKU_SAVE",postData);
            let data  = this.$store.state.GdsSkuTypeModule.POST_GDS_SKU_SAVE;
            this.$message.success(data.message)
            this.skudialog = false;
            this.getInfolist();
        },
        async postChildData(postData){
            await this.$store.dispatch("GdsSkuTypeModule/POST_GDS_CHILD_LIST",postData);
            let data  = this.$store.state.GdsSkuTypeModule.POST_GDS_CHILD_LIST;
            this.treeData= translateDataToTree(data.out.childrenSkuType,{id:"skuTypeNo",parId:"parSkuTypeNo"})
            // this.treeArr.push(data.out.childrenSkuType)
            // console.log(data)
        },
        getSelData(data){

        },
        getAddData(data){
            this.skudialog = true;
            this.O_treeData = data;
            this.getListData.skuTypeNo = data.skuTypeNo;
            // this.getlist()
        },
        getEdrData(data){
            console.log(data)
            this.postChildData({skuInfoNo:data.skuTypeNo})
        },
        saveSkuBtn(){
            
            // console.log(postData);
        },
        addBtnClick(){
            this.adddialog = true;
            this.getlist();
        },
        saveAddBtn(){
             let postData={
                skuTypeNo:this.skuTypeNo,//this.O_treeData.skuTypeNo,
                parSkuInfoNo:'',//this.O_treeData.parSkuTypeNo,
                codeValues:this.checkedAdd.join(",")
            }
            this.postSavesku(postData)
        },
        handleCheckedAddChange(val){

        },
        getNum(val){
            this.skuTypeNo = val
             this.getCodelist({codeTypes:val})
            console.log(val)
        }

    },
    created(){
        // this.getlist()
        // this.getInfolist({skuTypeNo:"",state:"00001001"})
        this.postChildData({skuInfoNo:""})
    }
}
</script>
<style lang="scss">
    .skuModu-page{
        .skuModu-cont{
            h3{
                font-size: 16px;
                font-weight: 600;
            }
            .page-cont-right{
                .skulist{
                   .el-icon-circle-plus{
                       font-size: 20px;
                   }
                    margin-top: 20px;
                    width: 100%;
                    overflow: hidden;
                    .enable{
                        padding: 2px 6px;
                        background-color: #F5F5F5;
                        font-size: 12px;
                        color: #666;
                        -webkit-border-radius: 4px;
                        -moz-border-radius: 4px;
                        border-radius: 4px;
                        overflow: hidden;
                        float: right;
                        margin-right: 10px;
                    }
                    .list-itm{
                        margin-top: 20px;
                        width: 300px;
                        padding: 10px;
                        border: 1px #dcdcdc solid;
                        border-radius: 4px;
                        overflow: hidden;
                        font-size: 14px;
                        .itm-chen{
                            display: inline-block;
                            margin-top: 5px;
                            width: 270px;
                            padding: 5px;
                            // border: 1px #dcdcdc solid;
                            margin: 10px 5px;
                            background-color: #F5F5F5;
                        }
                        // height: 38px;
                        // line-height: 38px;
                    }
                }
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
                        height: 100%;
                        background-color: #dcdcdc;
                }
            }
        }
    }
</style>