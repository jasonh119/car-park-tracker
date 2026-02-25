// Service Worker for Car Park Tracker
// Cache-first strategy — enables full offline functionality

const CACHE_VERSION = 'v1';
const CACHE_NAME = `car-park-tracker-${CACHE_VERSION}`;

// App shell files to cache on install
const APP_SHELL = [
    '.',
    'index.html',
    'manifest.json',
    'icon-192.png',
    'icon-512.png',
];

// ── Install ───────────────────────────────────────────────────────────────────
// Pre-cache all app shell files so the app works offline immediately
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(APP_SHELL);
            })
            .then(function () {
                // Activate immediately without waiting for old SW to finish
                return self.skipWaiting();
            })
            .catch(function (error) {
                console.error('[SW] Install cache failed:', error);
            })
    );
});

// ── Activate ──────────────────────────────────────────────────────────────────
// Clean up old caches from previous versions
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (cacheNames) {
                return Promise.all(
                    cacheNames
                        .filter(function (name) {
                            // Delete any cache that isn't the current version
                            return name.startsWith('car-park-tracker-') && name !== CACHE_NAME;
                        })
                        .map(function (name) {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(function () {
                // Take control of all open clients immediately
                return self.clients.claim();
            })
            .catch(function (error) {
                console.error('[SW] Activate cleanup failed:', error);
            })
    );
});

// ── Fetch ─────────────────────────────────────────────────────────────────────
// Cache-first: serve from cache, fall back to network, then cache the response
self.addEventListener('fetch', function (event) {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request)
            .then(function (cachedResponse) {
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Not in cache — fetch from network and cache for next time
                return fetch(event.request)
                    .then(function (networkResponse) {
                        // Only cache valid same-origin or basic responses
                        if (
                            !networkResponse ||
                            networkResponse.status !== 200 ||
                            (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')
                        ) {
                            return networkResponse;
                        }

                        // Clone before consuming (response can only be read once)
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            })
                            .catch(function (error) {
                                console.warn('[SW] Failed to cache network response:', error);
                            });

                        return networkResponse;
                    })
                    .catch(function (error) {
                        console.warn('[SW] Network fetch failed:', error);
                        // App shell is already cached — this handles sub-resources gracefully
                    });
            })
            .catch(function (error) {
                console.error('[SW] Cache match failed:', error);
            })
    );
});
