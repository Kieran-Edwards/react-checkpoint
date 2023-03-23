import React, { useState, useEffect } from "react";

import Product from "./Product";

import "./plp.scss";

const Plp: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState<any[]>([]);
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
                    price: productData.price.toLocaleString("en-GB", {
                        style: "currency",
                        currency: "GBP",
                    }),
                    img: productData.image,
                };
            });

            setProducts(transformedProducts);
            setIsLoading(false);
        };

        fetchProducts().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
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

    const checkIsInWishlist = (productId: number) => {
        let isInWishlist: boolean = false;
        wishlist.forEach((element) => {
            if (element.id === productId) {
                isInWishlist = true;
            }
        });
        return isInWishlist;
    };

    const productList: any[] = products.map((product: any) => (
        <Product
            key={product.id}
            id={product.id}
            title={product.title}
            desc={product.desc}
            img={product.img}
            price={product.price}
            isInWishlist={checkIsInWishlist(product.id)}
        />
    ));

    return <div className="plp">{productList}</div>;
};

export default Plp;
