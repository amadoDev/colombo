<template>
  <div :class="customClass" class="box-wrapper">
    <div class="box-content">
      <slot name="before" />
      <h3 v-if="title" class="box-title" v-html="title" />
      <rate
        v-if="result && !unprocessedData"
        :result="result"
        class="box-result"
      />
      <div v-if="text" class="box-text">{{ text }}</div>
      <!-- <div class="unprocessed-text">
        <p>sin procesar</p>
        <span>Actualice el informe o refresque la página</span>
      </div> -->
      <slot name="after" />
    </div>
    <nuxt-link v-if="routeTo" :to="localePath(routeTo)" class="box-link">{{
      buttonText
    }}</nuxt-link>
  </div>
</template>

<script>
import Rate from '~/components/Rate'

export default {
  components: {
    Rate
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    routeTo: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: ''
    },
    customClass: {
      type: String,
      default: ''
    },
    result: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },

  computed: {
    unprocessedData() {
      return this.value === null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';
.box-wrapper {
  text-align: center;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 1px 1px 10px 0px rgba(42, 45, 49, 1);
}
.box-content {
  display: flex;
  flex-direction: column;
  background-color: $white;
  padding: 40px 30px;
  height: 304px;
}
.box-title {
  font: {
    size: 28px;
    weight: 600;
  }
  color: $dark-grey;
  line-height: 1.3;
}
.box-text {
  font: {
    size: 15px;
  }
  color: $text;
  margin-top: 5px;
}
.box-link {
  display: flex;
  height: 54px;
  align-items: center;
  justify-content: center;
  color: $white;
  background-color: $primary;
  text: {
    transform: uppercase;
    decoration: none;
  }
  font: {
    size: 18px;
    weight: 600;
  }
  &:hover,
  &:focus {
    background-color: darken($primary, 10%);
  }
}

.box-result {
  font-size: 32px;
  font-weight: 600;
  line-height: 24px;
  text-transform: uppercase;
  margin: 20px 0;
  display: block;
}

.box-analysis {
  .box-title {
    height: 72px;
    overflow: hidden;
  }
}

.box-advanced {
  .box-content {
    height: 660px;
    background-color: #f7f7f7;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      background-color: $white;
      height: 304px;
      z-index: 1;
    }
    &:after {
      content: '';
      position: absolute;
      top: 304px;
      left: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 50px 175px 0 175px;
      border-color: $white transparent transparent transparent;
    }
  }
  .box-section {
    z-index: 2;
    height: auto;
    &:first-child {
      height: 360px;
    }
  }
}

.box-detail-optimization {
  .box-content {
    min-height: 360px;
  }
  .box-title {
    min-height: 72px;
  }
  .box-result {
    margin-bottom: 13px;
  }
  .box-text {
    margin-bottom: 0;
  }
}

.box-section {
  height: 360px;
}

.unprocessed-text {
  margin-top: 15px;
  p {
    text-transform: uppercase;
    color: $medium-grey;
    font-size: 32px;
    font-weight: 600;
    line-height: 24px;
  }
  span {
    display: block;
    font-size: 14px;
    line-height: 1.2;
    margin-top: 5px;
  }
}
</style>
