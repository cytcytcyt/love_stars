<template>
  <div class="foot-main">
    <p>Written by cyt&amp;lxt</p>

    <p>沪ICP备XXXXXXXX号&nbsp;<a href="javascript:void(0);" @click="backToFirst()">回到主页</a></p>
  </div>
</template>
<script>
export default {
  name: "FootPage",
  data() {
    return {};
  },
  methods: {
    backToFirst() {
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scope>
.foot-main {
  background-color: beige;
  opacity: 0.5;
  margin-top: -15px;
  text-align: center;
  font-size: 12px;
}
</style>