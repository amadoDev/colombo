<template>
  <div class="competition-page">
    <navigator :route-to="route.to" :route-text="route.text" />
    <section-title :title="title" />
    <content-form
      :title="form.title"
      :width="form.width"
      @saveData="saveData"
      @removeData="removeData"
    >
      <div
        v-for="(element, index) in form.fields.selector.slice(0, 1)"
        :key="'epi' + index"
        class="form-field"
      >
        <input-suggestion
          :id="element.status.key"
          ref="epigraph"
          :label="element.label"
          :suggestions="element.suggestions"
          :placeholder="'Epígrafe'"
          :disabled="epigrahpDisabled"
          @getSuggestions="getEpigraphList"
          @pickedValue="pickedEpigraph"
        />
      </div>
      <div
        v-for="(element, index) in form.fields.toggle"
        :key="'t' + index"
        class="form-field"
      >
        <toggle-button
          :id="element.status.key"
          ref="radio"
          :custom-width="element.customWidth"
          :label-enabled="element.labelEnabled"
          :label-disabled="element.labelDisabled"
          :question="element.question"
          @enabledButton="updateStatus"
        />
      </div>
    </content-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as Service from '~/scripts/service.js'

import Navigator from '~/components/common/Navigator.vue'
import SectionTitle from '~/components/common/SectionTitle.vue'
import ContentForm from '~/components/form/AnalysisWrapper.vue'
import ToggleButton from '~/components/form/fields/Toggle.vue'
import InputSuggestion from '~/components/form/fields/TextSuggestion.vue'

class Selector {
  constructor(label, suggestions, status) {
    this.label = label
    this.suggestions = suggestions
    this.status = status
  }
}

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
    ContentForm,
    ToggleButton,
    InputSuggestion
  },
  data() {
    return {
      route: {
        to: 'analysis',
        text: this.$t('back')
      },
      title: 'PPC',
      form: {
        title: this.$t('answer_questions'),
        width: 550,
        fields: {
          selector: [],
          toggle: []
        },
        block: {}
      },
      epigrahpDisabled: false
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
    this.checkEpigraph()
    if (
      this.form.fields.toggle.some(el => el.status.value === true) ||
      (this.form.fields.selector.some(
        el => el.status.value !== null && el.status.value !== ''
      ) &&
        !this.epigrahpDisabled)
    ) {
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
      saveAnalysisSuggestions: 'form/saveAnalysisSuggestions',
      saveModuleState: 'controllers/saveModuleState'
    }),

    checkEpigraph() {
      if (
        this.form.fields.selector[0].status.value !== '' &&
        this.form.fields.selector[0].status.value !== null &&
        this.analysisBlock('LocalSeoBox').value === 'active'
      ) {
        this.epigrahpDisabled = true
      }
    },

    async getEpigraphList(query) {
      const vm = this
      const suggestions = await Service.getEpigraphSuggestions(query)
      this.form.fields.selector[0].suggestions = suggestions
      this.saveAnalysisSuggestions({ key: 'epigraph', suggestions })
      vm.$nextTick(() => {
        vm.$refs.epigraph[0].showSuggestions()
      })
    },

    pickedEpigraph(status) {
      this.form.fields.selector[0].status.value = status.picked
      this.form.fields.selector[0].status.refNumber = status.ref
    },

    updateStatus(status) {
      const elem = this.form.fields.toggle.find(
        result => result.status.key === status.id
      )
      elem.status.value = status.enabled
    },

    getInitialData() {
      const selector = [
        new Selector(
          this.$t('epygraph'),
          ['Abogados', 'Jardinería', 'Tetería', 'Pim Pam Trucu Trucu'],
          { ...this.analysisField('epigraph') }
        )
      ]
      const toggle = [
        new ToggleItem(
          this.$t('restricted_market'),
          { ...this.analysisField('market') },
          this.$t('yes'),
          this.$t('no')
        ),
        new ToggleItem(
          this.$t('unknown_activity'),
          { ...this.analysisField('activity') },
          this.$t('yes'),
          this.$t('no')
        ),
        new ToggleItem(
          this.$t('google_ads_campaign'),
          { ...this.analysisField('google_ads') },
          this.$t('yes'),
          this.$t('no')
        ),
        new ToggleItem(
          this.$t('google_calls_campaign'),
          { ...this.analysisField('google_calls') },
          this.$t('yes'),
          this.$t('no')
        ),
        new ToggleItem(
          this.$t('facebook_campaign'),
          { ...this.analysisField('facebook_ads') },
          this.$t('yes'),
          this.$t('no')
        )
      ]
      this.form.fields.selector = selector
      this.form.fields.toggle = toggle
      this.form.block = { ...this.analysisBlock('PayPerClickBox') }
    },

    async saveData() {
      if (this.validate()) {
        await this.saveFields()
        await this.saveBlock()
        this.redirect()
      }
    },

    async removeData() {
      if (!this.epigrahpDisabled) {
        this.$refs.epigraph[0].resetData()
      }
      this.$refs.radio.forEach(element => {
        element.resetData()
      })
      await this.saveFields()
      await this.saveBlock()
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
      await Service.setFormFields(uuid, formFields)
    },
    async postBox(uuid) {
      await Service.setBoxStatus(uuid, this.form.block)
    },

    storeFields() {
      const selectorData = this.form.fields.selector.map(a => a.status)
      const toggleData = this.form.fields.toggle.map(a => a.status)
      const submitData = [...selectorData, ...toggleData]
      submitData.forEach(element => {
        this.saveAnalysisData(element)
      })
    },

    storeBlock() {
      this.enableAnalysisBlock(this.form.block)
    },

    buildFormFields() {
      const formattedSelectorFields = this.form.fields.selector.reduce(
        (fields, field) => {
          return { ...fields, [field.status.key]: field.status.value }
        },
        {}
      )
      const formattedToggleFields = this.form.fields.toggle.reduce(
        (fields, field) => {
          return { ...fields, [field.status.key]: field.status.value }
        },
        {}
      )
      const formattedFields = {
        ...formattedSelectorFields,
        ...formattedToggleFields
      }
      return formattedFields
    },

    updateBlock() {
      const selectorFieldstatus = this.form.fields.selector.some(
        el => el.status.value !== '' && el.status.value !== null
      )
      const toggleFieldStatus = this.form.fields.toggle.some(
        el => el.status.value === true
      )
      this.form.block.value =
        selectorFieldstatus && toggleFieldStatus ? 'active' : 'desactive'
      this.form.block.editable = selectorFieldstatus && toggleFieldStatus
    },

    validate() {
      let isValid = true
      let isFieldValid = true
      isFieldValid = this.analysisField('epigraph').suggestions.some(
        option => option.value === this.$refs.epigraph[0].model.input
      )
      this.$refs.epigraph[0].validate(isFieldValid)
      if (isFieldValid === false) {
        isValid = false
      }
      return isValid
    },

    redirect(delay = true) {
      if (delay) {
        setTimeout(() => {
          this.$router.push(this.localePath('analysis'))
        }, 200)
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
