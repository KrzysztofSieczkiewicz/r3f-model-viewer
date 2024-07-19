import React, { useState } from "react";
import assetStyles from './AddAssetButton.module.css';
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { AddAssetPopup } from "./newAsset/AddAssetPopup";
import { useSidebarModal } from "../../../hooks/useSidebarModal";


// TODO: TO BE FLASHED OUT
export const AddAssetButton = () => {
    const { addAsset } = useSceneObjectsContext();
    const { openModal, Modal } = useSidebarModal();

    return (
        <>
            <button className={assetStyles.addButton} onClick={() => {openModal()}}> ADD NEW </button>
            <Modal>
                <AddAssetPopup />
            </Modal>
        </>
    );
}