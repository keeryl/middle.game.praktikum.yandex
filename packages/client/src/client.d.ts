import { StoreState } from './store/store'

declare const __SERVER_PORT__: number
declare module 'react-email-validator'

declare global {
  interface Window {
    initialState?: StoreState;
  }
}