<template>
    <div class="elCon-upload">
        <span class='proUpload-span' @click="spanClick">
            <i class='el-icon-plus'></i>
            <img v-if='url' :src='url' alt="上传">
        </span>
        <input style="display:none" type="file" @change="changeFile" ref="proUpload" id="proUpload" />
        <el-progress v-if='showPer' :percentage='per'></el-progress>
    </div>
</template>
<script>
import axios from "axios"
export default {
    name:"elupload",
    props:{
        imgUrl:{
            type:String,
            default:""
        },
        valueKey:{
            type:String,
            default:""
        }
    },
    components:{},
    data(){
        return{
            per:0,
            url:this.imgUrl,
            showPer:false,
        }
    },
    methods:{
        spanClick(){
            this.$refs.proUpload.click();
        },

        changeFile(){
            let _this = this;
            _this.showPer = true
            let inputDom = this.$refs.proUpload;
            let file = inputDom.files[0];//获取到inpt 中的file 文件
            if(!file){
                return
            }
            let formData = new FormData();
            formData.append("file",file);
            axios({
                method: 'post',
                url: '/gds/upload',
                onUploadProgress:function(progressEvent){
                    if(progressEvent.lengthComputable){
                        _this.per = (progressEvent.loaded/progressEvent.total)*96
                    }
                },
                data:formData,
            }).then((data)=>{
                _this.per=100;
                _this.url = data.data.out.value; 
                 let newObj={};
                newObj[_this.valueKey]= _this.url;
                _this.$emit("getActUpload",newObj)
                setTimeout(()=>{
                    _this.showPer=false;
                    _this.per = 0;
                },1500) 
            }).catch((err)=>{

            })
        }
    },
    created(){
        console.log(this.imgUrl)
    }
}
</script>
<style lang="scss">
    .elCon-upload{
         display: inline-block;
         vertical-align: top;
         width: 180px;
        .proUpload-span{
            display: inline-block;
            width: 80px;
            height: 80px;
            font-size: 30px;
            line-height: 80px;
            text-align: center;
            color: #999;
            border:1px #dcdcdd dashed;
            border-radius: 4px;
            overflow: hidden;
            position: relative;
            img{
                width: 100%;
                height: 100%;
                position: absolute;
                top:0px;
                left: 0px;
            }
        }
    }
</style>