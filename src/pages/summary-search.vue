<template>
  <div class="detail-page">
    <upload-button />
    <navigator :route-to="route.to" :route-text="route.text" />
    <section-title :title="title" class="detail-title" />
    <div class="detail-rate">
      <span class="detail-rate-title">{{ $t('average_rate') }}</span>
      <rate :result="position.rate" class="detail-rate-value" />
    </div>
    <div class="detail-description">
      <p>
        Gracias al análisis de posicionamiento SEO que realizamos, podemos
        analizar el número de keywords posicionadas y potencialmente
        optimizables de la página web. Además, calculamos el índice de
        visibilidad del dominio y la credibilidad/calidad que tiene para Google
        la página web. Una visión analítica que permite mostrar las
        oportunidades y mejoras del dominio web.
      </p>
    </div>
    <competition />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navigator from '~/components/common/Navigator'
import SectionTitle from '~/components/common/SectionTitle.vue'
import Competition from '~/components/summary/search/Competition.vue'
import Rate from '~/components/Rate'
import UploadButton from '~/components/summary/UploadReportButton'

export default {
  components: {
    Navigator,
    SectionTitle,
    Competition,
    Rate,
    UploadButton
  },
  data() {
    return {
      route: {
        to: 'summary',
        text: this.$t('back')
      },
      title: this.$t('search_summary_title'),
      position: {
        rate: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      summary: 'summary/summary'
    })
  },

  mounted() {
    const { summary } = this.summary
    this.createPositionBlock(summary)
  },

  methods: {
    createPositionBlock(report) {
      const { SearchOptimizationBox } = report
      this.position.rate = SearchOptimizationBox
      if (report.SearchCompetitorsBox !== 'not-analyzed') {
        this.title = `${this.$t('search_summary_title')} + ${this.$t(
          'competence'
        )}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';
.detail-page {
  text-align: left;
  padding-bottom: 170px;
}

.detail-title {
  margin-bottom: 24px;
}

.detail-description {
  color: $white;
  font-size: 15px;
  margin-bottom: 20px;
  line-height: 22px;
  > * {
    font-size: 15px;
  }
}

.detail-rate {
  margin-bottom: 14px;
}

.detail-rate-title {
  font-size: 14px;
  margin-bottom: 4px;
  color: $white;
  display: block;
}

.detail-rate-value {
  font-size: 14px;
  color: $success;
  display: block;
  font-size: 24px;
  font-weight: 600;
}
</style>
