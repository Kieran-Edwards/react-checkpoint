import React from "react";

import ToLocale from "./ToLocale";

import "./modalList.scss";

interface ModalListProps {
    products: any[];
}

const ModalList: React.FC<ModalListProps> = (props) => {
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
                    {/* <p>{product.desc}</p> */}
                </div>
            ))}
        </div>
    );
};

export default ModalList;
