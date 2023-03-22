import React from "react";

import "./header.scss";
import Logo from "../assets/Logo.jpg";

type typeAlias = "wishlist" | "cart";

interface HeaderProps {
    onShowCart: (type: typeAlias) => void;
    onShowWishlist: (type: typeAlias) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <div className="header">
            <img
                className="header__logo"
                src={Logo}
                alt="website logo depicting the letters KE"
            />
            <div
                className="header__wishlist"
                onClick={() => props.onShowCart("wishlist")}
            >
                Wishlist
            </div>
            <div
                className="header__cart"
                onClick={() => props.onShowCart("cart")}
            >
                Cart
            </div>
        </div>
    );
};

export default Header;
