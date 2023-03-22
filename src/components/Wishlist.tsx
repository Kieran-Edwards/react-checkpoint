import React, { useCallback, useState, useEffect } from "react";
import Modal from "./ui/Modal";
import ModalList from "./ModalList";

import "./wishlist.scss";

interface WishlistProps {
    onClose: () => void;
}

const Wishlist: React.FC<WishlistProps> = (props) => {
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);

    const fetchWishlistHandler = useCallback(async () => {
        setIsLoading(true);
        // setError(null);

        try {
            const response = await fetch(
                `https://react-checkpoint-1-default-rtdb.firebaseio.com/wishlist.json`
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

            setWishlist(loadedProducts);
        } catch (error: any) {
            return error.message;
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchWishlistHandler();
    }, [fetchWishlistHandler]);

    return (
        <Modal onClose={props.onClose}>
            <h1 className="wishlist__header">My Wishlist</h1>
            {wishlist.length > 0 && (
                <div className="wishlist__products">
                    <ModalList products={wishlist} />
                    <div>Wishlist totals</div>
                </div>
            )}
            {wishlist.length === 0 && !isLoading && (
                <div className="wishlist__empty">
                    The wishlist is empty! Try saving some products...
                </div>
            )}
            {isLoading && (
                <div className="wishlist__loading">Loading Wishlist...</div>
            )}
        </Modal>
    );
};

export default Wishlist;
