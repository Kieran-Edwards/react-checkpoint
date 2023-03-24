import React from "react";
import Modal from "./ui/Modal";
import ModalList from "./ModalList";

import { useSelector } from "react-redux";

import "./wishlist.scss";

interface WishlistProps {
    onClose: () => void;
}

const Wishlist: React.FC<WishlistProps> = (props) => {
    const wishlist = useSelector((state: any) => state.wishlist);

    return (
        <Modal onClose={props.onClose}>
            <h1 className="wishlist__header">My Wishlist</h1>

            {wishlist.wishlist.length > 0 && (
                <div className="wishlist__products">
                    <ModalList products={wishlist.wishlist} type="wishlist" />
                </div>
            )}

            {wishlist.wishlist.length === 0 && (
                <div className="wishlist__empty">
                    The wishlist is empty! Try saving some products...
                </div>
            )}
        </Modal>
    );
};

export default Wishlist;
