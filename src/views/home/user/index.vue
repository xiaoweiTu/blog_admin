<template>
  <el-row class="user-container">
    <el-col>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="用户信息" name="1">
          <p><span>昵称: {{ name }}</span></p>
          <p><span>邮箱: {{ email }}</span></p>
          <p><span>上次登录时间: {{ last_login }}</span></p>
          <p><span>上次登录IP: {{ last_ip_address }}</span></p>
        </el-collapse-item>
        <el-collapse-item title="点赞历史" name="2">
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
    </el-col>
  </el-row>
</template>

<script>
import { likeHistory } from '../../../api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  data() {
    return {
      history: [],
      activeNames: ['1'],
      reverse: false
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'name',
      'email',
      'last_login',
      'last_ip_address'
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
    handleChange(val) {
      console.log(val)
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
