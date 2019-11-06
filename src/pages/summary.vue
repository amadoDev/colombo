<template>
  <div :class="{ restricted: restrictedMode }" class="summary-page">
    <upload-button />
    <navigator :route-to="route.to" :route-text="route.text" />
    <section-title :title="title" />
    <div
      :class="{ 'summary-recommend': !showModule('showRecommendation') }"
      class="summary"
    >
      <summary-report ref="summaryReport" />
    </div>
    <div v-if="showModule('showRecommendation')">
      <section-title :title="$t('our_recommendation')" />
      <div class="recommendations">
        <recommend
          v-for="(item, index) in recommendations"
          :key="'recommendation' + index"
          :title="item.title"
          :list="item.list"
        />
      </div>
    </div>
    <lightbox ref="lightbox" :title="$t('share_report')">
      <lightbox-share />
    </lightbox>
    <share @share="openLightbox" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navigator from '~/components/common/Navigator'
import SectionTitle from '~/components/common/SectionTitle.vue'
import SummaryReport from '~/components/summary/dashboard/Summary'
import Recommend from '~/components/summary/dashboard/Recommend'
import Share from '~/components/summary/dashboard/Share.vue'
import Lightbox from '~/components/lightbox/Lightbox'
import LightboxShare from '~/components/lightbox/contents/Share'
import UploadButton from '~/components/summary/UploadReportButton'

export default {
  components: {
    Navigator,
    SectionTitle,
    SummaryReport,
    Recommend,
    Share,
    Lightbox,
    LightboxShare,
    UploadButton
  },

  data() {
    return {
      route: {
        to: 'analysis',
        text: this.$t('back')
      },
      title: this.$t('summary_report'),
      recommendations: [],
      restrictedMode: false
    }
  },
  computed: {
    ...mapGetters({
      summary: 'summary/summary',
      website: 'website/website',
      showModule: 'controllers/showModule'
    })
  },

  mounted() {
    const recommendedProducts = this.summary.recommended_products
    if (recommendedProducts) {
      this.createRecommendations(recommendedProducts)
    }
  },

  methods: {
    createRecommendations(products) {
      const brands = [...new Set(products.map(item => item.brand))].reverse()
      brands.forEach(brand => {
        this.recommendations.push({
          title: brand,
          list: products.filter(product => {
            return product.brand === brand
          })
        })
      })
    },
    openLightbox() {
      const vm = this
      vm.$refs.lightbox.open()
    },
    updateRestrictedMode() {
      this.restrictedMode = this.showModule('restrictedMode')
    }
  }
}
</script>

<style lang="scss" scoped>
.summary-recommend {
  padding-bottom: 120px;
}
.recommendations {
  display: flex;
  padding-bottom: 170px;
}
.recommend {
  flex: 1 1;
  &:not(:first-child) {
    margin-left: 40px;
    flex: 1 1 auto;
  }
}
.restricted {
  & /deep/ {
    .navigation-link,
    .share,
    .box-link {
      display: none;
    }
  }
}
</style>
