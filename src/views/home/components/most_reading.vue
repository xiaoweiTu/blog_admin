<template>
  <div class="side">
    <div class="title">
      <div class="newest inline-block" :class="cur_type === 1 ? 'active': ''" @click="changeType(1)">
        <span>最新文章</span>
      </div>
      <div class="reading inline-block" style="margin-left: 5px;" :class="cur_type === 2 ? 'active': ''" @click="changeType(2)">
        <span>最多阅读</span>
      </div>
    </div>
    <div v-loading="loading" class="body">
      <div v-for="item in articleData" :key="item.id" class="article" @click="lookArticle(item.id)">
        <el-tag v-if="cur_type === 1" type="warning" style="margin-right: 5px;">{{ item.minus_time }}</el-tag>
        <el-tag v-else type="warning"><i class="el-icon-view"></i>&nbsp;&nbsp;{{ item.article_count }}</el-tag>
        {{ item.article_title }}
      </div>
    </div>
  </div>
</template>

<script>
import { getNewestArticle, getMostReading } from '../../../api/article'

export default {
  name: 'MostReading',
  data() {
    return {
      cur_type: 1,
      articleData: {},
      loading: false
    }
  },
  created() {
    this.articles()
  },
  methods: {
    changeType(type) {
      this.cur_type = parseInt(type)
      this.articles()
    },
    articles() {
      this.loading = true
      if (this.cur_type === 1) {
        this.newest()
      } else {
        this.mostReading()
      }
    },
    async newest() {
      const result = await getNewestArticle()
      this.loading = false
      if (result.code === 1) {
        this.articleData = result.data
      } else {
        this.$message({
          message: result.msg,
          type: 'error'
        })
      }
    },
    async mostReading() {
      const result = await getMostReading()
      this.loading = false
      if (result.code === 1) {
        this.articleData = result.data
      } else {
        this.$message({
          message: result.msg,
          type: 'error'
        })
      }
    },
    lookArticle(id) {
      const url = this.$router.resolve({ name: 'homeArticle', params: { article_id: id }})
      window.open(url.href, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.side {
    background-color: #fff;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    font-size: 14px;
    .body{
        padding: 15px;
        .article {
            margin-top: 10px;
            word-break: break-all;
            cursor: pointer;
            padding-bottom: 5px;
            border-bottom: 1px solid rgba(211, 224, 233, 0.3);
        }
    }
    .title {
        padding: 15px 15px 0px 15px;
        border-bottom: 1px solid rgba(211, 224, 233, 0.3);
        .newest,.reading{
            padding-bottom: 10px;
            cursor: pointer;
        }
    }
    .inline-block {
        display: inline-block;
    }
    .active {
        border-bottom: 2px solid black;
        font-weight: bold;
    }
}
</style>
