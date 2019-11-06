<template>
  <div class="analysis-page">
    <navigator :route-to="route.to" :route-text="route.text" />
    <section-title :title="title" />
    <div class="page-wrapper">
      <form>
        <div class="analysis-web">
          <div
            v-for="(element, index) in analysis.slice(0, 3)"
            :key="'analisys' + index"
            class="analysis-box-item"
          >
            <box
              :title="element.title"
              :text="element.text"
              :route-to="element.routeTo"
              :button-text="element.buttonText"
              custom-class="box-analysis"
              class="box-wrapper"
            >
              <template slot="after">
                <toggle-button
                  :id="element.toggle.status.key"
                  ref="radio"
                  :custom-width="element.toggle.customWidth"
                  :label-enabled="element.toggle.labelEnabled"
                  :label-disabled="element.toggle.labelDisabled"
                  :icon="element.toggle.icon"
                  class="analysis-toggle"
                  @enabledButton="updateStatus"
                />
              </template>
            </box>
          </div>
        </div>
        <a
          :class="{ active: showMarketSection }"
          class="analysis-market-link"
          href="#"
          @click="showDetails($event)"
        >
          <h3 class="analysis-market-title">{{ $t('market_analysis') }}</h3>
          <ion-icon name="ios-arrow-down" class="toggle-icon" />
        </a>
        <div v-show="showMarketSection" class="analysis-market">
          <div
            v-for="(element, index) in analysis.slice(3)"
            :key="'market' + index"
            class="analysis-box-item"
          >
            <box
              :title="element.title"
              :text="element.text"
              :route-to="element.routeTo"
              :button-text="element.buttonText"
              custom-class="box-analysis"
              class="box-wrapper"
            >
              <template slot="after">
                <toggle-button
                  :id="element.toggle.status.key"
                  ref="radio"
                  :custom-width="element.toggle.customWidth"
                  :label-enabled="element.toggle.labelEnabled"
                  :label-disabled="element.toggle.labelDisabled"
                  :icon="element.toggle.icon"
                  class="analysis-toggle"
                  @enabledButton="updateStatus"
                />
              </template>
            </box>
          </div>
        </div>
        <generators
          class="analysis-generators"
          @generateBasic="generateBasic"
          @generateRecommendation="generateRecommendation"
        >
          <button class="generator-button" @click="generateBasic($event)">
            {{ generateBasicString }}
          </button>
          <button
            class="generator-button"
            @click="generateRecommendation($event)"
          >
            {{ generateBasicString + ' + ' + $t('recommendation') }}
          </button>
        </generators>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters, mapActions } from 'vuex'
import * as service from '~/scripts/service.js'

import Navigator from '~/components/common/Navigator.vue'
import SectionTitle from '~/components/common/SectionTitle.vue'
import Box from '~/components/Box'
import ToggleButton from '~/components/form/fields/Toggle.vue'
import Generators from '~/components/Generators'

class Card {
  constructor(title, text, routeTo, buttonText, toggleKey, toggleIcon, labels) {
    this.title = title
    this.text = text
    this.routeTo = routeTo
    this.buttonText = buttonText
    this.toggle = {
      customWidth: 132,
      status: {
        key: toggleKey,
        value: true
      },
      labelEnabled: labels.labelEnabled,
      labelDisabled: labels.labelDisabled,
      icon: toggleIcon
    }
  }
}

