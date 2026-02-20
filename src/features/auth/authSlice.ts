import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthState } from './types'
import { loginApi } from '@/api/authApi'
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

    register: (state, action: PayloadAction<User>) => {

      state.error = null

      const exists = state.users.find(
        user => user.email === action.payload.email
      )

      if (exists) {
        state.error = 'This Email Already Exist'
        return
      }

      state.users.push(action.payload)
      state.currentUser = action.payload

      localStorage.setItem("users", JSON.stringify(state.users))
      localStorage.setItem("currentUser", JSON.stringify(action.payload))
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
  }
})

export const { register, logout } = authSlice.actions
export default authSlice.reducer
