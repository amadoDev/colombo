<template>
  <div class="content-page">
    <header-bar />
    <div class="wrapper">
      <nuxt />
      <img class="qdq-logo" src="~/assets/img/qdqmedia.png" alt="qdq media" />
    </div>
  </div>
</template>
<script>
import HeaderBar from '~/components/common/Header.vue'
export default {
  components: {
    HeaderBar
  }
}
</script>

<style lang="scss">
@import '~assets/css/vars';
.page-title {
  margin-top: 100px;
}
.content-page {
  min-height: 100vh;
  text-align: center;
  background-image: url('~assets/img/ux-bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  &:after {
    content: '';
    background-color: $dark-grey;
    opacity: 0.75;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    z-index: 2;
    min-height: 100vh;
  }
}
.qdq-logo {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 80px;
  margin: auto;
  z-index: 1;
}
</style>
