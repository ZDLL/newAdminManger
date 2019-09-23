<template>
    <div class='myNav'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for='(itm,inx) in nav' :key='inx'>{{itm.txt}}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    name:"mybreadcrumb",
    props:{
        myNav:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
            nav:this.myNav
        }
    }
}
</script>
<style lang="scss">
    .myNav{
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        color: #000;
        background-color: #fff;
        padding:0 15px;
        border-radius: 4px;
        overflow: hidden;
        .el-breadcrumb{
             font-size: 16px;
            line-height: 50px;
        }
    }
</style>