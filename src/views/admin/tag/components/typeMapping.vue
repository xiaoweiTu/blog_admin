<template>
  <div>
    <el-option v-for="(name, index) in statusMappingList" :key="index" :label="name" :value="Number(index)" />
  </div>
</template>

<script>
import { getTagType } from '../../../../api/status'

export default {
  name: 'TypeMapping',
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
      const res = await getTagType()
      if (res.code === 1) {
        this.statusMappingList = res.data
      }
    }
  }
}
</script>

<style scoped>

</style>
