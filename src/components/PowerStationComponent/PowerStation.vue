<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-menu
          default-active="the.$route.path"
          router
          class="left-nav-bar"
          @select="handleSelect"
          @open="handleOpen"
          @close="handleClose"
          background-color="#EEDC82"
          text-color="#fff"
          active-text-color="#5CACEE"
        >
          <el-submenu index="/PowerStation">
            <template slot="title">
              <span class="left-nav-bar-title">储电馆</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/EssayStorage">文创站</el-menu-item>
              <el-menu-item index="/PaintingStorage">手绘站</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/ElecForLove">
            <span slot="title" class="left-nav-bar-title">爱发电</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="19">
        <img class="first-in-img" v-show="firstIn" :src="efl" />
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import efl from "@/assets/efl.jpg";

export default {
  name: "PowerStation",
  data() {
    return {
      firstIn: true,
      efl,
    };
  },
  methods: {
    handleSelect() {
      this.firstIn = false;
    },
    handleOpen(key, keyPath) {
      console.log("handleOpen", key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log("handleClose", key, keyPath);
    },
  },
};
</script>

<style lang="css" scoped>
/deep/ .el-col-20 {
  height: 980px;
}
.left-nav-bar {
  height: 1300px;
}
.left-nav-bar-title {
  font-size: 30px;
  font-weight: bolder;
}
/deep/ .el-menu-item {
  font-weight: bold;
}
.first-in-img {
  margin-top: 5%;
  width: 100%;
}
</style>
