import React, { useRef, useState } from "react";
import assetStyles from './AddAssetButton.module.css';
import { AddAssetPopup } from "./newAsset/AddAssetModal";
import { useSidebarModal } from "../../../hooks/useSidebarModal";
import { getElementCenter, getElementDimensions } from "../../../utils/refUtil";


// TODO MOVE THIS COMPONENT AS 'ADD BUTTON WITH MODAL' TO BE REUSED
export const AddAssetButton = () => {
    const { openModal, closeModal, SidebarModal } = useSidebarModal();

    const [modalPosition, setModalPosition ] = useState({centerX: 0, topY: 0})
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const updateButtonPosition = () => {
        if(!buttonRef.current) return;

        const currPos = getElementCenter(buttonRef.current)
        const currHeight = getElementDimensions(buttonRef.current).height;

        const centerX = currPos.centerX;
        const topY = currPos.centerY + currHeight / 2;
        
        setModalPosition({centerX, topY});
      };

    return (
        <>
            <button ref={buttonRef} className={assetStyles.addButton} onClick={() => {updateButtonPosition(); openModal()}}> ADD NEW </button>
            <SidebarModal topY={modalPosition.topY} centerX={modalPosition.centerX}>
                <AddAssetPopup closeModal={closeModal}/>
            </SidebarModal>
        </>
    );
}