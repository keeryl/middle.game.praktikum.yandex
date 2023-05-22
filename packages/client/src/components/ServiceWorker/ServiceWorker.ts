export const registerSW = (): void => {
  console.log('registerSW');
  if (location.hostname === "localhost") return;
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw-prod.ts").then(registration => {
      const a = registration;
    }).catch(error => {
      const b = error;
    });
  }
};

