const routes = [
  { path: '/', component: window.app.views.Home },
]

const router = new VueRouter({
  routes,
})

window.app.router = router
