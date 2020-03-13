<template>
  <el-row class="course-container">
    <el-col :span="6">
      <div v-if="titles.length > 0" class="menu">
        <div v-for="item in titles" :key="item.id" class="menu-item">
          <p class="menu-title" @click="articleContent(item.id)">
            <i class="el-icon-document menu-icon" />
            <span class="menu-name">{{ item.article_title }}</span>
          </p>
        </div>
        <el-pagination
          v-if="titles.length > 0"
          id="pagination"
          background
          layout="prev, pager, next"
          :total="titleTotal"
          @current-change="currentChange"
        />
      </div>
    </el-col>
    <el-col :span="18">
      <div v-if="article.id !== undefined" class="content-box">
        <div class="title-box">
          <div class="title">
            <i class="el-icon-document menu-icon" />
            {{ article.article_title }}</div>
        </div>
        <div class="content" v-html="article.article_content" />
        <blockquote style="font-size: 0.9em;">
          本作品采用<a href="https://learnku.com/docs/guide/cc4.0/6589">《CC 协议》</a>，转载必须注明作者和本文链接
        </blockquote>
      </div>
      <div v-else class="title-box">
        <h1> 暂无内容</h1>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getHomeArticleList, getArticleRow } from '../../../api/article'
import '../article/css/markdown.css'
export default {
  name: 'Course',
  data() {
    return {
      titles: [],
      titleTotal: 0,
      article: {},
      tagId: 0
    }
  },
  created() {
    this.tagId = this.$route.params.tag_id
    if (this.tagId === 0 || this.tagId === undefined) {
      this.$router.push({ name: 'home' })
    }
    this.articleList(1)
  },
  methods: {
    async articleList(page) {
      const result = await getHomeArticleList({ tag_id: this.tagId, page: page })
      if (result.code === 1) {
        this.titles = result.data.data
        this.titleTotal = result.data.total
        if (this.titles.length > 0) {
          this.articleContent(this.titles[0]['id'])
        }
      } else {
        this.$message({
          message: result.msg,
          type: 'error'
        })
      }
    },
    async articleContent(id) {
      const result = await getArticleRow({ article_id: id })
      if (result.code === 1) {
        this.article = result.data
      } else {
        this.$message({
          message: result.msg,
          type: 'error'
        })
      }
    },
    currentChange(page) {
      this.articleList(page)
    }
  }
}
</script>

<style scoped lang="scss">
.course-container {
    .menu {
        width: 100%;
        word-break: break-all;
        background-color: #fff;
        color:#777;
        padding: 20px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        .menu-item{
            border-bottom: 1px solid #f2f2f2;
            .menu-title {
                margin:0;
                padding-bottom: 10px;
                padding-top: 10px;
                cursor: pointer;
                .menu-icon {
                    display: inline-block;
                    vertical-align: middle;
                }
                .menu-name {
                    vertical-align: middle;
                }
            }
            .menu-title:hover {
                background-color: rgba(0,0,0,0.1);
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
                color: black;
            }
        }
    }
    .content-box {
        margin-left: 20px;
        margin-bottom: 50px;
        background-color: #fff;
        color:#777;
        padding: 20px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        .title-box {
            padding: 10px;
            .title {
                font-size: 16px;
                font-weight: 700;
            }
        }
        .content {
            padding: 10px;
        }
    }
}
    #pagination {
        margin-left: -10px;
        margin-top: 5px;
    }
</style>
