const routes = [
  { path: '/', component: window.app.views.Home },
  { path: '/login', component: window.app.views.Login },
  { path: '/register', component: window.app.views.Register },
]

const router = new VueRouter({
  routes,
})

window.app.router = router
