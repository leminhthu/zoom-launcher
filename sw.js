const CACHE_NAME = 'zoom-launcher-v1';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(['./index.html', './manifest.json'])
    )
  );
});

self.addEventListener('fetch', (e) => {
  // Always go to network for Supabase calls, cache for app shell
  if (e.request.url.includes('supabase.co')) {
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
