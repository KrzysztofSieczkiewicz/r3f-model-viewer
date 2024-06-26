import React, { useState } from "react";

import { PositionSliders } from "../controls/PositionSliders";
import { ScaleSliders } from "../controls/ScaleSliders";
import { AssetProperties, AssetWrapper } from "../../../models/Asset";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { DeleteItemButton } from "../common/DeleteItemButton";
import { ItemTrait } from "../commons/ItemTrait";
import { RotationSliders } from "../controls/RotationSliders";
import { AxesLockButton } from "../controls/buttons/AxesLockButton";
import { ListItemBody } from "../commons/ListItemBody";
import { MeshSphereControls } from "./controls/MeshSphereControls";
import { SphereProperties } from "../../../models/Primitive";


type Props = {
    assetId: string,
    asset: AssetWrapper,
}

export const AssetControls = ({assetId, asset}: Props) => {
    const {updateAssetProperties, deleteAsset} = useSceneObjectsContext();
    const [ axesLocked, setAxesLocked] = useState(false);

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteAsset(assetId)} />

            <MeshSphereControls 
                assetId={assetId}
                 meshProperties={asset.mesh.properties as SphereProperties} />

            <ItemTrait name="Position">
                <PositionSliders
                    value={asset.properties.position}
                    step={0.005}
                    handleChange={(val) => updateAssetProperties(assetId, {position: val} )} />
            </ItemTrait>

            <ItemTrait name="Rotation">
                <RotationSliders
                    value={asset.properties.rotation}
                    step={0.01}
                    handleChange={(val) => updateAssetProperties(assetId, {rotation: val} )} />
            </ItemTrait>

            <ItemTrait name="Scale">
                <ScaleSliders
                    value={asset.properties.scale}
                    step={0.01}
                    handleChange={(val) => updateAssetProperties(assetId, {scale: val} )}
                    axesLock={axesLocked} />
                <AxesLockButton locked={axesLocked} setLocked={(val) => setAxesLocked(val)} />
            </ItemTrait>
        </ListItemBody>
    );

}