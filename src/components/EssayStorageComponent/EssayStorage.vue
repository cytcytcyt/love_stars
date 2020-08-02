<template>
  <div class="EScontainer">
    <div class="selected-type-container">
      <el-tag
        v-for="tag in selectedTags"
        :key="tag.name"
        closable
        :type="tag.type"
        @close="handleClose(tag)"
      >{{tag.name}}</el-tag>
    </div>
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      :type="tag.type"
      @click="handleChoose(tag)"
    >{{tag.name}}</el-tag>
    <el-row>
      <el-col :span="12">
        <el-row
          v-for="(i,index) in articlesList1.slice((curPage-1)*(pageSize/2),curPage*(pageSize/2))"
          :key="index"
        >
          <el-avatar
            class="left-avatar"
            size="large"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
          <div class="left-bubble">
            <div @click="handleTextInfo(i)">
              <span class="article-title">{{i.title}}</span>
              <br />
              <span class="article-content">{{i.article}}</span>
            </div>
            <el-divider></el-divider>
            <el-row class="icon-buttons">
              <i
                :class="i.onOrOff ? 'el-icon-star-on' : 'el-icon-star-off'"
                @click="handleClickStar(i)"
              ></i>&nbsp;&nbsp;&nbsp;
              <i class="el-icon-chat-dot-round" @click="handleComment(i.id)"></i>
            </el-row>
          </div>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row
          v-for="(i,index) in articlesList2.slice((curPage-1)*(pageSize/2),curPage*(pageSize/2))"
          :key="index"
        >
          <div class="right-bubble">
            <div @click="handleTextInfo(i)">
              <span class="article-title">{{i.title}}</span>
              <br />
              <span class="article-content">{{i.article}}</span>
            </div>
            <el-divider></el-divider>
            <el-row class="icon-buttons">
              <i
                :class="i.onOrOff ? 'el-icon-star-on' : 'el-icon-star-off'"
                @click="handleClickStar(i)"
              ></i>&nbsp;&nbsp;&nbsp;
              <i class="el-icon-chat-dot-round" @click="handleComment(i.id)"></i>
            </el-row>
          </div>
          <el-avatar
            class="right-avatar"
            size="large"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
        </el-row>
      </el-col>
      <div class="pagination-container">
        <el-pagination
          background
          :hide-on-single-page="true"
          :current-page="curPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="articlesList1.length+articlesList2.length"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-row>

    <el-dialog :before-close="handleCloseDia" :visible.sync="showCommentDia" title="评论">
      <el-input
        type="textarea"
        placeholder="请输入评论内容"
        v-model="commentContent"
        maxlength="200"
        show-word-limit
      />
      <el-row class="dia-buttons">
        <el-button @click="comment">评论</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EssayStorage",
  data() {
    return {
      tags: [
        { name: "小甜文", type: "info", id: 1 },
        { name: "校园文", type: "info", id: 2 },
        { name: "穿越文", type: "info", id: 3 },
        { name: "师生文", type: "info", id: 4 },
        { name: "年下", type: "info", id: 5 },
        { name: "年上", type: "info", id: 6 },
        { name: "白宇", type: "info", id: 7 },
      ],
      selectedTags: [],
      articlesList1: [],
      articlesList2: [],
      showCommentDia: false,
      commentId: 0,
      commentContent: "",
      curPage: 1,
      pageSize: 4,
    };
  },
  watch: {
    selectedTags(val) {
      this.curPage = 1;
      var tags = new URLSearchParams();
      for (let i of val) {
        tags.append("tags", i.name);
      }
      axios
        .get("http://localhost:8088/api/selectArticles" + "?" + tags.toString())
        .then((response) => {
          console.log("response", response);
          let index = 0;
          let resp = response;
          this.articlesList1 = [];
          this.articlesList2 = [];
          for (let i of resp.data) {
            index++;
            if (index % 2 === 1) {
              i.article = i.article.slice(0, 200);
              this.articlesList1.push({ ...i });
            }
            if (index % 2 === 0) {
              i.article = i.article.slice(0, 200);
              this.articlesList2.push({ ...i });
            }
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
  },
  mounted() {
    axios
      .get("http://localhost:8088/api/selectArticles")
      .then((response) => {
        console.log("response", response);
        let index = 0;
        let resp = response;
        for (let i of resp.data) {
          index++;
          if (index % 2 === 1) {
            i.onOrOff = false;
            i.article = i.article.slice(0, 200);
            this.articlesList1.push({ ...i });
          }
          if (index % 2 === 0) {
            i.onOrOff = false;
            i.article = i.article.slice(0, 200);
            this.articlesList2.push({ ...i });
          }
        }
      })
      .catch(function (error) {
        // 请求失败处理
        console.log(error);
      });
  },
  methods: {
    handleClose(tag) {
      this.tags.forEach((item) => {
        if (item.id === tag.id) item.type = "info";
      });
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    },
    handleChoose(tag) {
      if (tag.type === "info") {
        tag.type = "warning";
        this.selectedTags.push({ ...tag });
      }
    },
    handleTextInfo(val) {
      console.log("点击", val);
      this.$router.push({
        path: "/EssayInfo",
        query: {
          articleId: val.id,
        },
      });
    },
    handleClickStar(val) {
      val.onOrOff = !val.onOrOff;
      console.log("this.", val);
      console.log("星星");
    },
    handleComment(val) {
      console.log("回复", val);
      this.commentId = val;
      this.showCommentDia = true;
    },
    comment() {
      if (this.commentContent === "") {
        this.$message({
          message: "评论内容不能空白哦！",
          type: "warning",
        });
      } else {
        axios
          .post("http://localhost:8088/api/publishArticleComment", {
            articleId: this.commentId,
            comment: this.commentContent,
          })
          .then((res) => {
            if (res.status === 200) {
              console.log("res", res);
              this.$message({
                showClose: true,
                message: "发表成功啦！",
                type: "success",
              });
            }
          });
        this.showCommentDia = false;
        this.commentContent = "";
      }
      console.log("comment");
    },
    cancle() {
      this.showCommentDia = false;
      this.commentContent = "";
    },
    handleCloseDia(done) {
      this.$confirm("确认放弃所有编辑？")
        .then(() => {
          done();
          this.commentContent = "";
          console.log("放弃编辑");
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      this.curPage = val;
    },
  },
};
</script>

<style lang="css" scoped>
.EScontainer {
  padding-left: 15px;
  padding-right: 15px;
}
.selected-type-container {
  margin-top: 20px;
  margin-bottom: 10px;
  /*margin-right: 10px;*/
  height: 80px;
  border-radius: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-tag {
  padding-right: 20px;
  padding-left: 20px;
  margin: 15px;
}
.left-avatar {
  width: 50px;
  height: 50px;
  float: left;
  position: absolute;
  top: 14%;
}
.right-avatar {
  width: 50px;
  height: 50px;
  float: right;
  position: absolute;
  bottom: 15%;
  right: 0%;
}
.left-bubble {
  width: 250px;
  height: 450px;
  border: 2px solid #0e8893;
  opacity: 0.5;
  position: relative;
  left: 60px;
  margin: 30px;
}
.right-bubble {
  width: 250px;
  height: 450px;
  border: 2px solid #0e8893;
  opacity: 0.5;
  position: relative;
  margin: 50px 30px 10px 30px;
}
.left-bubble::before {
  content: "";
  width: 0;
  height: 0;
  border: 40px solid;
  position: absolute;
  bottom: 77%;
  left: -32%;
  border-color: transparent #0e8893 transparent transparent;
}
.right-bubble::before {
  content: "";
  width: 0;
  height: 0;
  border: 40px solid;
  position: absolute;
  bottom: 10%;
  left: 100%;
  border-color: transparent transparent transparent #0e8893;
}
.el-icon-star-on {
  color: coral;
}
.dia-buttons {
  margin: auto;
  width: fit-content;
}
.el-button {
  margin: 20px 50px 10px;
}
.el-divider--horizontal {
  margin: 20px 0;
  position: absolute;
  bottom: 37px;
}
.article-title {
  font-size: 2.5rem;
  padding: 3%;
}
.article-content {
  position: absolute;
  top: 60px;
  padding: 5px 10px;
}
.icon-buttons {
  font-size: 45px;
  font-weight: 400;
  text-align: right;
  position: absolute;
  bottom: 0px;
  right: 7%;
  color: #293229;
}
.pagination-container {
  width: 60%;
  position: absolute;
  bottom: -5%;
  left: 18%;
  text-align: center;
}
</style>
