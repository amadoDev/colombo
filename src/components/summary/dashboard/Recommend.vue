<template>
  <div class="recommend">
    <span class="title">{{ title }}</span>
    <ul class="recommend-list">
      <li
        v-for="(item, index) in list"
        :key="index"
        class="recommend-list-item"
      >
        <recommend-item :name="item.name" :result="item.result" />
      </li>
    </ul>
  </div>
</template>

<script>
import RecommendItem from '~/components/summary/dashboard/RecommendItem'

export default {
  components: {
    RecommendItem
  },
  props: {
    title: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';
.title {
  font: {
    weight: 600;
    size: 24px;
  }
  color: $white;
  text-align: left;
  display: block;
  border: {
    width: 1px;
    style: none none solid;
    color: $white;
  }
  padding-bottom: 8px;
}
.recommend-list {
  display: flex;
  justify-content: flex-start;
  margin-top: 46px;
}
.recommend-list-item {
  flex: 0 1 auto;
  width: 100px;
  &:not(:first-child) {
    margin-left: 8px;
  }
}
</style>
