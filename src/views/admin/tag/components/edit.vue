<template>
  <el-drawer
    :title="title"
    :visible.sync="visible"
    :before-close="leave"
    direction="rtl"
  >
    <div class="tag-box">
      <el-form :model="tagData">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="tagData.name" class="tag-input" />
        </el-form-item>
        <el-form-item label="标签类型" prop="type">
          <el-select v-model="tagData.type" placeholder="请选择标签类型">
            <typeComponent />
          </el-select>
        </el-form-item>
        <el-form-item label="标签状态" prop="status">
          <el-select v-model="tagData.status" placeholder="请选择状态">
            <statusComponent />
          </el-select>
        </el-form-item>
        <el-form-item label="标签排序" prop="level">
          <el-input v-model="tagData.level" type="number" min="1" max="128" class="tag-input" placeholder="请选择排序等级" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { tagSave } from '../../../../api/tag'
import statusComponent from '../../components/status'
import typeComponent from '../../components/type'

export default {
  name: 'EditTag',
  components: {
    statusComponent,
    typeComponent
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    tagData: [Object]
  },

  data() {
    return {
    }
  },
  computed: {
    title() {
      return this.tagData.id ? '编辑标签' : '新增标签'
    }
  },
  created() {
  },
  methods: {
    async submit() {
      if (this.tagData.name === undefined) {
        this.$message({
          message: '标签名称不能为空!',
          type: 'error'
        })
        return false
      }
      const res = await tagSave(this.tagData)
      if (res.code === 1) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$emit('fetchData')
      }
    },
    leave() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
.tag-box {
    padding:20px;
    .tag-input {
        width: 80%;
    }
}
</style>
