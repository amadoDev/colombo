import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'colombo',
    paths: ['controllers', 'form', 'website', 'summary']
  })(store)
}
