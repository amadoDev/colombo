<template>
  <span :class="rate.class" class="report-rate">
    {{ rate.text }}
  </span>
</template>

<script>
export default {
  props: {
    result: {
      type: String,
      default: null
    }
  },
  data: () => ({
    rate: {
      text: '',
      class: ''
    }
  }),
  mounted() {
    this.$watch(
      'result',
      result => {
        this.setRate(result)
      },
      {
        immediate: true
      }
    )
  },
  methods: {
    setRate(result) {
      switch (result) {
        case 'medium':
          this.rate.text = this.$t('avg_improbable')
          this.rate.class = 'improbable'
          break
        case 'low':
          this.rate.text = this.$t('avg_bad')
          this.rate.class = 'bad'
          break
        case 'high':
          this.rate.text = this.$t('avg_good')
          this.rate.class = 'good'
          break
        case 'informative':
          this.rate.text = this.$t('avg_report')
          this.rate.class = 'report'
          break
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';

.report-rate {
  text-transform: uppercase;
  font-size: 32px;
  font-weight: 600;
  line-height: 24px;
  &.improbable {
    color: $warning;
  }
  &.good {
    color: $success;
  }
  &.bad {
    color: $danger;
  }
  &.report {
    color: $medium-grey;
  }
}
</style>
