<template>
    <div id="selectWho" v-if="isShow">
        <h1 class="tip">请选择进入的广场：</h1>
        <div class="avatar-containner">
            <div @click="selectBoy(1)"><el-avatar class="avatar" :src="zyltx" ></el-avatar></div>
            <div @click="selectBoy(2)"><el-avatar class="avatar" :src="bytx" ></el-avatar></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChooseIdolPage"
    }
</script>

<style scoped>

</style>
