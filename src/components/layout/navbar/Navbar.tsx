import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { logout } from "@/features/auth/authSlice"

export default function Navbar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useAppSelector(state => state.auth.currentUser)
  const cartItems = useAppSelector(state => state.cart.carts)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const totalCount = cartItems.reduce((sum, item) => sum + item.items.reduce((itemSum, cartItem) => itemSum + cartItem.quantity, 0), 0)

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '0 32px',
      height: '80px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>

      {/* Left Section - Logo & Navigation */}
      <div style={{
        display: 'flex',
        gap: '40px',
        alignItems: 'center'
      }}>
        <Link 
          to="/" 
          style={{
            fontSize: '24px',
            fontWeight: '800',
            color: '#fff',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#3498db'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
        >
          🛒 <span>MyShop</span>
        </Link>

        <Link 
          to="/products" 
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#ecf0f1',
            textDecoration: 'none',
            transition: 'color 0.2s',
            paddingBottom: '2px',
            borderBottom: '2px solid transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#3498db';
            e.currentTarget.style.borderBottomColor = '#3498db';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#ecf0f1';
            e.currentTarget.style.borderBottomColor = 'transparent';
          }}
        >
          Products
        </Link>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '30px'
      }}>
        <Link 
          to="/cart" 
          style={{
            position: 'relative',
            fontSize: '16px',
            fontWeight: '600',
            color: '#ecf0f1',
            textDecoration: 'none',
            transition: 'color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            paddingBottom: '2px',
            borderBottom: '2px solid transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#3498db';
            e.currentTarget.style.borderBottomColor = '#3498db';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#ecf0f1';
            e.currentTarget.style.borderBottomColor = 'transparent';
          }}
        >
          <span>🛍️ Cart</span>

          {totalCount > 0 && user && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-12px',
              backgroundColor: '#e74c3c',
              color: 'white',
              fontSize: '11px',
              fontWeight: '700',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }}>
              {totalCount}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              borderLeft: '1px solid #34495e',
              paddingLeft: '30px'
            }}>
              <span style={{
                fontSize: '15px',
                color: '#ecf0f1',
                fontWeight: '500'
              }}>
                👤 {user.name}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 20px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#c0392b';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#e74c3c';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              padding: '8px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.2s',
              letterSpacing: '0.5px',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2980b9';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3498db';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
