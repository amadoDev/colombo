<template>
  <div class="share">
    <button class="share-button" @click="share">
      {{ $t('share_report') }}
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    share() {
      this.$emit('share')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';
.share {
  display: flex;
  width: 100%;
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
}

.share-button {
  text-transform: uppercase;
  background-color: $primary;
  color: $white;
  font-weight: 600;
  font-size: 18px;
  height: 54px;
  flex: 1 1;
  cursor: pointer;
}
</style>
