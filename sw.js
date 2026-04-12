// G318 Travel Website Service Worker
// Provides basic caching for offline functionality

const CACHE_NAME = 'g318-travel-v1';
const urlsToCache = [
  './',
  './index.html',
  './src/styles/base.css',
  './src/styles/variables.css',
  './src/scripts/main.js'
];

// Install service worker and cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service worker: Caching core assets');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate service worker and clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          console.log('Service worker: Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Fetch cached assets or network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached asset if found, otherwise fetch from network
        return response || fetch(event.request);
      })
  );
});
