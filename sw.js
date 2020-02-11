const cacheName = "hanoi_v1.0"
const staticAssets = [
	"./",
	"./index.html",
	"./src",
	"./src/index.css",
	"./src/index.js",
	"./src/svg",
	"./src/svg/hash-icon.svg",
	"./src/svg/moon-icon.svg",
	"./src/svg/reset-icon.svg",
]

self.addEventListener("install", async event => {
	const cache = await caches.open(cacheName)
	await cache.addAll(staticAssets)
	return self.skipWaiting()
})

self.addEventListener("activate", event => self.clients.claim())

self.addEventListener("fetch", async event => {
	const { request } = event
	const url = new URL(request.url)

	if (url.origin === location.origin)
		event.respondWith(cacheFirst(request))
	else event.respondWith(networkAndCache(request))
})

async function cacheFirst(request) {
	const cache = await caches.open(cacheName)
	const cached = await cache.match(request)
	return cached || fetch(request)
}

async function networkAndCache(request) {
	const cache = await caches.open(cacheName)
	try {
		const fresh = await fetch(request)
		await cache.put(request, fresh.clone())
		return fresh
	}
	catch (error) {
		const cached = await cache.match(request)
		return cached
	}
}