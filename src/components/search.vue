<template>
    <div class="search-com">
        <input type="text"  v-model="txt" :placeholder='holderTxt' @keyup.enter='searchBtn'/>
        <i class="el-input__icon el-icon-search" @click="searchBtn"></i>
    </div>
</template>
<script>
export default {
    name:"search",
    data(){
        return{
            txt:''
        }
    },
    props:['holderTxt'],
    methods:{
        searchBtn(){
            this.$emit("searchVal",this.txt)
        }
    },
    created(){},
    mounted(){},
    filters:{}
}
</script>
<style lang="scss" scoped>
    .search-com{
        background: white;
        // box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
        box-sizing: border-box;
        border:1px rgba(32, 33, 36, .28) solid;
        font-size: 16px;
        line-height: 36px;
        width: 300px;
        border-radius: 22px;
        opacity: 1;
        position: relative;
        transition: none;
        overflow: hidden;
        display: inline-block;
        vertical-align: top;
        height: 36px;
        // padding: 0 15px;
        input{
            box-sizing: border-box;
            padding-inline-start: 20px;
            position: absolute;
            top: 0;
            height: 100%;
            border: 0px;
            width: 260px;
            color: #666;
        }
        i{
            position: absolute;
            right: 15px;
            top:-1px;
        }
    }
</style>


