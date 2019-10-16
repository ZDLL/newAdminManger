<!-- <h2>首页</h2> -->
<template>
    <div class='frist-page'>
       <img class='frist-img' src="@/assets/frist.png" alt="首页">
    </div>
</template>
<script>
export default {
    name:"frist",
    data(){
        return{}
    }
}
</script>
<style lang="scss">
    .frist-page{
        background-color: #fff;
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        height: 100%;
        // overflow: hidden;
        .frist-img{
            // height:100%;
            height: auto;
            width: 44%;
            display: inline-block;
            vertical-align: top;
            margin: 1px auto;
            position: absolute;
            left: 0px;
            right: 0px;
            top:0px;
            bottom: 0px;
            margin: auto;
        }
    }
</style>