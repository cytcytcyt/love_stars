<template>
  <div>
    <NavPage></NavPage>
    <el-row type="flex">
      <el-col :span="4" class="left">
      </el-col>
      <el-col :span="16">
        <router-view></router-view>
      </el-col>
      <el-col :span="4" class="right">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import zyltx from "@/assets/zyltx.jpg";
import bytx from "@/assets/bytx.jpg";
import NavPage from "@/components/NavPageComponent/NavPage.vue";
export default {
  name: "App",
  components: {
    NavPage
  },
  data() {
    return {
      zyltx,
      bytx,
      isShow: true,
    };
  },
  methods: {
    selectBoy(val) {
      localStorage.setItem("nameId", val);
      console.log("choose");
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.left,
.right {
  min-height: calc(100vh - 61px);
  background-color: beige;
  opacity: 0.5;
}

.first-in-img {
  margin-top: 5%;
  width: 100%;
}

#selectWho {
  background-color: beige;
  width: 100%;
  height: 1300px;
  position: absolute;
  top: 0;
}
.tip {
  text-align: center;
  font-size: 5em;
  margin-bottom: 7%;
  font-family: fantasy;
  color: #0e8893;
}
.avatar-containner {
  width: 800px;
  height: 500px;
  margin-left: 32%;
  display: inline-flex;
}
.avatar {
  width: 200px;
  height: 200px;
  margin-right: 60px;
  margin-top: 5px;
  border: 6px solid;
}
</style>
