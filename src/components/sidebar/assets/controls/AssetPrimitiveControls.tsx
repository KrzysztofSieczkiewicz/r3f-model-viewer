import React, { useState } from "react";
import { DeleteItemButton } from "../../common/DeleteItemButton";
import { ItemTrait } from "../../commons/ItemTrait";
import { ListItemBody } from "../../commons/ListItemBody";
import { PositionSliders } from "../../controls/PositionSliders";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { RotationSliders } from "../../controls/RotationSliders";
import { ScaleSliders } from "../../controls/ScaleSliders";
import { AxesLockButton } from "../../controls/buttons/AxesLockButton";
import { AssetProperties } from "../../../../models/Asset";

type Props = {
    assetId: string,
    assetProperties: AssetProperties,
}

export const AssetPrimitiveControls = ({assetId, assetProperties}: Props) => {
    const {updateAssetProperties, deleteAsset} = useSceneObjectsContext();
    const [ axesLocked, setAxesLocked] = useState(false);

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteAsset(assetId)} />

            <ItemTrait name="Position">
                <PositionSliders
                    value={assetProperties.position}
                    step={0.005}
                    handleChange={(val) => updateAssetProperties(assetId, {position: val} )} />
            </ItemTrait>

            <ItemTrait name="Rotation">
                <RotationSliders
                    value={assetProperties.rotation}
                    step={0.01}
                    handleChange={(val) => updateAssetProperties(assetId, {rotation: val} )} />
            </ItemTrait>

            <ItemTrait name="Scale">
                <ScaleSliders
                    value={assetProperties.scale}
                    step={0.01}
                    handleChange={(val) => updateAssetProperties(assetId, {scale: val} )}
                    axesLock={axesLocked} />
                <AxesLockButton locked={axesLocked} setLocked={(val) => setAxesLocked(val)} />
            </ItemTrait>
        </ListItemBody>
    );

}