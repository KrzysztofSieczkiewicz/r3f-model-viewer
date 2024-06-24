import React from "react";
import assetStyles from './AddAssetButton.module.css';
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";


// TODO: TO BE FLASHED OUT
export const AddAssetButton = () => {
    const { addAsset } = useSceneObjectsContext();

    return (
        <button className={assetStyles.addButton} onClick={() => {addAsset()}}> ADD NEW </button>
    );
}