<template>
    <div class="time">
        <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change='timeChange'
            >
        </el-date-picker>
    </div> 
</template>
<script>
export default {
    name:"datapicker",
    data(){
        return{
            time:[]
        }
    },
    props:{},
    methods:{
        timeChange(){
            this.$emit("datePicker",this.time)
        }
    },
    created(){},
    mounted(){}
}
</script>
<style lang="scss" scoped>
    .time {
      display: inline-block;
      vertical-align: top;
      margin-left: 20px;
      .block {
        display: inline-block;
        vertical-align: top;
        margin-right: 20px;
        .el-input__inner {
          height: 36px;
          line-height: 36px;
        }
      }
    }
</style>


