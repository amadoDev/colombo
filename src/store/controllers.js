export const state = () => ({
  showReset: false,
  showMarket: false,
  showRecommendation: false,
  hasContents: false,
  hasCompentece: false,
  restrictedMode: false
})

export const getters = {
  showModule: state => el => state[el]
}

export const actions = {
  saveModuleState({ commit }, { element, show }) {
    commit('SAVE_MODULE_STATUS', { element, show })
  }
}

export const mutations = {
  SAVE_MODULE_STATUS(state, { element, show }) {
    state[element] = show
  }
}
