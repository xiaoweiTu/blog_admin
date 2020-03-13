<template>
  <el-row class="article-container">
    <el-col :span="16">
      <div class="article-row box-border">
        <h1 class="article-title">{{ article.article_title }}</h1>
        <p class="article-info">
          <el-tag v-if="article.is_recommend === 1" type="success">{{ article.is_recommend_name }}</el-tag>
          <el-tag type="info">{{ article.tag.tag_name }}</el-tag>
          <el-tag type="danger"><i class="el-icon-view">&nbsp;{{ article.article_count }}</i></el-tag>
          <el-tag type="warning"><i class="el-icon-edit-outline">&nbsp;{{ article.created_at }}</i></el-tag>
        </p>
        <hr style="color: #777;font-weight: 400;border-bottom: 1px solid rgba(211,224,233,.15);height: 0;">
        <div class="article-content" v-html="article.article_content" />
        <blockquote style="font-size: 0.9em;">
          本作品采用<a href="https://learnku.com/docs/guide/cc4.0/6589">《CC 协议》</a>，转载必须注明作者和本文链接
        </blockquote>
      </div>
    </el-col>
    <el-col :span="8" class="fixed-window">
      <div class="article-side">
        <div class="site-owner box-border">
            <div class="site-owner-title ">
                <div class="site-owner-info">
                    <p class="site-owner-name"> <i class="el-icon-edit-outline"></i>&nbsp;{{ site_owner }}</p>
                    <p class="site-owner-desc"> {{ site_desc }}</p>
                </div>
                <img :src="site_icon_url" alt="icon" class="site-icon-url">
            </div>
            <div class="site-owner-saying">
                {{ site_owner_desc }}
            </div>
        </div>
      </div>
        <div class="article-side most-reading">
            <div class="box-border">
                <MostReading></MostReading>
            </div>
        </div>
    </el-col>
  </el-row>
</template>

<script>
import { getArticleRow } from '../../../api/article'
import './css/markdown.css'
import { mapGetters } from 'vuex'
import MostReading from '../components/most_reading'

export default {
  name: 'Index',
  components: {
    MostReading
  },
  data() {
    return {
      article_id: 0,
      article: {
        tag: {
          tag_name: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'site_owner',
      'site_desc',
      'site_icon_url',
      'site_owner_desc'
    ])
  },
  created() {
    this.article_id = this.$route.params.article_id
    this.getArticle()
  },
  methods: {
    async getArticle() {
      if (this.article_id === 0 || this.article_id === undefined) {
        this.$router.push({ name: 'home' })
      }
      const result = await getArticleRow({ article_id: this.article_id })
      if (result.code === 1) {
        this.article = result.data
      } else {
        this.$message({
          message: result.msg,
          type: 'danger'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.article-container {
    .fixed-window {
        width: 22.33333%;
        position: fixed;
        right: 17%;
    }
    .article-row{
        margin-bottom: 60px;
        background-color: #fff;
        border-radius: 4px;
        padding: 20px;
        .article-title{
            margin-top: 0;
            border: none;
            padding: 0;
            margin-bottom: 15px;
            color: #636b6f;
            font-size: 20px;
            font-weight: 400;
        }
    }
    .most-reading {
        margin-top: 30px;
    }
    .article-side{
        padding-left: 30px;
        .site-owner{
            background-color: #fff;
            position: relative;
            padding: 15px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }
        .site-owner-title{
            border-bottom: 1px solid rgba(211, 224, 233, 0.3);
            padding-bottom: 10px;
            .site-owner-info,.site-icon-url{
                display: inline-block;
            }
            .site-owner-info{
                height: 60px;
                .site-owner-name {
                    font-weight: bold;
                    font-size: 15px;
                }
                .site-owner-desc {
                    font-size: 12px;
                    color: rgba(0,0,0,.4);
                }
            }
            .site-icon-url{
                width: 60px;
                height: 60px;
                float: right;
            }
        }
        .site-owner-saying{
            padding-top: 20px;
        }
    }
}
</style>
