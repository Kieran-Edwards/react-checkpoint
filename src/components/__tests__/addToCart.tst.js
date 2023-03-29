import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import store from "../../store";
import AddToCart from "../AddToCart";

describe("AddToCart component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
        store.dispatch({ type: "clearCart" });
    });

    test("should render 'Add To Bag' button", () => {
        render(
            <Provider store={store}>
                <AddToCart
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

        const addToBagButton = screen.getByRole("button", {
            name: /Add To Bag/i,
        });

        expect(addToBagButton).toBeInTheDocument();
    });

    test('should add product to the cart after clicking "Add To Bag" button', () => {
        const DummyProduct = {
            id: 3,
            title: "Product 3",
            price: 30,
            desc: "Product 3 description",
            img: "product3.jpg",
        };

        render(
            <Provider store={store}>
                <AddToCart product={DummyProduct} />
            </Provider>
        );

        fireEvent.click(screen.getByRole("button"));

        const cartItems = store.getState().cart.cart;
        expect(cartItems.length).toBe(1);
        expect(cartItems[0]).toEqual({
            id: 3,
            title: "Product 3",
            price: 30,
            desc: "Product 3 description",
            img: "product3.jpg",
            amount: 1,
        });
    });

    test("should render 'Added to bag' button after clicking 'Add To Bag' button", async () => {
        render(
            <Provider store={store}>
                <AddToCart
                    product={{
                        id: 2,
                        title: "Product 2",
                        price: 20,
                        desc: "Product 2 description",
                        img: "product2.jpg",
                    }}
                />
            </Provider>
        );

        const addToBagButton = screen.getByRole("button", {
            name: /Add To Bag/i,
        });

        fireEvent.click(addToBagButton);

        const addedToBagButton = await screen.findByRole("button", {
            name: /Added to bag/i,
        });

        expect(addedToBagButton).toBeInTheDocument();
    });

    test("should change button text back to 'Add To Bag' after 1 second of clicking 'Add To Bag' button", async () => {
        jest.useFakeTimers();

        render(
            <Provider store={store}>
                <AddToCart
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
        const addToBagButton = screen.getByRole("button", {
            name: /Add To Bag/i,
        });

        fireEvent.click(addToBagButton);
        const addedToBagButton = await screen.findByRole("button", {
            name: /Added to bag/i,
        });
        expect(addedToBagButton).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        const addToBagButtonAfterDelay = await screen.findByRole("button", {
            name: /Add To Bag/i,
        });
        expect(addToBagButtonAfterDelay).toBeInTheDocument();
        expect(addToBagButtonAfterDelay).toHaveTextContent("Add To Bag");
    });
});
