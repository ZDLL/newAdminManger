<!-- <h2>评分页面</h2> -->
<template>
    <div class="goScore-page">
        <myBrea :my-nav='brea'></myBrea>
        <div class="goScore-cont">
            <div class="score-top">
                <span class='group-img'>
                    <img :src="groupUrl" alt="商品组图片">
                </span>
                <h3>{{groupName}}</h3>
                <div class='allScore'>
                    <span>综合评分</span>
                    <h4>{{allScore}}</h4>
                </div>
            </div>
            <div class="score-mid">
                <h3>评分</h3>
                <p class='mid-notic'>每一项评分为10分制度，评分完成后系统会根据权重自动计算综合评分</p>
                <ul class="score-ul" v-if='typeList.length>0'>
                    <li class='score-li' v-for='(itm,inx) in typeList' :key='inx'>
                        <div class="mid-score-top">
                          <span class='title'>{{itm.index_name}}  <span class='weight'>( {{itm.index_weight || 0}}% 权重 )</span></span>
                         
                          <span class='score'>{{itm.index_score || 0}}分</span>
                        </div>
                        <div class="mid">{{itm.describe}}</div>
                        <div class="inp">
                            <el-input v-model="itm.index_score" placeholder="请输入分值" clearable type="number"></el-input>
                        </div>
                    </li>
                </ul>
                <el-button type="primary" style="margin-top:30px" @click="saveSetScore">保存评分</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { myConfirm,getStore } from "../../../comm/until";
import myBrea from "../../../components/breadcrumb.vue"
export default {
    name:"goscore",
    data(){
        return{
            brea:[{"txt":"商品中心","url":"/goods"},{"txt":"评分","url":"/"}],
            input:"",
            groupName:"",
            groupUrl:"",
            allScore:"",
            groupNo:"",
            typeList:[]
        }
    },
    components:{
        myBrea
    },
    
    methods:{
         async getScoreList(postData){
            await this.$store.dispatch('ScoreModule/POST_SCORE_LIST',postData);
            let data = this.$store.state.ScoreModule.POST_SCORE_LIST;
            this.typeList = [];
            data.out.result.map((itm)=>{
                if(itm.status== '00001001'){
                    itm.index_score = itm.index_score?itm.index_score:0;
                    this.typeList.push(itm)
                }
            })
        },
        async saveScore(postData){
            await this.$store.dispatch('ScoreModule/POST_ADD_SCORE',postData);
            let data = this.$store.state.ScoreModule.POST_ADD_SCORE;
            this.$message.success(data.message)
            let _this = this;
            this.$router.push({
                path:"/gdsGruopDetail",
                query:{
                    groupNo:_this.groupNo,
                    com:"gdsGruopDetail"
                }
            })
        },
        saveSetScore(){
            let posData={
                goods_group_no:this.groupNo,
                config:JSON.stringify(this.typeList)
            };
            this.saveScore(posData)
        }
    },
    created(){
        this.groupName = JSON.parse(getStore("groupData")).name
        this.groupUrl = JSON.parse(getStore("groupData")).url
        this.allScore = JSON.parse(getStore("groupData")).score;
        this.groupNo = JSON.parse(getStore("groupData")).groupNo;
        this.getScoreList({goods_group_no:this.groupNo})
    }

}
</script>
<style lang="scss">
.goScore-page{
    .goScore-cont{
         @extend %pagecont;
        .score-top{
            overflow: hidden;
            font-size: 14px; 
            border-bottom: 1px #e2e2e2 solid;
            .group-img{
                width: 80px;
                height: 80px;
                display: inline-block;
                float: left;
                margin-right: 20px;
                border: 1px #dcdcdc solid;
                border-radius: 4px;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            h3{
                width: 335px;
                display: inline-block;
                color: #403f4c;
                line-height: 1.5;
                letter-spacing: .5px;
            }
            .allScore{
                float: right;
                width: 200px;
                text-align: center;
                h4{
                    font-size: 60px;
                }
            }
        }
        
         
    }
    .score-mid{
        h3{
            font-size: 20px;
            margin-bottom: 20px;
            margin-top: 30px;
        }
        .mid-notic{
            font-size: 14px;
            color: #999;
            margin-bottom: 70px;
        }
        .score-ul{
            padding: 0px;
            margin: 0px;
            max-width: 80%;
            overflow: hidden;
            color: #403f4c;
            .score-li{
                position: relative;
                overflow: hidden;
                margin-top: 30px;
                span{
                    display: inline-block;
                    vertical-align: top;
                }
                .title{
                    font-size: 16px;
                    margin-bottom: 5px;
                }
                .weight{
                    color: #69707f;
                    font-size: 12px;
                    vertical-align: bottom;
                }
                .score{
                    position: absolute;
                    right: 0px;
                    top:14%;
                    font-size: 16px;
                }
                .mid{
                    font-size: 12px;
                    color: #999;
                    margin-bottom: 20px;
                }
                .inp{
                    font-size: 16px;
                }
            }
        }
    }
}
</style>