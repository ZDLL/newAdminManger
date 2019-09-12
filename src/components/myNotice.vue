<template>
    <div class='my-notice'>
        <span class="tipRed">注: </span>
        {{txt}}
    </div>
</template>
<script>
export default {
    name:"tip",
    data(){
        return{
            txt:this.tipTxt
        }
    },
    props:{
        tipTxt:{
            type:String,
            default:""
        }
    },
    components:{}
}
</script>
<style lang="scss" scoped>
    .my-notice{
        font-size: 12px;
        color: #999;
        line-height: 1.5;
        margin-top: 5px;
        .tipRed{
            color:#666;
        }
    }
</style>