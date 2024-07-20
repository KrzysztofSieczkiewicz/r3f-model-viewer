import React, { useState, useEffect, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
    children: ReactNode,

    top?: number,
    left?: number;
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

    const Modal = ({ children, top, left }: ModalProps) => {
        if (!isModalOpen || !portalElement) return null;

        const MODAL_STYLE = {
            position: "fixed" as "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0, 0.25)"
        };
        
        const POSITIONER_STYLE = {
            width: "fit-content",
            margin: "0 auto",
            
            // TODO: HOW TO POSITION DIV CENTER DIRECTLY UNDER PROVIDED CORRDINATES?
        };
        
        return createPortal(
            <div style={MODAL_STYLE}>
                <div style={POSITIONER_STYLE}>
                    {children}
                </div>
            </div>,
            portalElement
        );
    };

    return { openModal, closeModal, Modal };
}