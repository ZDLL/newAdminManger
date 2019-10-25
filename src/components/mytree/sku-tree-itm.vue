<template>
    <li :key="data.skuInfoNo" :skuInfoNo = 'data.skuInfoNo'>
        <div class='tree-div'>
           
           <span class='tree-icon' v-if="hasChild "  @click="toggle" :class="isOpen?'el-icon-minus':'el-icon-plus'" ></span>
            <span v-if="!hasChild" class='tree-icon el-icon-minus'></span>  <!-- 末节点 -->
            <div class='tree-label nobor'>
                <span :skuInfoNo='data.skuInfoNo'> {{ data[treeProps.label] }} [ {{data.skuTypeName}} ]（{{data.state=='00001001'?"启用":"禁用"}}）</span>
                <span v-if='!data.isEnd'  class='el-icon-circle-plus addIcon' @click="addButnClick(data)"></span>
                <span class='del' @click="modifyBtnClick(data)">编辑</span>
                <span class='enable' @click="enableBtnClick(data)">{{data.state=='00001001'?"禁用":"启用"}}</span>
                <span style="color:#666" v-if='data.isEnd' class='del' @click="edrBtnClick(data)">查看</span>
                <!-- <p class='info' v-for='(itm,inx) in data.infoList' :key='inx'>
                    {{itm.skuInfoName}}
                   
                </p> -->
            </div>
        </div>
        <ul v-show="isOpen" v-if="hasChild" :class="{pal20:isOpen}">
            
            <tree-item v-for="(item, index) in data[treeProps.children]" 
            :data="item" 
            :key="index" 
            :treeProps="treeProps" 
            @enable-itm-data="enableBtnClick"
            @add-itm-data='addButnClick'
            @edr-itm-data='edrBtnClick'
            @mod-itm-data='modifyBtnClick'
            >
            </tree-item>
            <slot name="navBar"></slot>
            <!--    @del-itm-data='delBtnClick' -->
        </ul>
    </li>
</template>

<script>
export default {
    name: 'TreeItem', //递归组件必须有name
    props: {
        data: {
            type: [Object, Array], //多个可能的类型
            required: true
        },
        // label、children 默认值
      treeProps:{
          type:Object,
          default:()=>({
            children:'children',
            label:'label'
          })
        }
    },
    data() {
        return {
            skuInfoNo:"",
            isOpen: false,
            isDis:false,
            isClick:''
        }
    },
    computed: {
      // 判断当前级别是否还有children
        hasChild() {
            return this.data[this.treeProps.children] && this.data[this.treeProps.children].length
        }
    },
    methods: {
      // 点击子菜单也要判断是否有children，有就展开
        toggle() {
            if(this.hasChild) {
                this.isOpen = !this.isOpen
            }
        },
        labelClick(){
            this.isDis = !this.isDis
        },
        addButnClick(data){
            this.$emit("add-itm-data",data)
        },
        enableBtnClick(data){
            this.$emit("enable-itm-data",data)
        },
        edrBtnClick(data){
            this.isClick=''
            this.isClick = data.skuTypeNo
            this.$emit("edr-itm-data",data)
        },
        modifyBtnClick(data){
            this.$emit("mod-itm-data",data)
        }
    }
}
</script>

<style lang='scss'>
ul {
    list-style: none;
    margin: 10px 0;
    // padding-left: 20px;
    // transform: rotate(0deg);
    position: relative;
    left: 0px;
    // transition: transform .3s ease-in-out;
    // -webkit-transition: All 0.5s linear;
    // -moz-transition: All 0.5s linear;
    // -o-transition: All 0.5s linear;
    // transition: display 1s linear;
}
.pal20{
   left:20px;
}
.pal0{

}
.tree-div{
    display: inline-block;
    position: relative;
    span{
        display: inline-block;
        vertical-align: top;
    }
    .enable,.edr,.del{
        padding:2px 6px;
        background-color: #F5F5F5;
        font-size: 12px;
        color: #666;
        border-radius: 4px;
        overflow: hidden;
        float: right;
    }
    .enable{
         margin: 0 10px;
         color: #666;
    }
    .del{
        color: #999;
    }
}
.tree-icon{
    position: relative;;
    left: 0px;
    top:12px;
}
.addIcon{
    font-size: 20px;
    float: right;
   
}
.tree-label{
    display: inline-block;
    vertical-align: top;
    min-width: 250px;
    padding-left: 10px;
    margin-left: 8px;
    margin-right: 8px;
    border:1px #e2e2e2e2 solid;
    // border:1px #dcdcdd solid;
    border-radius: 4px;
    overflow: hidden;
    padding: 8px 10px;
    .info{
        padding: 8px;
        padding-left: 0px;

    }
}
.nobor{
    border: none;
}

li {
      color: #000;
      margin-bottom: 10px;
}
.isblod{
    font-weight: 600
}
.tree-chlid{
    background:rgba(0,0,0,0.8);
    // height: 30px;
    overflow: hidden;
    color: #fff;
    margin-top: 20px;
    border-radius: 4px;
    padding: 8px 10px;
    // line-height: 30px;
    // padding: 0 10px;
    .enable{
        // background-color: transparent;
        // color: #fff;
    }
}
// li > span {
//     cursor: pointer;
//     font-size: 14px;
//     line-height: 20px;
// }
</style>