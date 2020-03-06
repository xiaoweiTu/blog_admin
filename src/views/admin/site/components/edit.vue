<template>
  <el-drawer
    :title="title"
    :visible.sync="visible"
    :before-close="leave"
    direction="rtl"
  >
    <div class="box">
      <el-form ref="rowData" :model="rowData" :rules="rowRules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="rowData.name" placeholder="请输入名称" class="input" />
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="rowData.link" placeholder="请输入链接" class="input" />
        </el-form-item>
        <el-form-item label="排序" prop="level">
          <el-input v-model="rowData.level" type="number" min="1" max="128" placeholder="请输入排序" class="input" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { saveFriendLink } from '../../../../api/site'

export default {
  name: 'EditTag',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    rowData: [Object]
  },
  data() {
    return {
      rowRules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '链接必填', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '排序必填', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title() {
      if (this.rowData) {
        return '编辑链接'
      } else {
        return '新增链接'
      }
    }
  },
  created() {},
  methods: {
    submit() {
      this.$refs.rowData.validate((valid) => {
        if (valid) {
          if (this.rowData.level < 0 || this.rowData.level > 128) {
            this.$message({
              message: '排序不可小于0或者大于128!',
              type: 'error'
            })
            return
          }
          saveFriendLink(this.rowData).then(({ code, data, msg }) => {
            this.$message({
              message: msg,
              type: code === 1 ? 'success' : 'error'
            })
            this.$emit('fetchData')
          })
        }
      })
    },
    leave() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
    .box {
        padding:20px;
        .input {
            width: 80%;
        }
    }
</style>
