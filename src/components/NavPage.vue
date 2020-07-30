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
                active-text-color="#00B2FF">
            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.path">
                <i :class="item.img"></i>{{ item.navItem }}
            </el-menu-item>
            <div style="float: right;display: inline-flex;">
                <div @click="changeBoy(1)"><el-avatar class="avatar" :src="zyltx"></el-avatar></div>
                <div @click="changeBoy(2)"><el-avatar class="avatar" :src="bytx"></el-avatar></div>
            </div>
        </el-menu>
        <el-row>
            <el-col :span='4'>
                <div class="left"></div>
            </el-col>
            <el-col :span='16'>
                <img class="first-in-img" v-show="firstIn" :src=" this.nameId==='1' ? zylbg : bybg">
                <router-view></router-view>
            </el-col>
            <el-col :span='4'>
                <div class="right"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import zylbg from '@/assets/zylbg.jpg'
    import bybg from '@/assets/bybg.jpg'
    import zyltx from '@/assets/zyltx.jpg'
    import bytx from '@/assets/bytx.jpg'
    export default {
        name: 'NavPage',
        data(){
            return{
                nameId:0,
                firstIn:true,
                navList:[
                    {path:'/starTelescope', img:'el-icon-view',navItem:'星星望远镜'},
                    {path:'/powerStation', img:'el-icon-edit',navItem:'爱心发电站'},
                    {path:'/productsMarket',img:'el-icon-shopping-bag-1',navItem:'周边贩售屋'},
                ],
                zylbg,
                bybg,
                zyltx,
                bytx
            }
        },
        components: {

        },
        mounted(){
            this.nameId=localStorage.getItem('nameId')
            console.log('router',this.$route.path)
            if(this.$route.path==='')
                this.firstIn=true
        },
        methods:{
            // 导航栏选择事件
            handleSelect(key, keyPath) {
                this.firstIn=false
                console.log('handleSelect-key:',key,'handleSelect-keyPath:', keyPath)
            },
            changeBoy(val){
                localStorage.setItem('nameId',val)
                console.log('changeboy',localStorage.getItem('nameId'))
            }
        }
    }
</script>

<style lang="css" scoped>

    .top-nav-bar{
        font-weight: bold;
        font-family: fantasy;
    }
    .left,.right {
        height: 1300px;
        background-color: beige;
        opacity: 0.5;
    }
    /deep/ .el-menu-item{
        font-size: 20px;
        padding-right: 40px;
        padding-left: 40px;
    }
    /deep/ .el-menu-item i{
        color: white;
        width: 50px;
        font-size: 30px;
    }
    .avatar{
        width: 50px;
        height: 50px;
        margin-right: 20px;
        margin-top: 5px;
        border: 3px solid;
    }
    .first-in-img{
        margin-top: 5%;
        width: 100%;
    }

</style>
