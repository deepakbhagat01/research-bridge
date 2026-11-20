const CACHE = "research-bridge-v4";
const FILES = ["./", "./index.html", "./styles.css", "./config.js", "./script.js", "./manifest.webmanifest", "./assets/icon-192.png", "./assets/icon-512.png", "./assets/research-bridge-logo.svg", "./assets/research-bridge-symbol.png"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES))));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
