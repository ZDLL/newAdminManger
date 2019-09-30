import tinymce from 'tinymce/tinymce'

import 'tinymce/themes/silver'
import 'tinymce/plugins/image'// 插入上传图片插
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/paste'
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/lineheight'

import axios from "axios"
import { Message} from "element-ui";
let tinymceInitFig={
    language_url: '/tinymce/langs/zh_CN.js',
    language: 'zh_CN',
    skin_url: '/tinymce/skins/ui/oxide',
    // height: 800,
    elementpath: false,
    min_height:300,
    formats:{
        pre:{block:'div',classes: 'myclass1'},
        // pre: { selector: 'pre', styles: {'color':'red'} }
    },
    content_style: '.myclass1{color:#999;font-size:12px}',
    // selector: "textarea",
    // theme : "advanced",
    plugins: 'lists image paste autoresize lineheight',
    toolbar: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image | removeformat paste | lineheight',
    autoresize_bottom_margin: 0, 
    autoresize_on_init: true,
    // autoresize_overflow_padding: 8,
    branding: false,
    menubar: false,
    convert_urls: false ,
    image_advtab: false, //开启图片上传的高级选项功能
    images_upload_credentials:true,
    paste_as_text: true,
    paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
    // images_upload_url:"/backend/common/uploadwords",
    images_reuse_filename: true,
    image_title:false,
    automatic_uploads:true,
    theme_advanced_toolbar_location :"top",
    images_upload_handler:function(blobInfo, succFun, failFun){
        let file= blobInfo.blob()
        let formData = new FormData();
        formData.append("file",file)
        if(file.size/(1024*1024)>1){
          alert("上传图片不能大于1M")
          succFun(" ");
          return ;
        }
        axios({
          method: 'post',
          url: '/backend/common/uploadwords',
          data:formData,
          // headers: {"token":window.localStorage.getItem("token")},
        }).then(data=>{
          if(data.data.code !=10000){
            Message.error(data.data.msg);
            if(data.data.code =='10005' || data.data.code=='10006'){
              window.location.href='/'
              return;
            }
            succFun("")
            failFun(data.data.msg)
            return false
          }
          succFun(data.data.info.path)
        }).catch(err=>{
          console.log("错误");
          console.log(err)
        })
    },
    paste_preprocess: function(plugin, args) {
        args.content += '';
    }
}
export{
    tinymceInitFig
}