<template>
  <div class="position">
    <div class="position-chart">
      <chart ref="chart" :title="chart.title" :dataset="chart.dataset" />
    </div>
    <div class="position-grid">
      <div
        v-for="(item, index) in position"
        :key="'detail' + index"
        class="position-item"
      >
        <blank-box class="position-card">
          <span class="title">{{ item.title }}</span>
          <span class="value">{{ item.value }}</span>
        </blank-box>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatValue } from '~/scripts/utils.js'
import BlankBox from '~/components/BlankBox.vue'
import Chart from '~/components/chart/Chart.vue'

export default {
  components: {
    BlankBox,
    Chart
  },
  data() {
    return {
      position: [
        {
          title: this.$t('domain_registration'),
          value: '',
          key: 'domainRegistration'
        },
        // temporarily disabled until Mozscape is updated
        // {
        //   title: this.$t('alexa_rank'),
        //   value: '',
        //   key: 'alexaRank'
        // },
        // {
        //   title: this.$t('moz_domain_authority'),
        //   value: '',
        //   key: 'mozDomainAuthority'
        // },
        {
          title: this.$t('keywords_num'),
          value: '',
          key: 'keywordsNum'
        },
        {
          title: this.$t('back_links_num'),
          value: '',
          key: 'backLinksNum'
        },
        {
          title: this.$t('back_links_with_follow_num'),
          value: '',
          key: 'backLinksWithFollowNum'
        },
        {
          title: this.$t('back_links_no_follow_num'),
          value: '',
          key: 'backLinksNoFollowNum'
        },
        {
          title: this.$t('back_links_domains_num'),
          value: '',
          key: 'backLinksDomainsNum'
        },
        {
          title: this.$t('back_Links_differents_ips'),
          value: '',
          key: 'backLinksDifferentsIps'
        },
        {
          title: this.$t('back_links_score'),
          value: '',
          key: 'backLinksScore'
        },
        {
          title: this.$t('back_links_trust_score'),
          value: '',
          key: 'backLinksTrustScore'
        }
      ],
      chart: {
        title: this.$t('keywords_evolution'),
        dataset: {},
        key: 'semrushKeywordsEvolution'
      }
    }
  },
  computed: {
    ...mapGetters({
      summary: 'summary/summary',
      website: 'website/website'
    })
  },
  mounted() {
    const { boxes } = this.summary
    this.setInitialData(boxes.SearchOptimizationBox)
  },
  methods: {
    setInitialData(report) {
      this.position.forEach(element => {
        if (report.semrush.hasOwnProperty(element.key)) {
          element.value = formatValue(report.semrush[element.key].value)
        }
        if (report.webAnalyzer.hasOwnProperty(element.key)) {
          const val = report.webAnalyzer[element.key].value
          element.value = formatValue(val)
        }
      })

      if (report.semrush.hasOwnProperty(this.chart.key)) {
        this.chart.dataset.label = this.website.url
        this.chart.dataset.data = report.semrush[this.chart.key].value
        this.$refs.chart.createChart()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';
.position-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
  .position-item {
    flex: 1 1;
    padding: 0 15px 30px;
    min-width: 33.33%;
    max-width: 33.33%;
  }
}

.position-card {
  height: 150px;
  display: flex;
  flex-direction: column;
  .title {
    display: block;
    font-weight: 600;
    font-size: 24px;
    color: $dark-grey;
    line-height: 30px;
  }
  .value {
    display: block;
    font-weight: 600;
    font-size: 32px;
    line-height: 32px;
    color: $primary;
    margin-top: auto;
  }
}

.position-chart {
  margin-bottom: 30px;
}
</style>
