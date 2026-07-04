const CACHE = 'anchor-game-v1';
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

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request))
    );
});
