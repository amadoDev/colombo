export const state = () => ({
  summary: {}
})

export const getters = {
  summary: state => state.summary
}

export const actions = {
  saveSummary({ commit }, report) {
    commit('SAVE_SUMMARY', report)
  }
}

export const mutations = {
  SAVE_SUMMARY(state, report) {
    state.summary = report
  }
}
