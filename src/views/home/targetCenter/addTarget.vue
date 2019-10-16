<!-- <h2>新增指标</h2> -->
<template>
    <div class="addTarget-page">
        <myBrea :my-nav='brea'></myBrea>
        <div class="addTarget-cont">
           <h2>{{addOrEdi}}</h2>
            <div class="add-cont">
                <el-row class='mt20' :gutter="10">
                    <el-col :span="3"><span class="my-span-notice">*</span>指标名称</el-col>
                    <el-col :span="10">
                        <el-input 
                        type="text"
                        placeholder="请输入内容"
                        v-model="targetData.index_name"
                        maxlength="10"
                        show-word-limit
                        >
                        </el-input>
                    </el-col>
                </el-row>
                <el-row class='mt20' :gutter="10">
                    <el-col :span="3"><span class="my-span-notice">*</span>指标描述</el-col>
                    <el-col :span="10">
                        <el-input 
                        type="text"
                        placeholder="请输入内容"
                        v-model="targetData.index_describe"
                        maxlength="100"
                        show-word-limit
                        >
                        </el-input>
                    </el-col>
                </el-row>
              
                <el-row class='mt20' :gutter="10">
                    <el-col :span="3"><span class="my-span-notice">*</span>添加图片</el-col>
                    <el-col :span="10">
                        <proUpload v-if='index_no&&targetData.picture_url' @getUrl='uploadUrl' :img-url='targetData.picture_url'></proUpload>
                        <proUpload v-if='!index_no' @getUrl='uploadUrl'></proUpload>

                    </el-col>
                </el-row>
                <el-row class='mt20' :gutter="10">
                    <el-col :span="3"><span class="my-span-notice">*</span>指标类型</el-col>
                    <el-col :span="10">
                        <el-select v-model="targetData.index_type" placeholder="请选择">
                            <el-option
                            v-for="item in typeOpn"
                            :key="item.codeInfoValue"
                            :label="item.codeInfoName"
                            :value="item.codeInfoValue">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class='mt20' :gutter="10">
                    <el-col :span="3"><span class="my-span-notice">*</span>所属分类</el-col>
                    <el-col :span="10">
                        <el-select v-model="classVal" multiple placeholder="请选择">
                            <el-option
                            v-for="item in classOpn"
                            :key="item.goods_type_no"
                            :label="item.goods_type_name"
                            :value="item.goods_type_no">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <el-button type="primary" style="margin-top:30px;width:200px" @click="saveTargetClick">{{saveOrAdd}}</el-button>
        </div>
    </div>
</template>
<script>
import myBrea from "../../../components/breadcrumb.vue"
import proUpload from '../../../components/proUpload.vue'
export default {
    name:"addtarget",
    data(){
        return{
            typeOpn:[],
            classOpn:[],
            classVal:[],
            index_no:"",
            targetData:{
                index_name:"",
                index_describe:"",
                index_type:"",
                picture:"",
                picture_url:"",
                goods_type:"",
            },
            brea:[{"txt":"指标中心","url":"/"},{"txt":"新增指标","url":"/"}],
        }
    },
    computed:{
        addOrEdi(){
            return this.index_no?"编辑指标":"新增指标"
        },
        saveOrAdd(){
             return this.index_no?"保存指标":"生成指标"
        }
    },
    components:{
        myBrea,
        proUpload
    },
    methods:{
        async getTargetDetail(postData){
            await this.$store.dispatch('TargetModule/POST_TARGET_DETAIL',postData);
            let data = this.$store.state.TargetModule.POST_TARGET_DETAIL;
            this.targetData = data.out;
            this.classVal=[];
            data.out.goods_type.map((itm)=>{
                this.classVal.push(itm.goods_type_no)
            })
        },
        async addTarget(postData){
            await this.$store.dispatch('TargetModule/POST_ADD_TARGET',postData);
            let data = this.$store.state.TargetModule.POST_ADD_TARGET;
            this.$message.success(data.message)
            this.$router.push({
                path:"/allTarget"
            })
        },
        async editorTarget(postData){
            await this.$store.dispatch('TargetModule/POST_EDITOR_TARGET',postData);
            let data = this.$store.state.TargetModule.POST_EDITOR_TARGET;
            this.$message.success(data.message)
            this.$router.push({
                path:"/allTarget"
            })
        },
        async getGdsList(postData){
            await this.$store.dispatch('TargetModule/POST_GDS_TYPE_LIST',postData);
            let data = this.$store.state.TargetModule.POST_GDS_TYPE_LIST;
            this.classOpn = data.out
        },
        async getCodelist(postData, callBack) {//获取码值
            await this.$store.dispatch(
                "GdsSkuTypeModule/POST_GDS_CODES_LIST",
                postData
            );
            let data = this.$store.state.GdsSkuTypeModule.POST_GDS_CODES_LIST;
            callBack(data.out[postData.codeTypes])
        },
        saveTargetClick(){
            this.targetData.goods_type = this.classVal.join(",");
            if(!this.targetData.index_name){
                this.$message.warning("请填写指标名称");
                return
            }
            if(!this.targetData.index_describe){
                this.$message.warning("请填写指标描述");
                return
            }
            if(!this.targetData.picture_url){
                this.$message.warning("请上传指标图片");
                return
            }
            if(!this.targetData.index_type){
                this.$message.warning("请选择指标类型");
                return
            }
            if(!this.targetData.index_type){
                this.$message.warning("至少选择一个所属分类");
                return
            }
            if(this.index_no){
                this.editorTarget(this.targetData)
            }else{
                this.addTarget(this.targetData)
            }
        },
        uploadUrl(url){
            if(this.targetData.picture_url !=url){
                this.targetData.picture ='';
            }
            this.targetData.picture_url = url
        }

    },
    created(){
        this.index_no = this.$route.query.index_no;
        if(this.index_no){
            this.targetData.index_no = this.index_no;
            this.brea=[{"txt":"指标中心","url":"/"},{"txt":"编辑指标","url":"/"}],
            this.getTargetDetail({index_no:this.index_no})
        }
        let _this =this;
        this.getCodelist({codeTypes:'indexType'},function(list){
            _this.typeOpn = list
        })
        this.getGdsList({})
    }
}
</script>
<style lang="scss">
    .addTarget-page{
        .mt20{
            margin-top: 20px;
        }
        .addTarget-cont{
            padding:30px;
            h2{
                font-size: 28px;
                color: #403f4c;
                margin-top: 20px;
                margin-bottom: 40px;
            }
             @extend %pagecont;

        }
    }
</style>