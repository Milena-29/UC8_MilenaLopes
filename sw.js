const CACHE_NAME = 'move-academy-v1';

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './planos.html',
    './aulas.html',
    './unidades.html',
    './Tela_login.html',
    './Tela_cadastro.html',
    './css/style.css',
    './js/script.js',
    './manifest.json',
    './img/+.png',
    './img/Peso.png',
    './img/Cardiopng.png',
    './img/Nutri.png',
    './img/Person.png',
    './img/move+ academy.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/youtube.png',
    './img/telefone.png',
    './img/email.png',
    './img/pino_de_localizacao.png',
    './img/Seta_direita.png',
    './img/+.png',
    './img/move+ academy.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Salvando arquivos no cache');

                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                return self.skipWaiting();
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log(
                                '[Service Worker] Removendo cache antigo:',
                                cacheName
                            );

                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                return self.clients.claim();
            })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then((networkResponse) => {
                        return networkResponse;
                    })
                    .catch(() => {
                        return caches.match('./index.html');
                    });
            })
    );
});
