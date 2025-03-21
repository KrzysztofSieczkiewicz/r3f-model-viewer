import React, { useRef, useState } from "react";
import assetStyles from './../common/submenu/Submenu.module.css';
import { AddAssetModal } from "../../../modals/assets/AddAssetModal";
import { useSidebarModal } from "../../../../hooks/useSidebarModal";
import { getElementCenter, getElementDimensions } from "../../../../utils/refUtil";
import { ButtonAddListedObject } from "../common/submenu/ButtonAddListedObject";

// TODO: Should this component be joined with modal handling as : AddButtonWithModal ???

export const ButtonAddAsset = () => {
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
        <ButtonAddListedObject buttonName="ADD ASSET" handleClicked={() => {
            updateButtonPosition();
            openModal(); 
            } }>
            <SidebarModal topY={modalPosition.topY} centerX={modalPosition.centerX}>
                <AddAssetModal closeModal={closeModal}/>
            </SidebarModal>
        </ButtonAddListedObject>
    );
}