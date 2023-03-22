import React, { useCallback, useState, useEffect } from "react";
import Modal from "./ui/Modal";
import ModalList from "./ModalList";

import "./cart.scss";

interface CartProps {
    onClose: () => void;
}

const Cart: React.FC<CartProps> = (props) => {
    const [basket, setBasket] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);

    const fetchBasketHandler = useCallback(async () => {
        setIsLoading(true);
        // setError(null);

        try {
            const response = await fetch(
                `https://react-checkpoint-1-default-rtdb.firebaseio.com/cart.json`
            );

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();

            const loadedProducts = [];

            for (const key in data) {
                loadedProducts.push({
                    id: data[key].id,
                    title: data[key].title,
                    price: data[key].price,
                    img: data[key].img,
                });
            }

            setBasket(loadedProducts);
        } catch (error: any) {
            return error.message;
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchBasketHandler();
    }, [fetchBasketHandler]);

    return (
        <Modal onClose={props.onClose}>
            <h1 className="cart__header">My Bag</h1>
            {basket.length > 0 && (
                <div className="cart__products">
                    <ModalList products={basket} />
                    <div>Cart totals</div>
                </div>
            )}
            {basket.length === 0 && !isLoading && (
                <div className="basket__empty">
                    Your basket is empty! Please add some products and try
                    again.
                </div>
            )}
            {isLoading && (
                <div className="basket__loading">Loading Cart...</div>
            )}
        </Modal>
    );
};

export default Cart;
