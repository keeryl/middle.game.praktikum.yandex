import { PAGES, CACHE_NAME } from "./const";


//Экспортируем регистрацию.
export const registerSW = (): void => {
  if (location.hostname === "localhost") return;
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw-prod.js").catch(e => {
      console.log("Registration fail: ", e);
    });
  }
}

export async function activateServiceWorker() {
    await deleteOldCaches();
    await installCachedFiles();
}

export async function installCachedFiles() {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(PAGES);
}

export async function deleteOldCaches() {
  const keys = await caches.keys();
  const oldVersions = keys.filter(name => {
    //тут будет логика обновления в зависимости от политики кеширования
    return true;
  });
  return Promise.all(oldVersions.map(key => caches.delete(key)));
}

async function cacheResponse(request: RequestInfo, event: Event) {
    const cache = await caches.open(CACHE_NAME);
    //@ts-ignore
    const match = await cache.match(request.url);
    if (match) {
        return match;
    }
    const fetchResponseP = fetch(request);
    const fetchResponseCloneP = fetchResponseP.then(r => r.clone());
    //@ts-ignore
    event.waitUntil(
        (async function() {
        await cache.put(request, await fetchResponseCloneP);
        })()
    );
    return fetchResponseP;
}
  

//пример функции для кешированя запросов.
self.addEventListener("fetch", (event: Event) => {
    if (
        //@ts-ignore
      event.request.mode === "navigate" ||
      //@ts-ignore
      event.request.destination === "style" ||
      //@ts-ignore
      event.request.destination === "script" ||
      //@ts-ignore
      event.request.destination === "image"
    ) {//@ts-ignore
      event.respondWith(cacheResponse(event.request, event));
    }
  });

