import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authController } from '../controllers/AuthController'
import { UserData } from '../api/AuthApi/types'

interface UserState {
  data: UserData | null
  isLoggedIn: boolean
  isLoading: boolean
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await authController.fetchUser()
  return response
})

export const logOut = createAsyncThunk('user/logOut', async () => {
  const response = await authController.logOut()
  return response
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isLoggedIn: false,
    isLoading: false,
  } as UserState,
  reducers: {
    someFutureReducer: () => {},
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.isLoading = true
    })

    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.data = action.payload
        ;(state.isLoggedIn = true), (state.isLoading = false)
      }
    )

    builder.addCase(fetchUser.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(logOut.pending, state => {
      state.isLoading = true
    })

    builder.addCase(logOut.fulfilled, state => {
      state.data = null
      ;(state.isLoggedIn = false), (state.isLoading = false)
    })

    builder.addCase(logOut.rejected, state => {
      state.isLoading = false
    })
  },
})

export const {} = userSlice.actions
export default userSlice.reducer
