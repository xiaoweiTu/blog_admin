<template>
  <div class="app-wrapper">
    <navbar />
    <app-main />
    <foot />
  </div>
</template>

<script>
import { Navbar, Foot, AppMain } from './components'
import { mapActions } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Foot,
    AppMain
  },
  created() {
    this.getHomeSettings()
  },
  methods: {
    ...mapActions('site', [
      'getHomeSettings'
    ])
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper{
  background-color: #f0f2f5;
  .back-top{
    position: fixed;
  }
}
</style>
