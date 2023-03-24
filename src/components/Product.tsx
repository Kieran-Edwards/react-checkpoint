import React from "react";

import ToLocale from "./ToLocale";

import AddToCart from "./AddToCart";
import AddToWishlist from "./AddToWishlist";

import "./product.scss";

interface ProductProps {
    id: number;
    title: string;
    price: number;
    desc: string;
    img: string;
}

const Product: React.FC<ProductProps> = (props) => {
    return (
        <div className="product">
            <div className="product__img-wrap">
                <img
                    className="product__img"
                    src={props.img}
                    alt={props.desc}
                ></img>
            </div>
            <h2 className="product__title">{props.title}</h2>
            <div className="product__price-cta-wrap">
                <h3 className="product__price">{ToLocale(props.price)}</h3>
                {/* <p className="product__desc">{props.desc}</p> */}
                <div className="product__ctas">
                    <AddToCart product={props} />
                    <AddToWishlist product={props} />
                </div>
            </div>
        </div>
    );
};

export default Product;
