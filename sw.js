const CACHE_NAME = 'finanzas-conscientes-v1';
const BASE = '/Finanzas-conscientes/';

const ARCHIVOS_CACHE = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json'
];

// Al instalar: guarda en caché los archivos básicos de la app
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS_CACHE))
  );
  self.skipWaiting();
});

// Al activar: borra cachés viejas si subes una v2 en el futuro
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((nombres) =>
      Promise.all(
        nombres
          .filter((nombre) => nombre !== CACHE_NAME)
          .map((nombre) => caches.delete(nombre))
      )
    )
  );
  self.clients.claim();
});

// Al pedir un archivo: primero busca en caché, si no existe va a internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((respuesta) => respuesta || fetch(event.request))
  );
});
