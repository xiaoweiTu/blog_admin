<template>
  <div>
    <el-option v-for="(name, index) in typeMappingList" :key="index" :label="name" :value="Number(index)" />
  </div>
</template>

<script>
import { getType } from '../../../api/status'

export default {
  name: 'Status',
  data() {
    return {
      typeMappingList: {}
    }
  },
  created() {
    this.getTypeMapping()
  },
  methods: {
    async getTypeMapping() {
      const res = await getType()
      if (res.code === 1) {
        this.typeMappingList = res.data
      }
    }
  }
}
</script>

<style scoped>

</style>
