const CACHE_NAME = 'cache-v1'
const resources = ['/']

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(resources))
  )
})

const MAX_AGE = 3600

this.addEventListener('fetch', event => {
  event.respondWith(
    // ищем запрошенный ресурс
    caches.match(event.request).then(cachedResponse => {
      let lastModified
      const fetchRequest = event.request.clone()

      // если ресурса нет в кэше
      if (!cachedResponse) {
        return fetch(fetchRequest, { cache: 'no-store' }).then(response => {
          const responseClone = response.clone()

          updateCache(event.request, responseClone)
          return response
        })
      }

      // если ресурс есть в кэше
      lastModified = new Date(cachedResponse.headers.get('last-modified'))
      // если ресурс устаревший
      if (lastModified && Date.now() - lastModified.getTime() > MAX_AGE) {
        return fetch(fetchRequest, { cache: 'no-store' })
          .then(response => {
            if (!response || response.status >= 500) {
              return cachedResponse
            }
            updateCache(event.request, response.clone())
            return response
          })
          .catch(() => cachedResponse)
      }

      return cachedResponse
    })
  )
})

const updateCache = (req, res) => {
  caches.open(CACHE_NAME).then(cache => {
    if (req.url.startsWith('http')) {
      cache.put(req, res)
    }
  })
}
