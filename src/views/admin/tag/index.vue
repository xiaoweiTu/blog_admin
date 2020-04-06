<template>
  <div class="app-container">
    <el-row class="tag-header">
      <el-col :span="16">
        <el-form inline :model="searchParams">
          <el-form-item>
            <el-input v-model="searchParams.name" placeholder="标签名称" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchParams.is_hide" placeholder="是否隐藏" multiple filterable clearable>
              <statusComponent></statusComponent>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchParams.level" placeholder="排序等级" />
          </el-form-item>
        </el-form>
        <el-button type="success" class="mb-20" @click="openTagDrawer({})">新增标签</el-button>
      </el-col>
      <el-col :span="8">
        <el-button type="success" icon="el-icon-search" :loading="searchLoading" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="tag-body">
      <el-col :span="24">
        <el-table :data="tagList" border stripe style="width: 100%">
          <el-table-column
            prop="created_at"
            label="创建日期"
            align="center"
          />
          <el-table-column
            prop="name"
            label="标签名称"
            align="center"
          >
            <template slot-scope="{row}">
              <el-tag :type="row.status | statusFilter">{{ row.name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_hide_name"
            label="是否隐藏"
            align="center"
          >
            <template slot-scope="{row}">
              <el-tag :type="row.is_hide | statusFilter">{{ row.is_hide_name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="order"
            label="标签等级"
            align="center"
          />
          <el-table-column
            prop=""
            label="操作"
            align="center"
          >
            <template slot-scope="{row}">
              <el-button type="success" size="small" @click="openTagDrawer(row)">编辑</el-button>
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="deleteTag(row.id)"
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

        <editTag :visible.sync="tagDrawVisible" :tag-data.sync="tagRowData" @fetchData="fetchData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTagList, tagDel } from '../../../api/tag'
import editTag from './components/edit'
import statusComponent from '../components/status'

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
  components: {
    editTag,
    statusComponent
  },
  data() {
    return {
      listLoading: false,
      searchLoading: false,
      tagDrawVisible: false,
      searchParams: {
        page: 1,
        name: '',
        is_hide: [],
        order: ''
      },
      tagList: [],
      total: 0,
      tagRowData: {},
      typeMappingList: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取列表
    async fetchData() {
      this.listLoading = true
      const res = await getTagList(this.searchParams)
      this.listLoading = false
      if (res.code === 1) {
        this.tagList = res.data.data
        this.total = res.data.total
      }
    },
    // 搜索
    search() {
      this.searchLoading = true
      this.fetchData()
      this.searchLoading = false
    },
    // 删除
    async deleteTag(id) {
      const res = await tagDel({ id: id })
      if (res.code === 1) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
      }
      this.fetchData()
    },
    // 翻页
    currentChange(page) {
      this.searchParams.page = page
      this.fetchData()
    },
    // 打开编辑抽屉
    openTagDrawer(tagRow) {
      this.tagRowData = tagRow
      this.tagDrawVisible = true
    }
  }
}
</script>
<style lang="scss">

</style>
