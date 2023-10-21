let cacheData = "appV1";
this.addEventListener("install",(e)=>{
    e.waitUntil(
        caches.open(cacheData).then((data)=>{
            data.addAll([
                "static/js/bundle.js",
                "/favicon.ico",
                "/manifest.json",
                "/logo192.png",
                "/index.html",
                "/",
                "/register"
            ])
        })
    )
});
this.addEventListener("fetch",(e)=>{
    e.respondWith(
        caches.match(e.request).then((data)=>{
            if(data){
                return data
            }
        })
    )
})