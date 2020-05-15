<template>
  <div>
    <Talks :is-article="false" />
  </div>
</template>

<script>
import Talks from '../components/talkList'
export default {
  name: 'Index',
  components: {
    Talks
  }
}
</script>

<style scoped>

</style>
