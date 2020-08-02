<template>
    <div>
        <el-container>
            <el-container>
                <el-main>姐妹快来就差你了</el-main>
                <el-aside width="500px">
                    <el-button-group>
                        <el-button icon="el-icon-s-custom" @click="showForm='Login'">登录</el-button>
                        <el-button @click="showForm='Resign'">注册<i class="el-icon-edit"></i></el-button>
                    </el-button-group>
                    <el-form :model="loginForm" label-position="left" :rules="rulesForLogin" v-show="showForm === 'Login'">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-button @click="login">登录</el-button>
                        <el-button @click="resetLogin">重置</el-button>
                    </el-form>
                    <el-form :model="resignForm" :rules="rulesForResign" ref="resignForm" v-show="showForm === 'Resign'">
                        <el-form-item label="用户名" prop="emailAddress">
                            <el-input v-model="resignForm.emailAddress" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="resignForm.password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input v-model="resignForm.checkPass" placeholder="请确认密码"></el-input>
                        </el-form-item>
                        <el-button @click="resign('resignForm')">注册</el-button>
                        <el-button @click="resetResign('resignForm')">重置</el-button>
                    </el-form>
                </el-aside>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "LoginPage",
        data(){
            var validator = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请确认密码'));
                }else if (value !== this.resignForm.password) {
                    console.log('value',value)
                    console.log('this.resignForm.password',this.resignForm.password)
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                showForm:'Login',
                loginForm:{
                    username:'',
                    password:''
                },
                resignForm:{
                    emailAddress:'' ,
                    password:'',
                    checkPass:''
                },
                rulesForLogin:{
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                },
                rulesForResign:{
                    emailAddress: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            login(){
                const that=this
                axios.post('http://localhost:8088/api/login',{
                    username:this.loginForm.username,
                    password:this.loginForm.password
                })
                    .then(response => {
                        if(response.data==='NO USERNAME')
                            alert('用户名不存在')
                        else if(response.data==='PASSWORD ERR')
                            alert('密码错误')
                        else{
                            alert('欢迎')
                            that.$store.commit('setUserInfo',response.data)
                            that.$router.push('/')
                        }
                    }).catch(function (error) { // 请求失败处理
                    console.log(error);
                })
            },
            resign(form) {
                const that=this
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost:8088/api/resignNewUser',{
                        username:this.resignForm.emailAddress,
                        password:this.resignForm.password
                    })
                        .then(response => {
                            console.log('resign:',response)
                            if(response.status===200){
                                if(response.data.msg === 'USERNAME EXIST'){
                                    alert('用户名已存在')
                                    return false;
                                }
                                else{
                                    // 调用mutations中的setUserInfo方法
                                    that.$store.commit('setUserInfo',response.data)
                                    alert('注册成功')
                                }
                            }else
                                alert('网络错误，请稍后重试。')
                                return false;
                        }).catch(function (error) { // 请求失败处理
                            console.log(error);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.$router.push('/ResignInfo')
            },
            resetLogin(){
                this.loginForm={
                    username:'',
                    password:''
                }
            },
            resetResign(form){
                this.$refs[form].resetFields();
            }
        }
    }
</script>

<style lang="css" scoped>
    .el-header, .el-footer {
        background-color: rgba(255, 225, 134, 0.51);
        color: #333;
        text-align: center;
        line-height: 60px;
        height: 100px;
    }

    .el-aside {
        color: #333;
        text-align: center;
        line-height: 200px;
    }
</style>
