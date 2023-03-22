import React from "react";

import "./addToWishlist.scss";

interface AddToWishlistProps {
    product: {
        id: number;
        title: string;
        price: number;
        desc: string;
        img: string;
    };
}

const AddToWishlist: React.FC<AddToWishlistProps> = (props) => {
    async function addToWishlist(item: {}) {
        await fetch(
            `https://react-checkpoint-1-default-rtdb.firebaseio.com/wishlist.json`,
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
        <div className="add-to-wishlist">
            <button
                className="add-to-wishlist__button"
                onClick={(e: any) => addToWishlist(props.product)}
            >
                Wish
            </button>
        </div>
    );
};

export default AddToWishlist;
