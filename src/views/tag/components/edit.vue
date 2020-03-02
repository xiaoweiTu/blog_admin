<template>
    <el-drawer
            :title="title"
            :visible.sync="visible"
            :before-close="leave"
            direction="rtl"
    >
        <div class="tag-box">
            <el-form :model="tagData">
                <el-form-item label="标签名称" prop="tag_name" >
                    <el-input v-model="tagData.tag_name" class="tag-input"></el-input>
                </el-form-item>
                <el-form-item label="标签类型" prop="tag_type">
                    <el-select v-model="tagData.tag_type" placeholder="请选择标签类型">
                        <el-option v-for="(typeItem,key) of typeMappings" :key="key"  :label="typeItem" :value="Number(key)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签状态" prop="tag_status">
                    <el-select v-model="tagData.tag_status" placeholder="请选择状态">
                        <el-option v-for="(statusItem,key) of statusMappings" :key="key" :label="statusItem" :value="Number(key)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签排序" prop="tag_level">
                    <el-input v-model="tagData.tag_level" type="number" min="1" max="128" class="tag-input" placeholder="请选择排序等级"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="submit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-drawer>
</template>

<script>
import { getTypeMapping, getStatusMapping } from '../../../api/status'
import { tagSave } from '../../../api/tag'

export default {
  name: 'EditTag',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    tagData: [Object]
  },
  data() {
    return {
      typeMappings: [],
      statusMappings: [],
    }
  },
  computed: {
    title() {
      return this.tagData.id ? '编辑Tag' : '新增Tag'
    }
  },
  created() {
    console.log(this.tagData)
    this.typeMapping()
    this.statsMapping()
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
    async submit() {
      if (this.tagData.tag_name === undefined) {
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
