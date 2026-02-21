import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthState } from './types'
import { loginApi, registerApi } from '@/api/authApi'
import type { User } from './types'

export const loginThunk = createAsyncThunk<
  User,
  { email: string, password: string },
  { rejectValue: string }
>(
  'authSlice/login',
  async (data, { rejectWithValue }) => {
    try {
      return await loginApi(data.email, data.password)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }

  }
)


export const registerThunk = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      return await registerApi(data)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)


const initialState: AuthState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"),
  users: JSON.parse(localStorage.getItem("users") || "[]"),
  isLoading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.currentUser = null,
        localStorage.removeItem("currentUser")
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true,
          state.error = null
      }
      )

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentUser = action.payload
        localStorage.setItem('currentUser', JSON.stringify(action.payload))
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'login failed'
      })

      .addCase(registerThunk.pending, state => {
        state.isLoading = true
        state.error = null
      })

      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentUser = action.payload
        state.error = null
      })

      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Register Failed'
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
