import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserCart, CartItem } from "./types";

interface cartState {
    carts: UserCart[],

}

const initialState: cartState = {
    carts: JSON.parse(localStorage.getItem('cartItems') || '[]') as UserCart[],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<{ userId: number; product: CartItem }>
        ) => {
            const { userId, product } = action.payload

            let userCart = state.carts.find(c => c.userId === userId)

            if (!userCart) {
                userCart = { userId, items: [] }
                state.carts.push(userCart)
            }

            const existingItem = userCart.items.find(
                item => item.id === product.id
            )

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                userCart.items.push({ ...product, quantity: 1 })
            }

            localStorage.setItem("cartItems", JSON.stringify(state.carts))
        },

        removeFromCart: (
            state,
            action: PayloadAction<{ userId: number; productId: number }>
        ) => {
            const { userId, productId } = action.payload

            const userCart = state.carts.find(c => c.userId === userId)
            if (!userCart) return

            userCart.items = userCart.items.filter(
                item => item.id !== productId
            )

            localStorage.setItem("cartItems", JSON.stringify(state.carts))
        },

        increaseQuantity : (state, action: PayloadAction<{userId: number; productId: number}>) => {
            const { userId, productId } = action.payload
            const userCart = state.carts.find(c => c.userId === userId)
            if (!userCart) return
            const item = userCart.items.find(i => i.id === productId)
            if (item) {
                item.quantity += 1
                localStorage.setItem("cartItems", JSON.stringify(state.carts))
            }
        },

        decreaseQuantity : (state, action: PayloadAction<{userId: number; productId: number}>) => {
            const { userId, productId } = action.payload
            const userCart = state.carts.find(c => c.userId === userId)
            if (!userCart) return
            const item = userCart.items.find(i => i.id === productId)
            if (item && item.quantity > 1) {
                item.quantity -= 1
                localStorage.setItem("cartItems", JSON.stringify(state.carts))
            }
        },

    },

})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions

export default cartSlice.reducer