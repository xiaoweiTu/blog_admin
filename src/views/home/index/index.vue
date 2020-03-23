<template>
  <el-row class="index-container">
    <el-col :span="24">
        <div class="poster">
          <div class="icon-name">
            <img src="http://qiniu.txwei.cn/Fut1P7edmWvCqvm5mztihRpOzQzO" alt="" class="icon">
            <span class="name"></span>
          </div>
          <div class="desc"></div>
          <div class="tags"></div>
        </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
    ])
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.poster {
  background-color: #000;
  height: 400px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  position: relative;
  .icon-name {
    position: absolute;
    top:50px;
    left:50%;
    width: 150px;
    margin-left: -75px;
    .icon {
      width: 60px;
      height: 60px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
    }
  }
}
</style>
