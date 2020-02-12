// const cacheName = "hanoi_v1.0"
// const staticAssets = [
// 	"/index.html",
// 	"/src/index.css",
// 	"/src/index.js",
// 	"/src/svg/hash-icon.svg",
// 	"/src/svg/moon-icon.svg",
// 	"/src/svg/reset-icon.svg",
// ]

// self.addEventListener("install", () =>
// 	caches.open(cacheName).then((cache) => cache.addAll(staticAssets))
// )

// self.addEventListener("activate", () => this.clients.claim())

// self.addEventListener("fetch", event => {
// 	const { request } = event
// 	const url = new URL(request.url)

// 	console.log(`Fetched: ${url}`)
// 	console.log("Event: ", event)

// 	if (url.origin === location.origin)
// 		event.respondWith(cacheFirst(request))
// 	else event.respondWith(networkAndCache(request))
// })

// async function cacheFirst(request) {
// 	const cache = await caches.open(cacheName)
// 	const cached = await cache.match(request)
// 	return cached || fetch(request)
// }

// async function networkAndCache(request) {
// 	const cache = await caches.open(cacheName)
// 	try {
// 		const fresh = await fetch(request)
// 		await cache.put(request, fresh.clone())
// 		return fresh
// 	}
// 	catch (error) {
// 		const cached = await cache.match(request)
// 		return cached
// 	}
// }

const CACHE_NAME = "hanoi_v1.0"
const STATIC_ASSETS = [
	"index.html",
	"src/index.css",
	"src/index.js",
	"src/svg/hash-icon.svg",
	"src/svg/moon-icon.svg",
	"src/svg/reset-icon.svg"
]

self.addEventListener("install", event => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
	)
})

self.addEventListener("fetch", event => {
	event.respondWith(
		caches.match(event.request)
			.then(response => response || fetch(event.request))
	)
})