self.addEventListener('install', () => {
  console.log('Service Worker installed');
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      return new Response('Network error', {
        status: 503,
        statusText: 'Service Unavailable',
      });
    })
  );
});
