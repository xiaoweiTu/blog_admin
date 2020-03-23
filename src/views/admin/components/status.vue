<template>
  <div>
    <el-option v-for="(name, index) in statusMappingList" :key="index" :label="name" :value="Number(index)" />
  </div>
</template>

<script>
import { getStatus } from '../../../api/status'

export default {
  name: 'Status',
  data() {
    return {
      statusMappingList: {}
    }
  },
  created() {
    this.getStatusMapping()
  },
  methods: {
    async getStatusMapping() {
      const res = await getStatus()
      if (res.code === 1) {
        this.statusMappingList = res.data
      }
    }
  }
}
</script>

<style scoped>

</style>
