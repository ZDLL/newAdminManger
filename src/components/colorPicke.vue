<template>
    <div class='myColorPicker'>
        <el-color-picker v-model="color" @change='colorChangeBtn'></el-color-picker>
    </div>
</template>
<script>
export default {
    name:"colorpick",
    data(){
        return{
            color:""
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
        colorChangeBtn(){
            let newObj={};
            newObj[this.valueKey]=this.color
            this.$emit("getColor",newObj)
        }
    },
    created(){
        this.color =this.defVale?this.defVale:''
    }
}
</script>
<style lang="scss">
    .myColorPicker{
        display: inline-block;
        vertical-align: top;
        .el-color-picker__trigger{
            width: 120px;
        }
    }
</style>