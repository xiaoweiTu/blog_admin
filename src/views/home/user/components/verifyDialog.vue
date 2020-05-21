<template>
  <el-dialog title="激活" :visible="showVerifyDialog">
    <el-button type="danger" :loading="sendLoading" @click="sendCode">发送令牌</el-button>
    <el-input v-model="code" type="text" placeholder="请输入邮箱令牌" />
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" :disabled="!minusTime" @click="verifyCodePost">确 定 <span v-if="minusTime"> ({{ minusTime }})</span></el-button>
    </div>
  </el-dialog>
</template>

<script>
import { verifyCode, sendVerifyCode } from '../../../../api/user'

export default {
  name: 'VerifyDialog',
  props: {
    showVerifyDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      code: '',
      sendLoading: false,
      postLoading: false,
      minusTime: 0
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:showVerifyDialog', false)
    },
    async verifyCodePost() {
      if (this.code === '') {
        this.$message.error('令牌不能为空!')
        return
      }
      this.postLoading = true
      const result = await verifyCode({ code: this.code })
      this.postLoading = false
      this.$message({
        message: result.msg,
        type: result.code === 1 ? 'success' : 'error'
      })
      if (result.code === 1) {
        this.closeDialog()
      }
    },
    async sendCode() {
      this.sendLoading = true
      const result = await sendVerifyCode()
      this.sendLoading = false
      if (result.code === 1) {
        this.$message({
          message: '发送成功,请去您的登录邮箱查看令牌',
          type: 'success'
        })
        this.minusTime = 60
        const _this = this
        setInterval(function() {
          _this.minusTime -= 1
        }, 1000)
      } else {
        this.$message.error('发送失败,请刷新页面重新发送!')
      }
    }
  }
}
</script>

<style scoped>

</style>
