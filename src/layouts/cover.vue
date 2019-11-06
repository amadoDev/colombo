<template>
  <div class="cover-page">
    <header-bar class="header-bar" />
    <div class="wrapper">
      <nuxt />
    </div>
    <img class="qdq-logo" src="~/assets/img/qdqmedia.png" alt="qdq media" />
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
.cover-page {
  height: 100vh;
  text-align: center;
  background-image: url('~assets/img/cover.png');
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  &:after {
    content: '';
    background-color: $dark-grey;
    opacity: 0.9;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    z-index: 2;
    justify-content: center;
  }
}
.qdq-logo {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  margin: auto;
  z-index: 1;
}

.header-bar {
  animation: show 3.4s ease-out;
  opacity: 1;
}

@keyframes show {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
