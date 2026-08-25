const CACHE_NAME = 'move-academy-v2';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './Tela_login.html',
  './Tela_cadastro.html',
  './aulas.html',
  './unidades.html',
  './planos.html',
  './pagamento.html',
  './questionario.html',
  './treino.html',
  './css/style.css',
  './js/script.js',
  './manifest.json',
  './img/+.png',
  './img/PlanoBasico.png',
  './img/PlanoPremium+.png',
  './img/PlanoVIP+.png',
  './img/move+ academy.png'
];

// INSTALAÇÃO
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
      .catch(error => console.error('Erro ao criar cache:', error))
  );
});

// ATIVAÇÃO
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cache => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

// FETCH
self.addEventListener('fetch', (event) => {

  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {

        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(networkResponse => {

            if (
              networkResponse &&
              networkResponse.status === 200 &&
              networkResponse.type === 'basic'
            ) {

              const responseClone = networkResponse.clone();

              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseClone);
                });
            }

            return networkResponse;
          });
      })
      .catch(() => {

        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }

      })
  );
});
