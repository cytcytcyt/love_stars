<template>
    <div>
    <h1 class="article-title">{{article.title}}</h1>
    <el-tag
            v-for="tag in article.tags"
            :key="tag"
            type="success" >
        {{tag}}
    </el-tag>
    <div class="goToComment" @click="goToComment">
        <i class="el-icon-chat-dot-round" ></i>
        <span>评论区</span>
        <i class="el-icon-arrow-right" />
    </div>
    <div class="article-article" v-html="article.article"></div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "EssayInfo",
        data(){
            return{
                article:{
                    id:0,
                    title:'',
                    article:'',
                    tags:[]
                }
            }
        },
        mounted() {
            this.article.id=this.$route.query.articleId
            axios.get('http://localhost:8088/api/selectArticles',{params:{id:this.article.id}})
                .then(response => {
                    this.article.title=response.data[0].title
                    this.article.article=response.data[0].article.replace(/\n|\r\n/g,"<br/>")
                }).catch(function (error) { // 请求失败处理
                console.log(error);
            })
            axios.get('http://localhost:8088/api/selectArticleTagsByArticleId',{params:{id:this.article.id}})
                .then(response => {
                    for (let i of response.data){
                        this.article.tags.push(i.tag)
                        console.log('response',i.tag)
                    }
                }).catch(function (error) { // 请求失败处理
                console.log(error);
            })
        },
        methods:{
            goToComment(){
                this.$router.push({
                    path:'/CommentArea',
                    query:{
                        articleId:this.article.id
                    }
                })
            }
        }
    }
</script>

<style lang="css" scoped>
.article-title{
    margin: auto;
    width: auto;
    padding: 5% 5% 0 5%;
}
.article-article{
    padding: 3% 5%;
}
.goToComment{
    float: right;
    font-size: 25px;
    font-weight: 400;
    color: #0e8893;
    position: absolute;
    right:18%;
    top:3%;
}
.el-icon-chat-dot-round{
    font-size: 45px;
}
.el-tag{
    padding-right: 20px;
    padding-left: 20px;
    margin-left: 5%;
    margin-top: 1%;
}
</style>
