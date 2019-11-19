Vue.component('App', {
  methods: {
    closeAlert() {
      this.$store.commit('message', '')
    },
  },
  template: `
    <div>
      <div v-if="$store.state.message">
        {{ $store.state.message }} <button @click="closeAlert">╳</button>
      </div>
      <router-view></router-view>
    </div>
  `,
})
