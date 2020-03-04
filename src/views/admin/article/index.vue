<template>
  <div class="app-container">
    <el-row>
      <el-col :span="20">
        <el-form ref="searchParams" :inline="true" :model="searchParams">
          <el-form-item >
            <el-date-picker
                    v-model="searchParams.created_at"
                    type="datetimerange"
                    align="left"
                    unlink-panels
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="创建日期"
                    end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchParams.article_title" type="text" placeholder="文章标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchParams.tag_id" multiple filterable clearable placeholder="标签">
              <el-option v-for="(item) in tagList" :key="item.id" :label="item.tag_name" :value="item.id">
                <span style="float: left">{{ item.tag_name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.tag_type_name }} ({{ item.status_name }})</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchParams.article_type" placeholder="请选择文章类型" multiple filterable clearable>
              <el-option v-for="(typeItem,key) of typeMappings" :key="key" :label="typeItem" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchParams.article_status" placeholder="请选择文章状态" multiple filterable clearable>
              <el-option v-for="(statusItem,key) of statusMappings" :key="key" :label="statusItem" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchParams.is_recommend" filterable clearable placeholder="是否推荐">
              <el-option label="推荐" value="1"></el-option>
              <el-option label="未推荐" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button v-loading="searchLoading" type="success" icon="el-icon-search" @click="fetchData">搜索</el-button>
        <el-button type="danger">重置</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-button type="success" class="mb-20" @click="$router.push({ name: 'EditArticle' })">新增文章</el-button>
      </el-col>
      <el-col :span="20"></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
                border
                stripe
                :data="articleList"
                style="width: 100%"
          >
          <el-table-column
                  prop="created_at"
                  label="创建日期"
                  align="center"
                  width="100px"
                  >
          </el-table-column>
          <el-table-column
                  prop="article_title"
                  label="标题"
                  align="center"
          >
          </el-table-column>
          <el-table-column
                  prop="article_desc"
                  label="描述"
                  align="center"
                  width="150px"
          >
            <template slot-scope="{row}">
              <div v-if="row.article_desc.length >= 15" style="overflow: hidden;" :title="row.article_desc">
                {{ row.article_desc.slice(0,10) }} ...
              </div>
              <div v-else>
                {{ row.article_desc }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
                  prop="article_type"
                  label="类型"
                  align="center"
          >
            <template slot-scope="{row}">
              <el-tag :type="row.article_type | statusFilter">{{ row.type_name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
                  prop="status_name"
                  label="状态"
                  align="center"
          >
              <template slot-scope="{row}">
                  <el-tag :type="row.article_status | statusFilter">{{ row.status_name }}</el-tag>
              </template>
          </el-table-column>
          <el-table-column
                  prop="is_recommend_name"
                  label="是否推荐"
                  align="center"
          >
          </el-table-column>
          <el-table-column
                  prop="article_count"
                  label="点击量"
                  align="center"
          >
          </el-table-column>
          <el-table-column
                  prop="article_level"
                  label="排序"
                  align="center"
          >
          </el-table-column>
          <el-table-column
                  label="标签名称"
                  align="center"
          >
            <template slot-scope="{row}">
              <el-tag v-if="row.tag" :type="row.tag.tag_type | statusFilter">{{ row.tag.tag_name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="250px"
          >
            <template slot-scope="{row}">
              <el-button type="primary" size="small" @click="$router.push({ name: 'EditArticle',query:{ id:row.id} })">编辑</el-button>
              <el-popconfirm
                      title="确定删除吗？"
                      @onConfirm="deleteArticle(row.id)"
              >
                <el-button slot="reference" type="danger" size="small">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>

        </el-table>
        <el-pagination
                background
                class="mt-15 fr"
                layout="prev, pager, next"
                :total="total"
                @current-change="currentChange" >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getArticleList, getTags, articleDel } from '../../../api/article'
import { getStatusMapping, getTypeMapping } from '../../../api/status'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'info',
        3: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      searchParams: {
        article_title: '',
        tag_id: [],
        article_type: [],
        article_status: [],
        is_recommend: '',
        page: 1
      },
      typeMappings: [],
      statusMappings: [],
      tagList: [],
      articleList: [],
      total: 0,
      searchLoading: false
    }
  },
  created() {
    this.typeMapping()
    this.statsMapping()
    this.tags()
    this.fetchData()
  },
  methods: {
    typeMapping() {
      getTypeMapping().then(({ code, data }) => {
        if (code === 1) {
          this.typeMappings = data
        }
      })
    },
    statsMapping() {
      getStatusMapping().then(({ code, data }) => {
        if (code === 1) {
          this.statusMappings = data
        }
      })
    },
    async tags() {
      const res = await getTags()
      if (res.code === 1) {
        this.tagList = res.data
      }
    },
    async fetchData() {
      this.searchLoading = true
      const res = await getArticleList(this.searchParams)
      this.searchLoading = false
      if (res.code === 1) {
        this.articleList = res.data.data
        this.total = res.data.total
      }
    },
    async deleteArticle(id) {
      const res = await articleDel({ article_id: id })
      if (res.code === 1) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
      }
      this.fetchData()
    },
    currentChange(page) {
      this.searchParams.page = page
      this.fetchData()
    },
  }
}
</script>

<style scoped lang="scss">

</style>

