<template>
  <input style="display:none" type="file" @change="inputFile" ref="contentUpload" id="uploader" />
</template>
<script>
import { constants } from 'crypto';
export default {
  name: "myupload",
  data() {
    return {
      file: ""
    };
  },
  props: {},
  methods: {
   async inputFile() {
      let inputDom = this.$refs.contentUpload;
      let file = inputDom.files[0];//获取到inpt 中的file 文件
      if(!file){
        return
      }
      const isJPG = file.type == "image/jpeg/png"?true:false;
      const isMp4 = file.type == 'video/mp4'?true :false;
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isLt100m = file.size / 1024 / 1024<100;
      if (isJPG && !isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return;
      }
       if (isMp4 && !isLt100m) {
        this.$message.error("请上传小于100MB格式为MP4的视频");
        return;
      }
      let formData = new FormData();
      formData.append("file",file)
      await this.$store.dispatch("comModule/getUploadAct",formData)
      let data = this.$store.state.comModule.url;
      this.$emit("getFile", data);
    }
  },
  components: {},
  created() {},
  mounted() {}
};
</script>

