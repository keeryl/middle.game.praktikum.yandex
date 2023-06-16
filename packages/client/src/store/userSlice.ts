import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authController } from '../controllers/AuthController'
import { userController } from '../controllers/UserController/UserController'
import { UserData } from '../api/AuthApi/types'
import {
  UserUpdateRequestData,
  UserUpdatePasswordRequestData,
} from '../api/UserApi/types'

export interface UserState {
  data?: UserData | null
  isLoggedIn: boolean
  isLoading: boolean
}

export const fetchUser = createAsyncThunk<UserData>(
  'user/fetchUser',
  async () => {
    const response = await authController.fetchUser()
    return response
  }
)

export const updateUserProfile = createAsyncThunk<
  UserData,
  UserUpdateRequestData
>('user/updateUserProfile', async data => {
  const response = await userController.updateUserProfile(data)
  return response
})

export const updateUserPassword = createAsyncThunk<
  void,
  UserUpdatePasswordRequestData
>('user/updateUserPassword', async data => {
  const response = await userController.updateUserPassword(data)
  return response
})

export const updateUserAvatar = createAsyncThunk<UserData, FormData>(
  'user/updateUserAvatar',
  async data => {
    const response = await userController.updateUserAvatar(data)
    return response
  }
)

export const logOut = createAsyncThunk('user/logOut', async () => {
  const response = await authController.logOut()
  return response
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    isLoading: true,
    
  } as UserState,
  reducers: {
    someFutureReducer: () => {
      console.log('f')
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload
          state.isLoggedIn = true
        } else {
          state.isLoggedIn = false
        }
        state.isLoading = false
      })
      .addCase(fetchUser.rejected, state => {
        state.isLoading = false
      })
      .addCase(logOut.pending, state => {
        state.isLoading = true
      })
      .addCase(logOut.fulfilled, state => {
        state.data = null
        state.isLoggedIn = false
        state.isLoading = false
      })
      .addCase(logOut.rejected, state => {
        state.isLoading = false
      })
      .addCase(updateUserProfile.pending, state => {
        state.isLoading = true
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(updateUserProfile.rejected, state => {
        state.isLoading = false
      })
      .addCase(updateUserPassword.pending, state => {
        state.isLoading = true
      })
      .addCase(updateUserPassword.fulfilled, state => {
        state.isLoading = false
      })
      .addCase(updateUserPassword.rejected, state => {
        state.isLoading = false
      })
      .addCase(updateUserAvatar.pending, state => {
        state.isLoading = true
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload) {
          state.data = action.payload
        }
      })
      .addCase(updateUserAvatar.rejected, state => {
        state.isLoading = false
      })
  },
})

export default userSlice.reducer
