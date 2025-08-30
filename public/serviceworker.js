const CACHE_NAME = "acebook-v2-cache-v1";
const urlsToCache = [
  '/',
  '/offline.html',
  '/images/acebook-logo.webp',
  '/images/ace.png',
];

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch requests
self.addEventListener("fetch", (event) => {
  // Handle navigation requests (page loads)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match("/offline.html"))
    );
    return;
  }

  // Handle other requests (CSS, JS, images, API calls)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request)
        .then((networkResponse) => {
          if (
            event.request.method === "GET" &&
            networkResponse &&
            networkResponse.status === 200
          ) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => cached) // fallback to cache if available
    })
  );
});

// Activate SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
