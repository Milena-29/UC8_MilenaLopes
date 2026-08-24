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
  './img/Zumba.png'
];

// ===============================
// INSTALAÇÃO
// ===============================
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Criando cache:', CACHE_NAME);
        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => {
        console.log('[SW] Arquivos armazenados com sucesso.');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Erro durante a instalação:', error);
      })
  );
});

// ===============================
// ATIVAÇÃO
// ===============================
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Excluindo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// ===============================
// REQUISIÇÕES
// ===============================
self.addEventListener('fetch', (event) => {

  // Ignora requisições que não sejam GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {

        // Se estiver no cache, utiliza o cache
        if (cachedResponse) {
          return cachedResponse;
        }

        // Caso contrário, busca na internet
        return fetch(event.request)
          .then((networkResponse) => {

            // Não armazena respostas inválidas
            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              networkResponse.type !== 'basic'
            ) {
              return networkResponse;
            }

            // Salva uma cópia no cache
            const responseClone = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseClone);
              });

            return networkResponse;
          })
          .catch(() => {
            console.warn(
              '[SW] Recurso indisponível offline:',
              event.request.url
            );

            // Para páginas HTML, tenta retornar a página inicial
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }

            // Para outros recursos, retorna uma resposta vazia
            return new Response('', {
              status: 503,
              statusText: 'Offline'
            });
          });
      })
  );
});
