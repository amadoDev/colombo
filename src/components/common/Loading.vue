<template>
  <div v-if="loading" class="loading">
    <div class="loading-bar" />
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';

.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  padding-top: 60px;
  overflow: hidden;
  z-index: 10;
  background-color: rgba($black, 0.3);
}

.loading-bar {
  animation: load 2.6s infinite;
  background: #999;
  height: 2px;
  position: relative;
}

@keyframes load {
  0% {
    left: -100%;
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}
</style>
