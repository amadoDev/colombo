<script>
import * as Service from '~/scripts/service.js'
import { mapActions } from 'vuex'

import Summary from '~/pages/summary'

export default {
  extends: Summary,

  data() {
    return {
      uuid: ''
    }
  },

  async created() {
    this.uuid = this.getId()
    const url = await this.getUrlField()
    this.saveWebsite({ uuid: this.uuid, url })
  },

  async mounted() {
    await this.requestSummary()
    await this.showRecommendations()
    this.saveModuleState({ element: 'restrictedMode', show: true })
    this.updateRestrictedMode()
  },

  methods: {
    ...mapActions({
      saveModuleState: 'controllers/saveModuleState',
      saveSummary: 'summary/saveSummary',
      saveWebsite: 'website/saveWebsite'
    }),

    async requestSummary() {
      const { result, status } = await Service.getSummary(this.uuid)
      if (status === 'OK') {
        this.saveSummary(result.report)
        this.$refs.summaryReport.createReport(result.report.summary)
      }
    },

    async getUrlField() {
      const result = await Service.getFormFields(this.uuid, ['url'])
      return result.url
    },

    getId() {
      return this.$route.query.id
    },

    async showRecommendations() {
      const { result, status } = await Service.getFormFields(this.uuid, [
        'recommendations'
      ])
      if (status === 'OK') {
        this.saveModuleState({
          element: 'showRecommendation',
          show: result.getRecommendations
        })
      }
    }
  }
}
</script>
