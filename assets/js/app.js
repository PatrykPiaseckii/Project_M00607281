const notify = async message => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support desktop notification')
    return
  }

  if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
    await Notification.requestPermission()
  }

  new Notification(message)
}

const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers are not supported.')
    return
  }

  try {
    await navigator.serviceWorker.register('/sw.js')

    console.info('Service worker registered.')

    notify('Cache was created!')
  } catch (error) {
    console.error('Service worker registration failed:', error)
  }
}

const app = new Vue({
  store: window.app.store,
  router: window.app.router,
  template: '<App />',
  created() {
    this.$store.dispatch('init')

    registerServiceWorker()
  },
}).$mount('#app')
