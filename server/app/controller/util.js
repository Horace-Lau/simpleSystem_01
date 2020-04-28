'use strict'

const SvgCaptcha = require('svg-captcha')
const BaseController = require('./base')

class UtilController extends BaseController {
  async captcha() {
    const captcha = SvgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      noise: 3
    })

    this.ctx.session.captcha = captcha.text
    this.ctx.response.type = 'image/svg+xml'
    this.ctx.body = captcha.data
    console.log(captcha.text)
  }

  async sendmail() {
    const { ctx } = this
    const email = ctx.query.email
    let code = Math.random().toString().slice(2, 6)
    console.log('邮箱:' + email + '验证码:' + code)
    return this.message('发送成功')
  }
}

module.exports = UtilController
