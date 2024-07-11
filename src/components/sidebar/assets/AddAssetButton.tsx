import React, { useState } from "react";
import assetStyles from './AddAssetButton.module.css';
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { AddAssetPopup } from "./newAsset/AddAssetPopup";


// TODO: TO BE FLASHED OUT
export const AddAssetButton = () => {
    const { addAsset } = useSceneObjectsContext();

    const [ isDisplayed, setIsDisplayed ] = useState(false);

    return (
        <>
            <button className={assetStyles.addButton} onClick={() => {setIsDisplayed(true)}}> ADD NEW </button>
            {isDisplayed && <AddAssetPopup />}
        </>
    );
}