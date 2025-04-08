import React from "react";
import { AddAssetModal } from "../../../modals/assets/AddAssetModal";
import { useSidebarModal } from "../../../../hooks/useSidebarModal";
import { ButtonAddListedObject } from "../common/controls/ButtonAddListedObject";

export const ButtonAddAsset = () => {
    const { openModal, closeModal, SidebarModal } = useSidebarModal();

    return (
        <ButtonAddListedObject buttonName="ADD ASSET" handleClicked={() => {
            openModal(); 
            } }>
            <SidebarModal>
                <AddAssetModal closeModal={closeModal}/>
            </SidebarModal>
        </ButtonAddListedObject>
    );
}