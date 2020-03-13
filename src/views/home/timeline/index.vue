<template>
  <el-row class="timeline-container">
    <el-col :span="24">
        <el-timeline>
            <el-timeline-item v-for="item in timeline" :key="item.id" :timestamp="item.created_at" placement="top">
                <el-card>
                    <h4 style="cursor: pointer" @click="goArticle(item.id)">{{ item.article_title }}</h4>
                    <p style="color: #909399;">提交于 <span style="color:black;">{{ item.minus_time }}</span></p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </el-col>
  </el-row>
</template>

<script>
import { getTimeline } from '../../../api/article'

export default {
  name: 'Timeline',
  data() {
    return {
      timeline: []
    }
  },
  created() {
    this.timelines()
  },
  methods: {
    async timelines() {
      const result = await getTimeline()
      if (result.code === 1) {
        this.timeline = result.data
      }
    },
    goArticle(id) {
      const url = this.$router.resolve({ name: 'homeArticle', params: { article_id: id }})
      window.open(url.href, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
