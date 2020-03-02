<template>
  <div class="app-container">
    <el-row class="tag-header">
      <el-col :span="16">
        <el-form inline :model="searchParams">
          <el-form-item>
            <el-input v-model="searchParams.tag_name" placeholder="标签名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchParams.tag_type" placeholder="请选择标签类型" multiple filterable clearable>
              <el-option v-for="(typeItem,key) of typeMappings" :key="key" :label="typeItem" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchParams.tag_status" placeholder="请选择状态" multiple filterable clearable>
              <el-option v-for="(statusItem,key) of statusMappings" :key="key" :label="statusItem" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchParams.tag_level" placeholder="排序等级"></el-input>
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
          >
          </el-table-column>
          <el-table-column
                  prop="tag_name"
                  label="标签名称"
                  align="center"
          >
            <template slot-scope="{row}">
              <el-tag :type="row.tag_type | statusFilter">{{ row.tag_name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
                  prop="status_name"
                  label="标签状态"
                  align="center"
          >
            <template slot-scope="{row}">
              <el-tag :type="row.tag_status | statusFilter">{{ row.status_name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
                  prop="tag_type_name"
                  label="标签类型"
                  align="center"
          >
            <template slot-scope="{row}">
              <el-tag :type="row.tag_type | statusFilter">{{ row.tag_type_name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
                  prop="tag_level"
                  label="标签等级"
                  align="center"
          >
          </el-table-column>
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
                @current-change="currentChange" >
        </el-pagination>

        <editTag :visible.sync="tagDrawVisible" :tag-data.sync="tagRowData" @fetchData="fetchData"></editTag>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTagList, tagDel } from '../../api/tag'
import { getStatusMapping, getTypeMapping } from '../../api/status'
import editTag from './components/edit'

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
    editTag
  },
  data() {
    return {
      listLoading: false,
      searchLoading: false,
      tagDrawVisible: false,
      searchParams: {
        page: 1,
        tag_type: [],
        tag_name: '',
        tag_status: [],
        tag_level: ''
      },
      tagList: [],
      typeMappings: [],
      statusMappings: [],
      total: 0,
      tagRowData: {}
    }
  },
  created() {
    this.fetchData()
    this.typeMapping()
    this.statusMapping()
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
      const res = await tagDel({ tag_id: id })
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
    // 类型映射
    typeMapping() {
      try {
        getTypeMapping().then(({ code, data }) => {
          if (code === 1) {
            this.typeMappings = data
          }
        })
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    // 状态映射
    statusMapping() {
      try {
        getStatusMapping().then(({ code, data }) => {
          if (code === 1) {
            this.statusMappings = data
          }
        })
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
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
