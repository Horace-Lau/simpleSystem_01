<template>
  <div>
    <!-- <div>导航</div> -->
    <nuxt></nuxt>
    <!-- <div>底部信息</div> -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
.login-container
  width 100%
  min-height 100%
  .login-form
    width 520px
    padding 160px 0
    margin 0 auto
    overflow hidden
  .captcha-container
    width 100%
    .input_mailCode
      width 60%
    .btn_sendMail
      width 25%
      line-height 40px
      padding 0
      text-align center
    .captcha
      height 100%
      position absolute
      right 0
      z-index 10
      cursor pointer
</style>
