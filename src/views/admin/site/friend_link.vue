<template>
  <div class="link-container app-container">
    <el-row>
      <el-col :span="4">
        <el-button type="success" class="mb-20" @click="openTagDrawer({})">新增链接</el-button>
      </el-col>
      <el-col :span="20" />
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          border
          stripe
          :data="links"
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
            label="名称"
            align="center"
          />
          <el-table-column
            prop="link"
            label="链接"
            align="center"
          />
          <el-table-column
            prop="level"
            label="排序"
            align="center"
          />
          <el-table-column
            label="操作"
            align="center"
            width="250px"
          >
            <template slot-scope="{row}">
              <el-button type="primary" size="small" @click="openTagDrawer(row)">编辑</el-button>
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="deleteLink(row.id)"
              >
                <el-button slot="reference" type="danger" size="small">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>
    <editTag :visible.sync="drawVisible" :row-data.sync="rowData" @fetchData="friendLinks" />
  </div>
</template>

<script>
import { getFriendLinks, deleteFriendLink } from '../../../api/site'
import editTag from './components/edit'

export default {
  name: 'FriendLink',
  components: {
    editTag
  },
  data() {
    return {
      links: [
        {
          name: '',
          link: '',
          level: ''
        }
      ],
      drawVisible: false,
      rowData: {}
    }
  },
  created() {
    this.friendLinks()
  },
  methods: {
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
    },
    // 打开编辑抽屉
    openTagDrawer(row) {
      this.rowData = row
      this.drawVisible = true
    },
    async deleteLink(id) {
      const result = await deleteFriendLink({ id: id })
      this.$message({
        message: result.msg,
        type: result.code === 1 ? 'success' : 'error'
      })
      this.friendLinks()
    }
  }
}
</script>

<style scoped lang="scss">
    .link-container{

    }
</style>
