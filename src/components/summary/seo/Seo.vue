<template>
  <div class="seo">
    <div class="seo-table">
      <info-table
        :headers="tableData.headers"
        :rows="tableData.rows"
        :class="'seo-table-detail'"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InfoTable from '~/components/Table.vue'
import { objToArr, formatValue } from '~/scripts/utils.js'

export default {
  components: {
    InfoTable
  },
  data() {
    return {
      tableData: {
        headers: [this.$t('keyword'), this.$t('searches'), this.$t('cpc')],
        rows: []
      }
    }
  },
  computed: {
    ...mapGetters({
      summary: 'summary/summary'
    })
  },
  mounted() {
    const { boxes } = this.summary
    this.setInitialData(boxes.LocalSeoBox)
  },
  methods: {
    setInitialData(report) {
      const { keywords } = report
      const data = objToArr(keywords)
      data.forEach(element => {
        this.tableData.rows.push([
          element.seoMonkey.keyword.value,
          formatValue(element.seoMonkey.searchVolume.value),
          formatValue(element.seoMonkey.cpc.value)
        ])
      })
    },
    formatDataChart(data) {
      return Array.isArray(data) ? data : objToArr(data)
    }
  }
}
</script>

<style></style>
