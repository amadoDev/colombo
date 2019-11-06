<template>
  <div class="detail-page">
    <upload-button />
    <navigator :route-to="route.to" :route-text="route.text" />
    <section class="optimization-section">
      <section-title :title="optimization.title" />
      <div class="section-rate">
        <span class="section-rate-title">{{ $t('average_rate') }}</span>
        <rate :result="optimization.rate" class="section-rate-value" />
      </div>
      <p class="section-description">
        {{ optimization.description }}
      </p>
      <div class="optimization-list">
        <div
          v-for="(element, index) in optimization.list"
          :key="'analisys' + index"
          class="optimization-list-item"
        >
          <box
            :title="element.name"
            :text="element.text"
            :result="element.result"
            custom-class="box-detail-optimization"
            class="box-wrapper"
          />
        </div>
      </div>
    </section>

    <section v-if="contents.enabled" class="optimization-section">
      <section-title :title="contents.title" />
      <div class="section-rate">
        <span class="section-rate-title">{{ $t('average_rate') }}</span>
        <rate :result="contents.rate" class="section-rate-value" />
      </div>
      <p class="section-description">{{ contents.description }}</p>
      <contents-table ref="contentsTable" />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navigator from '~/components/common/Navigator'
import SectionTitle from '~/components/common/SectionTitle'
import Box from '~/components/Box'
import Rate from '~/components/Rate'
import UploadButton from '~/components/summary/UploadReportButton'
import ContentsTable from '~/components/summary/web/ContentsTable'

export default {
  components: {
    Navigator,
    SectionTitle,
    Box,
    Rate,
    UploadButton,
    ContentsTable
  },
  data() {
    return {
      route: {
        to: 'summary',
        text: this.$t('back')
      },
      optimization: {
        title: this.$t('web_summary_title'),
        description: `Análisis de la estructura y contenidos de la página web empresarial. Elementos a tener en cuenta: velocidad de carga, optimización estructura web acorde a los parámetros de Google, adaptación diseño a dispositivos móviles, ordenación de los datos y usabilidad, ratio código/texto, calidad contenidos web.`,
        rate: '',
        list: [
          {
            name: this.$t('desktop_optimization_google'),
            result: '',
            text:
              'Nivel de adaptación de la estructura web en desktop a los parámetros requeridos por Google para un buen posicionamiento orgánico SEO',
            key: 'pageSpeedDesktop'
          },
          {
            name: this.$t('mobile_optimization_google'),
            result: 'good',
            text:
              'Nivel de adaptación de la estructura web en móvil a los parámetros requeridos por Google para un buen posicionamiento orgánico SEO',
            key: 'pageSpeedMobile'
          },
          {
            name: this.$t('responsive_page'),
            result: '',
            text:
              'Análisis de la adaptabilidad del diseño web a los diferentes formatos de pantalla: desktop, tablet o móvil. Este aspecto es esencial para mejorar el posicionamiento y la relevancia de la web en los resultados de búsqueda de Google',
            key: 'responsive'
          },
          {
            name: this.$t('structured_data'),
            result: '',
            text:
              'Nivel de estructuración de datos web. Los datos estructurados sirven para señalar que parte del contenido de la página web es relevante para los usuarios online, y por lo tanto, para los resultados de búsqueda de Google',
            key: 'structuredData'
          },
          {
            name: this.$t('text_code_ratio'),
            result: '',
            text:
              'Proporción existente entre el texto (contenido) de una página frente a la cantidad de código que se emplea para mostrar dicha web. Se recomienda tener entre 30%-70% de contenidos web',
            key: 'codeToTextRatio'
          }
        ]
      },
      contents: {
        title: this.$t('contents'),
        description:
          'Tipos de contenidos de la página web. Análisis de los niveles básicos que debe cumplir una página web para ganar posicionamiento en Google y mejorar la captación de clientes a través de internet',
        rate: '',
        enabled: true
      }
    }
  },
  computed: {
    ...mapGetters({
      summary: 'summary/summary'
    })
  },
  mounted() {
    const { summary, boxes } = this.summary
    this.createWebBlock({ summary, boxes })
    if (summary.ContentOptimizationBox !== 'not-analyzed') {
      this.createWebContent({ summary, boxes })
    } else {
      this.contents.enabled = false
    }
  },
  methods: {
    createWebBlock(report) {
      const { webAnalysis } = report.boxes.WebOptimizationBox
      const { WebOptimizationBox } = report.summary
      this.optimization.rate = WebOptimizationBox
      this.optimization.list.forEach(element => {
        element.result = webAnalysis[element.key].result
      })
    },
    createWebContent(report) {
      const vm = this
      const { ContentOptimizationBox } = report.summary
      const {
        contentOptimizationQuestions
      } = report.boxes.ContentOptimizationBox
      this.contents.rate = ContentOptimizationBox
      vm.$refs.contentsTable.setInitialData(contentOptimizationQuestions)
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
.section-rate {
  display: flex;
  flex-direction: column;
  margin-top: -26px;
}
.section-rate-title {
  font: {
    size: 14px;
  }
  color: $white;
}
.section-rate-value {
  font-size: 24px;
  margin-top: 4px;
}
.section-description {
  color: $white;
  font-size: 15px;
  margin-top: 16px;
  margin-bottom: 0;
}
.optimization-list {
  display: grid;
  grid-gap: 30px;
  margin: 24px auto 0;
  grid-template-columns: repeat(3, 1fr);
}
.box-wrapper {
  text-align: left;
}
.box-content {
  height: 360px;
}
</style>
