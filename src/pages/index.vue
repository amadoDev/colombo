<template>
  <div class="init-page">
    <page-title class="page-title" />
    <search-engine class="search-engine" />
  </div>
</template>

<script>
import PageTitle from '~/components/common/Title.vue'
import SearchEngine from '~/components/home/SearchEngine.vue'

export default {
  components: {
    PageTitle,
    SearchEngine
  },
  layout(context) {
    return 'cover'
  }
}
</script>

<style lang="scss">
.init-page {
  width: 100%;
  position: relative;
  .page-title {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    display: block;
    animation: hide 2s ease-out;
    z-index: 0;
  }
  .search-engine {
    animation: show 3.4s ease-out;
    opacity: 1;
    z-index: 1;
    position: relative;
  }
}

@keyframes hide {
  0% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes show {
  0% {
    z-index: 0;
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    z-index: 1;
  }
}
</style>
