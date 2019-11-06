<template>
  <div class="generators">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars';
.generators {
  display: flex;
  width: 100%;
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
}

.generator-button {
  text-transform: uppercase;
  background-color: $primary;
  color: $white;
  font-weight: 600;
  font-size: 18px;
  height: 54px;
  flex: 1 1;
  cursor: pointer;
  &:not(:first-child) {
    border-left: 2px solid $white;
  }
}
</style>
