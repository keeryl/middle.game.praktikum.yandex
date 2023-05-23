import { PAGES, CACHE_NAME } from "./const";


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
  const oldVersions = keys.filter(name  => {
    //тут будет логика обновления в зависимости от политики кеширования
    return true;
  });
  return Promise.all(oldVersions.map(key => caches.delete(key)));
}

export async function cacheResponse(request: Request, event: ExtendableEvent) {
    const cache = await caches.open(CACHE_NAME);
    
    const match = await cache.match(request.url);
    if (match) {
        return match;
    }
    const fetchResponseP = fetch(request);
    const fetchResponseCloneP = fetchResponseP.then(r => r.clone());
    event.waitUntil (
        (async function() {
        await cache.put(request, await fetchResponseCloneP);
        })()
    );
    return fetchResponseP;
};
  

