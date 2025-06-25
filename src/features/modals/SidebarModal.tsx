import React, { ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom";

import styles from './SidebarModal.module.css';

type Props = {
    isOpen: boolean;
    onClose: () => void;

    children?: ReactNode
}

export const SidebarModal = ({isOpen, onClose, children}: Props) => {

    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
    const modalRef = useRef<HTMLDialogElement>(null);

    // Find and set portal target element
    useEffect(() => {
        const element = document.getElementById('sidebar-modal');
        if (!element) {
            console.error("Scene main component should contain an element with id='sidebar-modal' as portal target");
            return;
        }
        setPortalElement(element);
    }, []);

    // Manage internal <dialog> visibility
    useEffect(() => {
        const modal = modalRef.current;
        if (!modal) return;

        if (isOpen && !modal.open) {
            modal.showModal();
        }
        if (!isOpen && modal.open) {
            modal.close();
        }

        return () => {
            if (modal && modal.open) {
                modal.close();
            }
        }
    }, [isOpen]);

    // Handle <dialog> 'close' event
    useEffect(() => {
        const modal = modalRef.current;
        if (!modal) return;

        const handleNativeClose = () => {
            onClose();
        }

        modal.addEventListener('close', handleNativeClose);

        return () => {
            modal.removeEventListener('close', handleNativeClose);
        };
    }, [onClose]);

    // Handle closing on backdrop clicks
    useEffect(() => {
        const modal = modalRef.current;
        if (!modal) return;

        const handleBackdropClick = (e: MouseEvent) => {
            if (e.target !== modal) return;
            modal.close();
        }

        modal.addEventListener('click', handleBackdropClick);

        return () => {
            modal.removeEventListener('click', handleBackdropClick);
        } 
    }, [isOpen]);

    // Conditional component rendering
    if (!isOpen || !portalElement) {
        return null;
    }

    return createPortal(
        <dialog 
            ref={modalRef}
            className={styles.modal} 
            onClick={(e)=> e.stopPropagation()}
        >
            {children}
        </dialog>,
        portalElement
    );
}