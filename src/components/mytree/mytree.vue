<template>
<!-- 
    @select-itm-data="enableBtnClick"
    @add-itm-data='addButnClick'
    @edr-itm-data='edrBtnClick'
 -->
  <div class='min-tree'>
    <ul v-for="(item,index) in data" :key="index">
      <tree-item :data="item" 
      :treeProps="treeProps"  
      @enable-itm-data='selectDatafunc' 
      @add-itm-data='addBtnFunc'
      @edr-itm-data='edrBtnFunc'
      @del-itm-data='delBtnFunc'
      >
       
      </tree-item>
    </ul>
  </div>
</template>

<script>
  import treeItem from './my-tree-itm.vue'
  export default {
    name:"skutree",
    props: {
      data: {
        type: [Object, Array],
        required: true
      },
      treeProps: {
        type: Object,
        default: () => ({
          children: 'children',
          label: 'label'
        })
      }
    },
    methods:{
      selectDatafunc(data){
        this.$emit("enable-tree-data",data)
      },
      addBtnFunc(data){
         this.$emit("add-tree-data",data)
      },
      edrBtnFunc(data){
        this.$emit("edr-tree-data",data)
      },
      delBtnFunc(data){
        this.$emit("del-tree-data",data)
      }

    },
    components: {
      treeItem
    },
  }
</script>
<style lang="scss">
  .min-tree{
    display: inline-block;
    vertical-align: top;
    // height: 30px;
    // line-height: 30px;
    font-size: 14px;
  }
</style>
