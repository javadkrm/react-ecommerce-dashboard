import { useAppDispatch } from '@/app/hook'
import { register } from '@/features/auth/authSlice'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState<string>('')

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validate = () => {
    const { name, email, password } = formData

    if (!name || !email || !password) {
      return 'All Fields Have To Input Value'
    }
    if (!email.includes('@')) {
      return 'Email is Incorrect'
    }
    if (password.length < 6) {
      return 'password Must Have atleast 6 Character'
    }
    return null
  }

  const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validation = validate()

    if (validation) {
      setError(validation)
      return
    }

    dispatch(register({
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: 'user',
    }))

    navigate('/dashboard')
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={submitHandler} className="d-flex flex-col">
        <label htmlFor="nameInput">Name</label>
        <input
          type="text"
          name='name'
          id='nameInput'
          value={formData.name}
          onChange={inputHandler}
          className="w-full p-2 border mb-3"
        />
        <label htmlFor="emailInput">Email</label>
        <input
          type="email"
          name='email'
          id='emailInput'
          value={formData.email}
          onChange={inputHandler}
          className="w-full p-2 border mb-3"
        />
        <label htmlFor="passwordInput">Password</label>
        <input
          type="password"
          name='password'
          id='passwordInput'
          value={formData.password}
          onChange={inputHandler}
          className="w-full p-2 border mb-3"
        />
        <button type='submit' className="w-full bg-blue-600 text-white p-2">submit</button>
      </form>
    </div>
  )
}
