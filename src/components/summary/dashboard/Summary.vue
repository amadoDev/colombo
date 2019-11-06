<template>
  <div class="summary">
    <div
      v-for="(element, index) in report"
      :key="'summary' + index"
      class="summary-box-item"
    >
      <box
        v-if="element.advancedResult"
        :route-to="element.routeTo"
        :button-text="$t('see_details')"
        class="box-advanced"
      >
        <template slot="before">
          <div class="box-section">
            <h3 class="box-title">{{ element.title }}</h3>
            <rate :result="element.result" class="box-result" />
            <div class="box-text">
              {{ element.text }}
            </div>
          </div>
          <div class="box-section">
            <h3 class="box-title">{{ element.advanced.title }}</h3>
            <rate :result="element.advancedResult" class="box-result" />
            <div class="box-text">
              {{ element.advanced.text }}
            </div>
          </div>
        </template>
      </box>
      <box
        v-else
        v-show="element.result"
        :title="element.title"
        :result="element.result"
        :text="element.text"
        :route-to="element.routeTo"
        :button-text="$t('see_details')"
        class="box-wrapper"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Box from '~/components/Box'
import Rate from '~/components/Rate'

export default {
  components: {
    Box,
    Rate
  },
  data() {
    return {
      report: [
        {
          title: this.$t('web_summary_title'),
          result: '',
          advancedResult: '',
          text: this.$t('web_optimization_desc'),
          routeTo: 'summary-web',
          advanced: {
            title: this.$t('contents'),
            text: this.$t('content_optimization_desc')
          }
        },
        {
          title: this.$t('search_summary_title'),
          result: '',
          advancedResult: '',
          text: this.$t('search_optimization_desc'),
          routeTo: 'summary-search',
          advanced: {
            title: this.$t('competence'),
            text: this.$t('competitors_optimization_desc')
          }
        },
        {
          title: this.$t('rrss_optimization_title'),
          result: '',
          text: this.$t('rrss_optimization_desc'),
          routeTo: 'summary-rrss'
        },
        {
          title: this.$t('seo_optimization_title'),
          result: '',
          text: this.$t('seo_optimization_desc'),
          routeTo: 'summary-seo'
        },
        {
          title: `<abbr title='Pay per click'>${this.$t(
            'ppc_optimization_title'
          )}</abbr>`,
          result: '',
          text: this.$t('ppc_optimization_desc'),
          routeTo: 'summary-ppc'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      summary: 'summary/summary'
    })
  },

  mounted() {
    const report = this.summary
    if (report.summary) {
      this.createReport(report.summary)
    }
  },

  methods: {
    createReport(report) {
      const web = this.report.find(el => el.routeTo === 'summary-web')
      const search = this.report.find(el => el.routeTo === 'summary-search')
      const rrss = this.report.find(el => el.routeTo === 'summary-rrss')
      const seo = this.report.find(el => el.routeTo === 'summary-seo')
      const ppc = this.report.find(el => el.routeTo === 'summary-ppc')

      if (report.WebOptimizationBox !== 'not-analyzed') {
        web.result = report.WebOptimizationBox
      }
      if (report.ContentOptimizationBox !== 'not-analyzed') {
        web.advancedResult = report.ContentOptimizationBox
      }
      if (report.SearchOptimizationBox !== 'not-analyzed') {
        search.result = report.SearchOptimizationBox
      }
      if (report.SearchCompetitorsBox !== 'not-analyzed') {
        search.advancedResult = report.SearchCompetitorsBox
      }
      if (report.SocialNetworksOptimizationBox !== 'not-analyzed') {
        rrss.result = report.SocialNetworksOptimizationBox
      }
      if (report.LocalSeoBox !== 'not-analyzed') {
        seo.result = report.LocalSeoBox
      }
      if (report.PayPerClickBox !== 'not-analyzed') {
        ppc.result = report.PayPerClickBox
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';

.summary {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
  padding-bottom: 30px;
  position: relative;
}

.box-wrapper {
  width: 350px;
  margin: 0 15px 30px;
}
</style>
