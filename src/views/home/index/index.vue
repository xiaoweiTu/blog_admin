<template>
  <el-row class="index-container">
    <el-col :span="24">
        <div class="poster">
          <div class="icon-name">
            <img src="http://qiniu.txwei.cn/Fut1P7edmWvCqvm5mztihRpOzQzO" alt="" class="icon">
            <span class="name">{{ site_name }}</span>
          </div>
          <div class="desc">{{ site_desc }}</div>
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
      'site_name',
      'site_desc'
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
  height: 350px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  position: relative;
  .icon-name {
    position: absolute;
    top:100px;
    left:50%;
    width: 400px;
    margin-left: -200px;
    color: #fff;
    .icon {
      width: 100px;
      height: 100px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      display: inline-block;
      vertical-align: top;
    }
    .name {
      font-size: 60px;
      display: inline-block;
      height: 100px;
      line-height: 100px;
      margin-left: 35px;
    }
  }
  .desc {
    position: absolute;
    bottom: 80px;
    color: #fff;
    display: block;
    text-align: center;
    width: 100%;
    font-size: 26px;
  }
  .tags {
    width: 400px;
    height: 50px;
    background-color: #fff;
  }
}
</style>
