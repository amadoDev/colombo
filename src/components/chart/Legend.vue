<template>
  <div class="chart-legend">
    <ul>
      <li
        v-for="(item, index) in legendElems"
        :key="'chart-legend' + index"
        @touchstart="$emit('legend-touch', index)"
        @mouseover="$emit('legend-mouseover', index)"
        @mouseleave="$emit('legend-mouseleave')"
      >
        <span
          :style="{ 'background-color': item.color }"
          class="chart-legend-box"
        />
        <span class="chart-legend-text">{{ item.label }}</span>
      </li>
    </ul>
    <p v-if="checkInterpolation()" class="chart-legent-interpolation">
      *Texto explicativo zona sin datos
    </p>
  </div>
</template>

<script>
export default {
  props: {
    legendElems: {
      type: Array,
      required: true
    }
  },

  methods: {
    checkInterpolation() {
      return this.legendElems.some(elem => {
        return elem.label.includes('*')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-legend {
  margin-top: 12px;
  li {
    display: inline-block;
    list-style: none;
    cursor: pointer;
    &:not(:first-child) {
      margin-left: 20px;
    }
  }
}
.chart-legent-interpolation {
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
}
</style>
