import { RootState } from './store'

export const selectUser = (state: RootState) => state.user
export const selectUserData = (state: RootState) => selectUser(state).data
export const selectIsLoggedIn = (state: RootState) =>
  selectUser(state).isLoggedIn
