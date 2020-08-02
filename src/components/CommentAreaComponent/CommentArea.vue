<template>
  <div class="comment-area-container">
    <el-image :src="logo"></el-image>
    <div v-for="comment in comments" :key="comment">
      {{comment}}
      <el-divider></el-divider>
    </div>

    <div class="publish-area">
      <el-input type="textarea" :rows="10" maxlength="200" show-word-limit v-model="commentContent"></el-input>
      <el-row class="dia-buttons">
        <el-button @click="comment">评论</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import commentArea from "./CommentArea.js";
export default commentArea;
</script>

<style scoped>
@import "./CommentArea.css";
</style>
