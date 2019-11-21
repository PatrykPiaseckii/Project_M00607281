Vue.component('App', {
  methods: {
    closeAlert() {
      this.$store.commit('message', '')
    },
  },
  template: `
    <div class="app">
      <div class="alert" v-if="$store.state.message">
        {{ $store.state.message }} <button @click="closeAlert">╳</button>
      </div>
      <nav>
        <div class="logo">
          App
        </div>
        <div class="buttons">
          <template v-if="!$store.getters.isAuthenticated">
            <router-link :to="{ path: '/login' }">Login</router-link>
            <router-link :to="{ path: '/register' }">Register</router-link>
          </template>
          <template v-else>
            {{ $store.state.auth.email }}

            <router-link v-if="$store.getters.isProvider" :to="{ path: '/courses/create' }">Add a course</router-link>

            <button @click="$store.dispatch('logout')">Logout</button>
          </template>
        </div>
      </nav>
      <router-view class="content"></router-view>
    </div>
  `,
})
