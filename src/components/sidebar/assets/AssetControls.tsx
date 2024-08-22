import React from "react";

import { AssetWrapper } from "../../../models/assets/Asset";
import { useSceneObjectsContext } from "../../contexts/SceneObjectsContext";
import { DeleteItemButton } from "../common/DeleteItemButton";
import { SingleLineTrait } from "../commons/traitContainers/SingleLineTrait";
import { ListItemBody } from "../commons/ListItemBody";
import { MeshControls } from "./meshControls/MeshControls";
import { MaterialControls } from "./materialControls/MaterialControls";
import { SlidersArray } from "../controls/SlidersArray";


type Props = {
    assetId: string,
    asset: AssetWrapper,
}

export const AssetControls = ({assetId, asset}: Props) => {
    const {updateAssetProperties, deleteAsset} = useSceneObjectsContext();

    const { scale, rotation, position } = asset.properties;

    return (
        <ListItemBody>
            <DeleteItemButton deleteObject={() => deleteAsset(assetId)} />

            <MeshControls asset={asset} />
            <MaterialControls asset={asset} />

            <SingleLineTrait name="Position">
                <SlidersArray
                    value={position}
                    step={0.01}
                    handleChange={(val) => updateAssetProperties(assetId, {position: val})} />
            </SingleLineTrait>

            <SingleLineTrait name="Rotation">
                <SlidersArray
                    value={rotation}
                    step={0.01}
                    handleChange={(val) => updateAssetProperties(assetId, {rotation: val})} />
            </SingleLineTrait>

            <SingleLineTrait name="Scale">
                <SlidersArray
                    value={scale}
                    step={0.01}
                    handleChange={(val) => updateAssetProperties(assetId, {scale: val})}
                    axesLocking />
            </SingleLineTrait>
        </ListItemBody>
    );

}