import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { cartActions } from "../store/cart";

import "./addToCart.scss";

interface AddToCartProps {
    product: {
        id: number;
        title: string;
        price: number;
        desc: string;
        img: string;
    };
}

const AddToCart: React.FC<AddToCartProps> = (props) => {
    const dispatch = useDispatch();

    const addHandler = () => {
        dispatch(
            cartActions.addProduct({
                id: props.product.id,
                title: props.product.title,
                price: props.product.price,
                desc: props.product.desc,
                img: props.product.img,
                amount: 1,
            })
        );
    };

    return (
        <div className="add-to-bag">
            <button className="add-to-bag__button" onClick={addHandler}>
                Add to Bag
            </button>
        </div>
    );
};

export default AddToCart;
