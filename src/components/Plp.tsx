import React, { useState, useEffect } from "react";

import Product from "./Product";

const Plp: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("https://fakestoreapi.com/products");

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const resData: any = await response.json();

            const transformedProducts = resData.map((productData: any) => {
                return {
                    id: productData.id,
                    title: productData.title,
                    desc: productData.description,
                    price: productData.price,
                    img: productData.image,
                };
            });

            console.log(transformedProducts);

            setProducts(transformedProducts);
            setIsLoading(false);
        };

        fetchProducts().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <section className="plp__loading">
                <p>Loading...</p>
            </section>
        );
    }

    if (httpError) {
        return (
            <section className="plp__error">
                <p>{httpError}</p>
            </section>
        );
    }

    const productList: any[] = products.map((product: any) => (
        <Product
            key={product.id}
            id={product.id}
            title={product.title}
            desc={product.desc}
            img={product.img}
            price={product.price}
        />
    ));

    return <div className="plp">{productList}</div>;
};

export default Plp;
