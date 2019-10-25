<template>
    <div class='shapePicke'>
        <ul class='shape-ul'>
            <li v-for="(itm,inx) in shapeArr" :key='inx' :class='actKey == inx ?"liAct":""' @click="shapeLiBtn(itm)">
                {{itm.name}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"shape",
    data(){
        return{
            actKey:"1",
            shapeArr:[
                {
                    name:"圆形",
                    key:"1"
                },
                {
                    name:"矩形",
                    key:"2"
                },
                 {
                    name:"圆角矩形",
                    key:"3"
                }
            ]
        }
    },
    methods:{
        shapeLiBtn(itm){
            this.actKey =parseInt(itm.key)-1;
            this.$emit("getActShape",{id:itm.key})
        }
    }
}
</script>
<style lang="scss">
    .shapePicke{
        display: inline-block;
        .shape-ul{
            padding: 0px;
            margin: 0px;
            li{
                padding: 10px 20px;
                display: inline-block;
                vertical-align: top;
                width: 90px;
                text-align: center;
                overflow: hidden;
                font-size: 14px;
                color: #333;
                border:1px #e2e2e2 solid;
                margin: 0 10px;
                border-radius: 2px;

            }
            .liAct{
                border: none;
                background-color: #4066f5;
                border:1px #4066f5 solid;
                color: #fff;
            }
        }
    }
</style>