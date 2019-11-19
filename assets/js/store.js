const store = new Vuex.Store({
  state: {
    message: '',
    auth: null,
  },
  mutations: {
    message: (state, message) => (state.message = message),
    _auth: (state, auth) => (state.auth = auth),
  },
  getters: {
  },
  actions: {
    auth: ({ commit }, auth) => {
      commit('_auth', auth)

      localStorage.setItem('app.auth', JSON.stringify(auth))
    },
    init({ commit }) {
      const auth = JSON.parse(localStorage.getItem('app.auth'))

      commit('_auth', auth)
    },
  },
})

window.app.store = store
