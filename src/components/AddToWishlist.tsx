import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { wishlistActions } from "../store/wishlist";

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
    const dispatch = useDispatch();
    const wishlist = useSelector((state: any) => state.wishlist);

    const checkIsInWishlist = () => {
        if (
            wishlist.wishlist.length > 0 &&
            wishlist.wishlist.findIndex(
                (product: { id: number }) => product.id === props.product.id
            ) !== -1
        ) {
            return true;
        } else {
            return false;
        }
    };

    const removeHandler = () => {
        dispatch(wishlistActions.removeProduct(props.product));
    };

    const addHandler = () => {
        dispatch(wishlistActions.addProduct(props.product));
    };

    return (
        <div className="add-to-wishlist">
            <button
                className={
                    "add-to-wishlist__button" +
                    (checkIsInWishlist()
                        ? " add-to-wishlist__button--filled"
                        : "")
                }
                onClick={checkIsInWishlist() ? removeHandler : addHandler}
            >
                <span>Wish</span>
            </button>
        </div>
    );
};

export default AddToWishlist;
