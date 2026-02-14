import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState } from './types'
import type { User } from './types'


const initialState: AuthState = {
  currentUser: null,
  users: JSON.parse(localStorage.getItem("users") || "[]"),
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.currentUser = null
    },

    register : (state, action: PayloadAction<User>) => {
      const isExist = state.users.find((user: User) => user.id === action.payload.id)
      if(isExist) {
        alert("User already exists")
        return
      }

      state.users.push(action.payload)
      state.currentUser = action.payload
      localStorage.setItem('users', JSON.stringify(state.users))
    },

    login : (state, action: PayloadAction<{email: string, password: string}>) => {
      const user = state.users.find((user: User) => user.email === action.payload.email && user.password === action.payload.password)

      if (!user) {
        alert('Email Or Password Invalid')
        return
      }

      state.currentUser = user
    },

    logut: (state) => {
      state.currentUser = null
    }
  },
})

export const { register, login, logout } = authSlice.actions
export default authSlice.reducer
