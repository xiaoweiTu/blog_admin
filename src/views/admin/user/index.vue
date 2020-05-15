<template>
  <div class="app-container">
    <el-row>
      <el-col :span="20">
        <el-form ref="search" :inline="true" :model="search">
          <el-form-item>
            <el-date-picker
              v-model="search.created_at"
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
            <el-input v-model="search.name" type="text" placeholder="用户名称" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="search.email" type="text" placeholder="用户邮箱" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="search.status" multiple clearable placeholder="用户状态">
              <StatusOption></StatusOption>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="search.is_admin" placeholder="是否管理员" multiple filterable clearable>
              <IsAdminOption></IsAdminOption>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button v-loading="searchLoading" type="success" icon="el-icon-search" @click="getUserList">搜索</el-button>
        <el-button type="danger">重置</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          border
          stripe
          :data="users"
          style="width: 100%"
        >
          <el-table-column
            prop="created_at"
            label="创建日期"
            align="center"
            width="100px"
          />
          <el-table-column
            prop="name"
            label="昵称"
            align="center"
          />
          <el-table-column
            prop="email"
            label="邮箱"
            align="center"
          />
          <el-table-column
            prop="status_name"
            label="状态"
            align="center"
          />
          <el-table-column
            prop="is_admin_name"
            label="是否管理员"
            align="center"
          >
            <template slot-scope="{row}">
              <el-tag :type="row.is_admin | statusFilter">{{ row.is_admin_name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="last_login"
            label="上次登录时间"
            align="center"
          />
          <el-table-column
            prop="last_ip_address"
            label="上次登录IP"
            align="center"
          />
          <el-table-column
            label="操作"
            align="center"
            width="250px"
          >
            <template slot-scope="{row}">
              <el-button type="primary" size="small" @click="openEditDialog(row)">编辑</el-button>
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
    <EditDialog :show.sync="showEditDialog" :row="editData" @closeDialog="showEditDialog = false" @getUserList="getUserList"></EditDialog>
  </div>
</template>
<script>
import { userList } from '../../../api/user'
import EditDialog from './components/editDialog'
import StatusOption from './components/statusOption'
import IsAdminOption from './components/isAdminOption'
export default {
  name: 'Index',
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
    EditDialog,
    StatusOption,
    IsAdminOption
  },
  data() {
    return {
      search: {
        page: 1
      },
      users: [],
      editData: {},
      searchLoading: false,
      total: 0,
      showEditDialog: false
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      this.searchLoading = true
      const result = await userList(this.search)
      this.searchLoading = false
      if (result.code === 1) {
        this.users = result.data.data
        this.total = result.data.total
      }
    },
    currentChange(page) {
      this.search.page = page
    },
    openEditDialog(row) {
      this.editData = row
      this.showEditDialog = true
    }
  }
}
</script>

<style scoped>

</style>
