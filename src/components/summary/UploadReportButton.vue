<template>
  <button
    v-show="!summary.completed"
    class="summary-button-update"
    @click="reloadReport"
  >
    <ion-icon class="icon" name="ios-repeat" />
    <span>{{ $t('update_report') }}</span>
  </button>
</template>

<script>
import * as Service from '~/scripts/service.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      website: 'website/website',
      summary: 'summary/summary'
    })
  },

  methods: {
    ...mapActions({
      saveSummary: 'summary/saveSummary'
    }),

    async reloadReport() {
      this.$nuxt.$loading.start()
      await this.requestSummary()
      this.$nuxt.$loading.finish()
    },

    async requestSummary() {
      const { uuid } = this.website
      const { result, status } = await Service.getSummary(uuid)
      if (status === 'OK') {
        this.saveSummary(result.report)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';

.summary-button-update {
  font-family: $corporate-font;
  font-size: 14px;
  text-transform: uppercase;
  height: 54px;
  width: 217px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $white;
  font-weight: 500;
  position: absolute;
  right: 10px;
  top: 150px;
  cursor: pointer;
  &:hover {
    background-color: darken($white, 10%);
  }
  .icon {
    font-size: 22px;
    margin-right: 10px;
    visibility: visible;
  }
}
</style>
