const md5 = require('md5')
const jwt = require('jsonwebtoken')
const BaseController = require('./base')

const HashSalt = 'vueszhorace'

const createRules ={
  email:{type:'email'},
  nickname:{type:'string'},
  passwd:{type:'string'},
  captcha:{type:'string'}
}

class UserController extends BaseController{

  async login(){
    const {ctx, app} = this
    const {email,passwd,captcha} = ctx.request.body
    if(captcha.toUpperCase() != ctx.session.captcha.toUpperCase()){
      return this.error('验证码错误')
    }
    const user = await ctx.model.User.findOne({email,passwd:md5(passwd+HashSalt)})
    if(!user){
      return this.error('用户名或密码错误',-1)
    }

    //登录成功返回信息
    const token = jwt.sign({
      _id:user._id,
      email
    },app.config.jwt.secret,{
      expiresIn:'1h'
    })
    
    return this.success({
      nickname:user.nickname,
      email,
      token
    })
  }

  async register(){
    const {ctx} = this
    try{
      ctx.validate(createRules)
    }catch(e){
      return this.error('参数验证失败',-1,e.error)
    }

    const {email,passwd,nickname, captcha} = ctx.request.body
    console.log({email,passwd,nickname, captcha})

    if(captcha.toUpperCase() === ctx.session.captcha.toUpperCase()){
      if(await this.checkEmail(email)){
        this.error('邮箱已存在')
      }else{
        const result = await this.ctx.model.User.create({
          email,
          nickname,
          passwd:md5( passwd + HashSalt)
        })

        if(result._id){
          this.message('注册成功')
        }
      }
    }else{
      this.error('验证码错误')
    }

    // this.success({name:'yeah'})
  }

  async checkEmail(email){
    const user = await this.ctx.model.User.findOne({email})
    return user
  }

  async verify(){
    //检测用户是否存在
  }

  async info(){
    this.ctx.body = 'info'
    console.log("info")
  }
} 

module.exports = UserController