const CACHE_NAME = 'gheymat-cache-v1';
const urlsToCache = [
    'https://pouyamreza.github.io/tanasob-gheymat/',
    'https://pouyamreza.github.io/tanasob-gheymat/index.html',
    'https://pouyamreza.github.io/tanasob-gheymat/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});