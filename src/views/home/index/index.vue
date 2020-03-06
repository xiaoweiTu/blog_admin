<template>
  <el-row class="index-container">
    <el-col :span="18" class="index-main box-border">
      <div class="tag-list">
        <el-badge v-for="item in tag_list" :key="item.id" :value="item.article_count" class="tag-item">
          <el-tag :type="item.id === clickNow ? 'danger': 'info'" class="cur-point" @click="changeTag(item.id)">{{ item.tag_name }}</el-tag>
        </el-badge>
      </div>
      <div class="article-list">
        <div v-for="(article, index ) in article_list" :key="index" class="article-item" @click="lookArticle(article.id)">
          <div class="article-type">
            <el-tag v-if="article.is_recommend === 1" type="warning">{{ article.is_recommend_name }}</el-tag>
            <el-tag v-else type="info">普通</el-tag>
          </div>
          <div class="article-name">
            {{ article.article_title }}
          </div>
          <div class="article-count">
            <i class="el-icon-view" />
            <el-tooltip class="item" effect="dark" content="阅读量" placement="top">
              <span>{{ article.article_count }}</span>
            </el-tooltip>
          </div>
          <div class="article-time">
            <el-tooltip class="item" effect="dark" content="发布时间" placement="top">
              <span>{{ article.created_at }}</span>
            </el-tooltip>
          </div>
        </div>
        <el-pagination
          id="pagination"
          background
          layout="prev, pager, next"
          :total="article_total"
          @current-change="currentChange"
        />
      </div>
    </el-col>
    <el-col :span="6" class="index-side">
      <div class="notification box-border">
        <div class="notification-title">
          公告栏
        </div>
        <div class="notification-content">
          {{ site_notice }}
        </div>
        <div class="notification-foot">
          <el-button style="width: 100%;" @click="leaveWords">留言</el-button>
        </div>
      </div>
      <div class="notification box-border friend-link">
        <div class="notification-title">
          友情链接
        </div>
        <div class="notification-content">
          <a v-for="link in links" :key="link.id" :href="link.link" class="links" target="_blank">
            {{ link.name }}
          </a>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getHomeTagList } from '../../../api/tag'
import { getHomeArticleList } from '../../../api/article'
import { mapGetters } from 'vuex'
import { getFriendLinks } from "../../../api/site";

export default {
  name: 'Index',
  data() {
    return {
      tag_list: [],
      clickNow: 0,
      article_list: [],
      article_total: 2,
      links: [
        {
          id: 1,
          name: 'Laravel China 社区 | Laravel China 社区 - 高品质的 Laravel 开发者社区',
          link: 'https://learnku.com/laravel'
        },
        {
          id: 2,
          name: 'Laravel社区',
          link: 'https://learnku.com/laravel'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'site_notice'
    ])
  },
  created() {
    this.getTagList()
    this.friendLinks()
  },
  methods: {
    changeTag(id) {
      this.clickNow = id
      this.getArticleList(id)
    },
    async getTagList() {
      const result = await getHomeTagList()
      if (result.code === 1) {
        this.tag_list = result.data
        if (this.tag_list.length === 0) {
          this.$message({
            message: '请先去后台配置标签!',
            type: 'error'
          })
          return
        }
        const tag_id = this.tag_list[0]['id']
        this.getArticleList(tag_id)
        this.clickNow = tag_id
      } else {
        this.$message({
          message: result.msg,
          type: 'danger'
        })
      }
    },
    async getArticleList(tagId = 0, page = 1) {
      const result = await getHomeArticleList({ tag_id: tagId, page: page })
      if (result.code === 1) {
        this.article_list = result.data.data
        this.article_total = result.data.total
      } else {
        this.$message({
          message: result.msg,
          type: 'danger'
        })
      }
    },
    currentChange(page) {
      this.getArticleList(this.clickNow, page)
    },
    leaveWords() {
      this.$message({
        message: '暂未开放',
        type: 'info'
      })
    },
    lookArticle(id) {
      this.$router.push({ name: 'homeArticle', params: { article_id: id }})
    },
    async friendLinks() {
      const result = await getFriendLinks()
      if (result.code === 1) {
        this.links = result.data
      } else {
        this.$message({
          message: result.msg,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.index-container{
  .index-main{
    margin-bottom: 60px;
    background-color: #fff;
    border-radius: 4px;
    .tag-list{
      height: 70px;
      padding-top: 20px;
      padding-left: 10px;
      border-bottom: 1px solid #f2f2f2;
      .tag-item{
        margin-left:20px;
      }
    }
    .article-list{
      padding: 0 15px;
      .article-item{
        display: flex;
        align-items: center;
        font-size: 15px;
        line-height: 22px;
        height: 60px;
        position: relative;
        border-bottom: 1px solid #f2f2f2;
        cursor: pointer;
      }
      .article-name{
        margin-left: 10px;
      }
      .article-time{
        position: absolute;
        right: 10px;
        font-size: 13px;
        color: #bab9bb;
      }
      .article-count{
        margin-left: 15px;
        color: #bab9bb;
        font-size: 13px;
        position: absolute;
        right: 150px;
        span {
          margin-left: 5px;
        }
      }
      #pagination {
        margin-top: 20px;
        margin-left: -10px;
        margin-bottom: 20px;
        .active {
          background-color: #fef0f0!important;
          color: #f56c6c!important;
        }
      }

    }
  }
  .index-side {
    padding-left: 30px;
    padding-bottom: 30px;
    .friend-link {
      margin-top: 30px;
      .links{
        display: block;
        padding:10px;
        color: #909399;
        border-bottom: 1px solid #f2f2f2;
      }
      .links:hover {
        color: #f56c6c;
      }
    }
    .notification{
      background-color: #fff;
      border-radius: 4px;
      .notification-title{
        text-align: center;
        padding: 10px 0;
        border-bottom: 1px solid #f2f2f2;
        color: #777;
      }
      .notification-content{
        padding: 15px 10px;
        font-size: 14px;
        color: #636b6f;
      }
      .notification-foot{
        padding: 15px;
      }
    }
  }
}
.cur-point {
  cursor: pointer;
}
.cur-point:hover {
  background-color: #fef0f0;
  border-color: #fde2e2;
}
</style>
