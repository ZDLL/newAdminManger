<template>
    <div class='banner-page'>
        <myPlace :place-text='bannerTxt'></myPlace>
        <div class='banner-page-cont'>
            <el-divider content-position="left">广告列表</el-divider>
            <el-button type="primary" @click='addBnnerClick'>添加广告位</el-button>
            <div class="banner-table">
                <el-table :data="tableData" border style="width: 100%">

                    <el-table-column label="广告图片" width="240px">
                        <template slot-scope='scope'>
                            <img v-if='scope.row.picture_url' :src='scope.row.picture_url' />
                            <span v-else>无图片</span>
                             <!-- <el-image v-if='scope.row.picture_url' :src='scope.row.picture_url' lazy></el-image> -->
                        </template>
                    </el-table-column>

                    <el-table-column
                        v-for="(itm,index) in tableHead"
                        :key="index"
                        :prop="itm.prop"
                        :label="itm.label"
                    ></el-table-column>

                     <el-table-column label="是否显示">
                         <template slot-scope="scope">
                             {{scope.row.is_display | fileterYesOrNo}}
                         </template>
                     </el-table-column>

                      <el-table-column label="类型">
                          <template slot-scope="scope">
                             {{scope.row.type | bannerType}}
                         </template>
                     </el-table-column>

                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click='editorBannerClick(scope.row)'>编辑</el-button>
                            <el-button type="text" @click='delBannerClick(scope.row)'>删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </div>
            <myPackge v-if='total' :key='total' :pageTotal='total' @handleCurrent='handleCurrentFunc'></myPackge>
        </div>
    </div>
</template>
<script>
import myPlace from "../../../components/place.vue";
import myPackge from '../../../components/package.vue';
import {bannerTypeConfig} from '../../../config/objConfig.js';
import until from '../../../comm/until.js'
export default {
    name:"banner",
    data(){
        return{
            bannerTxt:"广告位管理",
            tableData:[],
            bannerId:'',
            tableHead:[  
                { prop: "id", label: "广告ID" },
                { prop: "name", label: "名称" },
                // { prop: "type", label: "类型" },
                { prop: "create_time", label: "添加时间" },
                // { prop: "is_display", label: "是否隐藏" },
                { prop: "redirect_url", label: "跳转地址" },
            ],
            total:0
        }
    },
    components:{
        myPlace,
        myPackge
    },
    methods:{
        async getBannerList(objData){
            await this.$store.dispatch("bannerModule/getBannerListAct",objData);
            let data = this.$store.state.bannerModule.getBannerListData;
            this.tableData = data.info.result;
            this.total = parseInt(data.info.total)
        },
        async delBanner(objData){
            await this.$store.dispatch("bannerModule/delBannerAct",objData);
            let data = this.$store.state.bannerModule.bannerDelData;
            this.$message.success("删除该广告成功");
            this.getBannerList({});
        },
        addBnnerClick(){
            this.$router.push({
                path:"/addbanner",
            })
        },
        editorBannerClick(row){
             this.$router.push({
                path:"/addbanner",
                query:{
                    id:row.id
                }
            })
        },
        delBannerClick(row){
            //import until from '../../../comm/until.js'
            let _this = this;
            until.myConfirm(_this, `是否删除该广告？`,function(val){
                 _this.delBanner({id:row.id})
            })
        },
        handleCurrentFunc(val){
             this.getBannerList({page_size:10,current_page:val});
        }
    },
    filters:{
        bannerType(val){
            let banCfg=bannerTypeConfig;
            if(banCfg.length<1){
                return;
            }
            for(let i = 0;i<banCfg.length;i++){
                if(val == banCfg[i].id){
                    return banCfg[i].name
                }
            }
        }
    },
    created(){
        this.getBannerList({});
    }
}
</script>
<style lang='scss'>
    .banner-page-cont{
        // padding: 20px;
        // border-radius: 8px;
        // overflow: hidden;
        // background-color: #fff;
         @extend %extreme;
        .banner-table{
            @extend %tableborder;
            img{
                height: 80px;
                width: auto;
                max-width: 220px;            }
        }
    }
</style>


