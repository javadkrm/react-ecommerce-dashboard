import { useAppDispatch, useAppSelector } from '@/app/hook'
import ProductCard from '@/features/products/components/ProductCard'
import { fetchProducts } from '@/features/products/productsSlice'
import { useEffect } from 'react'

export default function ProductDetails() {

  const dispatch = useAppDispatch()

  const { items, error, isLoading } = useAppSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (isLoading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      fontSize: '18px',
      color: '#7f8c8d'
    }}>
      <div>Loading products...</div>
    </div>
  )

  if (error) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      fontSize: '18px',
      color: '#e74c3c'
    }}>
      <div>Error: {error}</div>
    </div>
  )

  return (
    <div style={{
      padding: '32px 24px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div style={{
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '800',
          color: '#2c3e50',
          margin: '0 0 8px 0'
        }}>
          Featured Products
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#7f8c8d',
          margin: '0'
        }}>
          Browse our collection of premium products
        </p>
      </div>
      <div style={{
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: 'repeat(3, 1fr)'
      }}>

        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
