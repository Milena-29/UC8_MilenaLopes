const CACHE_NAME = 'gravador-v1';

const arquivos = [
    './',
    './index.html',
    './manifest.json',
    './css/style.css',
    './js/script.js',
    './img/icon-192.png',
    './img/icon-512.png'
];

// Instala o Service Worker
self.addEventListener('install', function(event) {

    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(arquivos);
        })
    );

});

// Ativa o Service Worker
self.addEventListener('activate', function(event) {
    self.clients.claim();
});

// Busca os arquivos no cache
self.addEventListener('fetch', function(event) {

    event.respondWith(
        caches.match(event.request).then(function(resposta) {

            if (resposta) {
                return resposta;
            }

            return fetch(event.request);
        })
    );

});