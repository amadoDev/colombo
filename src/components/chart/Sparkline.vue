<script>
import { Line } from 'vue-chartjs'
import { hexToRGB } from '~/scripts/utils.js'

export default {
  extends: Line,
  props: {
    dataset: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            borderWidth: 1
          }
        },
        legend: false,
        tooltips: false,
        layout: {
          padding: 2
        },
        scales: {
          yAxes: [
            {
              display: false,
              gridLines: {
                drawTicks: false
              },
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              display: false,
              gridLines: {
                drawTicks: false
              }
            }
          ]
        }
      },
      defaultSet: {
        fill: true,
        pointStyle: 'circle',
        pointRadius: 2,
        pointBackgroundColor: '#FFFFFF',
        pointBorderWidth: 1
      },
      chartData: {
        labels: [],
        datasets: []
      }
    }
  },
  mounted() {
    this.createChart()
  },

  methods: {
    createChart() {
      this.createData()
      this.renderChart(this.chartData, this.chartOptions)
    },
    createData() {
      this.chartData.datasets.push({
        ...this.defaultSet,
        ...{
          data: this.dataset,
          backgroundColor: this.createGradient('#45BEDE'),
          borderColor: '#45BEDE',
          pointBorderColor: '#45BEDE'
        }
      })
      this.chartData.labels = this.dataset.map((x, i) => i + 1)
    },
    createGradient(color) {
      const gradient = this.$refs.canvas
        .getContext('2d')
        .createLinearGradient(0, 0, 0, 55)
      gradient.addColorStop(0, hexToRGB(color, 0.8))
      gradient.addColorStop(1, hexToRGB(color, 0))
      return gradient
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';
.sparkline-container {
  height: 55px;
  width: 180px;
}
</style>
