import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import Plp from "../Plp";
import store from "../../store";

describe("Plp", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("renders loading message when there are no products", () => {
        render(
            <Provider store={store}>
                <Plp />
            </Provider>
        );
        const loadingMessage = screen.getByText(/loading/i);
        expect(loadingMessage).toBeInTheDocument();
    });

    test("renders list of products when loaded", async () => {
        const mockProducts = [
            {
                id: 1,
                title: "Product 1",
                desc: "Product 1 description",
                img: "product1.jpg",
                price: 10,
            },
            {
                id: 2,
                title: "Product 2",
                desc: "Product 2 description",
                img: "product2.jpg",
                price: 20,
            },
        ];
        const mockResponse = new Response(JSON.stringify(mockProducts), {
            status: 200,
            headers: {
                "Content-type": "application/json",
            },
        });
        jest.spyOn(global, "fetch").mockResolvedValue(mockResponse);

        render(
            <Provider store={store}>
                <Plp />
            </Provider>
        );
        const product1Title = await screen.findByText(/Product 1/i);
        const product2Title = await screen.findByText(/Product 2/i);

        expect(product1Title).toBeInTheDocument();
        expect(product2Title).toBeInTheDocument();
    });

    test("renders error message when API call fails", async () => {
        const mockError = new Error("Something went wrong!");
        jest.spyOn(global, "fetch").mockRejectedValue(mockError);

        render(
            <Provider store={store}>
                <Plp />
            </Provider>
        );
        const errorMessage = await screen.findByText(/Something went wrong!/i);

        expect(errorMessage).toBeInTheDocument();
    });
});
