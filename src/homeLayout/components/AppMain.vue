<template>
  <el-row class="app-main">
    <el-col :span="5">
      &nbsp;
    </el-col>
    <el-col :span="13">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-top: 20px;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
