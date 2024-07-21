import React from "react";
import assetStyles from './AddAssetButton.module.css';
import { AddAssetPopup } from "./newAsset/AddAssetPopup";
import { useSidebarModal } from "../../../hooks/useSidebarModal";


// TODO: TO BE FLASHED OUT
export const AddAssetButton = () => {
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