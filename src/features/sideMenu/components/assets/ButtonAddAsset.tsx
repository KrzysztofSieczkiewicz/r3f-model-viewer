import React, { useState } from "react";
import { AddAssetModal } from "../../../modals/assets/AddAssetModal";
import { ButtonAddObject } from "../common/controls/ButtonAddObject";
import { SidebarModal } from "../../../modals/SidebarModal";

export const ButtonAddAsset = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <ButtonAddObject buttonName="ADD ASSET" handleClicked={() => setIsModalOpen(true) }>
            <SidebarModal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}>
                <AddAssetModal closeModal={() => setIsModalOpen(false)}/>
            </SidebarModal>
        </ButtonAddObject>
    );
}