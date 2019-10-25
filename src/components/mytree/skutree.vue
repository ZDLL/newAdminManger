<template>
<!-- 
    @select-itm-data="enableBtnClick"
    @add-itm-data='addButnClick'
    @edr-itm-data='edrBtnClick'
 -->
  <div class='sku-min-tree'>
    <ul v-for="(item,index) in data" :key="index">
      
      <tree-item :data="item" 
      :treeProps="treeProps"  
      @enable-itm-data='selectDatafunc' 
      @add-itm-data='addBtnFunc'
      @edr-itm-data='edrBtnFunc'
      @mod-itm-data='modBtnFunc'
      >
      </tree-item>
       <!-- <slot name="itmtree">
          <template slot="navBar">
                <tree-item 
                :data="item"
                :treeProps="prosmm"
                @enable-itm-data='selectDatafunc' 
                @add-itm-data='addBtnFunc'
                @edr-itm-data='edrBtnFunc'
                @mod-itm-data='modBtnFunc'
                ></tree-item>
          </template>
       </slot> -->
    </ul>
  </div>
</template>

<script>
  import treeItem from './sku-tree-itm.vue'
  export default {
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
    data(){
      return{
        prosmm:{
           children: 'children',
          label: 'skuTypeName'
        }
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
      modBtnFunc(data){
        this.$emit("mod-tree-data",data)
      }
    //   delBtnFunc(data){
    //     this.$emit("del-tree-data",data)
    //   }

    },
    components: {
      treeItem
    },
  }
</script>
<style lang="scss">
  .sku-min-tree{
    display: inline-block;
    vertical-align: top;
    // height: 30px;
    // line-height: 30px;
    font-size: 14px;
  }
</style>
