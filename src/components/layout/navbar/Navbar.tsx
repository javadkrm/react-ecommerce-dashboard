import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { logout } from "@/features/auth/authSlice"
import './Navbar.css'

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
    <nav className="nav">
      <div className="nav-links--left">
        <Link className="homeLink" to="/">
          🛒 <span>MyShop</span>
        </Link>
        <Link
          className="link"
          to="/products"

        >
          Products
        </Link>
        <Link to="/dashboard" className="link">
          Dashboard
        </Link>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '30px'
      }}>
        <Link to="/cart" className="cart-link">
          <span>🛍️ Cart</span>
          {totalCount > 0 && user && (
            <span className="total-count">
              {totalCount}
            </span>
          )}
        </Link>
        {user ? (
          <>
            <div className="user-name">
              <span className="user-name--span">
                👤 {user.name}
              </span>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <Link
            className="login-btn"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
