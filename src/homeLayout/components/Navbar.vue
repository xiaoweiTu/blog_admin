<template>
  <el-row class="navbar">
    <el-col :span="4">&nbsp;</el-col>
    <el-col :span="16">
      <el-row>
        <el-col :span="6">
          <div class="site-logo">
            <img :src="site_icon_url" alt="icon" class="site-icon">
            <div class="site-name-box">
              <div class="site-name">{{ site_name }}</div>
              <div class="site-desc">{{ site_desc }}----{{ site_owner }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="4" />
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Foot',
  computed: {
    ...mapGetters([
      'site_name',
      'site_desc',
      'site_owner',
      'site_icon_url'
    ])
  },
  updated() {
    document.title = this.site_name
    document.getElementById('site-icon').setAttribute('href', this.site_icon_url)
    document.getElementById('site-owner').setAttribute('href', this.site_owner)
    document.getElementById('site-desc').setAttribute('href', this.site_desc)
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  margin-bottom: 40px;
  width: 100%;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  border-radius: 4px;
  .site-logo{
    height: 50px;
    padding-top: 5px;
    color: #888888;
    .site-icon{
      width: 40px;
      height: 40px;
      display: inline-block;
      vertical-align: top;
    }
    .site-name-box{
      display: inline-block;
      height: 40px;
      position: relative;
      .site-name{
        font-size: 20px;
        font-style: oblique;
      }
      .site-desc{
        font-size: 12px;
        margin-left: 20px;
        font-style: italic;
      }
    }
  }
}
</style>
