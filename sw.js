// G318 Travel Website Service Worker
// Cache-first for static assets, network-first for API/external resources

const CACHE_NAME = 'g318-travel-v2';
const IMAGE_CACHE = 'g318-images-v1';

// Core assets to pre-cache on install
const CORE_ASSETS = [
  './',
  './index.html',
  './src/styles/base.css',
  './src/styles/variables.css',
  './src/scripts/main.js',
  './public/favicon.svg'
];

// Extensions that indicate cacheable static assets
const CACHEABLE_EXTENSIONS = [
  '.css', '.js', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.woff2'
];

// External origins we allow caching from
const CACHEABLE_ORIGINS = [
  'https://unpkg.com',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://tile.openstreetmap.org'
];

// Install: pre-cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Pre-caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME && name !== IMAGE_CACHE)
          .map(name => {
            console.log('SW: Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: strategy based on request type
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') return;

  // Strategy: Network-first for navigation (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // Strategy: Cache-first for static assets (CSS, JS, fonts, images)
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Strategy: Stale-while-revalidate for external resources (map tiles, CDN)
  if (isCacheableOrigin(url)) {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  // Default: network only
  event.respondWith(fetch(event.request));
});

// --- Cache Strategies ---

// Cache-first: return cache if found, otherwise fetch and cache
async function cacheFirst(request) {
  const cache = await caches.open(getCacheName(request));
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return offline fallback for images
    if (isImageRequest(request)) {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150">' +
        '<rect fill="#f0f0f0" width="200" height="150"/>' +
        '<text x="100" y="80" text-anchor="middle" fill="#999" font-size="14">暂无图片</text></svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
      );
    }
    throw error;
  }
}

// Network-first: try network, fall back to cache
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Return cached index.html as fallback for navigation
    return caches.match('./index.html');
  }
}

// Stale-while-revalidate: return cache immediately, update in background
async function staleWhileRevalidate(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached);

  return cached || fetchPromise;
}

// --- Helper Functions ---

function isStaticAsset(url) {
  const ext = url.pathname.substring(url.pathname.lastIndexOf('.')).toLowerCase();
  return CACHEABLE_EXTENSIONS.includes(ext);
}

function isCacheableOrigin(url) {
  return CACHEABLE_ORIGINS.some(origin => url.origin === new URL(origin).origin ||
    url.href.startsWith(origin));
}

function isImageRequest(request) {
  const url = new URL(request.url);
  const ext = url.pathname.substring(url.pathname.lastIndexOf('.')).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
}

function getCacheName(request) {
  return isImageRequest(request) ? IMAGE_CACHE : CACHE_NAME;
}
