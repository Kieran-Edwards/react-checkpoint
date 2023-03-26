import React from "react";
import { useDispatch } from "react-redux";

import ToLocale from "./ToLocale";
import { cartActions } from "../store/cart";
import { wishlistActions } from "../store/wishlist";

import "./modalList.scss";

interface Product {
    id: number;
    title: string;
    price: number;
    desc: string;
    img: string;
    amount: number;
}

interface ModalListProps {
    products: Product[];
    type: string;
}

const ModalList: React.FC<ModalListProps> = (props) => {
    const dispatch = useDispatch();

    const createProductItem = (product: Product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        desc: product.desc,
        img: product.img,
        amount: 1,
    });

    const wishlistToCartHandler = (item: Product) => {
        dispatch(cartActions.addProduct(item));
        dispatch(wishlistActions.removeProduct(item));
    };

    const cartItemIncreaseHandler = (item: Product) => {
        dispatch(cartActions.addProduct(item));
    };

    const cartItemDecreaseHandler = (item: Product) => {
        dispatch(cartActions.removeProduct(item));
    };

    const cartItemRemoveHandler = (item: Product) => {
        dispatch(cartActions.removeAllProduct(item));
    };

    return (
        <div className="modal-items">
            {props.products.map((product) => (
                <div className="modal-item" key={product.id}>
                    <div className="modal-item__img-wrap">
                        <img
                            className="modal-item__img "
                            src={product.img}
                            alt={product.desc}
                        />
                    </div>
                    <div className="modal-item__details">
                        <button
                            className="modal-item__remove"
                            onClick={() =>
                                cartItemRemoveHandler(
                                    createProductItem(product)
                                )
                            }
                        >
                            <span>Remove All {product.title}</span>
                        </button>

                        {!product.amount && <h2>{ToLocale(product.price)}</h2>}

                        {product.amount && (
                            <h2>{ToLocale(product.price * product.amount)}</h2>
                        )}

                        <h3 className="modal-item__title">{product.title}</h3>

                        {props.type === "wishlist" && (
                            <button
                                className="modal-item__move"
                                onClick={() =>
                                    wishlistToCartHandler(
                                        createProductItem(product)
                                    )
                                }
                            >
                                Move to Cart
                            </button>
                        )}
                        {props.type === "cart" && (
                            <>
                                <div>
                                    <button
                                        className="modal-item__qty-btn"
                                        onClick={() =>
                                            cartItemIncreaseHandler(
                                                createProductItem(product)
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                    {product.amount}
                                    <button
                                        className="modal-item__qty-btn"
                                        onClick={() =>
                                            cartItemDecreaseHandler(
                                                createProductItem(product)
                                            )
                                        }
                                    >
                                        -
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* <p>{product.desc}</p> */}
                </div>
            ))}
        </div>
    );
};

export default ModalList;
