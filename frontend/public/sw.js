let cacheData = "appV1";
let caching_files = [
  "static/js/bundle.js",
  "/static/media/profile.2494acea2f0171634247.png",
  "/favicon.ico",
  "/manifest.json",
  "/logo192.png",
  "/index.html",
  "/",
  "/register",
  "/profile",
];
this.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      try {
        cache_obj = await caches.open(cacheData);
        cache_obj.addAll(caching_files);
        console.log("installed");
      } catch {
        console.log("error in install");
      }
    })()
  );
});
this.addEventListener("fetch", (e) => {
  e.respondWith(
    // (async() => {
    //   try {
        caches.match(e.request).then((data) => {
          if (data) {
              console.log("working",data,e.request);
            return data;
          }
        })
    //   } catch (error) {
    //     console.log("error in fetch",error);
    //   }
    // })()
  );
});
