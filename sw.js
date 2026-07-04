const CACHE = 'anchor-game-v10';
const ASSETS = [
    './index.html',
    './anchor.webp',
    './fake_anchor.webp',
    './shuriken.webp',
    './infused_core.webp',
    './stone_cracker.webp',
    './claws.webp',
    './sai.webp',
    './manifest.json',
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        )
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request))
    );
});
