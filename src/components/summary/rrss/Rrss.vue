<template>
  <div class="rrss">
    <div class="rrss-grid">
      <div
        v-for="(item, index) in rrss"
        :key="'featured' + index"
        class="rrss-item"
      >
        <blank-box class="rrss-card">
          <span class="title">{{ item.title }}</span>
          <span :class="{ active: item.value }" class="value">{{
            `${item.value ? $t('yes') : $t('no')}`
          }}</span>
        </blank-box>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import BlankBox from '~/components/BlankBox.vue'

export default {
  components: {
    BlankBox
  },
  data: () => ({
    rrss: [
      {
        title: 'Google My Business',
        value: '',
        key: 'gmb'
      },
      {
        title: 'QDQ.com',
        value: '',
        key: 'qdq'
      },
      {
        title: 'Bing',
        value: '',
        key: 'bing'
      },
      {
        title: 'Twitter',
        value: '',
        key: 'twitter'
      },
      {
        title: 'Facebook',
        value: '',
        key: 'facebook'
      },
      {
        title: 'Google Maps',
        value: '',
        key: 'googleMaps'
      },
      {
        title: 'Bing Maps',
        value: '',
        key: 'bingMaps'
      },
      {
        title: 'Waze',
        value: '',
        key: 'waze'
      }
    ]
  }),
  computed: {
    ...mapGetters({
      summary: 'summary/summary'
    })
  },
  mounted() {
    const { boxes } = this.summary
    this.setInitialData(boxes)
  },
  methods: {
    setInitialData(report) {
      const { presenceManagement } = report.SocialNetworksOptimizationBox
      this.rrss.forEach(element => {
        element.value = presenceManagement[element.key].value
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';

.rrss-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
  .rrss-item {
    flex: 1 1;
    padding: 0 15px 30px;
    min-width: 33.33%;
    max-width: 33.33%;
  }
}

.rrss-card {
  height: 150px;
  display: flex;
  flex-direction: column;
  text-align: center;
  .title {
    display: block;
    font-weight: 600;
    font-size: 28px;
    color: $dark-grey;
    line-height: 30px;
  }
  .value {
    display: block;
    font-weight: 600;
    font-size: 32px;
    line-height: 24px;
    margin-top: auto;
    margin-bottom: 10px;
    text-transform: uppercase;
    color: $danger;
    &.active {
      color: $success;
    }
  }
}
</style>
