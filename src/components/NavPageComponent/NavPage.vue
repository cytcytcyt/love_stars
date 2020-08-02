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
      <div style="float: right;display: inline-flex;">
        <div @click="changeBoy(1)">
          <el-avatar class="avatar" :src="zyltx"></el-avatar>
        </div>
        <div @click="changeBoy(2)">
          <el-avatar class="avatar" :src="bytx"></el-avatar>
        </div>
      </div>
      <div style="float: right;display: inline-flex;">
        <div>
          <el-menu-item :index="loginPage">点击登录</el-menu-item>
        </div>
      </div>
    </el-menu>
    <el-row>
      <el-col :span="4">
        <div class="left"></div>
      </el-col>
      <el-col :span="16">
        <img class="first-in-img" v-show="firstIn" :src=" this.nameId==='1' ? zylbg : bybg" />
        <router-view></router-view>
      </el-col>
      <el-col :span="4">
        <div class="right"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import navPage from "./NavPage";
  export default navPage;
</script>

<style lang="css" scoped>
  @import './NavPage.css';
</style>