import React from 'react'
import type { Product } from '../types'

interface ProductCardProps {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="border p-4 rounded shadow hover:shadow-lg transition">
            <img
                src={product.image}
                alt={product.title}
                className="h-40 mx-auto object-contain"
            />

            <h3 className="mt-3 font-bold line-clamp-2">
                {product.title}
            </h3>

            <p className="text-green-600 font-semibold mt-2">
                ${product.price}
            </p>

            <button className="mt-3 w-full bg-blue-600 text-white p-2 rounded">
                Add to Cart
            </button>
            <hr />
        </div>
    )
}

export default ProductCard
