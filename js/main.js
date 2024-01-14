// Checking for Service Worker availability
if ("serviceWorker" in navigator) {
  console.info("Service Worker available!");

  //   Register the Service Worker
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw_cached_response.js")
      .then((register) => console.info("Service Worker: Registered"))
      .catch((error) => console.error("Service Worker Error :", { error }));
  });
}
