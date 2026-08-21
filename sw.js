const CACHE_NAME = "meu-disney-v1";

const urlsToCache = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/script.js",
    "/manifest.json",
    "https://api.disneyapi.dev/character",
    "https://fontlibrary.org//face/waltograph-disney",
    "https://upload.wikimedia.org/wikipedia/commons/f/fe/Mickey_Mouse_head_and_ears.svg",
    

];

// Instala o Service Worker e salva os arquivos no cache
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );

    self.skipWaiting();
});

// Ativa o Service Worker
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );

    self.clients.claim();
});

// Estratégia Cache First
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }

                return fetch(event.request)
                    .then(networkResponse => {
                        // Salva recursos GET no cache
                        if (
                            event.request.method === "GET" &&
                            networkResponse.status === 200
                        ) {
                            const responseClone = networkResponse.clone();

                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, responseClone);
                                });
                        }

                        return networkResponse;
                    })
                    .catch(() => {
                        // Fallback para imagens quebradas
                        if (
                            event.request.destination === "image"
                        ) {
                            return new Response(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
                                    <rect width="100%" height="100%" fill="#ccc"/>
                                    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">
                                        Sem imagem
                                    </text>
                                </svg>`,
                                {
                                    headers: {
                                        "Content-Type": "image/svg+xml"
                                    }
                                }
                            );
                        }
                    });
            })
    );
});
