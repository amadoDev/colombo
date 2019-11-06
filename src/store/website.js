export const state = () => ({
  url: '',
  uuid: ''
})

export const getters = {
  website: state => state
}

export const actions = {
  saveWebsite({ commit }, website) {
    commit('SAVE_WEBSITE', website)
  }
}

export const mutations = {
  SAVE_WEBSITE(state, website) {
    state.url = website.url
    state.uuid = website.uuid
  }
}
