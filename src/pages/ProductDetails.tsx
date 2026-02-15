import { useAppDispatch, useAppSelector } from '@/app/hook'
import ProductCard from '@/features/products/components/ProductCard'
import { fetchProducts } from '@/features/products/productsSlice'
import  { useEffect } from 'react'

export default function ProductDetails() {

  const dispatch = useAppDispatch()

  const { items, error, isLoading } = useAppSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (isLoading) return <h2 className="text-center mt-10">Loading...</h2>
  if (error) return <h2 className="text-center mt-10 text-red-500">{error}</h2>

  return (
    <div className="p-8 grid grid-cols-4 gap-6">
      {items.map(product => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  )
}
