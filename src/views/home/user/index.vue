<template>
  <el-row class="user-container">
    <el-col>
      <el-collapse v-model="activeNames" >
        <el-collapse-item title="用户信息" name="1">
          <p><span>昵称: <el-tag>{{ name }}</el-tag></span></p>
          <p><span>邮箱: <el-tag>{{ email }}</el-tag></span></p>
          <p><span>上次登录时间: <el-tag>{{ last_login }}</el-tag></span></p>
          <p><span>上次登录IP: <el-tag>{{ last_ip_address }}</el-tag></span></p>
          <p><span>激活时间: <el-tag v-if="verify_at" type="danger">{{ verify_at }}</el-tag>
            <el-popover
                    v-else
                    placement="top-start"
                    title="激活可以做什么"
                    width="200"
                    trigger="hover"
                    content="激活后您可以修改密码,以及优先使用其他功能">
              <el-tag slot="reference" type="warning" style="cursor: pointer" @click="goVerify">去激活</el-tag>
            </el-popover>
          </span></p>
        </el-collapse-item>
        <el-collapse-item v-if="history.length > 0" title="点赞历史" name="2" >
          <el-radio-group v-model="reverse">
            <el-radio :label="true">正序</el-radio>
            <el-radio :label="false">倒叙</el-radio>
          </el-radio-group>
          <el-divider />
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="item in history"
              :key="item.id"
              :timestamp="item.created_at"
            >
              点赞了 {{ item.article.title }}
            </el-timeline-item>
          </el-timeline>
        </el-collapse-item>
      </el-collapse>
      <VerifyCodeDialog :show-verify-dialog.sync="showVerifyDialog"></VerifyCodeDialog>
    </el-col>
  </el-row>
</template>

<script>
import { likeHistory } from '../../../api/user'
import { mapGetters } from 'vuex'
import VerifyCodeDialog from './components/verifyDialog'
export default {
  name: 'Index',
  components: {
    VerifyCodeDialog
  },
  data() {
    return {
      history: [],
      activeNames: ['1'],
      reverse: false,
      showVerifyDialog: false
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'name',
      'email',
      'last_login',
      'last_ip_address',
      'verify_at'
    ])
  },
  created() {
    if (this.id === undefined || this.id === '') {
      this.$message({
        message: '请登录',
        type: 'info'
      })

      this.$router.push({ name: 'home' })
    }
    this.getLikeHistory()
  },
  methods: {
    async getLikeHistory() {
      const result = await likeHistory()
      if (result.code === 1) {
        this.history = result.data
      }
    },
    goVerify() {
      this.showVerifyDialog = true
    }
  }
}
</script>

<style scoped lang="scss">
.user-container {
  /deep/ .el-collapse-item__header {
    padding: 0 15px;
  }
  /deep/ .el-collapse-item__content {
    padding: 10px 15px;
  }
}
</style>
