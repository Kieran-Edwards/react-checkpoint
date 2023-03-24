import React from "react";
import Modal from "./ui/Modal";
import ModalList from "./ModalList";
import ToLocale from "./ToLocale";

import { useSelector } from "react-redux";

import "./cart.scss";

interface CartProps {
    onClose: () => void;
}

const Cart: React.FC<CartProps> = (props) => {
    const basket = useSelector((state: any) => state.cart);

    return (
        <Modal onClose={props.onClose}>
            <h1 className="cart__header">My Bag</h1>

            {basket.cart.length > 0 && (
                <div className="cart__products">
                    <ModalList products={basket.cart} type="cart" />
                    <div>{ToLocale(basket.total)}</div>
                </div>
            )}

            {basket.cart.length === 0 && (
                <div className="basket__empty">
                    Your basket is empty! Please add some products and try
                    again.
                </div>
            )}
        </Modal>
    );
};

export default Cart;
