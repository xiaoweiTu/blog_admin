<template>
  <el-row class="navbar">
    <el-col :span="12" :offset="4">
      <a class="nav-item clicked" href="/">
        <span>首页</span>
      </a>
    </el-col>
    <el-col :span="4">
      <el-input placeholder="" class="nav-search">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <i class="el-icon-user-solid user-icon"></i>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  data() {
    return {
      series: []
    }
  },
  computed: {
    ...mapGetters([
      'site_name',
      'site_desc',
      'site_author',
      'site_keyword',
      'site_icon_url'
    ])
  },
  updated() {
    document.title = this.site_name
    document.getElementById('site-icon').setAttribute('href', this.site_icon_url)
    document.getElementById('site-author').content = this.site_owner
    document.getElementById('site-desc').content = this.site_desc
    document.getElementById('site-keywords').content = this.site_keyword
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  .nav-item {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    margin-top: 5px;
  }
  .clicked {
    border-bottom: 2px solid white;
  }
  .nav-search {
    margin-top: 10px;
    width: 65%;
    vertical-align: top;
  }
  .user-icon {
    display: inline-block;
    height: 30px;
    margin-top: 10px;
    font-size: 26px;
  }
}
</style>
