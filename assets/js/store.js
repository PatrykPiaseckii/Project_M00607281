const store = new Vuex.Store({
  state: {
    auth: null,
  },
  mutations: {
    _auth: (state, auth) => (state.auth = auth),
  },
  getters: {
  },
  actions: {
    auth: ({ commit }, auth) => {
      commit('_auth', auth)
    },
  },
})

window.app.store = store
