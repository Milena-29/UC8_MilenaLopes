const CACHE_NAME = 'MovePlusAcademy-v2';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './aulas.html',
  './unidades.html',
  './planos.html',
  './Tela_login.html',
  './Tela_cadastro.html',
  './pagamento.html',
  './manifest.json',
  './css/style.css',
  './js/script.js',
  './img/+.png',
  './img/Academia_img.png',
  './img/Academia_padrão.png',
  './img/Adesao.png',
  './img/Alongamento.png',
  './img/Body_pump.png',
  './img/Boleto.png',
  './img/Cadastro.png',
  './img/Cardiopng.png',
  './img/Cartao.png',
  './img/email.png',
  './img/facebook.png',
  './img/Funcional.png',
  './img/instagram.png',
  './img/Jump.png',
  './img/locaisUni.png',
  './img/mapaUni.png',
  './img/move+ Academy.png',
  './img/move+ AcademyBranca.png',
  './img/Nutri.png',
  './img/Person.png',
  './img/Peso.png',
  './img/pino_de_localizacao.png',
  './img/Pix.png',
  './img/PlanoBasico.png',
  './img/PlanoPremium+.png',
  './img/PlanoVIP+.png',
  './img/qr.png',
  './img/Seta_direita.png',
  './img/Seta_esquerda.png',
  './img/Spinning.png',
  './img/Tela_de_login.png',
  './img/Tela_planos.png',
  './img/telefone.png',
  './img/Unidades +.png',
  './img/whatsapp.png',
  './img/youtube.png',
  './img/Zumba.png',
  './manifest.json',

];

// Instalação
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cacheando arquivos...');
        return cache.addAll(FILES_TO_CACHE);
      })
      .catch((error) => {
        console.error('[SW] Erro ao criar cache:', error);
      })
  );

  self.skipWaiting();
});

// Ativação
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Removendo cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// Requisições
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

            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              networkResponse.type !== 'basic'
            ) {
              return networkResponse;
            }

            const responseClone = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseClone);
              });

            return networkResponse;
          });

      })
  );
});
