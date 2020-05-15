<template>
  <el-dialog
    title="编辑"
    :visible="show"
    width="30%"
    :destroy-on-close="true"
    :close-on-press-escape="true"
    :close-on-click-modal="true"
    center
  >
    <el-form ref="row" :model="row" label-position="left">
      <el-form-item label-width="150px" label="昵称" align="left" prop="name">
        <el-input v-model="row.name" type="text" />
      </el-form-item>
      <el-form-item label-width="150px" label="邮箱" align="left" prop="email">
        <el-input v-model="row.email" type="text" />
      </el-form-item>
      <el-form-item label-width="150px" label="状态" align="left" prop="icon">
        <el-select v-model="row.status" placeholder="状态">
          <StatusOption />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="editPost">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import StatusOption from './statusOption'
import { edit } from '../../../../api/user'

export default {
  name: 'EditDialog',
  components: {
    StatusOption
  },
  props: {
    show: [Boolean],
    row: [Object]
  },
  methods: {
    close() {
      this.$emit('closeDialog')
    },
    async editPost() {
      const result = await edit(this.row)
      if (result.code === 1) {
        this.$emit('getUserList')
        this.$emit('closeDialog')
      }
      this.$message({
        message: result.msg,
        type: result.code === 1 ? 'success' : 'error'
      })
    }
  }
}
</script>

<style scoped>

</style>
