import axios from "axios";
import swal from "sweetalert2";

export default {
  name: "LoginPage",
  data() {
    var validator = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认密码"));
      } else if (value !== this.resignForm.password) {
        console.log("value", value);
        console.log("this.resignForm.password", this.resignForm.password);
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      showForm: "Login",
      loginForm: {
        username: "",
        password: "",
      },
      resignForm: {
        emailAddress: "",
        password: "",
        checkPass: "",
      },
      rulesForLogin: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      rulesForResign: {
        emailAddress: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ validator, trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      const that = this;
      axios
        .post("http://localhost:8088/api/login", {
          username: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then((response) => {
          if (response.data.msg === "NO USERNAME") swal("用户名不存在","","warning");
          else if (response.data.msg === "PASSWORD ERR") swal("密码错误","","warning");
          else {
              swal("欢迎");
              console.log(response);
            //意义不明 其实存localStorage会更合适？ -lxt留
            that.$store.commit("setUserInfo", response.data);
            //我用了自己的存localStorage方法，方便监听
            console.log(response.data.nickname);
            this.resetSetItem('nickName', response.data.nickname);
            that.$router.push("/");
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    resign(form) {
      const that = this;
      this.$refs[form].validate((valid) => {
        if (valid) {
          axios
            .post("http://localhost:8088/api/resignNewUser", {
              username: this.resignForm.emailAddress,
              password: this.resignForm.password,
            })
            .then((response) => {
              console.log("resign:", response);
              if (response.status === 200) {
                if (response.data.msg === "USERNAME EXIST") {
                  swal("用户名已存在","","warning");
                  return false;
                } else {
                  // 调用mutations中的setUserInfo方法
                  that.$store.commit("setUserInfo", response.data);
                  this.resetSetItem('nickName', response.data);
                  that.$router.push("/");
                  swal("注册成功");
                  this.$router.push("/ResignInfo");
                }
              } else swal("网络错误，请稍后重试。","","warning");
              return false;
            })
            .catch(function (error) {
              // 请求失败处理
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetLogin() {
      this.loginForm = {
        username: "",
        password: "",
      };
    },
    resetResign(form) {
      this.$refs[form].resetFields();
    },
  },
};