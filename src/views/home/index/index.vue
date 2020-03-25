<template>
  <el-row class="index-container">
    <el-col :span="24">
        <div class="poster">
          <div class="icon-name">
            <img src="http://qiniu.txwei.cn/Fut1P7edmWvCqvm5mztihRpOzQzO" alt="" class="icon">
            <span class="name">{{ site_name }}</span>
          </div>
          <div class="desc">{{ site_desc }}</div>
          <div class="tags">
              <el-tooltip class="tag-item tag-active" effect="dark" content="LaravelLaravelLaravelLaravelLaravel" placement="top">
                <el-button>LaravelLaravelLaravelLaravelLaravel</el-button>
              </el-tooltip>
            <i class="el-icon-caret-bottom more-tags"></i>
          </div>
        </div>
        <div class="content">
            <div class="item">
              <img src="http://qiniu.txwei.cn/Fut1P7edmWvCqvm5mztihRpOzQzO" alt="" class="item-icon">
              <div class="item-content">
                <p class="title">
                  <i class="el-icon-star-on"></i>
                  如何如何如何如何如何如何如何如何如何如何
                </p>
                <p class="desc">
                  如何如何如何如何如何如何如何如何如何如何
                </p>
                <p>
                  <span>10秒前</span>
                  <span>
                    <i class="el-icon-view"></i>
                    <span>50</span>
                  </span>
                </p>
              </div>
            </div>
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
  border-radius: 5px;
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
    overflow: hidden;
    height: 50px;
    padding: 0 55px;
    background-color: #fff;
    position: absolute;
    bottom: -25px;
    left: 50%;
    margin-left: -200px;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
    .tag-item {
      display: inline-block;
      line-height: 50px;
      padding:0 5px;
      width: 90px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .more-tags {
      display: inline-block;
      position: absolute;
      right: 10px;
      top: 15px;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
.content {
  height: 600px;
  background-color: #fff;
  margin-top: 50px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  .item-icon {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .item-content {
    display: inline-block;
  }
}

</style>
