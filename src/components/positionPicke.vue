<template>
    <div class='positionPicke'>
        <ul class='position-ul'>
            <li v-for="(itm,inx) in positionArr" :key='inx' :class='actKey == inx ?"liAct":""' @click="positionLiBtn(itm)">
                {{itm.name}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"position",
    data(){
        return{
            actKey:'',
            positionArr:[
                {
                    name:"居左",
                    key:"1"
                },
                {
                    name:'居中',
                    key:"2"
                },
                 {
                    name:"居右",
                    key:"3"
                }
            ]
        }
    },
    props:{
        valueKey:{
            type:String,
            default:"key"
        },
        defVale:{
            type:String,
            default:''
        }
    },
    methods:{
        positionLiBtn(itm){
            this.actKey =parseInt(itm.key)-1;
            let newObj={};
            newObj[this.valueKey]=itm.key
            
            this.$emit("getActposition",newObj)
        }
    },
    created(){
        this.actKey =this.defVale?parseInt(this.defVale)-1:"-1"
    }
}
</script>
<style lang="scss">
    .positionPicke{
        display: inline-block;
        .position-ul{
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