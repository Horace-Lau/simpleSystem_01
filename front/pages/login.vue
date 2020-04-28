<template>
  <div class="login-container">
    <el-form class="login-form" label-width="100px" :model="form" :rules="rules" ref="loginForm">
      <div class="title-container">
        <!-- <img src="/4.jpg" alt />
        <img src="/3.jpg" alt />-->
      </div>

      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>

      <el-form-item prop="captcha" label="验证码" class="captcha-container">
        <div class="captcha">
          <img :src="captchaUrl" @click="refreshCaptcha" />
        </div>
        <el-input v-model="form.captcha" placeholder="请输入验证码"></el-input>
      </el-form-item>

      <el-form-item prop="mailCode" label="邮箱验证码" class="captcha-container">
        <el-input class="input_mailCode" v-model="form.mailCode" placeholder="请输入邮箱验证码"></el-input>
        <el-button
          class="btn_sendMail"
          type="primary"
          :disabled="sendCode.sendTimer>0"
          @click="sendMail"
        >{{sendText}}</el-button>
      </el-form-item>

      <el-form-item prop="passwd" label="密码">
        <el-input type="password" v-model="form.passwd" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.native.prevent="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
  layout: "login",
  data() {
    return {
      form: {
        email: '',
        passwd: '',
        captcha: '',
        mailCode:''
      },
      rules: {
        email:[
          {required:true,message:'请输入邮箱'},
          {type:'email',message:'请输入正确的邮箱格式'}
        ],
        passwd:[{
          required:true,message:'请输入密码',pattern:/^[\w_-]{6,12}$/g
        }],
        captcha:[
          {required:true,message:'请输入验证码'}
        ],
        mailCode:[
          {required:true,message:'请输入邮箱验证码'}
        ]
      },
      captchaUrl:"/api/captcha?_t=" + new Date().getTime(),
      sendCode:{
        sendTimer: 0,
        timer:''
      }
    }
  },
  methods: {
    refreshCaptcha() {
      this.captchaUrl = "/api/captcha?_t=" + new Date().getTime();
    },
    handleLogin(){
      this.$refs.loginForm.validate(async valid=>{
        if(valid){
          let obj = {
            email: this.form.email,
            passwd: md5(this.form.passwd),
            captcha: this.form.captcha
          }

          let result = await this.$http.post('/user/login',obj)
          console.log(result)
          if(result.code === 0){
            this.$routher.push('/index')
          }else{
            this.$message.error(result.message)
          }
        }else{
          console.log("校验失败");
        }
      })
    },
    async sendMail(){
      //todo
      const result =  await this.$http.get('/sendmail?email='+this.form.email)
      if(result.code===0){
        this.$message.success('发送成功')
      }else{
        this.$message.error('发送失败')
      }
      this.sendCode.sendTimer = 10
      this.timer = setInterval(() => {
        this.sendCode.sendTimer -= 1
        if(this.sendCode.sendTimer === 0){
          clearInterval(this.timer)
        }
      },1000)
    }
  },
  computed:{
    sendText(){
      if(this.sendCode.sendTimer<=0){
        return '发送'
      }else{
        return `(${this.sendCode.sendTimer})重新发送`
      }
    }
  }
};
</script>

<style lang="stylus">
.login-form {
  width: 800px;
  margin: 50px auto;
}
</style>
