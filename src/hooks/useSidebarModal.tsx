import React, { useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
    children: ReactNode,
}

export const useSidebarModal = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        const element = document.getElementById('sidebar-modal');
        if (!element) {
            console.error("Sidebar component should contain a <div id='sidebar-modal'> element.");
        }
        setPortalElement(element);
    }, []);

    const Modal = ({ children }: ModalProps) => (
        isModalOpen && portalElement ? createPortal(
            <div style={MODAL_STYLE}>
                <div className="modal-content-positioner">
                    {children}
                </div>
            </div>,
            portalElement
        ) : null
    );

    return { openModal, closeModal, Modal };
}

const MODAL_STYLE = {
    position: "fixed" as "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0, 0.25)"
};