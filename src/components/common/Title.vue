<template>
  <h1 class="page-title">
    <span class="page-title-light">A</span>
    <span class="page-title-light">N</span>
    <span class="page-title-light">Á</span>
    <span class="page-title-regular">L</span>
    <span class="page-title-regular">I</span>
    <span class="page-title-regular">S</span>
    <span class="page-title-regular">I</span>
    <span class="page-title-regular word-break">S</span>
    <span class="page-title-bold">W</span>
    <span class="page-title-bold">E</span>
    <span class="page-title-bold">B</span>
  </h1>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars';

.page-title {
  margin: auto;
  font-size: 76px;
  color: $white;
  .page-title-light {
    font-weight: 300;
  }
  .page-title-regular {
    font-weight: 500;
  }
  .page-title-bold {
    font-weight: 700;
  }
  .word-break {
    margin-right: 32px;
  }
  span {
    letter-spacing: -4px;
  }
}
</style>
