import React from "react";

interface ProductProps {
    id: number;
    title: string;
    price: number;
    desc: string;
    img: string;
}

const Product: React.FC<ProductProps> = (props) => {
    console.log(props);
    return (
        <div className="product">
            <div className="product__img-wrap">
                <img
                    className="product__img"
                    src={props.img}
                    alt={props.desc}
                ></img>
            </div>
            <div className="product__info">
                <h2 className="product__title">{props.title}</h2>
                <div className="product__price-cta-wrap">
                    <h3 className="product__price">£{props.price}</h3>
                    {/* <p className="product__desc">{props.desc}</p> */}
                    <div className="product__ctas">
                        <div>Add To Bag</div>
                        <div>WishList</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
