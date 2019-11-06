<template>
  <div class="ppc">
    <div class="ppc-grid">
      <div
        v-for="(item, index) in ppc"
        :key="'featured' + index"
        class="ppc-item"
      >
        <blank-box class="ppc-card">
          <span class="title">{{ item.title }}</span>
          <span :class="{ active: item.value }" class="value">{{
            `${item.value ? $t('yes') : $t('no')}`
          }}</span>
        </blank-box>
      </div>
    </div>
    <div v-if="tableData.isAnalyzed" class="ppc-table">
      <info-table :headers="tableData.headers" :rows="tableData.rows" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BlankBox from '~/components/BlankBox.vue'
import InfoTable from '~/components/Table.vue'
import { objToArr } from '~/scripts/utils.js'

export default {
  components: {
    BlankBox,
    InfoTable
  },
  data() {
    return {
      ppc: [
        {
          title: this.$t('google_ads_campaigns'),
          value: '',
          key: 'hasCampaignsOfSearchInGoogleAds'
        },
        {
          title: this.$t('facebook_ads_campaigns'),
          value: '',
          key: 'hasCampaignsInFacebookAds'
        },
        {
          title: this.$t('google_calls_campaigns'),
          value: '',
          key: 'hasCampaignsOfCallInGoogleAds'
        }
      ],
      tableData: {
        isAnalyzed: false,
        headers: [
          this.$t('campaign_type'),
          `${this.$t('investment_in')}€`,
          this.$t('number_of_clicks_calls')
        ],
        rows: []
      }
    }
  },
  computed: {
    ...mapGetters({
      summary: 'summary/summary'
    })
  },
  beforeMount() {
    const { boxes } = this.summary
    this.setInitialData(boxes.PayPerClickBox)
  },
  methods: {
    setInitialData(report) {
      const { questions, cms } = report
      this.ppc.forEach(element => {
        element.value = questions[element.key].value
      })
      if (cms) {
        this.tableData.isAnalyzed = true
        const data = objToArr(cms)
        data.forEach(element => {
          this.tableData.rows.push([
            element.cms.typeOfCampaign.value,
            element.cms.invest.value + '€',
            element.cms.estimatedResult.value
          ])
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';

.ppc-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
  .ppc-item {
    flex: 1 1;
    padding: 0 15px 30px;
    min-width: 33.33%;
    max-width: 33.33%;
  }
}

.ppc-card {
  height: 190px;
  display: flex;
  flex-direction: column;
  text-align: center;
  .title {
    display: block;
    font-weight: 600;
    font-size: 28px;
    color: $dark-grey;
    line-height: 36px;
    margin-top: 6px;
  }
  .value {
    display: block;
    font-weight: 600;
    font-size: 32px;
    line-height: 24px;
    margin-top: auto;
    margin-bottom: 16px;
    text-transform: uppercase;
    color: $danger;
    &.active {
      color: $success;
    }
  }
}
</style>
