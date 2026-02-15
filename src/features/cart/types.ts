import type { Product } from "../products/types"

export interface CartItem extends Product {
  quantity: number
}

export interface UserCart {
  userId: number
  items: CartItem[]
}
