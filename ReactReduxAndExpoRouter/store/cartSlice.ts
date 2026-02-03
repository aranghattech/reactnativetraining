import {CartItem} from "../types/cart";
import {createSlice} from "@reduxjs/toolkit";

interface CartState {
    cartItems: CartItem[];
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    cartItems: [],
    loading: false,
    error: null
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState
    ,reducers: {
        addToCart: (state :CartState, action:any) => {
            const cartItem = state.cartItems.find((item:CartItem) => item.productId === action.payload.productId);
            if (cartItem) {
                cartItem.quantity += action.payload.quantity;
            } else {
                state.cartItems.push(action.payload);
            }
        }   
    }
})

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;