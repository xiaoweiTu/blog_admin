<template>
  <el-row class="navbar">
    <el-col :span="11" :offset="5">
      <a class="nav-item clicked" href="/">
        <span>首页</span>
      </a>
    </el-col>
    <el-col :span="3">
      <div class="search">
        <input type="text" class="search-input">
        <i class="el-icon-search search-icon"></i>
      </div>
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
  .search {
    display: inline-block;
    margin-top: 12px;
    width: 86%;
    vertical-align: top;
    .search-input {
      background-color: #393737;
      border: none;
      border-radius: 10px;
      height: 26px;
      width: 96%;
      outline: none;
      padding-left: 10px;
      padding-right: 25px;
      color: #fff;
    }
    .search-icon {
      margin-left: -25px;
      cursor: pointer;
    }
  }
  .user-icon {
    display: inline-block;
    height: 30px;
    margin-top: 10px;
    font-size: 26px;
  }
}
@media only screen and (min-width: 1100px) {
  .navbar .search {
    width: 80%;
  }
}
@media only screen and (min-width: 1300px) {
  .navbar .search {
    width: 81%;
  }
}
@media only screen and (min-width: 1600px)  {
  .navbar .search {
    width: 84%;
  }
}
@media only screen and (min-width: 1900px)  {
  .navbar .search {
    width: 86%;
  }
}
</style>
