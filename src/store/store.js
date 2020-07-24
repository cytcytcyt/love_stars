import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "@/store/mutations"
import getters from "@/store/getters"
//引入Vuex
Vue.use(Vuex)
//vuex状态管理处
export default new Vuex.Store({
    state:{
        userInfo:{
            userId:'',
            username:'',
            nickname:''
        }
    },
    getters,
    // mutations相当于methods，但不能使用异步发方法（axios）
    mutations,
    actions:{

    }
})
