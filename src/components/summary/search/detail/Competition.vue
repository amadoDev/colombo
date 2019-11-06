<template>
  <div class="competition">
    <div
      v-for="(chart, index) in charts"
      :key="'chart' + index"
      class="competition-chart"
    >
      <chart
        :ref="chart.ref"
        :title="chart.title"
        :dataset="chart.dataset1"
        :dataset2="chart.dataset2"
        :dataset3="chart.dataset3"
        :dataset4="chart.dataset4"
      />
    </div>
    <div class="competition-table">
      <info-table :headers="table.headers" :rows="table.rows" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatValue } from '~/scripts/utils.js'
import InfoTable from '~/components/Table.vue'
import Chart from '~/components/chart/Chart.vue'

export default {
  components: {
    InfoTable,
    Chart
  },
  data() {
    return {
      competition: [
        {
          label: this.$t('domain_registration'),
          key: 'domainRegistration'
        },
        // temporarily disabled until Mozscape is updated
        // {
        //   label: this.$t('alexa_rank'),
        //   key: 'alexaRank'
        // },
        // {
        //   label: this.$t('moz_domain_authority'),
        //   key: 'mozDomainAuthority'
        // },
        {
          label: this.$t('keywords_num'),
          key: 'keywordsNum'
        },
        {
          label: this.$t('back_links_num'),
          key: 'backLinksNum'
        },
        {
          label: this.$t('back_links_with_follow_num'),
          key: 'backLinksWithFollowNum'
        },
        {
          label: this.$t('back_links_no_follow_num'),
          key: 'backLinksNoFollowNum'
        },
        {
          label: this.$t('back_links_domains_num'),
          key: 'backLinksDomainsNum'
        },
        {
          label: this.$t('back_Links_differents_ips'),
          key: 'backLinksDifferentsIps'
        },
        {
          label: this.$t('back_links_score'),
          key: 'backLinksScore'
        },
        {
          label: this.$t('back_links_trust_score'),
          key: 'backLinksTrustScore'
        }
      ],
      table: {
        headers: ['Campo'],
        rows: []
      },
      charts: [
        {
          title: this.$t('keywords_evolution'),
          dataset1: {},
          dataset2: {},
          dataset3: {},
          dataset4: {},
          key: 'semrushKeywordsEvolution',
          ref: 'chart1'
        },
        {
          title: this.$t('organic_traffic_evolution'),
          dataset1: {},
          dataset2: {},
          dataset3: {},
          dataset4: {},
          key: 'semrushOrganicTrafficEvolution',
          ref: 'chart2'
        },
        {
          title: this.$t('estimation_price_organic_traffic_evolution'),
          dataset1: {},
          dataset2: {},
          dataset3: {},
          dataset4: {},
          key: 'semrushEstimationPriceOrganicTrafficEvolution',
          ref: 'chart3'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      summary: 'summary/summary',
      analysisField: 'form/analysisField',
      website: 'website/website'
    }),
    domains() {
      const websites = []
      websites.push(this.website.url)
      if (this.analysisField('competitor_url1').value) {
        websites.push(this.analysisField('competitor_url1').value)
      }
      if (this.analysisField('competitor_url2').value) {
        websites.push(this.analysisField('competitor_url2').value)
      }
      if (this.analysisField('competitor_url3').value) {
        websites.push(this.analysisField('competitor_url3').value)
      }
      return websites
    }
  },

  mounted() {
    const { boxes } = this.summary
    this.setInitialData(boxes.SearchCompetitorsBox)
  },

  methods: {
    setInitialData(report) {
      this.setTableLabels()
      debugger
      this.domains.forEach((url, index) => {
        if (report.domains.hasOwnProperty(url)) {
          this.setChartData(report.domains[url], url, index + 1)
          this.setTableData(report.domains[url], url)
        }
      })
      for (const ref in this.$refs) {
        if (this.$refs.hasOwnProperty(ref)) {
          this.$refs[ref][0].createChart()
        }
      }
    },

    setChartData(domain, url, index) {
      this.charts.forEach(chart => {
        if (domain.semrush.hasOwnProperty(chart.key)) {
          chart[`dataset${index}`].label = url
          chart[`dataset${index}`].data = domain.semrush[chart.key].value
        }
      })
    },

    setTableData(domain, url) {
      this.table.headers.push(url)
      this.competition.forEach((row, i) => {
        const properties = {
          ...domain.webAnalyzer,
          ...domain.semrush
        }
        if (properties.hasOwnProperty(row.key)) {
          this.table.rows[i].push(formatValue(properties[row.key].value))
        } else {
          this.table.rows[i].push(0)
        }
      })
    },

    setTableLabels() {
      this.competition.forEach((row, i) => {
        if (!this.table.rows[i]) {
          this.table.rows[i] = []
        }
        this.table.rows[i].push(row.label)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.competition-chart {
  margin-bottom: 30px;
}
</style>
