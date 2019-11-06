<template>
  <div class="chart">
    <div class="chart-header">
      <span class="chart-title">{{ title }}</span>
      <span class="chart-info-text">{{ infoText }}</span>
    </div>
    <line-chart
      ref="lineChart"
      :dataset="dataset"
      :dataset2="dataset2"
      :dataset3="dataset3"
      :dataset4="dataset4"
      :class="'chart-container'"
      :selected-chart="selectedChart"
      @generated="getLegendData"
    />
    <chart-legend
      :legend-elems="legendData"
      @legend-touch="selectedChart = $event"
      @legend-mouseover="selectedChart = $event"
      @legend-mouseleave="selectedChart = null"
    />
    <div v-if="!checkData()" class="no-data">
      No disponible
    </div>
  </div>
</template>

<script>
import LineChart from '~/components/chart/LineChart'
import ChartLegend from '~/components/chart/Legend'
export default {
  components: {
    LineChart,
    ChartLegend
  },
  props: {
    title: {
      type: String,
      required: true
    },
    infoText: {
      type: String,
      default() {
        return this.$t('last_twelve_months')
      }
    },
    dataset: {
      type: Object,
      default() {
        return {}
      }
    },
    dataset2: {
      type: Object,
      default() {
        return {}
      }
    },
    dataset3: {
      type: Object,
      default() {
        return {}
      }
    },
    dataset4: {
      type: Object,
      default() {
        return {}
      }
    },
    customData: {
      type: Object,
      default() {
        return {}
      }
    },
    customOptions: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      legendData: [],
      selectedChart: null
    }
  },
  methods: {
    getLegendData(data) {
      this.legendData = data
    },
    createChart() {
      const vm = this
      vm.$refs.lineChart.createChart()
    },
    checkData() {
      return (
        this.dataset.data ||
        this.dataset2.data ||
        this.dataset3.data ||
        this.dataset4.data
      )
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/vars';
.chart {
  background-color: $white;
  padding: 30px 30px 20px;
  position: relative;
}
.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 30px;
}
.chart-title {
  font-weight: 500;
  font-size: 15px;
}
.chart-info-text {
  font-weight: 500;
  font-size: 12px;
  margin-right: 10px;
}
.chart-container {
  height: 300px;
}
.no-data {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $border-grey;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 60px;
  padding-bottom: 6px;
}
</style>
