import axios from 'axios';
import logo from '@/assets/plq.png';

export default {
  name: 'CommentArea',
  data() {
    return {
      logo,
      comments: [],
      article: {
        id: 0,
        title: '',
        article: '',
        tags: [],
      },
      commentContent: '',
    };
  },
  mounted() {
    this.article.id = this.$route.query.articleId;
    axios
      .get('http://localhost:8088/api/selectArticleCommentsByArticleId', {
        params: { id: this.article.id },
      })
      .then((response) => {
        for (let i of response.data) {
          this.comments.push(i.comment);
          console.log('response', i);
        }
      })
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });
  },
  methods: {
    comment() {
      axios
        .post('http://localhost:8088/api/publishArticleComment', {
          articleId: this.article.id,
          comment: this.commentContent,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log('res', res);
            this.$message({
              showClose: true,
              message: '发表成功啦！',
              type: 'success',
            });
          }
        });
      location.reload();
    },
    cancel() {
      this.commentContent = '';
    },
  },
};
