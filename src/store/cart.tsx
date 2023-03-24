import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
    id: number;
    title: string;
    price: number;
    desc: string;
    img: string;
    amount: number;
};

type ProductState = {
    cart: Product[];
    total: number;
};

const initialState: ProductState = {
    cart: [],
    total: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<Product>) {
            const updatedTotalAmount =
                state.total + action.payload.price * action.payload.amount;

            const existingCartItemIndex = state.cart.findIndex(
                (product: { id: number }) => product.id === action.payload.id
            );

            const existingCartItem = state.cart[existingCartItemIndex];

            let updatedItems;

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.payload.amount,
                };
                updatedItems = [...state.cart];
                updatedItems[existingCartItemIndex] = updatedItem;
                state.cart = updatedItems;
            } else {
                updatedItems = state.cart.push(action.payload);
            }
            state.total = updatedTotalAmount;
        },

        removeProduct(state, action: PayloadAction<Product>) {
            const exindex = state.cart.findIndex(
                (product) => product.id === action.payload.id
            );
            state.cart.splice(exindex, 1);
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
