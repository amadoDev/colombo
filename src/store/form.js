export const state = () => ({
  fields: [
    {
      key: 'catalog',
      value: null
    },
    {
      key: 'description',
      value: null
    },
    {
      key: 'picture',
      value: null
    },
    {
      key: 'blog',
      value: null
    },
    {
      key: 'video',
      value: null
    },
    {
      key: 'competitor_url1',
      value: null
    },
    {
      key: 'competitor_url2',
      value: null
    },
    {
      key: 'competitor_url3',
      value: null
    },
    {
      key: 'business',
      value: null
    },
    {
      key: 'address',
      value: null
    },
    {
      key: 'postalcode',
      value: null
    },
    {
      key: 'telephone',
      value: null
    },
    {
      key: 'city',
      value: null,
      refNumber: null,
      suggestions: []
    },
    {
      key: 'epigraph',
      value: null,
      refNumber: null,
      suggestions: []
    },
    {
      key: 'keywords',
      value: null
    },
    {
      key: 'market',
      value: null
    },
    {
      key: 'activity',
      value: null
    },
    {
      key: 'google_ads',
      value: null
    },
    {
      key: 'google_calls',
      value: null
    },
    {
      key: 'facebook_ads',
      value: null
    },
    {
      key: 'recommendations',
      value: null
    }
  ],
  blocks: [
    {
      key: 'ContentOptimizationBox',
      value: 'desactive',
      editable: false
    },
    {
      key: 'SearchCompetitorsBox',
      value: 'desactive',
      editable: false
    },
    {
      key: 'SocialNetworksOptimizationBox',
      value: 'desactive',
      editable: false
    },
    {
      key: 'LocalSeoBox',
      value: 'desactive',
      editable: false
    },
    {
      key: 'PayPerClickBox',
      value: 'desactive',
      editable: false
    }
  ],
  seoMonkey: {},
  isAdvanced: false
})

export const getters = {
  analysisField: state => key => {
    if (key) {
      return state.fields.find(input => input.key === key)
    } else {
      return state.fields
    }
  },
  analysisBlock: state => key => {
    if (key !== undefined) {
      return state.blocks.find(input => input.key === key)
    } else {
      return state.blocks
    }
  },
  analysisAdvanced: state => state.isAdvanced,
  loadedData: state => {
    return (
      state.fields.some(el => el.value !== null) ||
      state.blocks.some(el => el.value !== null)
    )
  },
  seoMonkey: state => state.seoMonkey
}

export const actions = {
  saveAnalysisData({ commit }, data) {
    commit('SAVE_ANALYSIS_DATA', data)
  },
  enableAnalysisBlock({ commit }, status) {
    commit('ENABLE_ANALYSIS_BLOCK', status)
  },
  changeAdvancedAnalysis({ commit }, isAdvanced) {
    commit('CHANGE_ADVANCED_ANALYSIS', isAdvanced)
  },
  saveAnalysisSuggestions({ commit }, status) {
    if (status.suggestions) {
      commit('SAVE_ANALYSIS_SUGGESTIONS', status)
    }
  },
  saveSeoMonkey({ commit }, keyList) {
    commit('SAVE_SEO_MONKEY', keyList)
  }
}

export const mutations = {
  SAVE_ANALYSIS_DATA(state, data) {
    if (!Array.isArray(data)) {
      const elem = state.fields.find(resp => resp.key === data.key)
      elem.value = data.value
      if (data.refNumber) {
        elem.refNumber = data.refNumber
      }
    }
    if (data.length === state.fields.length) {
      state.fields = data
    }
  },
  ENABLE_ANALYSIS_BLOCK(state, status) {
    const elem = state.blocks.find(resp => resp.key === status.key)
    elem.value = status.value
    if (status.editable !== undefined) {
      elem.editable = status.editable
    }
  },
  CHANGE_ADVANCED_ANALYSIS(state, isAdvanced) {
    state.isAdvanced = isAdvanced
  },
  SAVE_ANALYSIS_SUGGESTIONS(state, status) {
    if (!Array.isArray(status)) {
      const elem = state.fields.find(resp => resp.key === status.key)
      elem.suggestions = status.suggestions
    }
  },
  SAVE_SEO_MONKEY(state, status) {
    state.seoMonkey = status
  }
}
