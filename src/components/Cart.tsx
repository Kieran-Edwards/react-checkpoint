import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "./ui/Modal";
import ModalList from "./ModalList";
import ToLocale from "./ToLocale";
import { cartActions } from "../store/cart";

import "./cart.scss";

interface CartProps {
    onClose: () => void;
}

const Cart: React.FC<CartProps> = (props) => {
    const dispatch = useDispatch();

    const basket = useSelector(
        (state: { cart: { cart: []; total: number } }) => state.cart
    );

    const clearCart = () => {
        if (window.confirm("Are you sure you want to clear the cart?")) {
            dispatch(cartActions.clearCart());
        }
    };

    return (
        <Modal onClose={props.onClose}>
            <h1 className="cart__header">My Bag</h1>

            {basket.cart.length > 0 && (
                <div className="cart__products">
                    <ModalList products={basket.cart} type="cart" />
                    <div className="cart__options-wrap">
                        <div className="cart__options">
                            <div>Cart Total: {ToLocale(basket.total)}</div>
                            <button onClick={clearCart}>Clear Cart</button>
                        </div>
                    </div>
                </div>
            )}

            {basket.cart.length === 0 && (
                <div className="cart__empty">
                    Your basket is empty! Try adding some products
                </div>
            )}
        </Modal>
    );
};

export default Cart;
