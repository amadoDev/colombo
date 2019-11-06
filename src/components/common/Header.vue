<template>
  <header class="header">
    <div class="header-wrapper">
      <h1 class="header-page-title">
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
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars';

.header {
  background-color: $black;
  color: $white;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

.header-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.header-page-title {
  text-align: left;
  font-size: 22px;
  line-height: 2.8;
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
    margin-right: 8px;
  }
}
</style>
