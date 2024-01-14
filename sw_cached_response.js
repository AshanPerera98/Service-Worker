const cacheName = "v2.0.0";

// Install the Serivce Worker
self.addEventListener("install", (e) => {
  console.info("Service Worker: Installed");
});

// Activate the Serivce Worker
self.addEventListener("activate", (e) => {
  console.info("Service Worker: Activated");

  // Clearing old cache
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cache) => {
          cache !== cacheName && caches.delete(cache);
        })
      );
    })
  );
});

// Call Fetch event
self.addEventListener("fetch", (e) => {
  console.info("Service Worker: Fetching");
  // Checking the respond from the server
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // Make clone of the response
        const responseClone = response.clone();
        caches.open(cacheName).then((cache) => {
          // Add the clone to the cache
          cache.put(e.request, responseClone);
        });
        return response;
      })
      .catch((error) => {
        // serving the cached clone
        caches.match(e.request).then((response) => response);
      })
  );
});
