<template>
  <el-row class="navbar">
    <el-col :span="11" :offset="5">
      <a class="nav-item " href="javascript:;" :class="curName == 'home' ? 'clicked' : ''" @click="goHome">
        <span>首页</span>
      </a>
      <a class="nav-item " href="javascript:;" :class="curName == 'homeTalks' ? 'clicked' : ''" @click="goTalks">
        <span>留言墙</span>
      </a>
    </el-col>
    <el-col :span="3">
      <p class="logged-name">
        <el-dropdown v-if="name && email" @command="handleMenu">
          <el-button size="small">
            {{ name }}<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">个人中心</el-dropdown-item>
            <el-dropdown-item v-if="is_admin === 1" command="2">前往控制台</el-dropdown-item>
            <el-dropdown-item command="3">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button v-else size="small" @click="goLogin">登录</el-button>
      </p>
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
      'name',
      'is_admin',
      'email',
      'id'
    ]),
    curName() {
      return this.$route.name
    }
  },
  methods: {
    goLogin() {
      this.$router.push({ name: 'userLogin' })
    },
    goHome() {
      this.$router.push({ name: 'home' })
    },
    goTalks() {
      this.$router.push({ name: 'homeTalks' })
    },
    handleMenu(item) {
      switch (parseInt(item)) {
        case 1:
          this.$router.push({ name: 'homeUser', params: { id: this.id }})
          break
        case 2:
          this.$router.push({ name: 'dashboard' })
          break
        case 3:
          this.$store.dispatch('user/logout').then(() => {
            this.$message({
              message: '成功',
              type: 'success'
            })
          }).catch(() => {
            this.$message({
              message: '失败',
              type: 'error'
            })
          })
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  a {
    color: #fff;
  }
.navbar {
  height: 50px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  .login-wrap {
    text-align: right;
    margin: 0;
    line-height: 50px;
  }
  .logged-name {
    text-align: right;
    margin: 0;
    line-height: 50px;
  }
  .nav-item {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    margin-top: 5px;
    padding:0 10px;
    &:hover {
      border-bottom: 2px solid white;
    }
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
      font-size: 12px;
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
