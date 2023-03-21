import React from "react";

import "./footer.scss";
import Logo from "../assets/Logo.jpg";

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <img
                className="footer__logo"
                src={Logo}
                alt="website logo depicting the letters KE"
            />
        </div>
    );
};

export default Footer;
