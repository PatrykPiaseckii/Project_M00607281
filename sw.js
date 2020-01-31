const cacheName = 'app-v1'

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName)

      await cache.addAll([
        '/assets/css/app.css',
        '/assets/js/components/App.js',
        '/assets/js/components/Course.js',
        '/assets/js/views/Home.js',
        '/assets/js/views/Login.js',
        '/assets/js/views/Register.js',
        '/assets/js/views/CoursesCreate.js',
        '/assets/js/views/CoursesUpdate.js',
        '/assets/js/store.js',
        '/assets/js/router.js',
        '/assets/js/app.js',
      ])
    })()
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(cacheName)
      let response

      if (event.request.url.includes('/assets/')) {
        response = await cache.match(event.request)

        if (!response) {
          response = await fetch(event.request)
        }
      } else {
        try {
          response = await fetch(event.request)

          cache.put(event.request, response.clone())
        } catch (e) {
          response = await cache.match(event.request)
        }
      }

      return response
    })()
  )
})
