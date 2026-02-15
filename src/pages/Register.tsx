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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      {/* Main Container */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '480px',
        padding: '48px 40px',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#2c3e50',
            margin: '0 0 8px 0'
          }}>
            🛒 MyShop
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#7f8c8d',
            margin: '0'
          }}>
            Create your account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '500',
            border: '1px solid #f5c6cb'
          }}>
            ⚠ {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Name Input */}
          <div>
            <label htmlFor="nameInput" style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Full Name
            </label>
            <input
              type="text"
              name='name'
              id='nameInput'
              placeholder="John Doe"
              value={formData.name}
              onChange={inputHandler}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                boxSizing: 'border-box',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                color: 'black'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="emailInput" style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Email Address
            </label>
            <input
              type="email"
              name='email'
              id='emailInput'
              placeholder="you@example.com"
              value={formData.email}
              onChange={inputHandler}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                boxSizing: 'border-box',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                color: 'black'

              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="passwordInput" style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Password
            </label>
            <input
              type="password"
              name='password'
              id='passwordInput'
              placeholder="••••••••"
              value={formData.password}
              onChange={inputHandler}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                boxSizing: 'border-box',
                transition: 'all 0.2s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <p style={{
              fontSize: '12px',
              color: '#95a5a6',
              margin: '6px 0 0 0'
            }}>
              Minimum 6 characters
            </p>
          </div>

          {/* Register Button */}
          <button
            type='submit'
            style={{
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: '700',
              color: 'white',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginTop: '8px',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '28px 0',
          color: '#95a5a6'
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
          <span style={{ fontSize: '12px', fontWeight: '500' }}>OR</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
        </div>

        {/* Login Link */}
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#7f8c8d'
        }}>
          Already have an account?{' '}
          <a
            href="/login"
            style={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#764ba2'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#667eea'}
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  )
}
