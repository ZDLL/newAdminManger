<template>
    <div class="el-upload">
        <span class='proUpload-span' @click="spanClick">
            <i class='el-icon-plus'></i>
            <video class='myVideo' v-if='url' controls="controls">
                <source :src='url' type="video/mp4" />
            </video>
            <!-- <img v-if='url' :src='url' alt="上传"> -->
        </span>
        <input style="display:none" type="file" @change="changeFile" ref="proUpload" id="proUpload" />
        <el-progress v-if='showPer' :percentage='per'></el-progress>
        <!-- <el-progress :text-inside="true" :stroke-width="10" :percentage="100" status="success"></el-progress> -->
    </div>
</template>
<script>
import axios from "axios"
export default {
    name:"videoupload",
    props:{
        imgUrl:{
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
            bucket:"car-public-source",
            token:""
        }
    },
    methods:{
        spanClick(){
            this.$refs.proUpload.click();
        },
        getUploadToken(){
            let _this = this;
             axios({
                method: 'post',
                url: '/appuser/common/getuploadtoken',
                data:{
                    bucket:_this.bucket
                },
                headers: {"token":window.localStorage.getItem("userInfo")?JSON.parse(window.localStorage.getItem("userInfo")).token:''},
             }).then((backData)=>{
                
                 _this.token= backData.data.out.token
             }).catch((err)=>{
                 console.log("生成凭证失败");
                 console.log(err)
                 _this.$message.err("生成上传token失败")
             })
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
            formData.append("token",_this.token);
            formData.append("file",file);
            axios({
                method: 'post',
                url: 'http://up-z2.qiniup.com',
                onUploadProgress:function(progressEvent){
                    if(progressEvent.lengthComputable){
                        _this.per = (progressEvent.loaded/progressEvent.total)*96
                    }
                },
                data:formData,
            }).then((data)=>{
                _this.per=100;
                _this.url = "http://source.zhiqu2019.com/"+data.data.name; 
                let h=data.data.video.height;
                let w = data.data.video.width,
                    d = data.data.video.duration
                _this.$emit("getUrl",{url:_this.url,width:w,height:h,duration:d})
                setTimeout(()=>{
                    _this.showPer=false;
                    _this.per = 0;
                },1500) 
            }).catch((err)=>{

            })
        }
    },
    created(){
        this.getUploadToken();
        // console.log(this.imgUrl)
    }
}
</script>
<style lang="scss">
    .el-upload{
        .proUpload-span{
            display: inline-block;
            width: 180px;
            height: 180px;
            font-size: 30px;
            line-height: 180px;
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