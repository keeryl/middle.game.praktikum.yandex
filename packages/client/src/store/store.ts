import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import { UserState } from './userSlice';

export interface StoreState {
  user: UserState
}

export const createStore = (initialState?: any) => {
  console.log('initialState createStore', initialState)
  return configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState: initialState
  })
}

export type RootState = ReturnType<typeof createStore>['getState']
export type AppDispatch = ReturnType<typeof createStore>['dispatch']
