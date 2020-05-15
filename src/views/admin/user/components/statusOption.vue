<template>
  <div>
    <el-option label="正常" :value="0" />
    <el-option label="小黑屋" :value="1" />
    <el-option label="禁言" :value="2" />
    <el-option label="黑名单" :value="3" />
  </div>
</template>

<script>
export default {
  name: 'StatusOption'
}
</script>

<style scoped>

</style>
