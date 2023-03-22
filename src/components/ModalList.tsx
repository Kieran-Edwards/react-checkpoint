import React from "react";

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
                    <h3>{product.price}</h3>
                    <p>{product.desc}</p>
                </div>
            ))}
        </div>
    );
};

export default ModalList;
