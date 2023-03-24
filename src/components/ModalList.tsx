import React from "react";
import { useDispatch } from "react-redux";

import ToLocale from "./ToLocale";
import { cartActions } from "../store/cart";
import { wishlistActions } from "../store/wishlist";

import "./modalList.scss";

interface ModalListProps {
    products: any[];
    type: string;
}

type Product = {
    id: number;
    title: string;
    price: number;
    desc: string;
    img: string;
    amount: number;
};

const ModalList: React.FC<ModalListProps> = (props) => {
    const dispatch = useDispatch();

    const wishlistToCartHandler = (item: Product) => {
        dispatch(cartActions.addProduct(item));
        dispatch(wishlistActions.removeProduct(item));
    };

    return (
        <div>
            {props.products.map((product) => (
                <div className="modal-item" key={product.id}>
                    <img
                        className="modal-item__img"
                        src={product.img}
                        alt={product.desc}
                    ></img>
                    <h2>{product.title}</h2>
                    {product.amount && (
                        <p>
                            {product.amount} x {ToLocale(product.price)}
                        </p>
                    )}
                    {!product.amount && <p>{ToLocale(product.price)}</p>}
                    {props.type === "wishlist" && (
                        <button
                            onClick={(e: any) =>
                                wishlistToCartHandler({
                                    id: product.id,
                                    title: product.title,
                                    price: product.price,
                                    desc: product.desc,
                                    img: product.img,
                                    amount: 1,
                                })
                            }
                        >
                            Move to Cart
                        </button>
                    )}
                    {/* <p>{product.desc}</p> */}
                </div>
            ))}
        </div>
    );
};

export default ModalList;
