<template>
  <el-drawer
    :title="title"
    :visible.sync="visible"
    :before-close="leave"
    direction="rtl"
  >
    <div class="tag-box">
      <el-form ref="tagData" :model="tagData" :rules="tagDataRules">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="tagData.name" class="tag-input" />
        </el-form-item>
        <el-form-item label="标签状态" prop="is_hide">
          <el-select v-model="tagData.is_hide" placeholder="请选择状态">
            <statusComponent />
          </el-select>
        </el-form-item>
        <el-form-item label="标签类型" prop="type">
          <el-select v-model="tagData.type" placeholder="请选择状态">
            <typeMapping />
          </el-select>
        </el-form-item>
        <el-form-item label="标签排序" prop="order">
          <el-input v-model="tagData.order" type="number" min="1" max="128" class="tag-input" placeholder="请选择排序等级" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import statusComponent from '../../components/status'
import typeMapping from './typeMapping'
import { tagSave } from '../../../../api/tag'

export default {
  name: 'EditTag',
  components: {
    statusComponent,
    typeMapping
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
      parentTags: [],
      tagDataRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        is_hide: [
          { required: true, message: '是否隐藏不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'blur' }
        ],
        order: [
          { required: true, message: '排序不能为空', trigger: 'blur' }
        ]
      }
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
    submit() {
      this.$refs.tagData.validate((valid) => {
        if (valid) {
          try {
            tagSave(this.tagData).then(({ code, msg }) => {
              if (code === 1) {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.$emit('fetchData')
              }
            })
          } catch (e) {
            this.$message({
              message: e.message,
              type: 'error'
            })
          }
        } else {
          return false
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
.tag-box {
    padding:20px;
    .tag-input {
        width: 80%;
    }
}
</style>
