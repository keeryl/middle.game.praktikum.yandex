//Экспортируем регистрацию.
export const registerSW = (): void => {
    console.log('registerSW');
  if (location.hostname === "localhost") return;
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw-prod.ts").catch(e => {
      console.log("Registration fail: ", e);
    });
  }
}

