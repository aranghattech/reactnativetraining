import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import {useDispatch, TypedUseSelectorHook, useSelector} from "react-redux";
export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>(); 
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;

export default store;