import React from "react";

import "./header.scss";
import Logo from "../assets/Logo.jpg";

const Header: React.FC = () => {
    return (
        <div className="header">
            <img
                className="header__logo"
                src={Logo}
                alt="website logo depicting the letters KE"
            />
            <div className="header__wishlist">Wishlist</div>
            <div className="header__cart">Cart</div>
        </div>
    );
};

export default Header;
