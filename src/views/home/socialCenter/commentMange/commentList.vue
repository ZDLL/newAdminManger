<template>
    <div class="comm-page">
           <myBrea :my-nav='brea'></myBrea>
          <div class="comm-cont">
               <h2>{{postData.module==1?"动态话题":"文章标题"}}：{{name || '--'}}</h2>
                <el-divider content-position="left">评论列表</el-divider>
                <div class="comm-table">
                     <el-table :data="tableData" border style="width: 100%">
                        <el-table-column label="评论ID" property="id"></el-table-column> 
                        <el-table-column label="评论内容" property="content"></el-table-column> 
                        <el-table-column label="评论用户" property="nickname"></el-table-column> 
                        <el-table-column label="创建时间" property="create_time"></el-table-column> 
                        <el-table-column label="点赞数" property="praise"></el-table-column> 
                        <el-table-column fixed="right" label="操作" width="200">
                            <template slot-scope="scope">
                                 <el-button type="text" @click="commDel(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <MyPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></MyPackage>

          </div>
    </div>
</template>
<script>
// import myPlace from "../../../components/place.vue";
import myBrea from "../../../../components/breadcrumb.vue"

import MyPackage from "../../../../components/package.vue";
import mySearch from "../../../../components/search.vue";
// import until from '../../../comm/until.js'
import { myConfirm } from "../../../../comm/until";
export default {
    components:{
        myBrea,
        MyPackage
    },
    data(){
        return{
            brea:[{"txt":"社交中心","url":"/"},{"txt":"评论管理","url":"/"}],
            name:"",
            tableData:[],
            packTotal:0,
            postData:{
                id:"",
                module:"",
                page_size:10,
                current_page:1
            }
        }
    },
    methods:{
        async getCommentList(){
            await this.$store.dispatch("comentModule/getCommentListAct",this.postData);
            let data = this.$store.state.comentModule.getCommentList
            this.tableData = data.info.result;
            this.packTotal = parseInt(data.info.total)
        },
        async delComment(postData){
            await this.$store.dispatch("comentModule/delCommentListAct",postData);
            let data = this.$store.state.comentModule.delCommentList
            this.$message.success("删除评论成功")
            this.getCommentList()
            // this.tableData = data.info.result;
            // this.packTotal = parseInt(data.info.total)
        },
        commDel(row){
             let _this = this;
            myConfirm(_this, `是否确认删除该评论？`,function(val){
                _this.delComment({id:row.id});
            })
        },
        handleCurrentFunc(val){
            this.postData.current_page = val;
        }
    },
    created(){
        this.postData.id = this.$route.query.id;
        this.postData.module = this.$route.query.type;
        this.name = this.$route.query.title;
        this.getCommentList()
    }
}
</script>

<style lang="scss">
    .comm-page{
        .comm-cont{
            @extend %extreme;
            h2{
                font-size: 15px;
            }
        }
        .comm-table{
             @extend %tableborder;
        }

    }
 

</style>