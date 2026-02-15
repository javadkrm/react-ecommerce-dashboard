import React from 'react'
import type { Product } from '../types'
import { addToCart } from '@/features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import type { CartItem } from '@/features/cart/types'
import { useNavigate } from 'react-router-dom'

interface ProductCardProps {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const user = useAppSelector(state => state.auth.currentUser)

    const handleAddToCart = () => {
        if (user) {
            dispatch(addToCart({ userId: user.id, product: product as CartItem }))
             alert("Added to cart ✅")

        } else {
            alert("Please login to add items to your cart.")
            navigate('/login')
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            backgroundColor: '#2C3E50',
            height: '100%',
            cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
            e.currentTarget.style.transform = 'translateY(-6px)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
            e.currentTarget.style.transform = 'translateY(0)';
        }}>
            {/* Image Container */}
            <div style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <img
                    src={product.image}
                    alt={product.title}
                    style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        padding: '10px'
                    }}
                />
            </div>

            {/* Category Badge */}
            <div style={{ padding: '12px 16px', paddingBottom: '0' }}>
                <span style={{
                    display: 'inline-block',
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    {product.category}
                </span>
            </div>

            {/* Content Container */}
            <div style={{
                padding: '16px',
                flex: '1',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Title */}
                <h3 style={{
                    margin: '0 0 10px 0',
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#ffffff',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    minHeight: '36px'
                }}>
                    {product.title}
                </h3>

                {/* Description */}
                <p style={{
                    margin: '8px 0 12px 0',
                    fontSize: '13px',
                    color: '#7f8c8d',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: '1.4'
                }}>
                    {product.description}
                </p>

                {/* Price */}
                <div style={{
                    marginTop: 'auto',
                    paddingTop: '12px',
                    borderTop: '1px solid #f0f0f0'
                }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#95a5a6' }}>Price</p>
                    <p style={{
                        margin: '0 0 16px 0',
                        fontSize: '24px',
                        fontWeight: '800',
                        color: '#27ae60'
                    }}>
                        ${product.price.toFixed(2)}
                    </p>
                </div>

                {/* Button */}
                <button
                    onClick={handleAddToCart}
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#2980b9';
                        e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#3498db';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard
