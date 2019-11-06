<template>
  <div class="detail-page">
    <upload-button />
    <navigator :route-to="route.to" :route-text="route.text" />
    <section-title :title="title" class="detail-title" />
    <div class="detail-rate">
      <span class="detail-rate-title">{{ $t('character') }}</span>
      <rate result="informative" class="detail-rate-value" />
    </div>
    <div class="detail-description">
      <p>
        Análisis actividad campañas de publicidad SEM: anuncios en Google Ads,
        inversión en publicidad de Facebook Ads y campañas de Llamadas en
        Google. Según el resultado, estimación oportunidades de captación de
        leads a través de una estrategia SEM.
      </p>
    </div>
    <ppc />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navigator from '~/components/common/Navigator'
import SectionTitle from '~/components/common/SectionTitle.vue'
import Ppc from '~/components/summary/ppc/Ppc.vue'
import Rate from '~/components/Rate'
import UploadButton from '~/components/summary/UploadReportButton'

export default {
  components: {
    Navigator,
    SectionTitle,
    Ppc,
    Rate,
    UploadButton
  },
  data() {
    return {
      route: {
        to: 'summary',
        text: this.$t('back')
      },
      title: `<abbr title="Pay per Click">${this.$t(
        'ppc_optimization_title'
      )}</abbr>`
    }
  },
  computed: {
    ...mapGetters({
      summary: 'summary/summary'
    })
  },
  mounted() {
    const { summary } = this.summary
    if (!summary.PayPerClickBox) {
      this.redirect()
    }
  },
  methods: {
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
</style>
