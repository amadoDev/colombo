<template>
  <h2 class="section-title" v-html="title" />
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';

.section-title {
  color: $white;
  font-size: 32px;
  font-weight: 600;
  line-height: 24px;
  margin: 40px 0 50px;
}
</style>
