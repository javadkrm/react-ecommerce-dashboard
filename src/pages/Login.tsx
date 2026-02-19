import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { login } from '@/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Login() {

  const { currentUser, error } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      toast.success("Login successful!")
      navigate("/cart")
    }
  }, [currentUser])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()

  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(login({ email, password }))

    // if (currentUser) {
    //   toast.success('Login successful! Redirecting to cart...')
    //   navigate('/cart')
    // } else {
    //   toast.error('Email Or Password Invalid')
    // }

    clearInputs()
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
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '420px',
        padding: '48px 40px',
        overflow: 'hidden'
      }}>
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
            Sign in to your account
          </p>
        </div>
        {currentUser && (
          <div style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ✓ Welcome back, {currentUser.email}!
          </div>
        )}
        {/* {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: '5px' }}>{error}</p>} */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
          <div>
            <label style={{
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
              placeholder="••••••••"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
          <button
            type="submit"
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
            Sign In
          </button>
        </form>
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

        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#7f8c8d'
        }}>
          Don't have an account?{' '}
          <a
            href="/register"
            style={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#764ba2'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#667eea'}
          >
            Create one
          </a>
        </div>
      </div>
    </div>
  )
}
