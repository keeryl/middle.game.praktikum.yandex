import { RootState } from './store'

export const selectUser = (state: RootState) => state.user
export const selectUserData = (state: RootState) => selectUser(state).data
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn
export const selectUserisLoading = (state: RootState) =>
  selectUser(state).isLoading
