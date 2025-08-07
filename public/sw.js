// let cacheData = "appV1";

// this.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheData).then((cache) => {
//       cache.addAll([
     
//         "/",
//       ]);
//     })
//   );
// });

// this.addEventListener("fetch", (event) => {
//   // event.request
//   // event.waitUntil(
//   //     this.registration.showNotification('hello',{
//   //         body: 'hello from notification.... '
//   //     })
//   // )
//   if (!navigator.onLine) {
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         if (response) {
//           return response;
//         }
//         let requestUrl = event.request.clone();
//         fetch(requestUrl);
//       })
//     );
//   } else {
//   }
// });

// this.self.addEventListener("push", (e) => {

//   this.self.registration.showNotification(
//     "Testing ", // title of the notification
//     {
//       body: "hello from notification.... ",
//       icon: "logo.png",
//       vibrate: [100, 50, 100],
//       data: {
//         dateOfArival: Date.now(),
//         primaryKey: "2",
//       },
//       actions: [
//         {
//           action: "explore",
//           title: "Someone like your post",
//           icon: "logo.png",
//         },
//         { action: "close", title: "Close", icon: "logo.png" },
//       ],
//     }
//   );
// });
