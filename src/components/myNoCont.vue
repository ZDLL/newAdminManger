<template>
    <div class='my-cont'>
        {{txt}}
    </div>
</template>
<script>
export default {
    name:"cont",
    data(){
        return{
            txt:this.contTxt
        }
    },
    props:{
        contTxt:{
            type:String,
            default:""
        }
    },
    components:{}
}
</script>
<style lang="scss" scoped>
   .my-cont{
       margin-top: 20px;
       font-size: 14px;
       color: #999;
   }
</style>