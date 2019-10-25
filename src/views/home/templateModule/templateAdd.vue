<!-- <h2>模版管理</h2> -->
<template>
    <div class="addtel-page">
          <myBrea :my-nav='brea'></myBrea>
        <div class='addtel-cont'>
            <div class="addTel-left"></div>
            <div class="addTel-right">
                <div class='addtel-top'>
                    <h2>常用组件</h2>
                    <ul class='comp-ul'>
                        <li>
                            <span class='span-img'>
                                <img src="" alt="">
                            </span>
                            <span>搜索框</span>
                        </li>
                    </ul>
                </div>
                <div class='addtel-btm'>
                    <h2>搜索框</h2>
                    <div class='addtel-cof'>
                        <colorPicker @getColor='getColorFun'></colorPicker>
                        <shapePicker @getActShape ='getActShapeFun'></shapePicker>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import myBrea from "../../../components/breadcrumb.vue"
import myPackage from '../../../components/package.vue'
import { myConfirm } from "../../../comm/until";
import colorPicker from '../../../components/colorPicke.vue';
import shapePicker from '../../../components/shapePicke.vue'
export default {
    name:"tel",
    components:{
        myBrea,
        myPackage,
        colorPicker,
        shapePicker
    },
    data(){
        return{
            brea:[{"txt":"模版中心","url":"/goods"},{"txt":"新建模版","url":"/"}],
            packTotal:1,
            tableData:[]
        }
    },
    methods:{
        clearBtn(){},
        handleCurrentFunc(val){},
        getColorFun(data){
            console.log(data)
        },
        getActShapeFun(data){
            console.log(data)
        }
    },
    created(){

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
            width: 300px;
            border: 1px #e2e2e2 solid;
            border-radius: 4px;
        }
        .addTel-right{
            width: calc(100% - 320px);
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
        }
        .addtel-cof{

        }
    }
}
</style>