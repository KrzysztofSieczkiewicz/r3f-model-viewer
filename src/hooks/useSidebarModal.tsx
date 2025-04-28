import React, { useState, useEffect, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
    children: ReactNode,
}

// TODO: update it up to standard - that was rushed implementation
export const useSidebarModal = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        const element = document.getElementById('sidebar-modal');
        if (!element) {
            console.error("Scene main component should contain a <div id='sidebar-modal'> element.");
            return;
        }
        setPortalElement(element);
        return () => setPortalElement(null);
    }, []);

    const SidebarModal = ({ children }: ModalProps) => {
        const [modalWidth, setModalWidth] = useState<number>(0);
        const [isCalculated, setIsCalculated] = useState<boolean>(false);
        const modalRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (modalRef.current) {
                setModalWidth(modalRef.current.offsetWidth);
                setIsCalculated(true);
            }
        }, []);

        const MODAL_STYLE = {
            position: "fixed" as "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0, 0.25)",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        };
        
        const POSITIONER_STYLE = {
            position: "absolute" as "absolute",
            width: "fit-content",
            opacity: isCalculated ? 1 : 0
        };
        
        if (!isModalOpen || !portalElement) return null;
        return createPortal(
            <div style={MODAL_STYLE} 
                className="modal" 
                onClick={() => closeModal()}
            >
                <div ref={modalRef}
                    style={POSITIONER_STYLE} 
                    className="modal-content-positioner" 
                    onClick={(e)=> e.stopPropagation()}
                >
                    {children}

                </div>
            </div>,
            portalElement
        );
    };

    return { openModal, closeModal, SidebarModal };
}