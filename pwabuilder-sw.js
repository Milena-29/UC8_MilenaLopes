const CACHE_NAME = 'gravador-pwa-v1';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './css/style.css',
  './js/script.js',
  './img/icon-192.png',
  './img/icon-512.png'
];

// Instala o Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
  );

  self.skipWaiting();
});

// Ativa o Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

// Intercepta requisições
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {

        // Retorna do cache se existir
        if (response) {
          return response;
        }

        // Tenta buscar da internet
        return fetch(event.request)
          .catch(() => {

            // Se for uma navegação e estiver offline
            if (event.request.mode === 'navigate') {
              return caches.match('./offline.html');
            }

          });

      })
  );
});