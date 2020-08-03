<template>
  <div>
    <el-container>
      <el-container>
        <el-main>姐妹快来就差你了</el-main>
        <el-aside width="500px">
          <el-button-group>
            <el-button icon="el-icon-s-custom" @click="showForm='Login'">登录</el-button>
            <el-button @click="showForm='Resign'">
              注册
              <i class="el-icon-edit"></i>
            </el-button>
          </el-button-group>
          <el-form
            :model="loginForm"
            label-position="left"
            :rules="rulesForLogin"
            v-show="showForm === 'Login'"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-button @click="login">登录</el-button>
            <el-button @click="resetLogin">重置</el-button>
          </el-form>
          <el-form
            :model="resignForm"
            :rules="rulesForResign"
            ref="resignForm"
            v-show="showForm === 'Resign'"
          >
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
import loginPage from "./LoginPage.js";
export default loginPage;
</script>

<style lang="scss" scoped>
@import "./LoginPage.scss"
</style>
