if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service/notificationWorker.js")
    .then(function (registration) {});
  navigator.serviceWorker.ready.then(function (registration) {});
}
