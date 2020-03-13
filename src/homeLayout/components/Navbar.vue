<template>
  <el-row class="navbar">
    <el-col :span="4">&nbsp;</el-col>
    <el-col :span="16">
      <el-row>
        <el-col :span="6">
          <div class="site-logo height-50" @click="goHome">
            <img :src="site_icon_url" alt="icon" class="site-icon">
            <div class="site-name">{{ site_name }}</div>
          </div>
        </el-col>
        <el-col :span="18" class="height-50">
            <div class="time-line fr" @click="goTimeline">
              时光机
            </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="4" >
      <el-button v-if="token" class="go-admin" @click="goAdmin" >前往控制台</el-button>
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
      'site_owner',
      'site_icon_url',
      'token'
    ])
  },
  updated() {
    document.title = this.site_name
    document.getElementById('site-icon').setAttribute('href', this.site_icon_url)
    document.getElementById('site-owner').setAttribute('href', this.site_owner)
    document.getElementById('site-desc').setAttribute('href', this.site_desc)
  },
  methods: {
    goHome() {
      this.$router.push({ path: '/' })
    },
    goAdmin() {
      this.$router.push({ path: '/admin' })
    },
    goTimeline() {
      this.$router.push({ name: 'timeline' })
    }
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
    padding-top: 5px;
    color: #888888;
    .site-icon{
      width: 40px;
      height: 40px;
      display: inline-block;
      vertical-align: top;
      cursor: pointer;
    }
      .site-name{
        font-size: 20px;
        display: inline-block;
        height: 40px;
        position: relative;
        line-height: 40px;
      }
      .site-desc{
        font-size: 12px;
        margin-left: 20px;
        font-style: italic;
      }
  }
  .go-admin {
    margin-top: 5px;
  }
  .height-50 {
    height: 50px;
  }
}

.time-line {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #777;
  font-weight: 400;
  cursor: pointer;
  padding: 0 10px;
}
.time-line:hover,.el-dropdown:hover {
  background-color: rgba(0,0,0,0.1);
  color: black;
}
</style>
