const CACHE_NAME = 'flashcards-cache-v1';
const URLS_TO_CACHE = [
    '/FlashCards/',
    '/FlashCards/index.html',
    '/FlashCards/css/styles.css',
    '/FlashCards/js/app.js',
    '/FlashCards/js/constants.js',
    '/FlashCards/manifest.json',
    '/FlashCards/icons/icon.png',
];

// Install: cache application shell
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(URLS_TO_CACHE))
    );
    self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            ))
    );
    self.clients.claim();
});

// Fetch: respond with cache first, then network
self.addEventListener('fetch', event => {
    const requestURL = new URL(event.request.url);

    // Only handle requests within the /FlashCards/ scope
    if (!requestURL.pathname.startsWith('/FlashCards/')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => cachedResponse || fetch(event.request))
    );
});
