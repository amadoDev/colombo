<template>
  <div class="analysis-page">
    <navigator :route-to="route.to" :route-text="route.text" />
    <section-title :title="title" />
    <content-form
      :title="form.title"
      @saveData="saveData"
      @removeData="removeData"
    >
      <div
        v-for="(element, index) in form.fields"
        :key="index"
        class="form-field"
      >
        <toggle-button
          :id="element.status.key"
          ref="radio"
          :custom-width="element.customWidth"
          :label-enabled="element.labelEnabled"
          :label-disabled="element.labelDisabled"
          :question="element.question"
          @enabledButton="updateFieldStatus"
        />
      </div>
    </content-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as service from '~/scripts/service.js'

import Navigator from '~/components/common/Navigator.vue'
import SectionTitle from '~/components/common/SectionTitle.vue'
import ToggleButton from '~/components/form/fields/Toggle.vue'
import ContentForm from '~/components/form/AnalysisWrapper.vue'

class ToggleItem {
  constructor(question, status, labelEnabled, labelDisabled) {
    this.question = question
    this.status = status
    this.labelEnabled = labelEnabled
    this.labelDisabled = labelDisabled
  }
}

export default {
  components: {
    Navigator,
    SectionTitle,
    ToggleButton,
    ContentForm
  },
  data() {
    return {
      route: {
        to: 'analysis',
        text: this.$t('back')
      },
      title: this.$t('contents'),
      form: {
        title: this.$t('answer_questions'),
        fields: [],
        block: {}
      },
      showReset: false
    }
  },
  computed: {
    ...mapGetters({
      website: 'website/website',
      analysisBlock: 'form/analysisBlock',
      analysisField: 'form/analysisField',
      loadedData: 'form/loadedData'
    })
  },
  created() {
    if (!this.loadedData) {
      this.redirect(false)
    }
  },
  mounted() {
    this.getInitialData()
    if (this.form.fields.some(el => el.status.value === true)) {
      this.saveModuleState({ element: 'showReset', show: true })
    }
  },
  destroyed() {
    this.saveModuleState({ element: 'showReset', show: false })
  },
  methods: {
    ...mapActions({
      saveAnalysisData: 'form/saveAnalysisData',
      enableAnalysisBlock: 'form/enableAnalysisBlock',
      saveModuleState: 'controllers/saveModuleState'
    }),

    getInitialData() {
      const toggle = [
        new ToggleItem(
          this.$t('has_catalog'),
          { ...this.analysisField('catalog') },
          this.$t('yes'),
          this.$t('no')
        ),
        new ToggleItem(
          this.$t('has_wide_desc'),
          { ...this.analysisField('description') },
          this.$t('yes'),
          this.$t('no')
        ),
        new ToggleItem(
          this.$t('has_pictures'),
          { ...this.analysisField('picture') },
          this.$t('yes'),
          this.$t('no')
        ),
        new ToggleItem(
          this.$t('has_blog'),
          { ...this.analysisField('blog') },
          this.$t('yes'),
          this.$t('no')
        ),
        new ToggleItem(
          this.$t('has_videos'),
          { ...this.analysisField('video') },
          this.$t('yes'),
          this.$t('no')
        )
      ]
      this.form.fields = toggle
      this.form.block = { ...this.analysisBlock('ContentOptimizationBox') }
    },

    updateFieldStatus(status) {
      const elem = this.form.fields.find(
        result => result.status.key === status.id
      )
      elem.status.value = status.enabled
    },

    async saveData() {
      await this.saveFields()
      await this.saveBlock()
      this.enableContents()
      this.redirect()
    },
    async removeData() {
      this.$refs.radio.forEach(element => {
        element.resetData()
      })
      await this.saveFields()
      await this.saveBlock()
      this.enableContents()
      this.redirect()
    },

    async saveFields() {
      const { uuid } = this.website
      await this.postFields(uuid)
      this.storeFields()
    },
    async saveBlock() {
      const { uuid } = this.website
      this.updateBlock()
      await this.postBox(uuid)
      this.storeBlock()
    },

    async postFields(uuid) {
      this.$nuxt.$loading.start()
      const formFields = this.buildFormFields()
      await service.setFormFields(uuid, formFields)
    },
    async postBox(uuid) {
      await service.setBoxStatus(uuid, this.form.block)
    },

    storeFields() {
      const submitData = this.form.fields.map(a => a.status)
      submitData.forEach(element => {
        this.saveAnalysisData(element)
      })
    },
    storeBlock() {
      this.enableAnalysisBlock(this.form.block)
    },

    buildFormFields() {
      const formattedFields = this.form.fields.reduce((collection, field) => {
        return { ...collection, [field.status.key]: field.status.value }
      }, {})
      return formattedFields
    },

    updateBlock() {
      const status = this.form.fields.some(el => el.status.value === true)
      this.form.block.value = status ? 'active' : 'desactive'
    },

    enableContents() {
      const hasContents = this.form.fields.some(el => el.status.value === true)
      this.saveModuleState({ element: 'hasContents', show: hasContents })
    },

    redirect(delay = 200) {
      if (delay) {
        setTimeout(() => {
          this.$router.push(this.localePath('analysis'))
        }, delay)
      } else {
        this.$router.push(this.localePath('analysis'))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-field {
  margin-bottom: 22px;
  &:last-child {
    margin-bottom: 10px;
  }
}
</style>
