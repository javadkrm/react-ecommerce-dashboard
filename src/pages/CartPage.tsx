import { useAppDispatch, useAppSelector } from '@/app/hook'
import { logout } from '@/features/auth/authSlice'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '@/features/cart/cartSlice'
import type { CartItem } from '@/features/cart/types'

export default function CartPage() {

    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.auth.currentUser)
    const cartItems = useAppSelector(state => state.cart.carts.find(c => c.userId === user?.id)?.items || [])

    const logoutHandler = () => {
        dispatch(logout())
    }

    const totalPrice = () => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        return (
            <div style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
                <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold', color: '#27ae60' }}>
                    Total Price: ${total.toFixed(2)}
                </p>
            </div>
        )
    }

    return (
        
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {user ? <p style={{ fontSize: '20px', color: '#a49f9f',marginBottom: '20px' }}>Welcome {<span style={{ color: '#5a7d9f', fontWeight: 'bold' }}>{user.name.toUpperCase()}</span>}</p>
                :
                <p style={{ color: 'orange', fontWeight: 'bolder',marginBottom: '20px' }}>Please Login First</p>
            }
            {/* <h2 style={{ color: '#2f75bb', marginBottom: '20px' }}>Your Cart</h2> */}
            {user && totalPrice()}
            {cartItems.length === 0
                ?
                (<p style={{ fontSize: '16px', color: '#7f8c8d', textAlign: 'center', padding: '40px 0' }}>Your cart is empty.</p>)
                :
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                    {cartItems.map((cart: CartItem) => (
                        <div key={cart.id} style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer',
                            backgroundColor: '#fff',
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                            }}>
                            {/* Product Image */}
                            <img
                                src={cart.image}
                                alt={cart.title}
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'contain',
                                    backgroundColor: '#f5f5f5'
                                }}
                            />
                            <div style={{ padding: '16px' }}>
                                <h3 style={{
                                    margin: '0 0 8px 0',
                                    fontSize: '16px',
                                    color: '#2c3e50',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {cart.title}
                                </h3>

                                <p style={{
                                    margin: '8px 0',
                                    fontSize: '13px',
                                    color: '#7f8c8d',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                }}>
                                    {cart.description}
                                </p>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: '12px',
                                    paddingTop: '12px',
                                    borderTop: '1px solid #f0f0f0'
                                }}>
                                    <div>
                                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#95a5a6' }}>Price</p>
                                        <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', color: '#27ae60' }}>
                                            ${cart.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#95a5a6' }}>Qty</p>
                                        <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', color: '#e74c3c' }}>
                                            {cart.quantity}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#95a5a6' }}>Total</p>
                                        <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', color: '#2c3e50' }}>
                                            ${(cart.price * cart.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                    <button
                                        style={{ backgroundColor: 'blue' }}
                                        onClick={() => { dispatch(increaseQuantity({ userId: user!.id, productId: cart.id })) }}>
                                        + Qty
                                    </button>
                                    <button
                                        style={{ backgroundColor: 'red' }}
                                        onClick={() => { dispatch(removeFromCart({ userId: user!.id, productId: cart.id })) }}
                                    >
                                        Remove
                                    </button>
                                    <button
                                        style={{ backgroundColor: 'orange' }}
                                        onClick={() => { dispatch(decreaseQuantity({ userId: user!.id, productId: cart.id })) }}>
                                        - Qty
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }

            <button onClick={logoutHandler} style={{
                padding: '10px 20px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'background-color 0.2s'
            }}
                disabled={!user && true}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c0392b'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e74c3c'}>
                Logout
            </button>
        </div>
    )
}
