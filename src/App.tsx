import { useState } from "react";

import Header from "./components/Header";
import Plp from "./components/Plp";
import Footer from "./components/Footer";

import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";

import "./app.scss";

type typeAlias = "wishlist" | "cart";

function App() {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("");

    const showModalHandler = (type: typeAlias) => {
        setModalType(type);
        setShowModal(true);
        document.body.style.overflow = "hidden";
    };

    const hideModalHandler = () => {
        setShowModal(false);
        document.body.style.overflow = "unset";
    };

    return (
        <div className={"app" + (showModal && " app--modal-open")}>
            {showModal && modalType === "cart" && (
                <Cart onClose={hideModalHandler} />
            )}
            {showModal && modalType === "wishlist" && (
                <Wishlist onClose={hideModalHandler} />
            )}
            <Header
                onShowCart={showModalHandler}
                onShowWishlist={showModalHandler}
            />
            <div className={"content"}>
                <Plp />
            </div>
            <Footer />
        </div>
    );
}

export default App;
