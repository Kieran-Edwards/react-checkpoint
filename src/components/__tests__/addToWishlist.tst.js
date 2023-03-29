import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import store from "../../store";
import AddToWishlist from "../AddToWishlist";
import { wishlistActions } from "../../store/wishlist";

describe("AddToWishlist component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
        store.dispatch({ type: "clearWishlist" });
    });

    test("should render 'Wish' button", () => {
        render(
            <Provider store={store}>
                <AddToWishlist
                    product={{
                        id: 1,
                        title: "Product 1",
                        price: 10,
                        desc: "Product 1 description",
                        img: "product1.jpg",
                    }}
                />
            </Provider>
        );

        const wishButton = screen.getByRole("button", {
            name: /Wish/i,
        });

        expect(wishButton).toBeInTheDocument();
    });

    test('should call addHandler when "Wish" button is clicked and product is not already in wishlist', () => {
        const DummyProduct = {
            id: 1,
            title: "Product 1",
            price: 10,
            desc: "Product 1 description",
            img: "product1.jpg",
        };

        render(
            <Provider store={store}>
                <AddToWishlist product={DummyProduct} />
            </Provider>
        );

        fireEvent.click(screen.getByRole("button"));

        const wishlistItems = store.getState().wishlist.wishlist;
        expect(wishlistItems.length).toBe(1);
        expect(wishlistItems[0]).toEqual({
            id: 1,
            title: "Product 1",
            price: 10,
            desc: "Product 1 description",
            img: "product1.jpg",
        });
    });

    test('should call removeHandler when "Wish" button is clicked and product is already in wishlist', () => {
        const DummyProduct = {
            id: 2,
            title: "Product 2",
            price: 20,
            desc: "Product 2 description",
            img: "product2.jpg",
        };

        store.dispatch(wishlistActions.addProduct(DummyProduct));

        render(
            <Provider store={store}>
                <AddToWishlist product={DummyProduct} />
            </Provider>
        );

        fireEvent.click(screen.getByRole("button"));

        const wishlistItems = store.getState().wishlist.wishlist;
        expect(wishlistItems.length).toBe(1);
    });

    test("should add 'add-to-wishlist__button--filled' class to button if product is in wishlist", async () => {
        const DummyProduct = {
            id: 3,
            title: "Product 3",
            price: 30,
            desc: "Product 3 description",
            img: "product3.jpg",
        };
        render(
            <Provider store={store}>
                <AddToWishlist product={DummyProduct} />
            </Provider>
        );
        const wishButton = screen.getByRole("button", {
            name: /Wish/i,
        });

        act(() => {
            store.dispatch(wishlistActions.addProduct(DummyProduct));
        });

        expect(wishButton).toHaveClass("add-to-wishlist__button--filled");
    });
});
