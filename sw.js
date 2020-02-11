const cacheName = "hanoi_v1.0"
const staticAssets = [
	"/",
	"/tower-of-hanoi/",
	"/tower-of-hanoi/index.html",
	"/tower-of-hanoi/src",
	"/tower-of-hanoi/src/index.css",
	"/tower-of-hanoi/src/index.js",
	"/tower-of-hanoi/src/svg",
	"/tower-of-hanoi/src/svg/hash-icon.svg",
	"/tower-of-hanoi/src/svg/moon-icon.svg",
	"/tower-of-hanoi/src/svg/reset-icon.svg",
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
	return cached || fetch(request, { mode: "no-cors" })
}

async function networkAndCache(request) {
	const cache = await caches.open(cacheName)
	try {
		const fresh = await fetch(request, { mode: "no-cors" })
		await cache.put(request, fresh.clone())
		return fresh
	}
	catch (error) {
		const cached = await cache.match(request)
		return cached
	}
}