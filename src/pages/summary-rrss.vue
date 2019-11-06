<template>
  <div class="detail-page">
    <upload-button />
    <navigator :route-to="route.to" :route-text="route.text" />
    <section-title :title="title" class="detail-title" />
    <div class="detail-rate">
      <span class="detail-rate-title">{{ $t('average_rate') }}</span>
      <rate :result="rate" class="detail-rate-value" />
    </div>
    <div class="detail-description">
      <p>
        Nivel de presencia digital del negocio en redes sociales, directorios
        empresariales y sistemas de navegación online.
      </p>
    </div>
    <rrss />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navigator from '~/components/common/Navigator'
import SectionTitle from '~/components/common/SectionTitle.vue'
import Rrss from '~/components/summary/rrss/Rrss.vue'
import Rate from '~/components/Rate'
import UploadButton from '~/components/summary/UploadReportButton'

export default {
  components: {
    Navigator,
    SectionTitle,
    Rrss,
    Rate,
    UploadButton
  },
  data() {
    return {
      route: {
        to: 'summary',
        text: this.$t('back')
      },
      title: this.$t('rrss_optimization_title'),
      rate: '',
      reportLink: '#'
    }
  },
  computed: {
    ...mapGetters({
      summary: 'summary/summary'
    })
  },
  mounted() {
    const { summary, boxes } = this.summary
    this.setInitialData({ summary, boxes })
  },
  methods: {
    setInitialData(report) {
      const { SocialNetworksOptimizationBox } = report.summary
      if (!SocialNetworksOptimizationBox) {
        this.redirect()
      }
      this.rate = SocialNetworksOptimizationBox
    },
    redirect() {
      this.$router.push(this.localePath('summary'))
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

.detail-see-report {
  color: $white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  text-decoration: none;
  border-bottom: 5px solid $primary;
  padding: 4px 0;
  display: inline-flex;
  align-items: center;
  margin-bottom: 30px;
}

.detail-see-text {
  margin-right: 8px;
}
</style>