export default {
  components: {
    Navigator,
    SectionTitle,
    Box,
    ToggleButton,
    Generators
  },
  data() {
    return {
      route: {
        to: 'index',
        text: 'home'
      },
      analysis: [
        new Card(
          this.$t('web_summary_title'),
          this.$t('web_optimization_desc'),
          'analysis-web',
          this.$t('advanced_edit'),
          'ContentOptimizationBox',
          'md-lock',
          {
            labelEnabled: this.$t('enabled'),
            labelDisabled: this.$t('disabled')
          }
        ),
        new Card(
          this.$t('search_summary_title'),
          this.$t('search_optimization_desc'),
          'analysis-search',
          this.$t('advanced_edit'),
          'SearchCompetitorsBox',
          'md-lock',
          {
            labelEnabled: this.$t('enabled'),
            labelDisabled: this.$t('disabled')
          }
        ),
        new Card(
          this.$t('rrss_optimization_title'),
          this.$t('rrss_optimization_desc'),
          'analysis-rrss',
          this.$t('edit'),
          'SocialNetworksOptimizationBox',
          'md-unlock',
          {
            labelEnabled: this.$t('enabled'),
            labelDisabled: this.$t('disabled')
          }
        ),
        new Card(
          this.$t('seo_optimization_title'),
          this.$t('seo_optimization_desc'),
          'analysis-seo',
          this.$t('edit'),
          'LocalSeoBox',
          'md-unlock',
          {
            labelEnabled: this.$t('enabled'),
            labelDisabled: this.$t('disabled')
          }
        ),
        new Card(
          this.$t('ppc_optimization_title'),
          this.$t('ppc_optimization_desc'),
          'analysis-ppc',
          this.$t('edit'),
          'PayPerClickBox',
          'md-unlock',
          {
            labelEnabled: this.$t('enabled'),
            labelDisabled: this.$t('disabled')
          }
        )
      ],
      showMarketSection: false
    }
  },
  computed: {
    ...mapGetters({
      website: 'website/website',
      analysisField: 'form/analysisField',
      analysisBlock: 'form/analysisBlock',
      analysisAdvanced: 'form/analysisAdvanced',
      loadedData: 'form/loadedData',
      seoMonkey: 'form/seoMonkey',
      showModule: 'controllers/showModule'
    }),

    title() {
      if (this.analysisAdvanced === false) {
        return this.$t('basic_analysis')
      } else {
        return this.$t('advanced_analysis')
      }
    },

    generateBasicString() {
      if (this.analysisAdvanced === false) {
        return this.$t('generate_basic')
      } else {
        return this.$t('generate_advanced')
      }
    }
  },

  async created() {
    const vm = this
    if (!this.loadedData) {
      this.$nuxt.$loading.start()
      await this.setInitialFields()
      await this.setInitialBox()
      vm.$refs.radio.forEach(el => el.setModel())
      this.$nuxt.$loading.finish()
    }
    console.log(this.website.uuid)
  },

  mounted() {
    this.showMarketSection = this.showModule('showMarket')
    this.changeToAdvanced()
  },

  methods: {
    ...mapActions({
      saveAnalysisData: 'form/saveAnalysisData',
      enableAnalysisBlock: 'form/enableAnalysisBlock',
      changeAdvancedAnalysis: 'form/changeAdvancedAnalysis',
      saveModuleState: 'controllers/saveModuleState',
      saveSummary: 'summary/saveSummary'
    }),

    async setInitialFields() {
      const { uuid } = this.website
      const { status, result } = await service.getFormFields(uuid)
      const analysis = []
      if (status === 'OK') {
        Object.entries(result).map(key => {
          analysis.push({
            key: key[0],
            value: key[1]
          })
        })
        this.saveAnalysisData(analysis)
      }
    },

    async setInitialBox() {
      const { uuid } = this.website
      const response = await service.getBoxStatus(uuid)
      const formatResponse = response => {
        switch (response) {
          case 'desactive':
            return false
          default:
            return true
        }
      }
      const box = JSON.parse(JSON.stringify(this.analysisBlock()))
      box.map(el => (el.value = formatResponse(response[el.key])))
      box.forEach(el => {
        this.enableAnalysisBlock(el)
      })
    },

    showDetails(e) {
      e.preventDefault()
      this.showMarketSection = !this.showMarketSection
      this.saveModuleState({
        element: 'showMarket',
        show: this.showMarketSection
      })
    },

    changeToAdvanced() {
      if (
        this.showModule('hasContents') ||
        this.showModule('hasCompetence') ||
        this.analysisBlock().some(
          el =>
            el.key === 'SocialNetworksOptimizationBox' && el.value === 'active'
        )
      ) {
        this.changeAdvancedAnalysis(true)
      } else {
        this.changeAdvancedAnalysis(false)
      }
      this.updateTitles()
    },

    updateTitles() {
      const optimization = this.analysis.find(
        el => el.toggle.status.key === 'ContentOptimizationBox'
      )
      const competence = this.analysis.find(
        el => el.toggle.status.key === 'SearchCompetitorsBox'
      )
      if (this.showModule('hasContents')) {
        optimization.title = this.$t('web_optimization_title')
      } else {
        optimization.title = this.$t('web_summary_title')
      }
      if (this.showModule('hasCompetence')) {
        competence.title = this.$t('search_optimization_title')
      } else {
        competence.title = this.$t('search_summary_title')
      }
    },

    async updateStatus(status) {
      const { uuid } = this.website
      const block = {
        key: status.id,
        value: status.enabled ? 'active' : 'desactive'
      }
      await service.setBoxStatus(uuid, block)
      this.enableAnalysisBlock(block)
      this.changeToAdvanced()
    },

    async generateBasic(e) {
      e.preventDefault()
      this.$nuxt.$loading.start()
      await this.saveRecommendations(false)
      this.requestSummary()
    },

    async generateRecommendation(e) {
      e.preventDefault()
      this.$nuxt.$loading.start()
      await this.saveRecommendations(true)
      this.requestSummary()
    },

    saveRecommendations(withRecommendations) {
      const { uuid } = this.website
      this.saveModuleState({
        element: 'showRecommendation',
        show: withRecommendations
      })
      this.saveAnalysisData({
        key: 'recommendations',
        value: withRecommendations
      })
      service.setFormFields(uuid, {
        recommendations: withRecommendations
      })
    },

    async requestSummary() {
      const { uuid } = this.website
      const { result, status } = await service.getSummary(uuid)
      if (status === 'OK') {
        this.saveSummary(result.report)
        this.redirect()
      }
      console.log(result)
    },

    redirect() {
      setTimeout(() => {
        this.$router.push(this.localePath('summary'))
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';

.page-wrapper {
  padding-bottom: 170px;
}

.analysis-page {
  .box-title {
    min-height: 72px;
  }
  .box-text {
    min-height: 82px;
  }
}

.analysis-web,
.analysis-market {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 -15px;
}

.analysis-box-item {
  padding: 0 15px;
  width: 380px;
}

.analysis-toggle {
  display: block;
  margin: auto auto -10px;
  position: relative;
  &.undeditable {
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }
  }
}

.analysis-market-link {
  text-decoration: none;
  color: $white;
  font-size: 32px;
  line-height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 60px 0 54px;
  &.active {
    .toggle-icon {
      transform: rotate(180deg);
    }
  }
}

.analysis-market-title {
  font-size: inherit;
  margin-right: 10px;
  font-weight: 600;
  .toggle-icon {
    color: inherit;
  }
}
</style>
