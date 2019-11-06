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
          @getSuggestions="getEpigraphList"
          @pickedValue="pickedEpigraph"
        />
      </div>
      <div
        v-for="(element, index) in form.fields.selector.slice(1, 2)"
        :key="'loc' + index"
        class="form-field"
      >
        <input-suggestion
          :id="element.status.key"
          ref="location"
          :label="element.label"
          :suggestions="element.suggestions"
          :placeholder="'Municipio / Ciudad'"
          @getSuggestions="getLocationList"
          @pickedValue="pickedLocation"
        />
      </div>
      <div
        v-for="(element, index) in form.fields.radio"
        v-show="form.showKeywords && form.fields.radio[0].nItems"
        :key="'r' + index"
        class="form-field"
      >
        <radio-group
          :id="element.status.key"
          ref="radiogroup"
          :label="element.label"
          :options="element.options.slice(0, element.nItems)"
          @pickedValue="pickedValue"
        />
      </div>
      <div v-if="!form.hasKeywords" class="no-keywords-warning">
        <ion-icon name="alert" class="no-keywords-icon" />
        <span class="no-keywords-msg">
          Keywords no disponibles para
          {{ form.fields.selector[0].status.value }} en
          {{ form.fields.selector[1].status.value }}
        </span>
      </div>
    </content-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as Service from '~/scripts/service.js'

import Navigator from '~/components/common/Navigator'
import SectionTitle from '~/components/common/SectionTitle'
import ContentForm from '~/components/form/AnalysisWrapper'
import RadioGroup from '~/components/form/fields/RadioGroup'
import InputSuggestion from '~/components/form/fields/TextSuggestion'

class Selector {
  constructor(label, suggestions, status) {
    this.label = label
    this.suggestions = suggestions
    this.status = status
  }
}

class Radio {
  constructor(label, options, status, nItems) {
    this.label = label
    this.options = options
    this.status = status
    this.nItems = nItems
  }
}

