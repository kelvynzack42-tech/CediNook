const CACHE_NAME = 'cedinook-v2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/favicon.svg',
  './icons/cedinook.svg',
  './icons/cedinook-192.png',
  './icons/cedinook-512.png',
  './icons/cedinook-maskable-512.png',
  './icons/cedinook-mark.png',
  './assets/hero.svg'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => (key.startsWith('valvitrack-') || key.startsWith('cedinook-')) && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // Never cache authenticated API responses.
  if (url.pathname.includes('/api/')) return;
  if (req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === new URL('./', self.location.href).pathname) {
    event.respondWith(fetch(req).then(response => {
      if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(req, response.clone()));
      return response;
    }).catch(async () => (await caches.match(req)) || (await caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(response => {
    if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(req, response.clone()));
    return response;
  }).catch(() => caches.match('./index.html'))));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(self.clients.matchAll({type:'window', includeUncontrolled:true}).then(list => {
    for (const client of list) if ('focus' in client) return client.focus();
    if (self.clients.openWindow) return self.clients.openWindow('./');
  }));
});