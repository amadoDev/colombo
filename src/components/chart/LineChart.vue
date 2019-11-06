<script>
import { Line } from 'vue-chartjs'
import { splitDate, hexToRGB } from '~/scripts/utils.js'

export default {
  extends: Line,
  props: {
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
    selectedChart: {
      type: Number,
      default: null
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
      defaultSet: {
        fill: true,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: '',
        pointStyle: 'circle',
        pointRadius: 4,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '',
        pointBorderWidth: 2,
        hitRadius: 3
      },
      chartData: {
        labels: [],
        datasets: []
      },
      chartOptions: {
        resposive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: 'point',
          intersect: true,
          backgroundColor: '#2A2D31',
          bodyFontFamily: '"Poppins", sans-serif',
          bodyFontSize: 14,
          bodyFontColor: '#FFFFFF',
          bodyFontStyle: '600',
          opacity: 1,
          cornerRadius: 2,
          displayColors: false,
          yAlign: 'bottom',
          xAlign: 'center',
          xPadding: 10,
          yPadding: 5,
          callbacks: {
            label(tooltipItem) {
              return tooltipItem.yLabel
            },
            title() {}
          }
        },
        hover: {
          mode: 'nearest',
          intersect: false,
          onHover: this.mouseEnterPoints
        },
        legend: false,
        scales: {
          xAxes: [
            {
              color: '#EDEDED',
              gridLines: {
                color: '#EDEDED',
                drawTicks: false
              },
              ticks: {
                fontColor: '#2A2D31',
                fontFamily: '"Poppins", sans-serif',
                fontSize: 12,
                fontStyle: 500,
                padding: 18
              }
            }
          ],
          yAxes: [
            {
              color: '#EDEDED',
              gridLines: {
                color: '#EDEDED',
                drawTicks: false
              },
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
                fontColor: '#2A2D31',
                fontFamily: '"Poppins", sans-serif',
                fontSize: 12,
                fontStyle: 500,
                padding: 18
              }
            }
          ]
        },
        legendCallback: this.getLegendData
      }
    }
  },

  computed: {
    setData() {
      return { ...this.chartData, ...this.customData }
    },
    setOptions() {
      return { ...this.chartOptions, ...this.customOptions }
    },
    monthList() {
      return [
        this.$t('short_months.jan'),
        this.$t('short_months.feb'),
        this.$t('short_months.mar'),
        this.$t('short_months.apr'),
        this.$t('short_months.may'),
        this.$t('short_months.jun'),
        this.$t('short_months.jul'),
        this.$t('short_months.aug'),
        this.$t('short_months.sep'),
        this.$t('short_months.oct'),
        this.$t('short_months.nov'),
        this.$t('short_months.dec')
      ]
    },
    lastTwelveMonths() {
      return this.createLastTwelveMonths()
    },
    colors() {
      return [
        {
          hex: '#45BEDE',
          gradient: this.createGradient('#45BEDE')
        },
        {
          hex: '#3FE18C',
          gradient: this.createGradient('#3FE18C')
        },
        {
          hex: '#FC5298',
          gradient: this.createGradient('#FC5298')
        },
        {
          hex: '#FD8D64',
          gradient: this.createGradient('#FD8D64')
        }
      ]
    }
  },

  watch: {
    selectedChart(index) {
      this.updateChartSelection(index)
    }
  },
  methods: {
    createChart() {
      this.createData()
      this.renderChart(this.setData, this.setOptions)
      this.$emit('generated', this.$data._chart.generateLegend())
    },
    createData() {
      this.chartData.labels = this.createLabels(this.dataset.data)
      this.chartData.datasets.push(
        this.createDataset(
          this.dataset.data,
          this.dataset.label,
          this.colors[0].hex
        )
      )
      if (this.dataset2.hasOwnProperty('data')) {
        this.chartData.datasets.push(
          this.createDataset(
            this.dataset2.data,
            this.dataset2.label,
            this.colors[1].hex
          )
        )
      }
      if (this.dataset3.data) {
        this.chartData.datasets.push(
          this.createDataset(
            this.dataset3.data,
            this.dataset3.label,
            this.colors[2].hex
          )
        )
      }
      if (this.dataset4.data) {
        this.chartData.datasets.push(
          this.createDataset(
            this.dataset4.data,
            this.dataset4.label,
            this.colors[3].hex
          )
        )
      }
    },

    createLabels(dataObject) {
      const labels = []
      this.formatDataset(dataObject, elem => {
        labels.push(elem.label)
      })
      return labels.reverse()
    },

    createDataset(dataObject, label, color) {
      const data = []
      this.formatDataset(dataObject, elem => {
        data.push(elem.value)
      })
      return {
        ...this.defaultSet,
        ...{
          label: label,
          data: data.reverse(),
          borderColor: color,
          pointBorderColor: color
        }
      }
    },

    formatDataset(dataObject, callback) {
      if (!dataObject) return false
      this.lastTwelveMonths.forEach(elem => {
        const date = splitDate(elem)
        const object = {
          key: elem,
          month: date.month,
          label: this.translateMonth(date.month),
          value: ''
        }
        object.value = dataObject[elem] || null
        callback(object)
      })
    },

    createLastTwelveMonths() {
      let current = new Date().setDate(15)
      const LastTwelveMonths = []
      let counter = 0
      while (counter < 12) {
        current = new Date(current)
        current.setMonth(current.getMonth() - 1)
        LastTwelveMonths.push(this.formatDateStringYYDDMM(current))
        counter++
      }
      return LastTwelveMonths
    },

    formatDateStringYYDDMM(date) {
      date = new Date(date)
      return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0]
    },

    getLegendData(chart) {
      const legendData = []
      for (let i = 0; i < chart.data.datasets.length; i++) {
        const elem = chart.data.datasets[i]
        const interpolation = elem.data.some(elem => {
          return elem === null
        })
        legendData.push({
          label: interpolation ? `${elem.label}*` : elem.label,
          color: elem.borderColor
        })
      }
      return legendData
    },

    mouseEnterPoints(e) {
      const firstPoint = this.$data._chart.getElementAtEvent(e)[0]
      const index = firstPoint ? firstPoint._datasetIndex : null
      this.updateChartSelection(index)
    },

    updateChartSelection(index) {
      this.$data._chart.data.datasets.forEach((elem, i) => {
        elem.backgroundColor =
          index === i ? this.colors[i].gradient : 'rgba(0,0,0,0)'
      })
      this.$data._chart.update(0)
    },

    createGradient(color) {
      const gradient = this.$refs.canvas
        .getContext('2d')
        .createLinearGradient(0, 0, 0, 450)
      gradient.addColorStop(0, hexToRGB(color, 0.6))
      gradient.addColorStop(0.2, hexToRGB(color, 0.3))
      gradient.addColorStop(0.6, hexToRGB(color, 0))
      return gradient
    },

    translateMonth(month) {
      return this.monthList[parseInt(month, 10) - 1]
    }
  }
}
</script>

<style lang="scss">
@import '~assets/css/vars';
.chart-legend-box {
  display: inline-block;
  width: 27px;
  height: 6px;
  border-radius: 4px;
  vertical-align: middle;
  margin-right: 5px;
}
.chart-legend-text {
  font-size: 15px;
  font-weight: 500;
}
</style>
