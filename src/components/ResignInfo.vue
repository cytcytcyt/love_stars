<template>
    <div>
        {{$store.state.userInfo.userId}}
        姐妹欢迎你
        <el-steps :active="activeStep" simple>
            <el-step title="给自己取个特别的昵称" icon="el-icon-edit"></el-step>
            <el-step title="pick你想关注的明星" icon="el-icon-thumb"></el-step>
        </el-steps>
<div>
    <span>昵称：</span>
    <el-input v-model="$store.state.userInfo.nickname" placeholder="请输入昵称"></el-input>
    <el-button>就叫这个</el-button>
</div>
        <div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "ResignInfo",
        data(){
            return{
                activeStep:1
            }
        }
    }
</script>

<style scoped>

</style>
