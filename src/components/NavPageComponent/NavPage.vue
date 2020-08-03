<template>
  <div id="NavPage">
    <el-menu
      :default-active="this.$route.path"
      router
      class="top-nav-bar"
      mode="horizontal"
      @select="handleSelect"
      background-color="#ffc125"
      text-color="#fff"
      active-text-color="#00B2FF"
    >
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.path">
        <i :class="item.img"></i>
        {{ item.navItem }}
      </el-menu-item>
      <div class="right-corner">
        <div @click="changeBoy(1)">
          <el-avatar class="avatar" :src="zyltx"></el-avatar>
        </div>
        <div @click="changeBoy(2)">
          <el-avatar class="avatar" :src="bytx"></el-avatar>
        </div>
      </div>
      <div class="right-corner">
          <el-menu-item :index="loginPage" v-show="!isLogin">登录</el-menu-item>
      </div>
      <div class="right-corner">
          <el-menu-item @click="logout()" v-show="isLogin">登出</el-menu-item>
      </div>      
      <div class="right-corner" v-show="isLogin">
          <el-menu-item>{{userName}}</el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import navPage from "./NavPage";
export default navPage;
</script>

<style scoped>
@import "./NavPage.scss";
</style>