export default {
  components: {
    Navigator,
    SectionTitle,
    ContentForm,
    RadioGroup,
    InputSuggestion
  },
  data() {
    return {
      route: {
        to: 'analysis',
        text: this.$t('back')
      },
      title: this.$t('seo_optimization_title'),
      form: {
        title: this.$t('fill_fields'),
        width: 350,
        fields: {
          selector: [],
          radio: []
        },
        block: {},
        showKeywords: false,
        hasKeywords: true
      },
      seoMonkeyList: {}
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
  async mounted() {
    await this.getInitialData()
    await this.showKeywords()
    if (
      this.form.fields.selector.some(
        el => el.status.value !== null && el.status.value !== ''
      ) &&
      this.form.fields.radio.some(
        el => el.status.value !== null && el.status.value !== ''
      )
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
      saveSeoMonkey: 'form/saveSeoMonkey',
      saveModuleState: 'controllers/saveModuleState'
    }),
    getInitialData() {
      const selector = [
        new Selector(this.$t('epygraph'), [], {
          ...this.analysisField('epigraph')
        }),
        new Selector(this.$t('location'), [], { ...this.analysisField('city') })
      ]
      const radiogroup = [
        new Radio(
          this.$t('keywords_number'),
          [
            {
              name: 'keywords',
              value: '2'
            },
            {
              name: 'keywords',
              value: '4'
            },
            {
              name: 'keywords',
              value: '6'
            },
            {
              name: 'keywords',
              value: '8'
            },
            {
              name: 'keywords',
              value: '10'
            },
            {
              name: 'keywords',
              value: '12'
            }
          ],
          { ...this.analysisField('keywords') },
          0
        )
      ]
      this.form.fields.selector = selector
      this.form.fields.radio = radiogroup
      this.form.block = { ...this.analysisBlock('LocalSeoBox') }
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
    async getLocationList(query) {
      const vm = this
      const suggestions = await Service.getLocationSuggestions(query)
      this.form.fields.selector[1].suggestions = suggestions
      this.saveAnalysisSuggestions({ key: 'city', suggestions })
      vm.$nextTick(() => {
        vm.$refs.location[0].showSuggestions()
      })
    },
    pickedEpigraph(status) {
      this.form.fields.selector[0].status.value = status.picked
      this.form.fields.selector[0].status.refNumber = status.ref
      this.form.hasKeywords = true
      this.showKeywords()
    },
    pickedLocation(status) {
      this.form.fields.selector[1].status.value = status.picked
      this.form.fields.selector[1].status.refNumber = status.ref
      this.form.hasKeywords = true
      this.showKeywords()
    },
    pickedValue(status) {
      this.form.fields.radio[0].status.value = status.picked
    },

    async showKeywords() {
      if (
        this.form.fields.selector[0].status.value &&
        this.form.fields.selector[1].status.value
      ) {
        this.$nuxt.$loading.start()
        const category = {
          ref: this.form.fields.selector[0].status.refNumber
        }
        const location = {
          ref: this.form.fields.selector[1].status.refNumber,
          value: this.form.fields.selector[1].status.value
        }
        this.seoMonkeyList = await Service.getSeoMonkey(category, location)
        this.$nextTick(() => {
          this.form.fields.radio[0].nItems = Math.trunc(
            this.seoMonkeyList.total / 2
          )
          if (this.seoMonkeyList.total) {
            this.form.hasKeywords = true
          } else {
            this.form.hasKeywords = false
          }
        })
        this.$nuxt.$loading.finish()
        this.form.showKeywords = true
      }
    },

    async saveData() {
      if (this.validate()) {
        await this.saveFields()
        await this.saveBlock()
        this.redirect()
      }
    },
    async removeData() {
      this.$refs.epigraph[0].resetData()
      this.$refs.location[0].resetData()
      this.$refs.radiogroup[0].resetData()
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
      const formFields = this.buildFormFields()
      const seo = this.seoMonkeyList.keywords
      const keywords = this.form.fields.radio[0].status.value

      await Service.setFormFields(uuid, formFields)
      if (seo && keywords) {
        await Service.setSeoMonkey(uuid, seo, keywords)
      }
    },
    async postBox(uuid) {
      await Service.setBoxStatus(uuid, this.form.block)
    },

    storeFields() {
      const selectorData = this.form.fields.selector.map(a => a.status)
      const radioData = this.form.fields.radio.map(a => a.status)
      const submitData = [...selectorData, ...radioData]
      submitData.forEach(element => {
        this.saveAnalysisData(element)
      })
      this.saveSeoMonkey(this.seoMonkeyList)
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
      const formattedRadioFields = this.form.fields.radio.reduce(
        (fields, field) => {
          return { ...fields, [field.status.key]: field.status.value }
        },
        {}
      )
      const formattedFields = {
        ...formattedSelectorFields,
        ...formattedRadioFields
      }
      return formattedFields
    },

    updateBlock() {
      const selectorFieldstatus = this.form.fields.selector.some(
        el => el.status.value !== '' && el.status.value !== null
      )
      const radioFieldStatus = this.form.fields.radio.some(
        el => el.status.value !== '' && el.status.value !== null
      )
      this.form.block.value =
        selectorFieldstatus && radioFieldStatus ? 'active' : 'desactive'
      this.form.block.editable = selectorFieldstatus && radioFieldStatus
    },

    validate() {
      let isValid = true
      let isFieldValid = true
      // epigraph validation
      isFieldValid = this.analysisField('epigraph').suggestions.some(
        option => option.value === this.$refs.epigraph[0].model.input
      )
      this.$refs.epigraph[0].validate(isFieldValid)
      if (isFieldValid === false) {
        isValid = false
      }
      // location validation
      isFieldValid = this.analysisField('city').suggestions.some(
        option => option.value === this.$refs.location[0].model.input
      )
      this.$refs.location[0].validate(isFieldValid)
      if (isFieldValid === false) {
        isValid = false
      }
      // radiogroup validation
      const radioGroup = this.$refs.radiogroup[0]
      isFieldValid = radioGroup.model.picked !== undefined
      radioGroup.validate(isFieldValid)
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
@import '~assets/css/vars';
.form-field {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 10px;
  }
}
.no-keywords-warning {
  color: $black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 10px;
  border: 1px solid $warning;
  background-color: lighten($color: $warning, $amount: 30%);
  padding: 8px;
  border-radius: 2px;
}
.no-keywords-msg {
  font-size: 13px;
  padding: 0 16px;
}
.no-keywords-icon {
  font-size: 20px;
  margin-bottom: 4px;
  color: $warning;
}

/deep/ {
  .analysis-form-body {
    position: relative;
  }
  .loading {
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(#ffffff, 0.5);
  }
  .loading-bar {
    background-color: $primary;
  }
}
</style>
