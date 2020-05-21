<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">找回密码</h3>
      </div>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="email"
          name="email"
          type="email"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="table" />
        </span>
        <el-input
          ref="code"
          v-model="loginForm.code"
          placeholder="请输入令牌"
          name="code"
          tabindex="2"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入新密码"
          name="password"
          tabindex="3"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div style="display: flex;    justify-content: center;">
        <el-button :loading="codeLoading" type="primary" style="width: 50%;" :disabled="Boolean(minusTime)" @click.native.prevent="sendCode">发送令牌<span v-if="minusTime">({{ minusTime }})</span></el-button>
        <el-button :loading="loading" type="primary" style="width: 50%;" @click.native.prevent="handleUpdate">修改</el-button>
      </div>
      <p class="go_rig">没有账号? <a href="javascript:;" style="color:#409EFF" @click="goRegister()">去注册</a></p>
    </el-form>
  </div>
</template>

<script>
import { sendFindPassCode, updatePass } from '../../../api/user'

export default {
  name: 'FindPass',
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
        code: ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', type: 'email' }],
        password: [{ required: true, trigger: 'blur', message: '新密码不能为空!' }],
        code: [{ required: true, trigger: 'blur', message: '令牌不能为空!' }]
      },
      loading: false,
      codeLoading: false,
      passwordType: 'password',
      minusTime: 0,
      redirect: undefined
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleUpdate() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const result = await updatePass(this.loginForm)
          if (result.code === 1) {
            this.$message({
              message: result.msg,
              type: 'success'
            })
            this.$router.push({ name: 'userLogin' })
          }
        }
      })
    },
    async sendCode() {
      if (this.loginForm.email === '') {
        this.$message.error('请输入邮箱!')
        return
      }
      var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (!reg.test(this.loginForm.email)) {
        this.$message.error('邮箱格式不正确')
        return
      }
      this.codeLoading = true
      const result = await sendFindPassCode({ email: this.loginForm.email })
      this.codeLoading = false
      if (result.code === 1) {
        this.$message({
          message: result.msg,
          type: 'success'
        })
        this.minusTime = 60
        const _this = this
        setInterval(function() {
          _this.minusTime -= 1
        }, 1000)
      }
    },
    goRegister() {
      this.$router.push({ name: 'userRegister' })
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    .go_rig {
      text-align: right;
      color:white;
    }
    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
