<template>
  <el-row class="foot-container">
    <el-col :span="4">
      &nbsp;
    </el-col>
    <el-col :span="16">
      <div class="site-record">
        {{ site_record }}
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Foot',
  computed: {
    ...mapGetters([
      'site_record'
    ])
  }
}
</script>

<style scoped lang="scss">
.foot-container {
  background-color: #36292F;
  height: 60px;
  border-radius: 4px;
  .site-record{
    color: #bfcbd9;
    font-size: 12px;
    text-align: center;
    margin-top: 25px;
  }
}
</style>
