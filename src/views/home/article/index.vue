<template>
  <el-row class="article-container">
    <el-col :span="24">
      <header v-if="articleRow" class="info-box">
        <div class="left">
          <img :src="site_icon_url" alt="" class="el-avatar">
          <div class="name">
            <p class="auth-name">{{ site_author }}</p>
            <p class="who">{{ site_who }}</p>
          </div>
        </div>
        <div class="right">
          <div class="time">
            发布于 {{ articleRow.minus_time }}
          </div>
          <div class="info">
            <span class="reading">
              <i class="el-icon-view">&nbsp;&nbsp;{{ articleRow.clicked }}</i>
            </span>
            <!--<span class="talks">-->
            <!--<i class="el-icon-chat-dot-round">&nbsp;&nbsp;154</i>-->
            <!--</span>-->
            <span class="likes">
              <i class="el-icon-star-on">&nbsp;&nbsp;{{ articleRow.likes }}</i>
            </span>
          </div>
        </div>
      </header>
      <div class="content">
        <h1 class="text-center">{{ articleRow.title }}</h1>
        <div class="content-html" v-html="articleRow.content" />
        <blockquote style="font-size: 0.9em;">
          本作品采用<a href="https://learnku.com/docs/guide/cc4.0/6589">《CC 协议》</a>，转载必须注明作者和本文链接
        </blockquote>
        <div class="like">
          <i class="el-icon-star-off" style="cursor: pointer;" @click="clickLiked" />
          <p>赞</p>
        </div>
      </div>
      <div class="footer">
        <TalkList :article-id="Number(articleId)" :is-article="true" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getArticleRow, articleLike } from '../../../api/article'
import './css/markdown.css'
import { mapGetters } from 'vuex'
import TalkList from '../components/talkList'

export default {
  name: 'Index',
  components: {
    TalkList
  },
  data() {
    return {
      articleId: 0,
      articleRow: {},
      addClickNum: 1
    }
  },
  computed: {
    ...mapGetters([
      'site_author',
      'site_icon_url',
      'site_who',
      'id'
    ])
  },
  created() {
    this.articleId = this.$route.params.article_id
    if (this.articleId === undefined) {
      this.$message({
        message: '无ID',
        type: 'error'
      })
      return
    }
    this.article()
  },
  methods: {
    async article() {
      const res = await getArticleRow({ id: this.articleId, add_click: this.addClickNum })
      if (res.code === 1) {
        if (res.data.type === 1 && (this.id === '' || this.id === undefined || this.id === null)) {
          this.$message.error('该篇文章需要登录才能查看哟!')
          return
        }
        this.articleRow = res.data
      }
    },

    async clickLiked() {
      if (this.id === undefined || this.id === '') {
        this.$message({
          message: '非常感谢您的赞同,不过请登录后再操作哟',
          type: 'info'
        })
        return
      }
      const result = await articleLike({ user_id: this.id, id: this.articleId })
      if (result.code === 1) {
        this.$message({
          message: '点赞成功',
          type: 'success'
        })
        this.addClickNum = 0
        this.article()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.article-container {
    background-color: #fff;
    .info-box {
        height: 140px;
        border-top: 1px solid #E0EEEE;
        border-bottom: 1px solid #E0EEEE;
        .left {
            height: 140px;
            width: 30%;
            overflow: hidden;
            padding: 20px;
            border-right:1px solid #E0EEEE;
            display: inline-block;
            /deep/ .el-avatar {
                width: 100px;
                height: 100px;
                display: inline-block;
                vertical-align: middle;
            }
            .name {
                display: inline-block;
                vertical-align: middle;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-top: 15px;
                margin-left: 15px;
                .auth-name {
                    font-weight: 700;
                    font-size: 16px;
                }
                .who {
                    font-size: 14px;
                    color: #a2a2a2;
                }
            }
            .msg {
                vertical-align: middle;
                padding: 6px 8px;
                margin-left: 20px;
            }
        }
        .right {
            display: inline-block;
            vertical-align: top;
            height: 140px;
            line-height: 140px;
            width: 69%;
            .time {
                width: 60%;
                text-align: center;
                font-size: 14px;
                display: inline-block;
                vertical-align: top;
            }
            .info {
                display: inline-block;
                width: 35%;
                text-align: center;
                font-size: 14px;
                vertical-align: top;
                .reading,.talks, .likes {
                    margin-left: 35px;
                }
            }
        }
    }
    .content {
        padding:35px;
        border-bottom:1px solid #E0EEEE;
      .like {
        font-size: 36px;
        padding-top: 35px;
        text-align: center;
      }
    }
  .footer {
    padding: 20px;
    margin-top: 50px;
    .talks {

    }
  }
}

    @media only screen and (min-width: 1600px) {
     .article-container {
         .info-box {
            .left {
                /deep/ .el-avatar {
                    width: 90px;
                    height: 90px;
                }
                .name {
                    margin-left: 10px;
                }
                .msg {
                    padding: 6px 8px;
                    margin-left: 20px;
                }
            }
             .right {
                 .info {
                     .reading,.talks, .likes {
                         margin-left: 20px;
                     }
                 }
             }
         }
     }
    }
</style>
