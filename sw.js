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
      .then(async (cache) => {
        // Adiciona os arquivos um a um para evitar que um arquivo ausente quebre todo o PWA
        for (const asset of ASSETS_TO_CACHE) {
          try {
            await cache.add(asset);
          } catch (err) {
            console.warn(`Falha ao salvar no cache o arquivo: ${asset}`, err);
          }
        }
      })
      .then(() => self.skipWaiting())
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
