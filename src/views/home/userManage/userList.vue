<template>
    <div class="userList-page">
         <myBrea :my-nav='brea'></myBrea>
         <div class="userList-cont">
            <div class="userList-top">
               <div class='userSearch'>
                   <span class='title'> 用户名：</span>
                   <el-input class='search-cont' v-model="input" placeholder="请输入内容"></el-input>
               </div>
               <div class='userSearch'>
                   <span class='title'> 账号：</span>
                   <el-input class='search-cont' v-model="input" placeholder="请输入内容"></el-input>
               </div>
               <div class='userSearch'>
                   <span class='title'> 用户角色：</span>
                   <div class='search-cont'>
                       <el-select v-model="roleValue" placeholder="请选择">
                            <el-option
                            v-for="item in roleOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                   </div>
                   <!-- <el-input class='search-cont' v-model="input" placeholder="请输入内容"></el-input> -->
               </div>
               <div class='userSearch'>
                   <span class='title'> 状态：</span>
                   <el-input class='search-cont' v-model="input" placeholder="请输入内容"></el-input>
               </div>
               <div class='userSearch'>
                   <el-button type="primary">查询用户</el-button>
                    <el-button type="primary" plain>添加用户</el-button>
               </div>
            </div>
            <div class='userList-table'>
                <el-divider content-position="left">用户列表</el-divider>
                <div class='list_table'>
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">

                        <el-table-column
                           v-for="(itm,index) in tableHeader"
                            :key="index"
                            :prop="itm.prop"
                            :label="itm.label"
                        >
                        </el-table-column>

                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="userStatusClick(scope.row)">冻结/正常</el-button>
                            <el-button type="text" size="small" @click="userEditorClick(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="userResetPwdClick(scope.row)">重置密码</el-button>
                        </template>
                        </el-table-column>
                    </el-table>

                </div>
            </div> 
         </div>
    </div>
</template>
<script>
import {menuSetData} from '../../../comm/until'
import myBrea from "../../../components/breadcrumb.vue"
import myPackage from "../../../components/package.vue"
export default {
    name:"userlist",
    data(){
        return{
            tableData:[
                {
                    "id":1,
                    "publish_type":"文章"
                }
            ],
            tableHeader:[
                { prop: "id", label: "文章ID" },
                { prop: "publish_type", label: "文章类型" },
                // { prop: "title", label: "标题" },
                // { prop: "nickname", label: "作者" },
                // { prop: "category", label: "所属专栏" },
                // { prop: "create_time", label: "发布时间" },
                // { prop: "is_recommend", label: "投放发布" },
                // { prop: "is_select", label: "投放精选" }
            ],
            roleOptions:[{}],
            roleValue:"",
            input:"",
             brea:[{"txt":"系统管理","url":"/menu"},{"txt":"用户管理","url":"/userManage"}]
        }
    },
    components:{
        myBrea,
        myPackage
    },
    methods:{
        userStatusClick(row){
            console.log(row)
        },
        userEditorClick(row){
            console.log(row)
        },
        userResetPwdClick(row){
            console.log(row)
        }
    },
    created(){},
    filters:{}
}
</script>
<style lang="scss">
    .userList-cont{
        background-color: #fff;
        padding: 20px;
        margin-top: 20px;
        .userSearch{
            display: inline-block;
            vertical-align: top;
            box-sizing: border-box;
            height: 50px;
            line-height: 50px;
            margin: 0 15px;
            .title{
                width: 70px;
                display: inline-block;
                vertical-align: top;
            }
            .search-cont{
                display: inline-block;
                vertical-align: top;
                width: calc(100% - 80px);
            }
        }
        .list_table{
            @extend %tableborder;
        }
        
    }
</style>