<template>
    <div class="comment-area-container">
        <el-image :src="logo"></el-image>
        <div v-for="comment in comments" :key="comment">
            {{comment}}
            <el-divider></el-divider>
        </div>

        <div class="publish-area">
            <el-input type="textarea"
                      :rows="10"
                      maxlength="200"
                      show-word-limit
                      v-model="commentContent">
            </el-input>
        <el-row class="dia-buttons">
            <el-button @click="comment">评论</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-row>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import logo from '@/assets/plq.png'

    export default {
        name: "CommentArea",
        data(){
            return{
                logo,
                comments:[],
                article:{
                    id:0,
                    title:'',
                    article:'',
                    tags:[]
                },
                commentContent:''
            }
        },
        mounted(){
            this.article.id=this.$route.query.articleId
            axios.get('http://localhost:8088/api/selectArticleCommentsByArticleId',{params:{id:this.article.id}})
                .then(response => {
                    for (let i of response.data){
                        this.comments.push(i.comment)
                        console.log('response',i)
                    }
                }).catch(function (error) { // 请求失败处理
                console.log(error);
            })
        },
        methods:{
            comment(){
                axios.post('http://localhost:8088/api/publishArticleComment',{
                    articleId:this.article.id,
                    comment:this.commentContent,
                }).then(res => {
                    if(res.status === 200){
                        console.log('res',res)
                        this.$message({
                            showClose: true,
                            message:"发表成功啦！",
                            type:"success"
                        })
                    }
                });
                location.reload()
            },
            cancel(){
                this.commentContent=''
            }
        }
    }
</script>

<style scoped>
    .comment-area-container{
        padding: 2% 7%;
    }
.el-image{
    margin-left: 30%;
    width: 50%;
    opacity: 0.8;
}
/deep/.el-divider--horizontal{
        background: 0 0;
        border-top: 1.5px dotted #e8eaec;
    }
.dia-buttons{
        margin: auto;
        width: fit-content;
    }
    .el-button {
        margin: 20px 50px 10px;
    }
.publish-area{
    position: absolute;
    width: 55%;
    bottom: 5%;
    left: 22%;
}

</style>
