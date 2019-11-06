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
        v-for="(element, index) in form.fields"
        :key="index"
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
    </content-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as service from '~/scripts/service.js'

import Navigator from '~/components/common/Navigator.vue'
import SectionTitle from '~/components/common/SectionTitle.vue'
import ContentForm from '~/components/form/AnalysisWrapper.vue'
import FormText from '~/components/form/fields/Text.vue'

class InputText {
  constructor(label, placeholder, status) {
    this.label = label
    this.placeholder = placeholder
    this.status = status
  }
}

export default {
  components: {
    Navigator,
    SectionTitle,
    FormText,
    ContentForm
  },
  data() {
    return {
      route: {
        to: 'analysis',
        text: this.$t('back')
      },
      title: this.$t('competence'),
      form: {
        title: this.$t('add_url'),
        width: 500,
        fields: [],
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
      this.form.fields.some(
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
      saveModuleState: 'controllers/saveModuleState'
    }),

    getInitialData() {
      const inputs = [
        new InputText('URL 1', 'http://', {
          ...this.analysisField('competitor_url1')
        }),
        new InputText('URL 2', 'http://', {
          ...this.analysisField('competitor_url2')
        }),
        new InputText('URL 3', 'http://', {
          ...this.analysisField('competitor_url3')
        })
      ]
      this.form.fields = inputs
      this.form.block = { ...this.analysisBlock('SearchCompetitorsBox') }
    },

    async saveData() {
      await this.saveFields()
      await this.saveBlock()
      this.enableCompetence()
      this.redirect()
    },

    async removeData() {
      this.$refs.text.forEach(element => {
        element.resetData()
      })
      await this.saveFields()
      await this.saveBlock()
      this.enableCompetence()
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
      await service.setCompetitors(uuid, this.website.url, formFields)
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
      const status = this.form.fields.some(el => el.status.value !== '')
      this.form.block.value = status ? 'active' : 'desactive'
    },

    enableCompetence() {
      const hasCompetence = this.form.fields.some(
        el => el.status.value !== '' && el.status.value !== null
      )
      this.saveModuleState({ element: 'hasCompetence', show: hasCompetence })
    },

    textChange(status) {
      const elem = this.form.fields.find(
        result => result.status.key === status.id
      )
      elem.status.value = status.text
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
  margin-bottom: 22px;
  &:last-child {
    margin-bottom: 10px;
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
