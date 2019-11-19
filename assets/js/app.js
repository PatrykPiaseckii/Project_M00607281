const app = new Vue({
  store: window.app.store,
  router: window.app.router,
  template: '<App />',
  created() {
    this.$store.dispatch('init')
  },
}).$mount('#app')
