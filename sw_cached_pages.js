const cacheName = "v1.0.0";

const cacheAssets = [
  "index.html",
  "about.html",
  "styles/styles.css",
  "js/main.js",
];

// Install the Serivce Worker
self.addEventListener("install", (e) => {
  console.info("Service Worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.info("Service Worker: Caching files");
        cache.addAll(cacheAssets);
      })
      .then(self.skipWaiting())
  );
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
    fetch(e.request).catch(() => {
      caches.match(e.request);
    })
  );
});
