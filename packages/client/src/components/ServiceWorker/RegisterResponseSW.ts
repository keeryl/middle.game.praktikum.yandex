export const registerResponseSW = (): void => {
  if (location.hostname === 'localhost') return
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./RegisterResponseSW.ts')
      .then(registration => {
        const a = registration
      })
      .catch(error => {
        const b = error
      })
  }
}
