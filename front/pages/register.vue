<template>
  <div class="login-container">
    <el-form class="login-form" label-width="100px" :model="form" :rules="rules" ref="registerForm">
      <div class="title-container">
        <!-- <img src="/4.jpg" alt />
        <img src="/3.jpg" alt /> -->
      </div>

      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>

      <el-form-item prop="captcha" label="验证码" class="captcha-container">
        <div class="captcha">
          <img :src="code.captcha" @click="refreshCaptcha" />
        </div>
        <el-input v-model="form.captcha" placeholder="请输入验证码"></el-input>
      </el-form-item>

      <el-form-item prop="nickname" label="昵称">
        <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>

      <el-form-item prop="passwd" label="密码">
        <el-input type="password" v-model="form.passwd" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item prop="repasswd" label="确认密码">
        <el-input type="password" v-model="form.repasswd" placeholder="请再次输入密码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.native.prevent="handleRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from "md5";
export default {
  layout: "login",
  data() {
    return {
      form: {
        email: "415749462@qq.com",
        captcha: "",
        nickname: "Horace",
        passwd: "12345678",
        repasswd: "12345678"
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "请输入正确的邮箱格式" }
        ],
        captcha: [{ required: true, message: "请输入验证码" }],
        nickname: [{ required: true, message: "请输入昵称" }],
        passwd: [
          {
            required: true,
            pattern: /^[\w_-]{6,12}$/g,
            message: "请输入6~12位密码"
          }
        ],
        repasswd: [
          { required: true, message: "请再次输入密码" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.passwd) {
                callback(new Error("两次密码不一致"))
              }
              callback()
            }
          }
        ]
      },
      code: {
        captcha: "/api/captcha?_t=" + new Date().getTime()
      }
    };
  },
  methods: {
    refreshCaptcha() {
      this.code.captcha = "/api/captcha?_t=" + new Date().getTime();
    },
    handleRegister() {
      this.$refs.registerForm.validate(async valid=>{
        // console.log(this.$refs.registerForm)
        if (valid) {
          console.log("校验成功")
          let obj = {
            email: this.form.email,
            nickname: this.form.nickname,
            captcha: this.form.captcha,
            passwd: md5(this.form.passwd)
          };

          let result = await this.$http.post("/user/register", obj)
          console.log(result)
          if (result.code == 0) {
            this.$alert("注册成功", "成功", {
              confirmButtonText: "去登录",
              callback: () => {
                this.$router.push("/login")
              }
            });
          } else {
            this.$message.error(result.message)
          }
        } else {
          console.log("校验失败")
        }
      });
    }
  }
};
</script>

<style lang="stylus">
.title-container
  img
    width 100%
</style>