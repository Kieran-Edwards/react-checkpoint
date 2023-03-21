import React from "react";

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
                <h3 className="product__price">{props.price}</h3>
                {/* <p className="product__desc">{props.desc}</p> */}
                <div className="product__ctas">
                    <button className="product__atc">Add To Bag</button>
                    <button className="product__atw">wish</button>
                </div>
            </div>
        </div>
    );
};

export default Product;
