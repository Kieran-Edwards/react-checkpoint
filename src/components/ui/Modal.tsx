import React from "react";
import ReactDOM from "react-dom";

import "./modal.scss";

interface BackdropProps {
    onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ onClose }) => {
    return (
        <div
            className="backdrop"
            onClick={onClose}
            aria-label="Click to close the modal"
        ></div>
    );
};

interface ModalContentProps {
    onClose: () => void;
    children: React.ReactNode;
}

const ModalContent: React.FC<ModalContentProps> = ({ onClose, children }) => {
    return (
        <div className="modal__content">
            <button className="modal__close" onClick={onClose}>
                <span>Close</span>
            </button>
            {children}
        </div>
    );
};

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
    const portalEl = document.getElementById("overlays");
    if (!portalEl) return null;

    return ReactDOM.createPortal(
        <>
            <Backdrop onClose={onClose} />
            <div className="modal" role="dialog">
                <ModalContent onClose={onClose}>{children}</ModalContent>
            </div>
        </>,
        portalEl
    );
};

export default Modal;
