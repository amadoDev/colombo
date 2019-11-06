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
        v-for="(element, index) in form.fields.text"
        :key="'t' + index"
        class="form-field"
      >
        <form-text
          :id="element.status.key"
          ref="text"
          :label="element.label"
          :placeholder="element.placeholder"
          @textChange="textChange"
        />
      </div>
      <div
        v-for="(element, index) in form.fields.selector.slice(0, 1)"
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
    </content-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as Service from '~/scripts/service.js'

import Navigator from '~/components/common/Navigator.vue'
import SectionTitle from '~/components/common/SectionTitle.vue'
import ContentForm from '~/components/form/AnalysisWrapper.vue'
import FormText from '~/components/form/fields/Text.vue'
import InputSuggestion from '~/components/form/fields/TextSuggestion.vue'

class InputText {
  constructor(label, placeholder, status) {
    this.label = label
    this.placeholder = placeholder
    this.status = status
  }
}

class Selector {
  constructor(label, suggestions, status) {
    this.label = label
    this.suggestions = suggestions
    this.status = status
  }
}

export default {
  components: {
    Navigator,
    SectionTitle,
    FormText,
    ContentForm,
    InputSuggestion
  },
  data() {
    return {
      route: {
        to: 'analysis',
        text: this.$t('back')
      },
      title: this.$t('directories_rrss'),
      form: {
        title: this.$t('business_information'),
        width: 350,
        fields: {
          text: [],
          selector: []
        },
        block: {}
      }
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
    if (
      this.form.fields.text.some(
        el => el.status.value !== null && el.status.value !== ''
      ) ||
      this.form.fields.selector.some(
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
      saveModuleState: 'controllers/saveModuleState'
    }),
    textChange(status) {
      const elem = this.form.fields.text.find(
        result => result.status.key === status.id
      )
      elem.status.value = status.text
    },
    selectChange(status) {
      const elem = this.form.fields.selector.find(
        result => result.status.key === status.id
      )
      elem.status.value = status.selected
    },
    getInitialData() {
      const inputs = [
        new InputText(this.$t('business_name'), this.$t('business_name'), {
          ...this.analysisField('business')
        }),
        new InputText(this.$t('address'), this.$t('address'), {
          ...this.analysisField('address')
        }),
        new InputText(this.$t('postal_code'), this.$t('postal_code'), {
          ...this.analysisField('postalcode')
        }),
        new InputText(this.$t('phone_number'), this.$t('phone_number'), {
          ...this.analysisField('telephone')
        })
      ]
      const selector = [
        new Selector(this.$t('city'), [], { ...this.analysisField('city') })
      ]
      this.form.fields.text = inputs
      this.form.fields.selector = selector
      this.form.block = {
        ...this.analysisBlock('SocialNetworksOptimizationBox')
      }
    },

    async getLocationList(query) {
      const vm = this
      const suggestions = await Service.getLocationSuggestions(query)
      this.form.fields.selector[0].suggestions = suggestions
      this.saveAnalysisSuggestions({ key: 'city', suggestions })
      vm.$nextTick(() => {
        vm.$refs.location[0].showSuggestions()
      })
    },

    pickedLocation(status) {
      this.form.fields.selector[0].status.value = status.picked
      this.form.fields.selector[0].status.refNumber = status.ref
    },

    async saveData() {
      if (this.validate()) {
        await this.saveFields()
        await this.saveBlock()
        this.redirect()
      }
    },
    async removeData() {
      this.$refs.text.forEach(element => {
        element.resetData()
      })
      this.$refs.location.forEach(element => {
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
      await Service.setPm(uuid, this.formatAddress(formFields))
    },
    async postBox(uuid) {
      await Service.setBoxStatus(uuid, this.form.block)
    },

    storeFields() {
      const textData = this.form.fields.text.map(a => a.status)
      const selectorData = this.form.fields.selector.map(a => a.status)
      const submitData = [...textData, ...selectorData]
      submitData.forEach(element => {
        this.saveAnalysisData(element)
      })
    },

    storeBlock() {
      this.enableAnalysisBlock(this.form.block)
    },

    buildFormFields() {
      const formattedTextFields = this.form.fields.text.reduce(
        (fields, field) => {
          return { ...fields, [field.status.key]: field.status.value }
        },
        {}
      )
      const formattedSelectorFields = this.form.fields.selector.reduce(
        (fields, field) => {
          return { ...fields, [field.status.key]: field.status.value }
        },
        {}
      )
      const formattedFields = {
        ...formattedTextFields,
        ...formattedSelectorFields
      }
      return formattedFields
    },

    formatAddress(formFields) {
      return {
        name: formFields.business,
        address_line1: formFields.address,
        zip_code: formFields.postalcode,
        phone: formFields.telephone,
        city: formFields.city
      }
    },

    updateBlock() {
      const textFieldStatus = this.form.fields.text.some(
        el => el.status.value !== '' && el.status.value !== null
      )
      const selectorFieldstatus = this.form.fields.selector.some(
        el => el.status.value !== '' && el.status.value !== null
      )
      this.form.block.value =
        textFieldStatus && selectorFieldstatus ? 'active' : 'desactive'
      this.form.block.editable = textFieldStatus && selectorFieldstatus
    },

    validate() {
      let isValid = true
      let isFieldValid = true
      this.$refs.text.forEach(element => {
        isFieldValid = true
        switch (element.id) {
          case 'business':
            if (element.model.text === '' || element.model.text === null) {
              isFieldValid = false
            }
            break
          case 'address':
            if (element.model.text === '' || element.model.text === null) {
              isFieldValid = false
            }
            break
          case 'postalcode':
            if (
              element.model.text === '' ||
              isNaN(parseInt(element.model.text)) ||
              element.model.text.length !== 5
            ) {
              isFieldValid = false
            }
            break
          case 'telephone':
            if (
              element.model.text === '' ||
              isNaN(parseInt(element.model.text)) ||
              element.model.text.length !== 9
            ) {
              isFieldValid = false
            }
            break
        }
        if (isFieldValid === false) {
          isValid = false
        }
        element.validate(isFieldValid)
      })
      isFieldValid = this.analysisField('city').suggestions.some(
        option => option.value === this.$refs.location[0].model.input
      )
      this.$refs.location[0].validate(isFieldValid)
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
  &:nth-child(3) {
    width: 47%;
    float: left;
    position: relative;
    z-index: 1;
  }
  &:nth-child(4) {
    width: 47%;
    float: right;
    position: relative;
    z-index: 1;
  }
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
