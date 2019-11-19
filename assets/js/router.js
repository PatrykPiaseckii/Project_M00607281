const routes = [
  { path: '/', component: window.app.views.Home },
  { path: '/login', component: window.app.views.Login },
]

const router = new VueRouter({
  routes,
})

window.app.router = router
