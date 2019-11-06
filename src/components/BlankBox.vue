<template>
  <div class="blank-box">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars';
.blank-box {
  background-color: $white;
  padding: 26px 30px;
  border-radius: 2px;
  box-shadow: 1px 1px 10px 0px rgba(42, 45, 49, 1);
}
</style>
