export const actions = {
  resetStore({ commit }) {
    commit('RESET_STORE')
  }
}

export const mutations = {
  RESET_STORE(state) {
    state.form.fields.forEach(el => {
      el.value = null
    })
    state.form.blocks.forEach(el => {
      el.value = null
    })
    state.form.analysisAdvanced = false
    state.summary.summary = {}
    state.controllers = {
      showReset: false,
      showMarket: false,
      showRecommendation: false,
      hasContents: false,
      hasCompentece: false,
      restrictedMode: false
    }
  }
}
