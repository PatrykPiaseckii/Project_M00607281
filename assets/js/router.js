const routes = [
  { path: '/', component: window.app.views.Home },
  { path: '/login', component: window.app.views.Login },
  { path: '/register', component: window.app.views.Register },
  { path: '/courses/create', component: window.app.views.CoursesCreate },
]

const router = new VueRouter({
  routes,
})

window.app.router = router
