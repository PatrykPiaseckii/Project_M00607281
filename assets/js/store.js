const store = new Vuex.Store({
  state: {
    message: '',
    auth: null,
  },
  mutations: {
    message: (state, message) => (state.message = message),
    _auth: (state, auth) => (state.auth = auth),
    _logout: state => (state.auth = null),
  },
  getters: {
    isAuthenticated: ({ auth }) => auth !== null,
    isProvider: state => state.auth && state.auth.type === 'provider',
  },
  actions: {
    auth: ({ commit }, auth) => {
      commit('_auth', auth)

      localStorage.setItem('app.auth', JSON.stringify(auth))
    },
    logout: ({ commit }) => {
      commit('_logout', null)

      localStorage.removeItem('app.auth')
    },
    init({ commit }) {
      const auth = JSON.parse(localStorage.getItem('app.auth'))

      commit('_auth', auth)
    },
  },
})

window.app.store = store
