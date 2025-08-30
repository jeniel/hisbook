const CACHE_NAME = "acebook-v2-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/offline.html",
  "/images/acebook-logo.webp",
  "/images/ace.png",
];

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cache first, then network (stale-while-revalidate)
      return (
        cachedResponse ||
        fetch(event.request)
          .then((networkResponse) => {
            // Cache fetched assets (only GET requests)
            if (
              event.request.method === "GET" &&
              networkResponse &&
              networkResponse.status === 200
            ) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => caches.match("/offline.html"))
      );
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
