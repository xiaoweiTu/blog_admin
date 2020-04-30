<template>
  <el-row class="index-container">
    <el-col :span="24">
      <div class="poster">
        <div class="icon-name">
          <img src="http://qiniu.txwei.cn/Fut1P7edmWvCqvm5mztihRpOzQzO" alt="" class="icon">
          <span class="name">{{ site_name }}</span>
        </div>
        <div class="desc">{{ site_desc }}</div>
        <div class="tags">
          <el-badge :value="total" class="tag-item" :class="curClicked === 0 ? 'active' : ''">
            <div @click="getTagArticles('')">All</div>
          </el-badge>
          <el-badge
            v-for="(item) in tags"
            :key="item.id"
            :class="curClicked === item.id ? 'active' : ''"
            class="tag-item"
            :value="item.articles.length"
          ><div @click="getTagArticles(item.id)">{{ item.name }} </div></el-badge>
          <i v-if="tags.length > 4" class="el-icon-caret-bottom more-tags" @click="moreTags" />
        </div>
      </div>
      <div class="content">
        <div v-for="(item, index) in articles" :key="index" class="item" @click="goRead(item.id)">
          <div class="item-content">
            <p class="title">
              <el-tag type="info" style="margin-right: 15px;">{{ item.tag.name }}</el-tag>{{ item.title }}
            </p>
            <p class="desc">
              {{ item.description }}
            </p>
            <p class="info">
              <span><i class="el-icon-time" /><span class="time">{{ item.minus_time }}</span></span>
              <span class="read">
                <i class="el-icon-view" />
                <span class="readings">{{ item.clicked }}</span>
              </span>
              <span class="likes">
              <i class="el-icon-star-on">&nbsp;&nbsp;{{ item.likes }}</i>
            </span>
            </p>
          </div>
        </div>
        <div v-if="page < totalPage" class="load-more">
          <el-button v-loading="loading" @click="loadMore">加载更多...</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { getHomeTagList } from '../../../api/tag'
import { getHomeArticleList } from '../../../api/article'

export default {
  name: 'Index',
  data() {
    return {
      showMore: false,
      tags: [],
      curClicked: 0,
      tagId: '',
      articles: [],
      page: 1,
      totalPage: 1,
      total: 0,
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'site_name',
      'site_desc'
    ])
  },
  created() {
    this.tagList()
    this.tagArticles()
  },
  methods: {
    moreTags() {
      this.showMore = !this.showMore
      if (this.showMore) {
        const tag = document.querySelector('.tags')
        tag.style.height = 'auto'
        const height = tag.clientHeight + 6
        document.querySelector('.content').style.marginTop = height + 'px'
        document.querySelector('.more-tags').classList.remove('el-icon-caret-bottom')
        document.querySelector('.more-tags').classList.add('el-icon-caret-left')
      } else {
        document.querySelector('.tags').style.height = 50 + 'px'
        document.querySelector('.content').style.marginTop = 50 + 'px'
        document.querySelector('.more-tags').classList.remove('el-icon-caret-left')
        document.querySelector('.more-tags').classList.add('el-icon-caret-bottom')
      }
    },
    async tagList() {
      const res = await getHomeTagList()
      if (res.code === 1) {
        this.tags = res.data
      }
    },
    getTagArticles(id) {
      this.curClicked = id
      this.tagId = id
      this.page = 1
      this.tagArticles()
    },
    async tagArticles(save = false) {
      this.loading = true
      const res = await getHomeArticleList({ tag_id: this.tagId, page: this.page })
      this.loading = false
      if (res.code === 1) {
        if (save) {
          this.articles = this.articles.concat(res.data.data)
        } else {
          this.articles = res.data.data
        }
        this.totalPage = res.data.last_page
        if (this.tagId === 0 || this.tagId === '') {
          this.total = res.data.total
        }
      }
    },
    loadMore() {
      this.page += 1
      this.tagArticles(true)
    },
    goRead(id) {
      const url = this.$router.resolve({ name: 'homeArticle', params: { article_id: id }})
      window.open(url.href, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.poster {
  background-color: #000;
  height: 350px;
  border-radius: 5px;
  position: relative;
  .icon-name {
    position: absolute;
    top:100px;
    left:50%;
    width: 400px;
    margin-left: -200px;
    color: #fff;
    .icon {
      width: 100px;
      height: 100px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      display: inline-block;
      vertical-align: top;
    }
    .name {
      font-size: 60px;
      display: inline-block;
      height: 100px;
      line-height: 100px;
      margin-left: 35px;
    }
  }
  .desc {
    position: absolute;
    bottom: 80px;
    color: #fff;
    display: block;
    text-align: center;
    width: 100%;
    font-size: 26px;
  }
  .tags {
    width: 400px;
    overflow: hidden;
    height: 50px;
    background-color: #fff;
    position: absolute;
    padding: 0 15px;
    top: 325px;
    left: 50%;
    margin-left: -200px;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
    .tag-item {
      display: inline-block;
      width: 18%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      cursor: pointer;
      font-size: 15px;
      &:hover {
        color:red;
      }
      /deep/ .el-badge__content.is-fixed {
        top: 10px;
        right: 20px;
      }
    }
    .tag-item.active {
      color: red;
    }
    .more-tags {
      display: inline-block;
      position: absolute;
      right: 10px;
      top: 15px;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
.content {
  padding-top: 15px;
  padding-bottom: 50px;
  background-color: #fff;
  margin-top: 50px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  .load-more {
    text-align: center;
  }
  .item {
    padding:10px;
  }
  .item-icon {
    display: inline-block;
    width: 120px;
    height: 120px;
    padding: 15px;
    vertical-align: top;
  }
  .item-content {
    display: inline-block;
    width:100%;
    padding:0 10px;
    border-bottom: 1px solid #f2f2f2;
    cursor: pointer;
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
      font-weight: 700;
      font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    .desc {
      font-size: 14px;
      color: #a2a2a2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .info {
      padding-top: 10px;
      font-size: 12px;
      .time {
        padding: 0 5px;
      }
      .readings {
        padding: 0 5px;
      }
      .read, .likes{
        margin-left: 10px;
      }
    }
  }
  .item-content:hover {
    background-color: #f2f2f2;
    border-radius: 4px;
  }
}

</style>
