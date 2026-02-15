import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState } from './types'
import type { User } from './types'


const initialState: AuthState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"),
  users: JSON.parse(localStorage.getItem("users") || "[]"),
  error : null
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
      const exists = state.users.find(
        user => user.email === action.payload.email
      )

      if (exists) {
        alert('email already registered')
        return
      }

      state.users.push(action.payload)
      state.currentUser = action.payload

      localStorage.setItem("users", JSON.stringify(state.users))
      localStorage.setItem("currentUser", JSON.stringify(action.payload))

    },

    login: (state, action: PayloadAction<{ email: string, password: string }>) => {
      const user = state.users.find((user: User) => user.email === action.payload.email && user.password === action.payload.password)

      if (!user) {
        // state.error = 'Email Or Password Invalid'
        return
      }

      state.currentUser = user
      localStorage.setItem("currentUser", JSON.stringify(user))
    },

  },
})

export const { register, login, logout } = authSlice.actions
export default authSlice.reducer
