<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
    name: 'App'
}
</script>

<style lang="css" scoped>
#selectWho{
  background-color: beige;
  width: 100%;
  height: 1300px;
  position: absolute;
  top:0;
}
.tip{
  text-align: center;
  font-size: 5em;
  margin-bottom: 7%;
  font-family: fantasy;
  color: #0e8893;
}
.avatar-containner{
  width: 800px;
  height: 500px;
  margin-left: 32%;
  display: inline-flex;
}
.avatar{
  width: 200px;
  height: 200px;
  margin-right: 60px;
  margin-top: 5px;
  border: 6px solid;
}
</style>
