<template>
  <div class="app-container">
    <el-row>
      <el-col :span="20">
        <el-form ref="searchParams" :inline="true" :model="searchParams">
          <el-form-item>
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
            />
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchParams.title" type="text" placeholder="文章标题" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchParams.tag_id" multiple  clearable placeholder="标签">
              <el-option v-for="(item) in tagList" :key="item.id" :label="item.name" :value="Number(item.id)">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.type_name }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchParams.status" placeholder="是否隐藏" multiple filterable clearable>
              <el-option label="正常" :value="0" />
              <el-option label="隐藏" :value="1" />
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
      <el-col :span="20" />
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
          />
          <el-table-column
            prop="title"
            label="标题"
            align="center"
          />
          <el-table-column
            prop="is_hide"
            label="是否隐藏"
            align="center"
          >
            <template slot-scope="{row}">
              <el-tag :type="row.is_hide | statusFilter">{{ row.is_hide_name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="order"
            label="排序"
            align="center"
          />
          <el-table-column
            label="标签名称"
            align="center"
          >
            <template slot-scope="{row}">
              <el-tag v-if="row.tag" :type="row.tag.is_hide | statusFilter">{{ row.tag.name }}</el-tag>
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
          @current-change="currentChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getArticleList, articleDel } from '../../../api/article'
import { getAllTags } from '../../../api/tag'

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
        title: '',
        tag_id: [],
        type: [],
        status: [],
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
    this.fetchData()
    this.tags()
  },
  methods: {
    async tags() {
      const res = await getAllTags()
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
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    async deleteArticle(id) {
      const res = await articleDel({ id: id })
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
    }
  }
}
</script>

<style scoped lang="scss">

</style>

