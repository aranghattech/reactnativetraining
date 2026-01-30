import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Product } from "../types/product";

interface ProductState {
    products: Product[];
    distinctCategories: string[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products : [],
    distinctCategories: [],
    loading: false,
    error: null,
}

export const fetchProduct = createAsyncThunk(
    "data/fetchProducts",
    async (url: string) => {
        try {
            var response = await fetch("https://dummyjson.com/products");
            if (response) {
                var data = await response.json();
                return data.products;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    });

export const productSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        getDistinctCategories: (state, action) => {
            state.distinctCategories = [...new Set(state.products.map(product => product.category))];
        }
    },
    extraReducers : builder => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.distinctCategories = [...new Set(state.products.map(product => product.category))];
        }).addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? "Error fetching products";
        });
    }
});

export const { getDistinctCategories } = productSlice.actions
export default productSlice.reducer
