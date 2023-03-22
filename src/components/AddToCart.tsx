import React from "react";

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
    async function addToCart(item: {}) {
        await fetch(
            `https://react-checkpoint-1-default-rtdb.firebaseio.com/cart.json`,
            {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    return (
        <div className="add-to-bag">
            <button
                className="add-to-bag__button"
                onClick={(e: any) => addToCart(props.product)}
            >
                Add to Bag
            </button>
        </div>
    );
};

export default AddToCart;
