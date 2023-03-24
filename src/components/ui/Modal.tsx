import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import "./modal.scss";

interface BackdropProps {
    onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
    return <div className="backdrop" onClick={props.onClose}></div>;
};

interface ModalOverlayProps {
    onClose: () => void;
    children: React.ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose, children }) => {
    return (
        <div className="modal">
            <button className="modal__close" onClick={onClose}>
                <span>Close</span>
            </button>
            <div className="modal__content">{children}</div>
        </div>
    );
};

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const portalEl = document.getElementById("overlays") as HTMLElement;

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalEl)}
            {ReactDOM.createPortal(
                <ModalOverlay onClose={onClose}>{children}</ModalOverlay>,
                portalEl
            )}
        </Fragment>
    );
};

export default Modal;
