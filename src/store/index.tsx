import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

type Product = {
    id: number;
    title: string;
    price: number;
    desc: string;
    img: string;
};

type ProductState = {
    wishlist: Product[];
};

const initialState: ProductState = {
    wishlist: [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<Product>) {
            state.wishlist.push(action.payload);
        },
        removeProduct(state, action: PayloadAction<Product>) {
            const exindex = state.wishlist.findIndex(
                (product) => product.id === action.payload.id
            );
            state.wishlist.splice(exindex, 1);
        },
    },
});

const store = configureStore({
    reducer: wishlistSlice.reducer,
});

export const wishlistActions = wishlistSlice.actions;

export default store;
