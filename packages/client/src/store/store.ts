import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import { UserState } from './userSlice';

export interface StoreState {
  user: UserState
}

export const createStore = (initialState?: StoreState) => {
  console.log('initialState createStore', typeof initialState)
  return configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState: initialState
  })
}

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   }
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof createStore>['getState']
export type AppDispatch = ReturnType<typeof createStore>['dispatch']

