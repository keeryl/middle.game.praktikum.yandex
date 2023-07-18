import { RootState } from './store'

// ругается, что Property 'user' does not exist on type '() => { user: UserState; }'.
// @ts-ignore
export const selectUser = (state: RootState) => state.user
export const selectUserData = (state: RootState) => selectUser(state).data
export const selectIsLoggedIn = (state: RootState) =>
  selectUser(state).isLoggedIn
export const selectUserisLoading = (state: RootState) =>
  selectUser(state).isLoading
