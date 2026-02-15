import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "./types";

interface ProductsState {
    items: Product[]
    isLoading: boolean
    error: string | null
}


const initialState: ProductsState = {
    items: [],
    isLoading: false,
    error: null
}

export const fetchProducts = createAsyncThunk<Product[]>(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("https://fakestoreapi.com/products")
            return await res.json()
        } catch (error: any) {
            return rejectWithValue("Failed to fetch products")
        }
    }
)

const productslice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, state => {
            state.isLoading = true
            state.error = null
        })

        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.items = action.payload
        })

        .addCase(fetchProducts.rejected, (state, action) => {
            state.error = action.payload as string
            state.isLoading = false
        })
    }
})


export default productslice.reducer