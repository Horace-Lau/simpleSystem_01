'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)

  //验证码
  router.get('/captcha', controller.util.captcha)
  //发送邮件
  router.get('/sendmail',controller.util.sendmail)
  // //用户注册
  // router.get('/register', controller.util.captcha)

  router.group({name:'user',prefix:'/user'}, router => {
    const { login, register, verify, info } = controller.user
    router.post('/register', register)
    router.post('/login', login)
    router.get('/verify', verify)
    router.get('/info', info)
  })
}
