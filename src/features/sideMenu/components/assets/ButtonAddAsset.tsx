import React from "react";
import { AddAssetModal } from "../../../modals/assets/AddAssetModal";
import { useSidebarModal } from "../../../../hooks/useSidebarModal";
import { ButtonAddObject } from "../common/controls/ButtonAddObject";

export const ButtonAddAsset = () => {
    const { openModal, closeModal, SidebarModal } = useSidebarModal();

    return (
        <ButtonAddObject buttonName="ADD ASSET" handleClicked={() => openModal() }>
            <SidebarModal>
                <AddAssetModal closeModal={closeModal}/>
            </SidebarModal>
        </ButtonAddObject>
    );
}