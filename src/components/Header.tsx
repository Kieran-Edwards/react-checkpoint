import React from "react";

import "./header.scss";
import Logo from "../assets/Logo.jpg";

type typeAlias = "wishlist" | "cart";

interface HeaderProps {
    modalOpen: boolean;
    modalType: string;
    onShowCart: (type: typeAlias) => void;
    onShowWishlist: (type: typeAlias) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <div className="header">
            <div
                className={
                    "header__cart" +
                    (props.modalOpen && props.modalType === "cart"
                        ? " header__cart--filled"
                        : "")
                }
                onClick={() => props.onShowCart("cart")}
            >
                <span>Cart</span>
            </div>
            <img
                className="header__logo"
                src={Logo}
                alt="website logo depicting the letters KE"
            />
            <div
                className={
                    "header__wishlist" +
                    (props.modalOpen && props.modalType === "wishlist"
                        ? " header__wishlist--filled"
                        : "")
                }
                onClick={() => props.onShowCart("wishlist")}
            >
                <span>Wishlist</span>
            </div>
            {/* <div className="header__ctas">
                
            </div> */}
        </div>
    );
};

export default Header;
