import React, { useEffect, useRef, useState } from "react";
import assetStyles from './AddAssetButton.module.css';
import { AddAssetPopup } from "./newAsset/AddAssetPopup";
import { useSidebarModal } from "../../../hooks/useSidebarModal";
import { getElementCenter, getElementDimensions } from "../../../utils/refUtil";


// TODO: TO BE FLASHED OUT
export const AddAssetButton = () => {
    const { openModal, closeModal, Modal } = useSidebarModal();

    const [ modalPosition, setModalPosition ] = useState({centerX: 0, topY: 0})

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect( () => {
        if(!buttonRef.current) return;

        const currPos = getElementCenter(buttonRef.current)
        const currHeight = getElementDimensions(buttonRef.current).height;

        const centerX = currPos.centerX;
        const topY = currPos.centerY;
        
        setModalPosition({centerX, topY});
    }, [buttonRef])

    return (
        <>
            <button ref={buttonRef} className={assetStyles.addButton} onClick={() => {openModal()}}> ADD NEW </button>
            <Modal topY={modalPosition.topY} centerX={modalPosition.centerX}>
                <AddAssetPopup closeModal={closeModal}/>
            </Modal>
        </>
    );
}