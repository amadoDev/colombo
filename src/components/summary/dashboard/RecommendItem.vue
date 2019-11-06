<template>
  <div :class="result" class="recommend-item">
    <span class="circle">{{ initial }}</span>
    <span class="name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'RecommendItem',
  props: {
    name: {
      type: String,
      required: true
    },
    result: {
      type: String,
      default: ''
    }
  },
  computed: {
    initial() {
      return this.name.charAt(0).toUpperCase()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';
.recommend-item {
  display: inline-block;
  text-align: center;
}
.name {
  display: block;
  color: $medium-grey;
  text-transform: uppercase;
  margin-top: 18px;
  line-height: 1.5;
}
.circle {
  display: inline-block;
  padding: 14px;
  width: 60px;
  height: 60px;
  color: $medium-grey;
  border: {
    radius: 50%;
    width: 3px;
    color: $medium-grey;
    style: solid;
  }
  box-shadow: 0 0 4px 2px rgba($white, 0.1);
}
.recommended {
  .name {
    color: $primary;
  }
  .circle {
    color: $primary;
    border-color: $primary;
    box-shadow: 0 0 10px 1px rgba($white, 0.3);
  }
}
.possible {
  .name {
    color: $white;
  }
  .circle {
    color: $white;
    border-color: $white;
    box-shadow: 0 0 10px 1px rgba($white, 0.3);
  }
}
</style>
