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
            color:"#ffffff"
        }
    },
    methods:{
        colorChangeBtn(){
            this.$emit("getColor",{color:this.color})
        }
    }
}
</script>
<style lang="scss">
    .myColorPicker{
        display: inline-block;
        vertical-align: top;
    }
</style>