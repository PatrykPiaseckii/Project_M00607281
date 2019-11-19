const app = new Vue({
  store: window.app.store,
  router: window.app.router,
  template: '<App />',
}).$mount('#app')
