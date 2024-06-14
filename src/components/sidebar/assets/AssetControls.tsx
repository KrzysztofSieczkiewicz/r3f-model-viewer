import React from "react";
import styles from './../NewSidebar.module.css'

import { PositionSliders } from "../controls/PositionSliders";
import { RotationSliders } from "../controls/RotationSliders";
import { ScaleSliders } from "../controls/ScaleSliders";
import { AssetWrapper } from "../../../models/Asset";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { DeleteItemButton } from "../common/DeleteItemButton";
import { ItemTrait } from "../commons/ItemTrait";


type Props = {
    asset: AssetWrapper,
}

export const AssetControls = ({asset}: Props) => {
    const {updateAsset, deleteAsset} = useSceneObjectsContext();

    return (
        <div className={styles.listItemBody}>
            <DeleteItemButton 
                deleteObject={() => deleteAsset(asset.id)} />

            <ItemTrait name="Position">
                <PositionSliders
                    value={asset.position}
                    step={0.005}
                    handleChange={(val) => updateAsset(asset.id, {position: val} )} />
            </ItemTrait>

            <ItemTrait name="Rotation">
                <RotationSliders
                    value={asset.rotation}
                    step={0.01}
                    handleChange={(val) => updateAsset(asset.id, {rotation: val} )} />
            </ItemTrait>

            <ItemTrait name="Scale">
                <ScaleSliders
                    value={asset.scale}
                    step={0.01}
                    handleChange={(val) => updateAsset(asset.id, {scale: val} )} />
            </ItemTrait>
        </div>
    );

}