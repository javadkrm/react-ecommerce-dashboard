import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { login } from '@/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const { isLoading, error, user } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login({ email, password }))
    .unwrap()
    .then(() => {navigate('/dashboard')})
  }
  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      {user && <p style={{ color: "green" }}>Welcome {user.email}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />

        <br /><br />

        <button disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}
