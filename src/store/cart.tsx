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
    items: number;
    total: number;
};

const initialState: ProductState = {
    cart: [],
    items: 0,
    total: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<Product>) {
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

            state.items++;

            state.total =
                state.total + action.payload.price * action.payload.amount;
        },

        removeProduct(state, action: PayloadAction<Product>) {
            const exindex = state.cart.findIndex(
                (product) => product.id === action.payload.id
            );
            if (state.cart[exindex].amount === 1) {
                state.cart.splice(exindex, 1);
            } else if (state.cart[exindex].amount > 1) {
                state.cart[exindex].amount = state.cart[exindex].amount - 1;
            }

            state.items--;

            state.total =
                state.total - action.payload.price * action.payload.amount;
        },

        removeAllProduct(state, action: PayloadAction<Product>) {
            const exindex = state.cart.findIndex(
                (product) => product.id === action.payload.id
            );

            state.items = state.items - state.cart[exindex].amount;

            state.total =
                state.total - action.payload.price * state.cart[exindex].amount;

            state.cart.splice(exindex, 1);
        },

        clearCart(state) {
            state.cart = [];
            state.total = 0;
            state.items = 0;
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
