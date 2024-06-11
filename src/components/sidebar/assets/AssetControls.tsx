import React from "react";
import styles from './../NewSidebar.module.css'

import { PositionSliders } from "../common/PositionSliders";
import { RotationSliders } from "../common/RotationSliders";
import { ScaleSliders } from "../common/ScaleSliders";
import { AssetWrapper } from "../../../models/Asset";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { DeleteItemButton } from "../common/DeleteItemButton";


type Props = {
    asset: AssetWrapper,
}

export const AssetControls = ({asset}: Props) => {
    const {updateAsset, deleteAsset} = useSceneObjectsContext();

    return (
        <div className={styles.listItemBody}>
            <DeleteItemButton 
                deleteObject={() => deleteAsset(asset.id)} />

            <PositionSliders 
                name="Position"
                value={asset.position}
                step={0.005}
                handleChange={(val) => updateAsset(asset.id, {position: val} )} />

            <RotationSliders 
                name="Rotation"
                value={asset.rotation}
                step={0.01}
                handleChange={(val) => updateAsset(asset.id, {rotation: val} )} />

            <ScaleSliders 
                name="Scale"
                value={asset.scale}
                step={0.01}
                handleChange={(val) => updateAsset(asset.id, {scale: val} )} />
        </div>
    );

}