import { configureStore } from "@reduxjs/toolkit";

import wishlistReducer from "./wishlist";
import cartReducer from "./cart";

const store = configureStore({
    reducer: { wishlist: wishlistReducer, cart: cartReducer },
});

export default store;
