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
          v-for="(i,index) in paintingsList1.slice((curPage-1)*(pageSize/2),curPage*(pageSize/2))"
          :key="index"
        >
          <el-avatar
            class="left-avatar"
            size="large"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
          <div class="left-bubble">
            <div class="picture-container" @click="handleTextInfo">
              <!--                            <span class="article-title">手绘</span><br>-->
              <img class="painting" :src="i.uuId" alt />
            </div>
            <el-divider></el-divider>
            <el-row class="icon-buttons">
              <i :class="onOrOff ? 'el-icon-star-on' : 'el-icon-star-off'" @click="handleClickStar"></i>&nbsp;&nbsp;&nbsp;
              <i class="el-icon-chat-dot-round" @click="handleComment"></i>
            </el-row>
          </div>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row
          v-for="(i,index) in paintingsList2.slice((curPage-1)*(pageSize/2),curPage*(pageSize/2))"
          :key="index"
        >
          <div class="right-bubble">
            <div class="picture-container" @click="handleTextInfo">
              <!--                            <span class="article-title">手绘</span><br>-->
              <img class="painting" :src="i.uuId" alt />
            </div>
            <el-divider></el-divider>
            <el-row class="icon-buttons">
              <i :class="onOrOff ? 'el-icon-star-on' : 'el-icon-star-off'" @click="handleClickStar"></i>&nbsp;&nbsp;&nbsp;
              <i class="el-icon-chat-dot-round" @click="handleComment"></i>
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
          :total="paintingsList1.length+paintingsList2.length"
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
  name: "PaintingStorage",
  data() {
    return {
      tags: [
        { name: "Q版", type: "info", id: 1 },
        { name: "沈巍", type: "info", id: 2 },
        { name: "罗浮生", type: "info", id: 3 },
        { name: "镇魂", type: "info", id: 4 },
        { name: "重启", type: "info", id: 5 },
        { name: "舞台", type: "info", id: 6 },
        { name: "白宇", type: "info", id: 7 },
      ],
      selectedTags: [],
      paintingsList1: [],
      paintingsList2: [],
      showCommentDia: false,
      commentContent: "",
      onOrOff: false,
      curPage: 1,
      pageSize: 4,
    };
  },
  mounted() {
    axios
      .get("http://localhost:8088/api/selectPictures")
      .then((response) => {
        console.log("response", response);
        let index = 0;
        const str = "http://localhost:8088/api/getPicture?uuid=";
        for (let i of response.data) {
          index++;
          if (index % 2 === 1) {
            if (i.uuId !== null) i.uuId = str + i.uuId;
            else i.uuId = i.filePath;
            this.paintingsList1.push({ ...i });
            console.log("this.paintingsList1", i);
          }
          if (index % 2 === 0) {
            if (i.uuId !== null) i.uuId = str + i.uuId;
            else i.uuId = i.filePath;
            this.paintingsList2.push({ ...i });
            console.log("this.paintingsList2", i);
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
    handleTextInfo() {
      console.log("点击");
    },
    handleClickStar() {
      this.onOrOff = !this.onOrOff;
      console.log("this.", this.onOrOff);
      console.log("星星");
    },
    handleComment() {
      console.log("回复");
      this.showCommentDia = true;
    },
    comment() {
      if (this.commentContent === "") {
        this.$message({
          message: "评论内容不能空白哦！",
          type: "warning",
        });
      } else {
        this.showCommentDia = false;
        this.$message({
          message: "评论成功！",
          type: "success",
        });
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
  position: relative;
  left: 60px;
  margin: 30px;
}
.right-bubble {
  width: 250px;
  height: 450px;
  border: 2px solid #0e8893;
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
.picture-container {
  height: 90%;
  display: flex;
  align-items: center;
}
.painting {
  width: 100%;
  align-items: center;
}
.icon-buttons {
  font-size: 45px;
  font-weight: 400;
  text-align: right;
  position: absolute;
  bottom: 0px;
  right: 7%;
  color: #3e6c3e;
}
.pagination-container {
  width: 60%;
  position: absolute;
  bottom: -5%;
  left: 18%;
  text-align: center;
}
</style>
